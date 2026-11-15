const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const { start } = require('./static-server.cjs');

(async () => {
  const { vehicleViewers } = await import('../data/vehicle-viewers.js');
  const { vehicleSpecifications } =
    await import('../data/vehicle-specifications.js');
  const server = await start('/vinf21');
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const width of [1440, 768, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: 'reduce',
      });
      let errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const vehicle of vehicleViewers) {
        errors = [];
        const model = vehicleSpecifications.find(
          (item) => item.id === vehicle.id,
        );
        await page.goto(`${server.base}/vinf21/${vehicle.route}`);
        await page.waitForFunction(
          () =>
            document.querySelector('[data-vehicle-summary]')?.dataset
              .selectedVariant === '0',
        );
        const summary = page.locator('[data-vehicle-summary]');
        const technical = page.locator('[data-vehicle-technical]');
        assert.equal(await summary.count(), 1);
        assert.equal(await technical.count(), 1);
        if (model.variants.length > 1) {
          const buttons = summary.locator('[data-spec-variant]');
          for (let index = 0; index < model.variants.length; index++) {
            await buttons.nth(index).click();
            await page.waitForFunction(
              (index) =>
                document.querySelector('[data-vehicle-summary]').dataset
                  .selectedVariant === String(index),
              index,
            );
            assert.ok(
              (await summary.textContent()).includes(
                model.variants[index].name,
              ),
            );
            for (const [, value] of model.variants[index].rows)
              assert.ok((await technical.textContent()).includes(value));
          }
          await buttons.evaluateAll((buttons) => {
            for (let i = 0; i < 12; i++) buttons[i % buttons.length].click();
            buttons[0].click();
          });
          await page.waitForFunction(
            () =>
              document.querySelector('[data-vehicle-summary]').dataset
                .selectedVariant === '0',
          );
        }
        assert.ok(await technical.locator('details').count());
        const details = technical.locator('details').last();
        await details.locator('summary').click();
        assert.equal(await details.evaluate((node) => node.open), true);
        assert.equal(await page.locator('[data-vehicle-viewer]').count(), 1);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 1,
          ),
          false,
        );
        assert.deepEqual(errors, []);
        const image = summary.locator('img');
        assert.ok(await image.evaluate((image) => image.naturalWidth > 0));
        results.push({ id: vehicle.id, width, status: 'PASS' });
        if (['vf6', 'kinet', 'vf8', 'fadil'].includes(vehicle.id)) {
          await technical.scrollIntoViewIfNeeded();
          await page.screenshot({
            path: path.join(
              os.tmpdir(),
              `spec-final-${vehicle.id}-${width}.png`,
            ),
          });
        }
        console.log('PASS', vehicle.id, width);
      }
      await page.close();
    }
  } finally {
    fs.writeFileSync(
      path.join(os.tmpdir(), 'vinf-spec-results.json'),
      JSON.stringify(results, null, 2),
    );
    await browser.close();
    await server.close();
  }
  console.log(`PASS ${results.length} specification/viewport checks`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
