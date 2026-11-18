const assert = require('node:assert/strict');
(async () => {
  const {
    locatorLocations: data,
    originalLocatorLocations: original,
    locatorReferenceLocations: baseline,
    locatorCoverageBaseline: coverageBaseline,
  } = await import('../data/locator-locations.js');
  const { coverageSources, coverageLocations, coverageUpdates } =
    await import('../data/locator-coverage.js');
  const { mappedCoverageLocations, openChargeMapLocations } =
    await import('../data/locator-mapped-coverage.js');
  const { addressText, hasCoordinates, directions, searchText } =
    await import('../js/locator-quality.js');
  assert.equal(original.length, 291, 'Preserve all original records');
  assert.equal(coverageBaseline.length, 583);
  for (const previous of coverageBaseline) {
    assert.deepEqual(
      data.find((x) => x.id === previous.id),
      previous,
    );
  }
  for (const item of mappedCoverageLocations) {
    assert.equal(item.coordinateStatus, 'AREA_REPRESENTATIVE');
    assert.equal(item.license, 'ODbL-1.0');
    assert.ok(item.coordinateEvidence.geometry.length >= 4);
    assert.ok(
      item.administrativeEvidence.some((x) => x.level === '4') ||
        item.provinceParentSource,
    );
  }
  for (const item of openChargeMapLocations) {
    assert.equal(item.originalSourceRecord.DataProviderID, 1);
    assert.equal(item.license, 'CC-BY-4.0');
    assert.equal(item.lat, item.originalSourceRecord.AddressInfo.Latitude);
    assert.equal(item.lng, item.originalSourceRecord.AddressInfo.Longitude);
  }
  assert.equal(baseline.length, 495, 'Audit the actual 495-record baseline');
  assert.equal(new Set(coverageSources.map((x) => x.province)).size, 34);
  assert.equal(
    data.length,
    baseline.length +
      coverageLocations.length +
      mappedCoverageLocations.length +
      openChargeMapLocations.length,
  );
  for (const previous of baseline) {
    const current = data.find((x) => x.id === previous.id);
    assert.ok(current, previous.id);
    assert.equal(current.lat, previous.lat);
    assert.equal(current.lng, previous.lng);
    assert.equal(current.source, previous.source);
    if (!coverageUpdates[previous.id]) assert.deepEqual(current, previous);
  }
  for (const item of coverageLocations) {
    assert.equal(item.lat, null, 'No invented pins for address-only records');
    assert.equal(item.lng, null);
    assert.ok(
      item.addressComponents.road && item.categoryEvidence.basis.length,
    );
    assert.equal(
      new URL(directions(item)).searchParams.get('destination'),
      item.verifiedAddress,
    );
  }
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
