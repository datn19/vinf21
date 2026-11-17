// Dữ liệu dẫn xuất OpenStreetMap, ODbL 1.0; đối chiếu API công khai 16/11/2026.
import { nationalLocations } from './locator-national.js';
import { addressLocations } from './locator-addresses.js';
export const locationLicense = 'https://www.openstreetmap.org/copyright';
const existingLocations = [
  {
    id: 'osm-node-13157575597',
    name: 'Cửa hàng Xe máy điện VinFast Phạm Văn Đồng',
    category: 'Showroom xe máy điện',
    address: '459 Đường Phạm Văn Đồng, Hà Nội',
    province: 'Hà Nội',
    ward: null,
    lat: 21.0593263,
    lng: 105.783481,
    source: 'https://www.openstreetmap.org/node/13157575597',
    sourceUpdated: '2026-03-21',
    note: 'Địa chỉ đường và số nhà theo OSM; chưa xác minh phường hiện hành.',
  },
  {
    id: 'osm-node-13194807904',
    name: 'Cửa hàng Xe máy điện VinFast Thu Anh 1',
    category: 'Showroom xe máy điện',
    address: 'Phố Nguyễn Hoàng, Hà Nội',
    province: 'Hà Nội',
    ward: null,
    lat: 21.0322744,
    lng: 105.7731519,
    source: 'https://www.openstreetmap.org/node/13194807904',
    sourceUpdated: '2026-11-15',
    note: 'Nguồn chưa có số nhà hoặc phường hiện hành.',
  },
  {
    id: 'osm-way-1368995955',
    name: 'Trạm sạc Vinfast',
    category: 'Trạm sạc — chưa rõ loại xe',
    address: 'Hà Nội — nguồn chưa ghi địa chỉ đường',
    province: 'Hà Nội',
    ward: null,
    lat: 21.047951,
    lng: 105.9028298,
    source: 'https://www.openstreetmap.org/way/1368995955',
    sourceUpdated: '2025-03-19',
    note: 'Điểm bản đồ là nút 12679501526 trên ranh giới khu vực OSM, chưa xác minh lối vào, loại xe hoặc đầu sạc.',
  },
].map((location) => ({
  ...location,
  verifiedDate: '2026-11-16',
  license: 'ODbL-1.0',
  phone: null,
  openingHours: null,
  sourceLabel: 'OpenStreetMap',
  verificationStatus: 'VERIFIED AND IMPLEMENTED',
  verification: 'Đối chiếu bản ghi OSM; chưa xác nhận hoạt động thực địa',
}));
// Một địa điểm chỉ xuất hiện một lần nếu được nhập từ nhiều nguồn.
export const locatorLocations = [
  ...new Map(
    [...existingLocations, ...nationalLocations, ...addressLocations].map(
      (item) => [item.id, item],
    ),
  ).values(),
];
