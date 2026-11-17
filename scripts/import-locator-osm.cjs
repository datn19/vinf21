// Chạy ngoại tuyến với các tệp nguồn đã tải hợp lệ; không gọi API khi mở website.
// node scripts/import-locator-osm.cjs <thư mục chứa vinfast-*.json và geojson>
const fs = require('node:fs');
const path = require('node:path');
const input = process.argv[2];
if (!input) throw new Error('Cần thư mục dữ liệu nguồn');
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(input, name), 'utf8'));
const csv = read('vinfast-vietnam.json');
const nodes = read('vinfast-osm-nodes.json').elements;
const ways = read('vinfast-osm-ways.json').elements;
const boundaries = read('vinfast-provinces.geojson').features;
const merged = {
  'Hà Giang': 'Tuyên Quang',
  'Yên Bái': 'Lào Cai',
  'Bắc Kạn': 'Thái Nguyên',
  'Vĩnh Phúc': 'Phú Thọ',
  'Hòa Bình': 'Phú Thọ',
  'Bắc Giang': 'Bắc Ninh',
  'Thái Bình': 'Hưng Yên',
  'Hải Dương': 'Hải Phòng',
  'Hà Nam': 'Ninh Bình',
  'Nam Định': 'Ninh Bình',
  'Quảng Bình': 'Quảng Trị',
  'Quảng Nam': 'Đà Nẵng',
  'Kon Tum': 'Quảng Ngãi',
  'Bình Định': 'Gia Lai',
  'Ninh Thuận': 'Khánh Hòa',
  'Đắk Nông': 'Lâm Đồng',
  'Bình Thuận': 'Lâm Đồng',
  'Phú Yên': 'Đắk Lắk',
  'Ho Chi Minh': 'Hồ Chí Minh',
  'Bà Rịa–Vũng Tàu': 'Hồ Chí Minh',
  'Côn Đảo': 'Hồ Chí Minh',
  'Bình Dương': 'Hồ Chí Minh',
  'Bình Phước': 'Đồng Nai',
  'Long An': 'Tây Ninh',
  'Sóc Trăng': 'Cần Thơ',
  'Hậu Giang': 'Cần Thơ',
  'Bến Tre': 'Vĩnh Long',
  'Trà Vinh': 'Vĩnh Long',
  'Tiền Giang': 'Đồng Tháp',
  'Bạc Liêu': 'Cà Mau',
  'Kiên Giang': 'An Giang',
  'Thừa Thiên Huế': 'Huế',
  'Bac Ninh': 'Bắc Ninh',
};
const current = (name) => merged[name] || name;
// Ray casting chỉ gán khu vực tham khảo, không suy đoán địa chỉ hoặc lối vào.
function inside(x, y, ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i],
      [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      hit = !hit;
  }
  return hit;
}
function region(lat, lng) {
  const matches = boundaries.filter(({ geometry: g }) => {
    const polygons = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    return polygons.some(
      (rings) =>
        inside(lng, lat, rings[0]) &&
        !rings.slice(1).some((r) => inside(lng, lat, r)),
    );
  });
  return matches.length === 1
    ? current(matches[0].properties.shapeName.trim())
    : null;
}
const accepted = [],
  review = [],
  duplicates = [];
const bySource = new Map(csv.map((r) => [r.osm_url, r]));
for (const r of [...nodes, ...ways]) {
  const source = `https://www.openstreetmap.org/${r.type}/${r.id}`;
  const original = bySource.get(source);
  const t = r.tags || {};
  const id = `osm-${r.type}-${r.id}`;
  let reason =
    r.visible === false
      ? 'Đối tượng đã bị xóa khỏi OSM'
      : r.type !== 'node'
        ? 'Chỉ có tâm vùng từ bản xuất; cần kiểm tra hình học/lối vào'
        : t.access === 'private' || t.access === 'no'
          ? 'Không phải điểm phục vụ công cộng'
          : !/vinfast|v-green|vgreen/i.test(
                [t.brand, t.operator, t.name].join(' '),
              )
            ? 'Chưa xác nhận liên hệ VinFast trong bản ghi hiện tại'
            : t.amenity !== 'charging_station'
              ? 'Chưa xác nhận loại địa điểm'
              : null;
  if (reason) {
    review.push({
      id,
      source,
      reason,
      original,
      sourceUpdated: r.timestamp,
      tags: t,
    });
    continue;
  }
  const provinceTag = (t['addr:province'] || '').replace(/^Tỉnh\s+/i, '');
  const province = provinceTag ? current(provinceTag) : region(r.lat, r.lon);
  const address = [
    t['addr:place'],
    [t['addr:housenumber'], t['addr:street']].filter(Boolean).join(' '),
    t['addr:subdistrict'],
    t['addr:city'],
    t['addr:province'],
  ]
    .filter(Boolean)
    .join(', ');
  const category =
    t['charging_station:battery_swapping'] === 'yes'
      ? 'Trạm đổi pin'
      : t.moped === 'yes' && !t['socket:type2_combo']
        ? 'Trạm sạc xe máy điện'
        : t['socket:type2_combo'] || t.motorcar === 'yes'
          ? 'Trạm sạc ô tô'
          : 'Trạm sạc — chưa rõ loại xe';
  const item = {
    id,
    name: t.name || 'Trạm sạc VinFast',
    category,
    address: address || 'Nguồn chưa ghi địa chỉ đường',
    province: province || 'Chưa xác minh tỉnh/thành',
    ward: null,
    lat: r.lat,
    lng: r.lon,
    phone: t.phone || t['contact:phone'] || null,
    openingHours: t.opening_hours || null,
    source,
    sourceLabel: 'OpenStreetMap / BlokVolt',
    sourceUpdated: r.timestamp.slice(0, 10),
    verifiedDate: '2026-11-17',
    verificationStatus: 'VERIFIED AND IMPLEMENTED',
    verification: 'Đã đối chiếu bản ghi OSM; chưa kiểm tra hoạt động thực địa',
    coordinateAccuracy: 'Điểm OSM, chưa xác minh lối vào',
    provinceVerification: provinceTag
      ? 'Thẻ địa chỉ OSM'
      : 'Phân vùng tham khảo từ ranh giới geoBoundaries 2008 và quy đổi tên tỉnh năm 2025; cần rà soát gần ranh giới',
    access: t.access || 'unknown',
    license: 'ODbL-1.0',
    snapshotId: original?.pid || null,
    note: `${provinceTag ? '' : 'Tỉnh/thành là phân vùng tham khảo. '}Chưa xác nhận hoạt động hiện tại hoặc lối vào.${address ? '' : ' Thiếu địa chỉ đường.'}${!t.access ? ' Chưa rõ điều kiện tiếp cận.' : t.access === 'customers' ? ' Chỉ dành cho khách hàng.' : ''}`,
  };
  const duplicate = accepted.find(
    (x) =>
      x.id === id ||
      (x.name === item.name &&
        x.category === category &&
        Math.abs(x.lat - item.lat) < 0.000001 &&
        Math.abs(x.lng - item.lng) < 0.000001),
  );
  if (duplicate) {
    duplicates.push({
      id,
      kept: duplicate.id,
      reason: 'Cùng tên, loại và tọa độ (dưới 0,2 m)',
      source,
    });
    continue;
  }
  accepted.push(item);
}
fs.writeFileSync(
  'data/locator-national.js',
  '// Dữ liệu dẫn xuất ODbL 1.0. © OpenStreetMap contributors, BlokVolt. Xem LOCATOR_SOURCES.md.\nexport const nationalLocations = ' +
    JSON.stringify(accepted, null, 2) +
    ';\n',
);
fs.writeFileSync(
  'data/locator-review.json',
  JSON.stringify(
    {
      verifiedDate: '2026-11-17',
      status: 'NEEDS REVIEW',
      records: review,
      duplicatesRemoved: duplicates,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  JSON.stringify(
    {
      accepted: accepted.length,
      review: review.length,
      duplicates: duplicates.length,
      provinces: Object.fromEntries(
        Object.entries(Object.groupBy(accepted, (x) => x.province)).map(
          ([k, v]) => [k, v.length],
        ),
      ),
    },
    null,
    2,
  ),
);
