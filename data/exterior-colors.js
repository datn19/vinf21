// Bảng màu chính thức độc lập với ảnh có sẵn; hex chỉ là mẫu màu trên màn hình.
// Chỉ module trang chi tiết nạp dữ liệu này, không thay đổi dữ liệu sản phẩm.
import { vehicleViewers } from './vehicle-viewers.js';
export const colorAuditDate = '2026-11-15';
const official = 'https://vinfastauto.com/vn_vi/';
export const exteriorColors = {
  vf8: {
    status: 'complete',
    scope:
      'VF 8 Eco/Plus · brochure 03/02/2026; không áp dụng cho VF 8 thế hệ mới.',
    sources: [
      official + 'dat-coc-xe-vf8',
      'https://storage.googleapis.com/vinfast-data-01/brochure/VF8_Brochure_03022026.pdf',
      'https://shop.vinfastauto.com/vn_vi/dat-coc-o-to-dien-vinfast.html?modelId=Products-Car-VF8',
    ],
    reference: 'assets/colors/vf8/base.webp',
    limitation:
      'Bốn phối màu hai tông là tùy chọn nâng cao. Mô phỏng chỉ đổi sơn, giữ trang bị của ảnh tham chiếu; không mô phỏng gói nẹp/mâm khác.',
    colors: [
      {
        name: 'Infinity Blanc',
        hex: '#eeeeec',
        image: 'assets/colors/vf8/base.webp',
      },
      { name: 'Jet Black', hex: '#282b2c', mask: 'vf8' },
      { name: 'Crimson Red', hex: '#a51824', mask: 'vf8' },
      { name: 'Ivy Green', hex: '#405349', mask: 'vf8' },
      {
        name: 'Crimson Velvet – Mystery Bronze Roof',
        hex: '#632837',
        roof: '#a58c68',
        mask: 'vf8',
      },
      {
        name: 'Zenith Grey – Desat Silver Roof',
        hex: '#767d80',
        roof: '#bec1c2',
        mask: 'vf8',
      },
      {
        name: 'Infinity Blanc – Zenith Grey Roof',
        hex: '#eeeeec',
        roof: '#767d80',
        mask: 'vf8',
      },
      {
        name: 'Jet Black – Mystery Bronze Roof',
        hex: '#282b2c',
        roof: '#a58c68',
        mask: 'vf8',
      },
    ],
  },
};

// Tên màu theo trang chính thức của đúng phiên bản, không suy từ số ảnh.
const scooterPalettes = {
  'vero-x': ['Xanh Oliu', 'Trắng Ngọc Trai', 'Xanh Rêu', 'Đen nhám'],
  kyo: ['Đỏ', 'Xanh Oliu', 'Trắng Ngọc Trai', 'Đen Bóng', 'Nâu Ánh Kim'],
  'feliz-ii': ['Đỏ tươi', 'Xanh Oliu', 'Trắng Ngọc Trai', 'Đen Bóng'],
  'feliz-2025': ['Xanh rêu', 'Xanh Oliu', 'Trắng Ngọc Trai', 'Đen Bóng'],
  'feliz-2027': [
    'Trắng ngọc trai',
    'Xám xi măng',
    'Xanh cẩm thạch',
    'Đen bóng',
  ],
  'evo-grand-limited': ['Xanh cẩm thạch', 'Trắng sữa'],
  'evo-grand-ii': ['Đỏ tươi', 'Xanh Rêu', 'Trắng Ngọc Trai'],
  evo: ['Đỏ tươi', 'Xanh Oliu', 'Trắng Ngọc Trai', 'Đen'],
  amio: ['Đỏ tươi', 'Xanh Ngọc', 'Trắng Ngọc Trai', 'Đen bóng', 'Xám'],
  'amio-s': [
    'Đỏ Tươi',
    'Trắng Ngọc Trai',
    'Xanh Ngọc',
    'Đen bóng',
    'Xám Xi Măng',
  ],
  'amio-s2': ['Đỏ tươi', 'Xanh Ngọc', 'Trắng Đen', 'Đen bóng', 'Trắng Tím'],
  flazz: ['Đỏ tươi', 'Xanh rêu', 'Trắng ngọc trai', 'Đen bóng'],
  'flazz-max': ['Xanh', 'Trắng Cam', 'Đen'],
  zgoo: ['Xanh Oliu', 'Trắng Ngọc trai', 'Đen bóng', 'Đỏ tươi'],
  'evo-lite': ['Đỏ tươi', 'Xanh Oliu', 'Trắng Ngọc Trai', 'Đen'],
  'evo-grand-lite': ['Tím', 'Trắng Ngọc Trai', 'Đen'],
  'evo-lite-neo': [
    'Xanh rêu',
    'Đỏ tươi',
    'Xanh tím than',
    'Trắng ngọc trai',
    'Đen nhám',
  ],
  drgnfly: ['Đen bóng'],
};
function swatch(name) {
  const value = name.toLowerCase();
  if (value.includes('trắng')) return '#eae9e4';
  if (value.includes('đỏ')) return '#b62c35';
  if (value.includes('đen')) return '#242829';
  if (value.includes('xám')) return '#858b89';
  if (value.includes('nâu')) return '#81735d';
  if (value.includes('tím')) return '#83728a';
  if (value.includes('oliu')) return '#9ca996';
  if (value.includes('ngọc')) return '#a0c1b3';
  return '#34594e';
}
function addPalette(id, colors, extra = {}) {
  const vehicle = vehicleViewers.find((item) => item.id === id);
  exteriorColors[id] = {
    status: 'complete',
    scope: `${vehicle.name} · bảng màu trên trang VinFast tại ngày đối chiếu; không gộp phiên bản khác.`,
    sources: [vehicle.source],
    colors,
    reference: colors.find((color) => color.image)?.image || vehicle.image,
    ...extra,
  };
}
for (const [id, names] of Object.entries(scooterPalettes)) {
  addPalette(
    id,
    names.map((name, index) => ({
      name,
      hex: swatch(name),
      image: `assets/colors/${id}/${index}.webp`,
    })),
  );
}
const existingScooters = {
  kinet: [
    ['Đỏ Đen', 'kinet-do'],
    ['Xám Xi Măng', 'kinet-xi-mang'],
    ['Trắng Ngọc Trai', 'kinet-trang'],
    ['Đen Bóng', 'kinet-den'],
    ['Nâu Ánh Kim', 'kinet-nau'],
  ],
  viper: [
    ['Đỏ Tươi', 'viper/red'],
    ['Xám', 'viper/grey'],
    ['Trắng Ngọc Trai', 'viper/white'],
    ['Đen Bóng', 'viper/black'],
  ],
  'evo-grand': [
    ['Đỏ tươi', 'evo-grand/red'],
    ['Xanh Oliu', 'evo-grand/olive'],
    ['Trắng Ngọc Trai', 'evo-grand/white'],
    ['Đen', 'evo-grand/black'],
  ],
  'evo-grand-premia': [
    ['Nâu Titanium', 'premia/brown'],
    ['Xanh Oliu', 'premia/olive'],
    ['Đen Bóng Mới', 'premia/black'],
  ],
};
for (const [id, rows] of Object.entries(existingScooters)) {
  addPalette(
    id,
    rows.map(([name, file]) => ({
      name,
      hex: swatch(name),
      image: `assets/${file}.webp`,
    })),
  );
}
const paint = {
  CE18: ['Infinity Blanc', '#eeeeec'],
  CE11: ['Jet Black', '#282b2c'],
  CE1V: ['Zenith Grey', '#767d80'],
  CE2Q: ['Solar Ruby', '#b72432'],
  CE1W: ['Urban Mint', '#a0ab90'],
  CE17: ['Desat Silver', '#bec1c2'],
  CE1M: ['Crimson Red', '#a51824'],
  CE22: ['Ivy Green', '#405349'],
  CE1U: ['Yellow', '#e7c634'],
  CE2G: ['Sky Blue', '#4dc9d5'],
  CE21: ['Rose Pink', '#d6a8b3'],
  CE2T: ['Be Pebble', '#b9a180'],
  '111U': ['Summer Yellow Body - Jet Black Roof', '#e7c634', '#282b2c'],
  '181Y': ['Sky Blue - Infinity Blanc Roof', '#4dc9d5', '#eeeeec'],
  CE2J: ['Moonlit Ocean', '#314966'],
  CE2N: ['Introspective Brown', '#675747'],
  CE31: ['Stealth Gray', '#74828a'],
  CE33: ['Starburst Blue', '#8aaabd'],
  CE32: ['Vitality Orange', '#c45427'],
  CE2O: ['Mysterioso Purple', '#543751'],
  '112Q': ['Solar Ruby Body - Jet Black Roof', '#b72432', '#282b2c'],
  1132: ['Vitality Orange Body - Jet Black Roof', '#c45427', '#282b2c'],
  1832: ['Vitality Orange Body - Infinity Blanc Roof', '#c45427', '#eeeeec'],
  1833: ['Starburst Blue Body - Infinity Blanc Roof', '#8aaabd', '#eeeeec'],
  '312O': ['Mysterioso Purple Body - Stealth Gray Roof', '#543751', '#74828a'],
  3111: ['Jet Black Body - Stealth Gray Roof', '#282b2c', '#74828a'],
};
const carPalettes = {
  vf2: ['CE18', 'CE17', 'CE2Q', 'CE1U', 'CE2G', 'CE1W', 'CE21', 'CE2T'],
  vf5: ['CE18', 'CE1V', 'CE2Q', '111U', '181Y', 'CE1W'],
  vf6: ['CE18', 'CE1V', 'CE11', 'CE1W', 'CE2Q'],
  vf7: ['CE18', 'CE1V', 'CE11', 'CE2Q', 'CE1W'],
  vf9: ['CE18', 'CE1V', 'CE11', 'CE1W', 'CE1M', 'CE22', 'CE17'],
  'vf-mpv7': ['CE18', 'CE1V', 'CE11', 'CE2Q', 'CE2J', 'CE2N'],
  'vf8-new': [
    'CE18',
    'CE33',
    'CE11',
    'CE2Q',
    '112Q',
    '1132',
    '1833',
    '312O',
    '3111',
    '1832',
    'CE32',
    'CE2O',
  ],
  'vf-wild': ['CE11', 'CE18', 'CE2Q', 'CE31'],
  'herio-green': ['CE11', 'CE17', 'CE2Q', 'CE18'],
  'limo-green': ['CE18', 'CE17', 'CE11', 'CE2Q'],
  'ec-van': ['CE1W', 'CE18', 'CE1U', 'CE2Q'],
};
for (const [id, codes] of Object.entries(carPalettes)) {
  addPalette(
    id,
    codes.map((code) => {
      const [name, hex, roof] = paint[code];
      // Hai ảnh trắng dịch vụ có góc chụp khác bộ còn lại: không dùng làm preview.
      const inconsistent =
        ['herio-green', 'limo-green'].includes(id) && code === 'CE18';
      return {
        name,
        hex,
        roof,
        ...(inconsistent ? {} : { image: `assets/colors/${id}/${code}.webp` }),
      };
    }),
  );
}
addPalette(
  'vf3',
  [
    { name: 'Infinity Blanc', hex: '#eeeeec', image: 'assets/vf3/white.webp' },
    { name: 'Zenith Grey', hex: '#767d80' },
    { name: 'Solar Ruby', hex: '#b72432' },
    {
      name: 'Summer Yellow Body - Infinity Blanc Roof',
      hex: '#e7c634',
      roof: '#eeeeec',
    },
    { name: 'Sky Blue - Infinity Blanc Roof', hex: '#4dc9d5', roof: '#eeeeec' },
    {
      name: 'Rose Pink - Infinity Blanc Roof',
      hex: '#d6a8b3',
      roof: '#eeeeec',
    },
    { name: 'Urban Mint', hex: '#a0ab90' },
  ],
  {
    limitation:
      'Chưa có ảnh cùng góc hoặc mặt nạ đủ chính xác cho sáu màu còn lại.',
  },
);
addPalette(
  'minio-green',
  [
    ['Infinity Blanc', '#eeeeec', null, null],
    ['Jet Black', '#282b2c', 'CE11'],
    ['Solar Ruby', '#b72432', 'CE2Q'],
    ['Rose Metallic', '#ba82b5', 'CE2K'],
    ['Tropical Jade', '#80bd83', 'CE2I'],
    ['Tropical Jade Body - Infinity Blanc Roof', '#80bd83', '182I', '#eeeeec'],
    ['Tropical Jade Body - Summer Yellow Roof', '#80bd83', '1U2I', '#e7c634'],
    ['Solar Ruby Body - Infinity Blanc Roof', '#b72432', '182Q', '#eeeeec'],
    ['Rose Metallic Body - Desat Silver Roof', '#ba82b5', null, '#bec1c2'],
    ['Rose Metallic Body - Aqua Blue Roof', '#ba82b5', '1P2K', '#53bec0'],
    ['Jet Black Body - Summer Yellow Roof', '#282b2c', '1U11', '#e7c634'],
    ['Desat Silver Body - Jet Black Roof', '#bec1c2', '1117', '#282b2c'],
  ].map(([name, hex, file, roof]) => ({
    name,
    hex,
    roof,
    ...(file ? { image: `assets/colors/minio-green/${file}.webp` } : {}),
  })),
  {
    limitation:
      'Phạm vi 12 màu trên trang sản phẩm. Trang đặt cọc có bảng khác (14 màu); chưa gộp khi chưa xác minh phạm vi áp dụng. Ảnh trắng khác góc và phối hồng/nóc bạc chưa phù hợp.',
  },
);
addPalette(
  'nerio-green',
  ['Bạc', 'Đen', 'Đỏ', 'Vàng'].map((name) => ({
    name,
    hex: { Bạc: '#bec1c2', Đen: '#282b2c', Đỏ: '#b72432', Vàng: '#e7c634' }[
      name
    ],
  })),
  {
    scope: 'Nerio Green · brochure 16/04/2025.',
    sources: [
      'https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw9d854c87/Document/250416_Brochure_Nerio_Green_VN.pdf',
    ],
    limitation: 'Chưa có bộ ảnh màu cùng góc hoặc mặt nạ đáng tin cậy.',
  },
);
addPalette('ebus', [], {
  status: 'unverified',
  scope:
    'EBus · xe buýt dịch vụ; không suy bảng màu từ màu nhận diện của đơn vị vận hành.',
  limitation:
    'Chưa xác minh được bảng màu sơn tiêu chuẩn theo phiên bản. Ảnh EB6 hiện có không đủ để mô phỏng các dòng xe buýt khác.',
});
const historicalColors = [
  ['Đỏ', '#b72432', 'red'],
  ['Xám', '#767d80', 'grey'],
  ['Xanh', '#314966'],
  ['Bạc', '#bec1c2'],
  ['Trắng', '#eeeeec'],
  ['Đen', '#282b2c'],
];
for (const id of ['fadil', 'lux-a', 'lux-sa']) {
  addPalette(
    id,
    historicalColors
      .slice(0, id === 'fadil' ? 5 : 6)
      .map(([name, hex, file]) => ({
        name,
        hex,
        ...(file ? { image: `assets/extended/${id}/${file}.png` } : {}),
      })),
    {
      scope:
        id === 'fadil'
          ? 'Fadil · bảng 5 màu trong brochure 22/10/2021, xe đã dừng sản xuất; không gộp màu cam đời trước.'
          : 'Xe xăng lịch sử · bảng 6 màu trên trang sản phẩm lưu trữ; không phải thông báo bán xe mới.',
      limitation:
        'Chưa có ảnh cùng góc hoặc mặt nạ chính xác cho các màu còn lại.',
    },
  );
}
exteriorColors.fadil.sources.push(
  'https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/vi_VN/dw87203d68/Document/Brochure_Fadil_VI_22.10.21_Final.pdf',
);
addPalette(
  'president',
  ['Trắng', 'Đen', 'Tím', 'Ghi', 'Bạc', 'Nâu', 'Đỏ', 'Cam', 'Xanh dương'].map(
    (name, index) => ({
      name,
      hex: [
        '#eeeeec',
        '#282b2c',
        '#75567e',
        '#767d80',
        '#bec1c2',
        '#81735d',
        '#b72432',
        '#d46e36',
        '#314966',
      ][index],
      ...([0, 6].includes(index)
        ? {
            image: `assets/extended/president/${index === 0 ? 'white' : 'red'}.png`,
          }
        : {}),
    }),
  ),
  {
    status: 'partial',
    scope: 'President · xe lịch sử 2020–2022.',
    limitation:
      'Trang lưu trữ hiển thị 9 nhóm màu trong tổng 18 màu từng công bố. Chưa xác minh đủ tên 18 màu và ảnh đồng bộ; không tự điền các màu còn thiếu.',
  },
);

// Bộ ảnh lưu trữ đã đối chiếu cùng góc nhìn; tái sử dụng hai ảnh cũ mỗi xe.
const archivedPreviews = {
  fadil: [null, null, 'blue', 'silver', 'white'],
  'lux-a': [null, null, 'blue', 'silver', 'white', 'black'],
  'lux-sa': [null, null, 'blue', 'silver', 'white', 'black'],
  president: [
    null,
    'black',
    'purple',
    'grey',
    'silver',
    'brown',
    null,
    'orange',
    'blue',
  ],
};
for (const [id, files] of Object.entries(archivedPreviews)) {
  files.forEach((file, index) => {
    if (file)
      exteriorColors[id].colors[index].image =
        `assets/colors/${id}/${file}.webp`;
  });
  exteriorColors[id].limitation =
    id === 'president'
      ? 'Có ảnh đồng bộ cho 9 nhóm màu trên trang lưu trữ; chưa xác minh đủ danh mục 18 màu từng công bố.'
      : 'Ảnh màu lưu trữ để tham khảo; mẫu xe đã dừng sản xuất.';
}
