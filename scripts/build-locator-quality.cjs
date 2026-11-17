// Chỉ xử lý bản trích xuất được cấp phép trên máy, không gọi dịch vụ geocoding.
const fs = require('node:fs');
const path = require('node:path');
const input = process.argv[2];
const baseline = JSON.parse(
  fs.readFileSync(path.join(input, 'vinfast-baseline.json'), 'utf8'),
);
const geo = JSON.parse(
  fs.readFileSync(path.join(input, 'vinfast-geodata.json'), 'utf8'),
);
const date = '2026-11-17';
const {
  supplementalAddressLocations,
} = require('../data/locator-addresses.js');
const osmURL = (id) =>
  'https://www.openstreetmap.org/' + id.replace('osm-', '').replace('-', '/');
const cleanProvince = (name) =>
  (name || '').replace(/^(Tỉnh|Thành phố)\s+/i, '').trim();
const provinces = new Set(
  baseline
    .map((x) => x.province)
    .filter((x) => x !== 'Chưa xác minh tỉnh/thành'),
);
const originalById = new Map(baseline.map((x) => [x.id, x]));
const osmById = new Map(geo.locations.map((x) => [x.id, x]));
const fullPublishedAddresses = new Set([
  'official-camau-thuduy',
  'official-camau-vincom',
  'official-camau-songphuoc',
  'vin3s-laocai',
  'vinfast-tanvietphat',
  'vin3s-sonla',
  'mekong-cantho',
  'kimson-longbinh',
  'danang-vincom',
  'haiphong-bachdang',
  'thanhhoa-xuanthanhphat',
  'nghean-vinh',
  'directory-sonla',
  'directory-khanhhoa',
  'warranty-camau',
  'warranty-vinhlong',
]);
// Thành phần đọc từ chính địa chỉ công bố; không suy ra số nhà từ tọa độ.
const publishedRoads = {
  'official-laichau': 'Đường 30/4',
  'official-camau-thuduy': 'Lý Thường Kiệt',
  'official-camau-vincom': 'Lê Duẩn',
  'official-camau-songphuoc': 'Lý Thường Kiệt',
  'vin3s-laocai': 'Hoàng Liên',
  'vin3s-yenbai': 'Điện Biên',
  'vinfast-tanvietphat': 'Điện Biên',
  'vin3s-hoabinh': 'Cù Chính Lan',
  'vin3s-sonla': 'Chu Văn Thịnh',
  'mekong-cantho': 'Võ Nguyên Giáp',
  'kimson-longbinh': 'Quốc Lộ 1',
  'danang-vincom': 'Ngô Quyền',
  'haiphong-bachdang': 'Bạch Đằng',
  'thanhhoa-xuanthanhphat': 'Đại lộ Hùng Vương',
  'nghean-vinh': 'Đường 72m',
  'directory-sonla': 'Trường Chinh',
  'directory-khanhhoa': 'Thái Nguyên',
  'warranty-caobang': 'Pác Bó',
  'warranty-camau': 'Nguyễn Tất Thành',
  'warranty-thainguyen': 'Cách Mạng Tháng 8',
  'warranty-vinhlong': 'Phạm Thái Bường',
};
const quality = {},
  additional = [],
  review = [],
  duplicates = [];
const khanhHoaWardRelations = new Set([17609703, 16205487, 16205486]);
const khanhHoaSource =
  'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-1667-nq-ubtvqh15-sap-xep-cac-dvhc-cap-xa-cua-tinh-khanh-hoa-nam-2025-119250616200424907.htm';
function categoryFromTags(t) {
  const evidence = [];
  const vehicles = [];
  const positive = (key) => /^(yes|designated|[1-9]\d*)$/.test(t[key] || '');
  if (t['charging_station:battery_swapping'] === 'yes') {
    vehicles.push('BATTERY_SWAP');
    evidence.push('charging_station:battery_swapping=yes');
  }
  if (
    t.motorcar !== 'no' &&
    (positive('motorcar') ||
      positive('socket:type2_combo') ||
      positive('socket:chademo') ||
      /ô tô/i.test(t.name || ''))
  ) {
    vehicles.push('CAR');
    for (const key of [
      'motorcar',
      'socket:type2_combo',
      'socket:chademo',
      'name',
    ])
      if (t[key]) evidence.push(`${key}=${t[key]}`);
  }
  if (
    positive('moped') ||
    positive('scooter') ||
    /xe máy/i.test(t.name || '')
  ) {
    vehicles.push('SCOOTER');
    for (const key of ['moped', 'scooter', 'name'])
      if (t[key]) evidence.push(`${key}=${t[key]}`);
  }
  let category = 'Trạm sạc — chưa rõ loại xe';
  if (vehicles.includes('BATTERY_SWAP')) category = 'Trạm đổi pin';
  else if (vehicles.includes('CAR') && vehicles.includes('SCOOTER'))
    category = 'Trạm sạc ô tô & xe máy điện';
  else if (vehicles.includes('CAR')) category = 'Trạm sạc ô tô';
  else if (vehicles.includes('SCOOTER')) category = 'Trạm sạc xe máy điện';
  return {
    category,
    supportedVehicles: vehicles.length ? vehicles : ['UNKNOWN'],
    evidence,
  };
}
function eligible(t) {
  if (
    ['private', 'no'].includes(t.access) ||
    t.disused === 'yes' ||
    t.abandoned === 'yes'
  )
    return false;
  return (
    t.amenity === 'charging_station' ||
    ['car', 'motorcycle', 'car_repair'].includes(t.shop)
  );
}
function makeQuality(item, osm) {
  const context = geo.context[item.id] || {};
  const tags = osm?.tags || {};
  const areas = context.administrativeAreas || [];
  const provinceAreas = areas.filter(
    (x) => x.level === '4' && provinces.has(cleanProvince(x.name)),
  );
  const province =
    provinceAreas.length === 1
      ? cleanProvince(provinceAreas[0].name)
      : areas.some(
            (x) => x.type === 'relation' && khanhHoaWardRelations.has(x.id),
          )
        ? 'Khánh Hòa'
        : item.province;
  const wards = areas.filter((x) =>
    /^(Phường|Xã|Đặc khu)\s/i.test(x.name || ''),
  );
  const ward = wards.length === 1 ? wards[0].name : null;
  const reportedAddress = item.id.startsWith('osm-')
    ? [
        tags['addr:place'],
        [tags['addr:housenumber'], tags['addr:street']]
          .filter(Boolean)
          .join(' '),
        tags['addr:subdistrict'],
        tags['addr:city'],
        tags['addr:province'],
      ]
        .filter(Boolean)
        .join(', ') ||
      (!/chưa ghi địa chỉ/.test(item.address) ? item.address : null)
    : item.address;
  const road = context.nearbyRoad;
  const fullOfficial = fullPublishedAddresses.has(item.id);
  const osmStreet =
    Boolean(tags['addr:street']) ||
    ['osm-node-13157575597', 'osm-node-13194807904'].includes(item.id);
  const approximateAddress = road
    ? [road.name, ward, province].filter(Boolean).join(', ')
    : null;
  const confidence = fullOfficial
    ? 'VERIFIED_OFFICIAL'
    : osmStreet
      ? 'UNVERIFIED'
      : road
        ? 'APPROXIMATE_GEOCODED'
        : Number.isFinite(item.lat)
          ? 'COORDINATES_ONLY'
          : 'UNVERIFIED';
  const issues = [];
  if (
    province !== item.province &&
    item.province !== 'Chưa xác minh tỉnh/thành'
  )
    issues.push({
      field: 'province',
      previous: item.province,
      current: province,
      reason: 'OSM admin_level=4 polygon; không phải xác nhận của hãng',
    });
  if (tags.motorcar === 'no' && Number(tags['socket:type2_combo']) > 0)
    issues.push({
      field: 'category',
      reason: 'motorcar=no nhưng có socket:type2_combo',
    });
  let coordinateStatus = Number.isFinite(item.lat) ? 'SOURCE_POINT' : 'MISSING';
  if (osm && Number.isFinite(osm.lat) && Number.isFinite(item.lat)) {
    const delta = Math.hypot(
      (osm.lat - item.lat) * 111320,
      (osm.lng - item.lng) * 111320 * Math.cos((item.lat * Math.PI) / 180),
    );
    if (delta > 25) {
      coordinateStatus = 'CONFLICT';
      issues.push({
        field: 'coordinates',
        distanceMetres: Math.round(delta),
        reason: 'Nguồn mới lệch hơn 25m; không tự di chuyển pin',
      });
    }
  }
  if (item.id.startsWith('osm-way')) coordinateStatus = 'BOUNDARY_POINT';
  if (item.id.startsWith('osm-') && !osm)
    issues.push({
      field: 'identity',
      reason:
        'Không thấy ID trong bản trích xuất; giữ nguyên dữ liệu gốc để rà soát',
    });
  const classified =
    tags.amenity === 'charging_station' ? categoryFromTags(tags) : null;
  return {
    province,
    ward,
    wardConfidence: ward ? 'APPROXIMATE_GEOCODED' : null,
    addressConfidence: confidence,
    verifiedAddress: fullOfficial ? item.address : null,
    reportedAddress,
    approximateAddress:
      confidence === 'APPROXIMATE_GEOCODED' ? approximateAddress : null,
    directionsAddress: !item.id.startsWith('osm-') ? item.address : null,
    directionsAddressStatus: !item.id.startsWith('osm-')
      ? 'SOURCE_CONFIRMED'
      : null,
    addressComponents: {
      road:
        publishedRoads[item.id] ||
        (osmStreet ? tags['addr:street'] || null : road?.name || null),
      houseNumber: osmStreet ? tags['addr:housenumber'] || null : null,
      ward,
      province,
    },
    addressSource:
      fullOfficial || !item.id.startsWith('osm-')
        ? item.source
        : osmStreet
          ? osmURL(item.id)
          : road
            ? `https://www.openstreetmap.org/way/${road.id}`
            : null,
    addressVerifiedDate: date,
    addressSourceDate: item.sourceUpdated || null,
    addressMethod: fullOfficial
      ? 'PUBLISHED_ADDRESS'
      : osmStreet
        ? 'OSM_ADDRESS_TAGS'
        : road
          ? 'OFFLINE_NEAREST_NAMED_ROAD_150M'
          : 'NO_STREET_MATCH',
    nearbyRoad: road || null,
    administrativeEvidence: areas,
    provinceParentSource: areas.some(
      (x) => x.type === 'relation' && khanhHoaWardRelations.has(x.id),
    )
      ? khanhHoaSource
      : null,
    operationalStatus: 'UNKNOWN',
    operationalStatusSource: null,
    operationalStatusVerifiedDate: null,
    identityStatus: osm
      ? 'OSM_ID_MATCH'
      : item.id.startsWith('osm-')
        ? 'NEEDS_REVIEW'
        : 'PUBLISHED_SOURCE_MATCH',
    officialName: !item.id.startsWith('osm-') ? item.name : null,
    coordinateStatus,
    coordinateSource: Number.isFinite(item.lat) ? item.source : null,
    coordinateEvidence: osm
      ? {
          lat: osm.lat,
          lng: osm.lng,
          source: osmURL(osm.id),
          sourceUpdated: osm.sourceUpdated,
        }
      : null,
    category: classified?.category || item.category,
    supportedVehicles:
      classified?.supportedVehicles ||
      (item.category === 'Trạm sạc ô tô' ? ['CAR'] : []),
    categoryEvidence: {
      source: item.source,
      verifiedDate: date,
      basis: classified?.evidence || [
        'Loại địa điểm theo nguồn công bố; không suy ra đầu sạc',
      ],
    },
    originalOsmTags: tags,
    sourceSnapshot: osm ? geo.snapshot : null,
    verificationIssues: issues,
    officialMatchStatus: item.id.startsWith('osm-')
      ? 'NO_UNAMBIGUOUS_OFFICIAL_MATCH'
      : 'SOURCE_REVIEWED',
  };
}
for (const item of baseline)
  quality[item.id] = makeQuality(item, osmById.get(item.id));
for (const item of supplementalAddressLocations) {
  additional.push(item);
  quality[item.id] = makeQuality(item, null);
}
// Hai nguồn cùng số nhà/đường nhưng khác phường: giữ nguyên và nêu xung đột.
quality['haiphong-bachdang'].verificationIssues.push({
  field: 'historicalWard',
  previous: 'Hạ Lý (bài khai trương 2021)',
  current: 'Thượng Lý (danh mục VCC)',
  reason: 'Chưa có căn cứ xác định địa chỉ phường hiện hành',
  source: baseline.find((x) => x.id === 'directory-sonla').source,
});
quality['haiphong-bachdang'].addressConfidence = 'UNVERIFIED';
quality['haiphong-bachdang'].verifiedAddress = null;
// Cùng showroom Cao Lãnh trong hai tài liệu; bổ sung đường từ danh mục công bố.
Object.assign(quality['drive-dongthap'], {
  addressConfidence: 'VERIFIED_OFFICIAL',
  verifiedAddress:
    'Tầng 1, TTTM và Shophouse Cao Lãnh, số 2 đường 30/4, phường 1, Cao Lãnh, Đồng Tháp',
  addressSource: baseline.find((x) => x.id === 'directory-sonla').source,
  addressMethod: 'PUBLISHED_ADDRESS',
  addressComponents: {
    road: 'Đường 30/4',
    houseNumber: '2',
    ward: null,
    province: 'Đồng Tháp',
  },
});
for (const osm of geo.locations) {
  if (originalById.has(osm.id)) continue;
  const t = osm.tags;
  if (!eligible(t) || !Number.isFinite(osm.lat)) {
    review.push({
      id: osm.id,
      source: osmURL(osm.id),
      reason: !eligible(t)
        ? 'Loại địa điểm hoặc quyền tiếp cận chưa phù hợp'
        : 'Đối tượng vùng: chưa xác minh điểm đặt marker',
      tags: t,
    });
    continue;
  }
  const category =
    t.amenity === 'charging_station'
      ? categoryFromTags(t).category
      : t.shop === 'car'
        ? 'Showroom ô tô'
        : t.shop === 'motorcycle'
          ? 'Showroom xe máy điện'
          : 'Xưởng dịch vụ';
  const item = {
    id: osm.id,
    name: t.name || 'Địa điểm VinFast',
    category,
    address:
      [
        t['addr:housenumber'],
        t['addr:street'],
        t['addr:city'],
        t['addr:province'],
      ]
        .filter(Boolean)
        .join(', ') || 'Nguồn chưa ghi địa chỉ đường',
    province: 'Chưa xác minh tỉnh/thành',
    ward: null,
    lat: osm.lat,
    lng: osm.lng,
    phone: t.phone || t['contact:phone'] || null,
    openingHours: t.opening_hours || null,
    source: osmURL(osm.id),
    sourceLabel: 'OpenStreetMap / Geofabrik',
    sourceUpdated: osm.sourceUpdated.slice(0, 10),
    verifiedDate: date,
    license: 'ODbL-1.0',
    verificationStatus: 'SOURCE_MATCHED',
    note: `Chưa xác nhận hoạt động hoặc lối vào.${!t.access ? ' Chưa rõ điều kiện tiếp cận.' : t.access === 'customers' ? ' Chỉ dành cho khách hàng.' : ''}`,
  };
  const duplicate = [...baseline, ...additional].find(
    (x) =>
      x.name === item.name &&
      x.category === item.category &&
      Number.isFinite(x.lat) &&
      Math.hypot(x.lat - item.lat, x.lng - item.lng) < 0.000001,
  );
  if (duplicate) {
    duplicates.push({
      id: item.id,
      kept: duplicate.id,
      reason: 'Cùng tên, loại và tọa độ dưới 0,2m',
      source: item.source,
    });
    continue;
  }
  additional.push(item);
  quality[item.id] = makeQuality(item, osm);
}
// Khoảng cách gần không đủ chứng minh trùng: lưu cặp để rà soát, không tự xóa.
const nearbyPairs = [];
const combined = [...baseline, ...additional];
for (let i = 0; i < combined.length; i++) {
  for (let j = 0; j < i; j++) {
    const a = combined[i],
      b = combined[j];
    if (
      !Number.isFinite(a.lat) ||
      !Number.isFinite(b.lat) ||
      quality[a.id].category !== quality[b.id].category
    )
      continue;
    const distance = Math.hypot(
      (a.lat - b.lat) * 111320,
      (a.lng - b.lng) * 111320 * Math.cos((a.lat * Math.PI) / 180),
    );
    if (distance < 30)
      nearbyPairs.push({
        ids: [a.id, b.id],
        distanceMetres: Math.round(distance),
        reason: 'Gần nhau, cùng loại; chưa đủ bằng chứng trùng danh tính',
      });
  }
}
fs.writeFileSync(
  'data/locator-quality-data.js',
  '// ODbL 1.0 for OSM-derived fields. © OpenStreetMap contributors. See LOCATOR_SOURCES.md.\nexport const locationQuality = ' +
    JSON.stringify(quality, null, 2) +
    ';\nexport const additionalLocations = ' +
    JSON.stringify(additional, null, 2) +
    ';\n',
);
fs.writeFileSync(
  'data/locator-quality-review.json',
  JSON.stringify(
    {
      date,
      extractSource: geo.extractSource,
      snapshot: geo.snapshot,
      duplicatesRemoved: duplicates,
      possibleDuplicates: nearbyPairs,
      records: review,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  JSON.stringify(
    {
      baseline: baseline.length,
      added: additional.length,
      review: review.length,
      duplicates: duplicates.length,
      confidence: Object.fromEntries(
        Object.entries(
          Object.groupBy(Object.values(quality), (x) => x.addressConfidence),
        ).map(([k, v]) => [k, v.length]),
      ),
    },
    null,
    2,
  ),
);
