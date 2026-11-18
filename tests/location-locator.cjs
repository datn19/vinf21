const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const { start } = require('./static-server.cjs');
const assert = require('node:assert/strict');
(async () => {
  const { locatorLocations: data } =
    await import('../data/locator-locations.js');
  const { searchText, directions, hasCoordinates } =
    await import('../js/locator-quality.js');
  const normalize = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase();
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
      assert.equal(
        await p.locator('.locator-results article').count(),
        data.filter((x) => normalize(searchText(x)).includes('pham van dong'))
          .length,
      );
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
      const wards = [
        ...new Set(
          data
            .filter((x) => x.province === 'Hà Nội')
            .map((x) => x.ward)
            .filter(Boolean),
        ),
      ];
      assert.equal(await p.locator('[name=ward]').isDisabled(), !wards.length);
      if (wards.length) {
        await p.locator('[name=ward]').selectOption(wards[0]);
        assert.equal(
          await p.locator('.locator-results article').count(),
          data.filter((x) => x.province === 'Hà Nội' && x.ward === wards[0])
            .length,
        );
        await p.locator('[name=ward]').selectOption('');
      }
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
      await p.waitForFunction(
        () => document.querySelectorAll('.leaflet-popup-content').length === 1,
      );
      assert.ok(
        (
          await p
            .locator('.leaflet-popup-content a[href*="google.com/maps/dir"]')
            .getAttribute('href')
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
      assert.equal(
        await p.locator('[data-focus]').count(),
        data.filter(
          (x) =>
            normalize(searchText(x)).includes('xanh mekong') &&
            hasCoordinates(x),
        ).length,
      );
      const dest = await p
        .locator('.locator-results .locator-actions a')
        .getAttribute('href');
      assert.ok(decodeURIComponent(dest).includes('Võ Nguyên Giáp'));
      assert.ok(
        !(await p.locator('.locator-results').textContent()).includes(
          'Infinity',
        ),
      );
      for (const province of ['Hồ Chí Minh', 'Hà Nội', 'Huế', 'Đà Nẵng']) {
        const sample = data.find(
          (x) =>
            x.province === province &&
            x.addressConfidence === 'APPROXIMATE_GEOCODED',
        );
        if (!sample) continue;
        await search.fill(sample.nearbyRoad.name);
        assert.ok(await p.locator('[data-id="' + sample.id + '"]').count());
        const card = p.locator('[data-id="' + sample.id + '"]');
        assert.ok(
          (await card.textContent()).includes(
            'Địa chỉ gần vị trí ghim (tham khảo)',
          ),
        );
        await card.locator('[data-focus]').click();
        await p.waitForSelector('.leaflet-popup');
        await p.waitForFunction(
          () =>
            document.querySelectorAll('.leaflet-popup-content').length === 1,
        );
        assert.ok(
          (await p.locator('.leaflet-popup-content').textContent()).includes(
            sample.nearbyRoad.name,
          ),
        );
        assert.equal(
          await p
            .locator('.leaflet-popup-content a[href*="google.com/maps/dir"]')
            .getAttribute('href'),
          directions(sample),
        );
        if (width === 390) await p.locator('[data-view=list]').click();
        if (sample.ward) {
          await search.fill(sample.ward);
          assert.ok(await p.locator('[data-id="' + sample.id + '"]').count());
        }
      }
      await search.fill('Thạnh Lộc 19');
      const areaCard = p.locator('[data-id="osm-way-1429694652"]');
      assert.ok(
        (await areaCard.textContent()).includes(
          'Điểm đại diện khuôn viên (tham khảo)',
        ),
      );
      await areaCard.locator('[data-focus]').click();
      await p.waitForSelector('.leaflet-popup');
      await p.waitForFunction(
        () => document.querySelectorAll('.leaflet-popup-content').length === 1,
      );
      await p.locator('.leaflet-container').scrollIntoViewIfNeeded();
      await p.waitForTimeout(500);
      assert.ok(
        (await p.locator('.leaflet-popup-content').textContent()).includes(
          'Điểm đại diện khuôn viên (tham khảo)',
        ),
      );
      await p.screenshot({
        path: require('path').join(
          require('os').tmpdir(),
          'locator-area-' + width + '.png',
        ),
      });
      if (width === 390) await p.locator('[data-view=list]').click();
      await search.fill('phan van tri');
      assert.ok(await p.locator('[data-id="ocm-267276"]').count());
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
