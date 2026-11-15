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
  const { vehicleSpecifications, getSpecificationFields } =
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
        const checkFields = async (index) => {
          const expected = getSpecificationFields(model, index)
            .map((field) => field.id)
            .sort();
          const rendered = await technical
            .locator('[data-spec-field]')
            .evaluateAll((rows) =>
              rows.map((row) => row.dataset.specField).sort(),
            );
          assert.deepEqual(
            rendered,
            expected,
            'Every canonical field displayed once',
          );
          assert.equal(
            new Set(rendered).size,
            rendered.length,
            'No duplicated fields across image and tables',
          );
        };
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
            await checkFields(index);
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
        await checkFields(0);
        assert.equal(await technical.locator('details').count(), 0);
        const configurator = page.locator('[data-vehicle-viewer]');
        assert.equal(await page.locator('main h1').count(), 1);
        assert.ok(
          await configurator.evaluate((root) => {
            const title = root.querySelector('h1');
            const stage = root.querySelector('.viewer-stage');
            const swatches = root.querySelector('.swatches');
            const name = root.querySelector('[data-color-name]');
            const box = stage.getBoundingClientRect();
            const parent = root.getBoundingClientRect();
            return (
              root.parentElement ===
                document.querySelector('main').firstElementChild &&
              title.nextElementSibling === stage &&
              swatches.nextElementSibling === name &&
              Math.abs(box.x + box.width / 2 - parent.x - parent.width / 2) <
                1 &&
              !root.querySelector(
                '.exterior-source, .exterior-scope, .exterior-status',
              )
            );
          }),
        );
        assert.ok(
          await technical.locator('.vehicle-spec-group').evaluateAll((groups) =>
            groups.every((group) => {
              const heading = group.querySelector('h3');
              const icon = heading.querySelector('svg path');
              const table = group.querySelector('table');
              const style = getComputedStyle(group);
              return (
                Boolean(icon?.getAttribute('d')) &&
                Number.parseFloat(style.borderRadius) > 0 &&
                table.getBoundingClientRect().width > 0
              );
            }),
          ),
        );
        const rows = technical.locator('tr');
        for (const row of await rows.all()) assert.ok(await row.isVisible());
        assert.ok(
          await technical.evaluate((node) =>
            node.previousElementSibling.matches(
              '[data-vehicle-viewer], :has([data-vehicle-viewer])',
            ),
          ),
        );
        const features = page.locator('[data-vehicle-features]');
        await features.locator('[role=tab][aria-selected=true]').waitFor();
        assert.ok(
          await features.evaluate((node) =>
            node.previousElementSibling.matches('[data-vehicle-technical]'),
          ),
        );
        const tabs = features.getByRole('tab');
        for (let i = 0; i < (await tabs.count()); i++) {
          await tabs.nth(i).click();
          await page.waitForFunction(
            (i) =>
              document.querySelector('[data-vehicle-features]').dataset
                .selectedCategory === String(i),
            i,
          );
          const activePanel = features.locator(
            '[role=tabpanel][aria-hidden=false]',
          );
          assert.equal(await activePanel.count(), 1);
          assert.ok(
            await activePanel
              .locator('img')
              .evaluateAll(
                (images) =>
                  images.length > 0 &&
                  images.every(
                    (image) => image.complete && image.naturalWidth > 0,
                  ),
              ),
          );
        }
        await tabs.last().focus();
        await page.keyboard.press('Home');
        await page.waitForFunction(
          () =>
            document.querySelector('[data-vehicle-features]').dataset
              .selectedCategory === '0',
        );
        await tabs.evaluateAll((buttons) => {
          for (let i = 0; i < 9; i++) buttons[i % buttons.length].click();
          buttons[0].click();
        });
        await page.waitForFunction(
          () =>
            document.querySelector('[data-vehicle-features]').dataset
              .selectedCategory === '0',
        );
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
          await features.scrollIntoViewIfNeeded();
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
