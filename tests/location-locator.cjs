const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const { start } = require('./static-server.cjs');
const assert = require('node:assert/strict');
(async () => {
  const { locatorLocations: data } =
    await import('../data/locator-locations.js');
  const categories = [...new Set(data.map((x) => x.category))];
  const s = await start('/vinf'),
    b = await chromium.launch();
  try {
    for (const width of [1440, 768, 390]) {
      const c = await b.newContext({ viewport: { width, height: 1000 } }),
        p = await c.newPage();
      await p.route('https://tile.openstreetmap.org/**', (r) => r.abort());
      let errors = [];
      p.on('pageerror', (e) => errors.push(e.message));
      await p.goto(s.base + '/vinf/pages/locations.html');
      await p.waitForSelector('.leaflet-container', { state: 'attached' });
      const search = p.locator('[name=query]'),
        count = p.locator('[data-count]');
      await search.fill('pham van dong');
      await p.waitForTimeout(100);
      assert.ok((await count.textContent()).startsWith('1'));
      await search.fill('zzzzz');
      assert.ok((await count.textContent()).startsWith('0'));
      await p.locator('button[type=reset]').click();
      await p.waitForTimeout(100);
      assert.equal(
        await p.locator('.locator-results article').count(),
        data.length,
      );
      for (const province of [...new Set(data.map((x) => x.province))]) {
        await p.locator('[name=province]').selectOption(province);
        assert.equal(
          await p.locator('.locator-results article').count(),
          data.filter((x) => x.province === province).length,
        );
      }
      await p.locator('[name=province]').selectOption('Hà Nội');
      assert.ok(await p.locator('[name=ward]').isDisabled());
      await p.locator('[name=category]').nth(0).check();
      assert.equal(
        await p.locator('.locator-results article').count(),
        data.filter(
          (x) => x.province === 'Hà Nội' && x.category === categories[0],
        ).length,
      );
      await p.locator('[name=category]').nth(1).check();
      assert.equal(
        await p.locator('.locator-results article').count(),
        data.filter(
          (x) =>
            x.province === 'Hà Nội' &&
            categories.slice(0, 2).includes(x.category),
        ).length,
      );
      if (width > 767) {
        for (let i = 0; i < 6; i++)
          await p.locator('.leaflet-control-zoom-out').click();
        assert.ok(await p.locator('.marker-cluster').count());
        await p.locator('[data-map-reset]').click();
      }
      await p.locator('[data-focus]').first().click();
      await p.waitForSelector('.leaflet-popup');
      assert.ok(
        (
          await p.locator('.leaflet-popup-content a').getAttribute('href')
        ).includes('destination=21.0593263'),
      );
      assert.ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      if (width === 390) await p.locator('[data-view=list]').click();
      await c.grantPermissions(['geolocation']);
      await c.setGeolocation({ latitude: 21.0593, longitude: 105.7834 });
      await p.locator('[data-near]').click();
      await p.waitForFunction(() =>
        document
          .querySelector('[data-count]')
          .textContent.includes('đường chim bay'),
      );
      assert.ok(
        (
          await p.locator('.locator-results article').first().textContent()
        ).includes('Phạm Văn Đồng'),
      );
      await p.locator('button[type=reset]').click();
      await p.waitForTimeout(100);
      for (const [index, category] of categories.entries()) {
        await p.locator('[name=category]').nth(index).check();
        assert.equal(
          await p.locator('.locator-results article').count(),
          data.filter((x) => x.category === category).length,
        );
        await p.locator('[name=category]').nth(index).uncheck();
      }
      await search.fill('Xanh Mekong');
      assert.equal(await p.locator('[data-focus]').count(), 0);
      const dest = await p
        .locator('.locator-results .locator-actions a')
        .getAttribute('href');
      assert.ok(decodeURIComponent(dest).includes('Võ Nguyên Giáp'));
      assert.ok(
        !(await p.locator('.locator-results').textContent()).includes(
          'Infinity',
        ),
      );
      await search.fill('xanh mekong');
      assert.equal(await p.locator('.locator-results article').count(), 1);
      await p.locator('button[type=reset]').click();
      await p.waitForTimeout(100);
      await c.clearPermissions();
      await p.evaluate(() => {
        navigator.geolocation.getCurrentPosition = (ok, fail) =>
          fail({ code: 1 });
      });
      await p.locator('[data-near]').click();
      assert.ok(
        (await p.locator('[data-geo]').textContent()).includes('chưa cho phép'),
      );
      if (width === 390) await p.locator('[data-view=map]').click();
      await p.screenshot({
        path: require('path').join(
          require('os').tmpdir(),
          'locator-' + width + '.png',
        ),
      });
      assert.deepEqual(errors, []);
      console.log(
        'PASS locator filters/map/popup/directions/geolocation/overflow',
        width,
      );
      await c.close();
    }
  } finally {
    await b.close();
    await s.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
