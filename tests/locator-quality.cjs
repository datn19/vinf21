const assert = require('node:assert/strict');
(async () => {
  const { locatorLocations: data, originalLocatorLocations: original } =
    await import('../data/locator-locations.js');
  const { addressText, hasCoordinates, directions, searchText } =
    await import('../js/locator-quality.js');
  assert.equal(original.length, 291, 'Preserve all original records');
  assert.equal(
    new Set(data.map((x) => x.id)).size,
    data.length,
    'Unique location IDs',
  );
  for (const previous of original) {
    const current = data.find((x) => x.id === previous.id);
    assert.ok(current, previous.id);
    assert.equal(current.originalAddress, previous.address);
    assert.equal(current.source, previous.source);
    assert.equal(
      current.lat,
      previous.lat,
      'Do not silently relocate existing pins',
    );
    assert.equal(current.lng, previous.lng);
  }
  for (const x of data) {
    assert.ok(
      [
        'VERIFIED_OFFICIAL',
        'APPROXIMATE_GEOCODED',
        'COORDINATES_ONLY',
        'UNVERIFIED',
      ].includes(x.addressConfidence),
      x.id,
    );
    assert.equal(x.operationalStatus, 'UNKNOWN');
    assert.ok(Array.isArray(x.verificationIssues));
    if (x.addressConfidence === 'VERIFIED_OFFICIAL') {
      assert.ok(x.verifiedAddress && x.addressSource && x.addressVerifiedDate);
      assert.ok(!x.addressSource.includes('openstreetmap.org'));
    }
    if (x.addressConfidence === 'APPROXIMATE_GEOCODED') {
      assert.ok(x.nearbyRoad.distanceMetres <= 150);
      assert.equal(
        x.addressComponents.houseNumber,
        null,
        'Never copy a nearby house number',
      );
      assert.ok(
        addressText(x).startsWith('Địa chỉ gần vị trí ghim (tham khảo):'),
      );
      assert.ok(searchText(x).includes(x.nearbyRoad.name));
    }
    if (x.addressConfidence === 'COORDINATES_ONLY')
      assert.equal(addressText(x), 'Chưa có địa chỉ đường được xác minh.');
    if (hasCoordinates(x)) {
      assert.ok(
        x.lat >= 8 && x.lat <= 24 && x.lng >= 102 && x.lng <= 110,
        x.id,
      );
      const url = new URL(directions(x));
      assert.equal(url.hostname, 'www.google.com');
      assert.equal(url.searchParams.get('destination'), `${x.lat},${x.lng}`);
    }
    if (
      x.originalOsmTags.amenity === 'charging_station' &&
      !x.supportedVehicles.includes('UNKNOWN')
    )
      assert.ok(x.categoryEvidence.basis.length, x.id);
    if (
      x.province !== x.originalProvince &&
      x.originalProvince &&
      x.originalProvince !== 'Chưa xác minh tỉnh/thành'
    )
      assert.ok(x.verificationIssues.some((i) => i.field === 'province'));
  }
  assert.equal(directions({ lat: null, lng: null }), null);
  assert.equal(hasCoordinates({ lat: 100, lng: 106 }), false);
  assert.equal(
    hasCoordinates({ lat: 10, lng: 106, coordinateStatus: 'CONFLICT' }),
    false,
  );
  console.log(
    `PASS integrity and provenance: ${data.length} records; ${original.length} originals retained`,
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
