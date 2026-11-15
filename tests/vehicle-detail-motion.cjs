const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(
  process.env.PLAYWRIGHT_PATH ||
    'C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package',
);
const { start } = require('./static-server.cjs');
(async () => {
  const { vehicleViewers } = await import('../data/vehicle-viewers.js');
  const server = await start('/vinf21');
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const width of [1440, 768, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        hasTouch: width === 390,
      });
      for (const model of vehicleViewers) {
        await page.goto(`${server.base}/vinf21/${model.route}`);
        await page.waitForFunction(
          () =>
            document.querySelector('[data-vehicle-viewer]')?.dataset
              .selectedColor !== undefined &&
            document.querySelector('[data-vehicle-summary]')?.dataset
              .selectedVariant === '0',
        );
        const stage = page.locator('.exterior-stage');
        await stage.scrollIntoViewIfNeeded();
        const before = await stage.boundingBox();
        const illustration = await page
          .locator('.vehicle-technical figure img')
          .getAttribute('src');
        const swatches = page.locator('[data-vehicle-viewer] .swatches button');
        await page.locator('[data-viewer-zoom-in]').click();
        if (await swatches.count()) {
          await swatches.last().click();
          const last = String((await swatches.count()) - 1);
          await page.waitForFunction(
            (last) =>
              document.querySelector('[data-vehicle-viewer]').dataset
                .selectedColor === last &&
              document
                .querySelector('.exterior-stage')
                .getAttribute('aria-busy') === 'false',
            last,
          );
        }
        assert.equal(
          await stage.evaluate((n) =>
            n.style.getPropertyValue('--viewer-zoom'),
          ),
          '1.25',
        );
        await page.locator('[data-viewer-reset]').click();
        const after = await stage.boundingBox();
        assert.ok(
          Math.abs(before.width - after.width) < 1 &&
            Math.abs(before.height - after.height) < 1,
          'Stable image container',
        );
        const aligned = await stage.evaluate((n) => {
          const r = n.getBoundingClientRect();
          const i = n.querySelector('img:last-child').getBoundingClientRect();
          return (
            Math.abs(r.left + r.right - (i.left + i.right)) < 2 &&
            Math.abs(r.top + r.bottom - (i.top + i.bottom)) < 2
          );
        });
        assert.ok(aligned, 'Centered color image');
        assert.equal(
          await page
            .locator('.vehicle-technical figure img')
            .getAttribute('src'),
          illustration,
        );
        let swipes = 0;
        for (const slider of await page.locator('main [data-slider]').all()) {
          const viewport = slider.locator('.swipe-viewport');
          if ((await viewport.locator('.swipe-slide').count()) < 2) continue;
          await viewport.scrollIntoViewIfNeeded();
          await viewport
            .locator('img')
            .evaluateAll((images) =>
              Promise.all(images.map((i) => i.decode())),
            );
          const box = await viewport.boundingBox();
          if (width === 390) {
            const session = await page.context().newCDPSession(page);
            await session.send('Input.dispatchTouchEvent', {
              type: 'touchStart',
              touchPoints: [
                {
                  x: box.x + box.width * 0.75,
                  y: box.y + Math.min(100, box.height / 2),
                },
              ],
            });
            await session.send('Input.dispatchTouchEvent', {
              type: 'touchMove',
              touchPoints: [
                {
                  x: box.x + box.width * 0.2,
                  y: box.y + Math.min(100, box.height / 2),
                },
              ],
            });
            await session.send('Input.dispatchTouchEvent', {
              type: 'touchEnd',
              touchPoints: [],
            });
            await session.detach();
          } else {
            await page.mouse.move(
              box.x + box.width * 0.75,
              box.y + Math.min(100, box.height / 2),
            );
            await page.mouse.down();
            await page.mouse.move(
              box.x + box.width * 0.2,
              box.y + Math.min(100, box.height / 2),
              { steps: 10 },
            );
            await page.mouse.up();
          }
          await page.waitForTimeout(400);
          assert.equal(
            await viewport.getAttribute('data-swipe-index'),
            '1',
            'Swipe advances',
          );
          const slide = viewport.locator('.swipe-slide:not([hidden])');
          assert.equal(await slide.count(), 1);
          const drift = await slide.evaluate((n) => {
            const r = n.getBoundingClientRect(),
              v = n.parentElement.getBoundingClientRect();
            return Math.abs(r.left - v.left);
          });
          assert.ok(drift < 1, 'Slide returns to origin');
          swipes++;
        }
        const features = page.locator('[data-vehicle-features]');
        await features.locator('[role=tab][aria-selected=true]').waitFor();
        await features.locator('[role=tab]').evaluateAll((bs) => {
          for (let i = 0; i < 12; i++) bs[i % bs.length].click();
          bs[0].click();
        });
        await page.waitForFunction(
          () =>
            document.querySelector('[data-vehicle-features]').dataset
              .selectedCategory === '0',
        );
        await page.waitForTimeout(400);
        assert.equal(
          await features.locator('[role=tabpanel]:not([hidden])').count(),
          1,
        );
        if (['vf6', 'kinet', 'fadil', 'vf8-new'].includes(model.id)) {
          await features.scrollIntoViewIfNeeded();
          await page.screenshot({
            path: path.join(
              os.tmpdir(),
              `vehicle-features-${model.id}-${width}.png`,
            ),
          });
        }
        results.push({ id: model.id, width, swipes, status: 'PASS' });
        console.log('PASS', model.id, width, swipes);
      }
      await page.close();
    }
  } finally {
    fs.writeFileSync(
      path.join(os.tmpdir(), 'vehicle-detail-motion-results.json'),
      JSON.stringify(results, null, 2),
    );
    await browser.close();
    await server.close();
  }
  console.log('PASS', results.length, 'motion checks');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
