const assert = require('node:assert/strict');
(async () => {
  const {
    vehicleSpecifications: models,
    getSpecificationFields: fields,
    specificationField: field,
  } = await import('../data/vehicle-specifications.js');
  for (const label of [
    'Công suất tối đa',
    'Công suất cực đại',
    'Maximum power',
  ])
    assert.equal(field(label, '100 kW').id, 'power_peak');
  assert.notEqual(
    field('Công suất danh định', '100 W').id,
    field('Công suất tối đa', '200 W').id,
  );
  assert.notEqual(
    field('Pin khả dụng', '60 kWh').id,
    field('Tổng dung lượng pin', '65 kWh').id,
  );
  assert.notEqual(
    field('Quãng đường NEDC', '400 km').id,
    field('Quãng đường WLTP', '400 km').id,
  );
  assert.notEqual(
    field('Quãng đường với 1 pin', '80 km').id,
    field('Quãng đường với 2 pin', '150 km').id,
  );
  assert.equal(field('Cổng sạc', 'USB').id, 'usb');
  assert.equal(field('Sạc DC', '80 kW').id, 'charge_dc');
  assert.equal(
    field('Phanh trước / sau', 'Đĩa / cơ').id,
    field('Phanh', 'đĩa trước/cơ sau').id,
  );
  assert.equal(
    field('Giảm xóc', 'Thủy lực').id,
    field('Treo trước / sau', 'Ống lồng / đôi').id,
  );
  assert.notEqual(
    field('Cốp khi lắp 2 pin', '12 L').id,
    field('Cốp', '20 L').id,
  );
  let variants = 0;
  assert.notEqual(
    field('Kích thước khoang hàng', '').id,
    field('Dài × rộng × cao', '').id,
  );
  assert.notEqual(
    field('Bán kính quay vòng', '').id,
    field('Đường kính quay đầu', '').id,
  );
  assert.equal(
    field('Trọng lượng không tải', '').id,
    field('Khối lượng không tải', '').id,
  );
  assert.notEqual(
    field('Khối lượng không tải', '').id,
    field('Khối lượng toàn bộ', '').id,
  );
  for (const model of models)
    for (let i = 0; i < model.variants.length; i++) {
      const data = fields(model, i);
      assert.ok(data.length > 0);
      assert.equal(data.length, new Set(data.map((x) => x.id)).size);
      for (const x of data) {
        assert.ok(x.value);
        assert.match(x.source, /^https:\/\//);
        assert.ok(x.group);
        assert.equal(x.variant, model.variants[i].id);
      }
      variants++;
    }
  for (const id of ['lux-a', 'lux-sa']) {
    const model = models.find((x) => x.id === id);
    assert.equal(model.variants.length, 2);
    assert.notEqual(
      fields(model, 0).find((x) => x.id === 'tieu_thu_nhien_lieu_ket_hop')
        .value,
      fields(model, 1).find((x) => x.id === 'tieu_thu_nhien_lieu_ket_hop')
        .value,
    );
  }
  console.log(
    `PASS ${models.length} models / ${variants} configurations; aliases, units, distinct measurements and provenance`,
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
