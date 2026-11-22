import { vehicleViewers } from './vehicle-viewers.js';
import { products } from './products.js';
import { extendedProducts } from './extended-products.js';
import { newCars } from './new-cars.js';
import { specificationBaseline } from './vehicle-spec-baseline.js';
import { vehicleFeatureResearch } from './vehicle-feature-research.js';
import { specAdditions } from './spec-additions.js';

// Nguồn cũ giữ ngày khảo sát cũ; chỉ đánh dấu đối chiếu mới cho dữ liệu đã đọc lại.
export const vehicleSpecifications = vehicleViewers.map((viewer) => {
  const product = products.find(
    (item) => (item.detailPath || item.id) === viewer.id,
  );
  const extended = extendedProducts.find((item) => item.id === viewer.id);
  const original = extended || newCars[viewer.id];
  const groups = original
    ? [
        ['Kích thước', original.dimensions],
        ['Vận hành', original.performance],
        ['Pin và sạc', original.battery],
        ['Trang bị', original.equipment],
      ]
        .filter(([, rows]) => rows?.length)
        .map(([title, rows]) => ({ title, rows }))
    : specificationBaseline[viewer.id] || [];
  return {
    id: viewer.id,
    name: viewer.name,
    historical: product.group === 'historical',
    source: viewer.source,
    sourceDate: extended ? '2026-11-12' : '2026-11-10',
    groups,
    note: original?.note || '',
    missing:
      product.group === 'historical'
        ? [
            'Bảng trang bị chi tiết theo năm sản xuất và từng phiên bản',
            'Giá lịch sử theo thời điểm',
          ]
        : [
            'Chưa đối chiếu toàn bộ danh mục trang bị trong brochure theo phiên bản',
          ],
    variants: [
      {
        id: 'reference',
        name:
          product.group === 'historical'
            ? 'Hồ sơ lịch sử'
            : 'Cấu hình tham chiếu',
        image: viewer.image,
        price: product.group === 'historical' ? null : product.price,
        quick: [
          ['Quãng đường', product.range],
          ['Số chỗ', product.seats],
        ].filter(([, value]) => value != null),
        rows: [],
      },
    ],
  };
});
const get = (id) => vehicleSpecifications.find((model) => model.id === id);
const variant = (id, name, price, range, rows = []) => ({
  id,
  name,
  price,
  image: null,
  quick: [['Quãng đường', range]],
  rows,
});
const verifiedVariants = {
  vf3: [
    variant('eco', 'Eco', 285000000, '215 km (NEDC)'),
    variant('plus', 'Plus', 296000000, '215 km (NEDC)'),
  ],
  vf6: [
    variant('eco', 'Eco', 646000000, '485 km (NEDC)', [
      ['Công suất tối đa', '130 kW'],
      ['Mô-men xoắn', '250 Nm'],
      ['Túi khí', '4'],
    ]),
    variant('plus', 'Plus', 699000000, '460 km (NEDC)', [
      ['Công suất tối đa', '150 kW'],
      ['Mô-men xoắn', '310 Nm'],
      ['Túi khí', '7'],
    ]),
  ],
  vf7: [
    variant('eco', 'Eco', 740000000, '440 km (NEDC)', [
      ['Công suất tối đa', '130 kW'],
      ['Mô-men xoắn', '250 Nm'],
      ['Pin khả dụng', '59,6 kWh'],
      ['Sạc DC tối đa', '100 kW'],
    ]),
    variant('plus', 'Plus FWD', 830000000, '500,5 km (NEDC)', [
      ['Công suất tối đa', '150 kW'],
      ['Mô-men xoắn', '310 Nm'],
      ['Pin khả dụng', '70 kWh'],
      ['Sạc DC tối đa', '110 kW'],
    ]),
    variant('awd', 'Plus AWD', null, '469 km (NEDC)', [
      ['Công suất tối đa', '260 kW'],
      ['Mô-men xoắn', '500 Nm'],
      ['Pin khả dụng', '70 kWh'],
      ['Sạc DC tối đa', '110 kW'],
    ]),
  ],
  vf8: [
    variant('eco', 'Eco', 898000000, '635 km (NEDC)', [
      ['Công suất tối đa', '150 kW'],
      ['Mô-men xoắn', '310 Nm'],
    ]),
    variant('plus', 'Plus', 1079000000, '475 km (NEDC)', [
      ['Công suất tối đa', '300 kW'],
      ['Mô-men xoắn', '620 Nm'],
    ]),
  ],
  vf9: [
    variant('eco', 'Eco', 1348000000, '626 km (WLTP)', [
      ['Công suất tối đa', '300 kW'],
      ['Mô-men xoắn', '620 Nm'],
      ['Màn hình', '15,6 inch phía trước'],
    ]),
    variant('plus', 'Plus', 1529000000, '602 km (WLTP)', [
      ['Công suất tối đa', '300 kW'],
      ['Mô-men xoắn', '620 Nm'],
      ['Màn hình', '15,6 inch phía trước; 8 inch phía sau'],
    ]),
  ],
};
for (const [id, variants] of Object.entries(verifiedVariants)) {
  const model = get(id);
  model.variants = variants.map((item) => ({
    ...item,
    image: item.id === 'awd' ? null : `assets/${id}/${item.id}.webp`,
  }));
  if (id !== 'vf3') model.sourceDate = '2026-11-15';
}
get('vf7').missing.push(
  'Giá và ảnh riêng Plus AWD; trang bị an toàn riêng AWD',
);
get('vf9').additionalSources = [
  'https://storage.googleapis.com/vinfast-data-01/brochure/VF%209_%20Brochure.pdf',
];
get('vf9').note +=
  ' Công suất và mô-men VF 9 được đối chiếu thêm brochure CATL Eco/Plus, trang 14.';
get('vf6').groups = [
  {
    title: 'Kích thước và vận hành',
    rows: [
      ['Dài × rộng × cao', '4.241 × 1.834 × 1.580 mm'],
      ['Dẫn động', 'FWD / cầu trước'],
      ['Số chỗ', '5'],
    ],
  },
  {
    title: 'Pin và sạc',
    rows: [
      ['Pin khả dụng', '59,6 kWh'],
      ['Sạc 10–70%', '25 phút'],
      ['Sạc AC tối đa', '7,2 kW'],
      ['Sạc DC tối đa', '100 kW'],
    ],
  },
  {
    title: 'Trang bị',
    rows: [
      ['Hỗ trợ ngang dốc HSA', 'Có'],
      ['ABS', 'Có'],
      ['Cảm biến sau', 'Có'],
      ['Màn hình', '12,9 inch'],
    ],
  },
];
get('kinet').groups = [
  {
    title: 'Kích thước',
    rows: [
      ['Dài × rộng × cao', '2.021 × 713 × 1.135 mm'],
      ['Chiều cao yên', '785 mm'],
      ['Khoảng sáng gầm', '160 mm'],
      ['Cốp', '22 L'],
    ],
  },
  {
    title: 'Vận hành',
    rows: [
      ['Công suất tối đa', '5.200 W'],
      ['Tốc độ tối đa', 'Khoảng 90 km/h (1 người 65 kg, Sport)'],
      ['Tăng tốc 0–50 km/h', 'Dưới 6 giây (1 người 65 kg)'],
    ],
  },
  {
    title: 'Pin và sạc',
    rows: [
      ['Loại pin', 'LFP'],
      ['Dung lượng', '2 × 1,5 kWh, chạy song song'],
      ['Quãng đường thử nghiệm', 'Khoảng 145 km, 2 pin, tốc độ 30 km/h'],
      ['Sạc 0–100%', 'Khoảng 9 giờ'],
    ],
  },
  {
    title: 'Trang bị',
    rows: [
      ['Khóa', 'Smart Key'],
      ['Màn hình', 'TFT, Bluetooth'],
      ['Ứng dụng', 'Tìm xe, định vị, lịch sử hành trình, vùng an toàn'],
    ],
  },
];
get('kinet').sourceDate = '2026-11-15';
get('kinet').variants[0].quick = [
  ['Quãng đường', '~145 km (2 pin)'],
  ['Công suất', '5.200 W'],
  ['Cốp', '22 L'],
];
get('ebus').missing.push(
  'Thông số các dòng EBus ngoài cấu hình EB6 hiện có; không dùng số chỗ từ menu',
);
// Bổ sung trường còn thiếu từ từng trang hãng đọc ngày 15/11/2026.
const scooterUpdates = {
  kyo: ['160 mm', '16 giây (0–50 km/h, 65 kg)', 'LFP'],
  'feliz-ii': ['134 mm', '15 giây (0–50 km/h, 65 kg)', 'LFP'],
  'feliz-2025': ['141 mm', 'Dưới 18 giây (0–50 km/h, 65 kg)', 'LFP'],
  'feliz-2027': ['141 mm', 'Dưới 18 giây (0–50 km/h, 65 kg)', 'LFP'],
  'evo-grand-ii': ['133 mm', 'Dưới 16 giây (0–40 km/h, 65 kg)', 'LFP'],
  'evo-grand-premia': ['133 mm', 'Dưới 16 giây (0–40 km/h, 65 kg)', 'LFP'],
  'evo-grand': ['133 mm', 'Dưới 16 giây (0–50 km/h, 65 kg)', 'LFP'],
  evo: ['125 mm', 'Dưới 16 giây (0–50 km/h, 65 kg)', 'LFP'],
  amio: ['130 mm', null, 'LFP'],
  'amio-s2': ['123 mm', null, 'LFP'],
  flazz: ['137 mm', null, 'LFP'],
  'flazz-max': ['130 mm', null, 'LFP'],
  zgoo: ['137 mm', null, 'LFP'],
  'evo-lite': ['125 mm', null, 'LFP'],
  'evo-grand-lite': ['133 mm', null, 'LFP'],
  viper: ['138 mm', '15 giây (0–50 km/h, 65 kg)', 'LFP'],
};
function supplement(id, rows) {
  get(id).groups.push({ title: 'Thông tin bổ sung đã đối chiếu', rows });
  get(id).sourceDate = '2026-11-15';
}
for (const [id, [clearance, acceleration, battery]] of Object.entries(
  scooterUpdates,
)) {
  supplement(id, [
    ['Khoảng sáng gầm', clearance],
    ['Loại pin', battery],
    ...(acceleration ? [['Tăng tốc', acceleration]] : []),
  ]);
  get(id).missing = acceleration
    ? [
        'Thời gian sạc và cấu hình bộ sạc chưa được xác nhận trong bảng đang đối chiếu',
      ]
    : [
        'Chỉ số tăng tốc trên nguồn không phù hợp tốc độ tối đa; chưa hiển thị',
        'Thời gian sạc, cấu hình bộ sạc',
      ];
}
supplement('vero-x', [
  ['Chiều dài cơ sở', '1.295 mm'],
  ['Khoảng sáng gầm', '133 mm'],
  ['Lốp trước / sau', '90/90-12 / 90/90-12'],
  ['Loại pin', 'LFP'],
  ['Trọng lượng pin', '18 kg'],
  ['Sạc 0–100%', 'Khoảng 6 giờ 30 phút'],
  ['Công suất danh định', '1.500 W'],
  ['Loại động cơ', 'BLDC Inhub'],
  ['Phanh trước / sau', 'Đĩa / tang trống'],
]);
supplement('amio-s', [
  ['Chiều dài cơ sở', '1.230 mm'],
  ['Khoảng sáng gầm', '123 mm'],
  ['Lốp', '10 × 3.0'],
  ['Khóa', 'Khóa cơ'],
  ['Loại pin', 'LFP'],
  ['Khối lượng pin', '10 ± 1 kg'],
  ['Sạc 0–100%', 'Khoảng 6 giờ'],
  ['Công suất danh định', 'Khoảng 240 W'],
  ['Tăng tốc 0–25 km/h', '14 giây'],
]);
supplement('evo-lite-neo', [
  ['Sạc 0–100%', '10 giờ, bộ sạc 220 W'],
  ['Công suất danh định', '1.200 W'],
  ['Dung lượng ắc quy', '1,26 kWh'],
  ['Phanh trước / sau', 'Đĩa / cơ'],
  ['Khối lượng gồm ắc quy', '105 kg'],
]);
supplement('drgnfly', [
  ['Độ cao tay lái', '103 cm'],
  ['Khoảng cách yên đến tay lái', '63,5 cm'],
  ['Chiều dài cơ sở', '114,3 cm'],
]);
supplement('evo-grand-limited', [['Tải trọng', '130 kg']]);
get('evo-grand-limited').missing = [
  'Khối lượng xe và pin, quãng đường hỗn hợp và cấu hình năng lượng chưa đọc được đầy đủ từ nguồn',
];
supplement('vf2', [['Công suất tối đa', '30 kW']]);
supplement('vf8-new', [['Công suất tối đa', '170 kW']]);
supplement('vf-mpv7', [['Công suất tối đa', '150 kW']]);
supplement('vf-wild', [['Lốp', '255/70 R18']]);
get('vf-wild').missing = [
  'Thông số an toàn chi tiết và pin/sạc trong bảng ảnh chưa đối chiếu đầy đủ',
];
// Tránh bảng tổng hợp Eco/Plus mâu thuẫn với phiên bản đang chọn.
for (const id of ['vf7', 'vf8', 'vf9']) {
  get(id).groups = get(id).groups.map((group) => ({
    ...group,
    rows: group.rows.filter(
      ([label]) =>
        !/Eco|Plus|Quãng đường|Mô-men|Mô men|Công suất|Màn hình/.test(label) &&
        !(id === 'vf7' && /pin|sạc/i.test(label)),
    ),
  }));
}
supplement('vf7', [['Sạc AC tối đa', '7,2 kW']]);
get('vf7').variants[0].rows.push(
  ['Túi khí', '4'],
  ['Lọc cabin', 'Bụi / phấn hoa'],
);
get('vf7').variants[1].rows.push(['Túi khí', '7'], ['Lọc cabin', 'Combi 1.0']);
supplement('vf7', [['Màn hình cảm ứng', '12,9 inch']]);
supplement('vf8', [['Màn hình', '15,6 inch']]);
supplement('vf3', [
  ['Công suất tối đa', '30 kW'],
  ['Pin khả dụng', '18,64 kWh'],
]);
supplement('vf5', [['Công suất tối đa', '100 kW']]);
get('vf6').missing = [];
get('kinet').missing = [];
for (const id of ['vf2', 'vf8-new', 'vf-mpv7']) get(id).missing = [];
get('vf8').missing = [];
get('vf5').missing = [];
supplement('kyo', [['Sạc 0–100%', 'Khoảng 4 giờ 30 phút']]);
get('kyo').missing = [];
supplement('evo-grand-premia', [['Sạc 0–100%', 'Khoảng 6 giờ 30 phút']]);
get('evo-grand-premia').missing = [];
for (const id of ['vero-x', 'amio-s', 'evo-lite-neo', 'drgnfly'])
  get(id).missing = [];
for (const model of vehicleSpecifications) {
  const rows = model.groups.flatMap((group) => group.rows);
  if (model.variants.length === 1)
    model.variants[0].quick = rows
      .filter(([label]) =>
        /Quãng đường|Công suất|Số chỗ|Tốc độ|Phạm vi hỗ trợ/.test(label),
      )
      .slice(0, 4);
  model.status = !model.groups.length
    ? 'MISSING DATA'
    : model.missing.length
      ? 'PARTIAL'
      : 'COMPLETE';
}
// Bổ sung từ bảng hãng đọc lại 15/11/2026, giữ nguyên phạm vi thị trường Việt Nam.
const researchedRows = {
  vf3: [['Đường kính quay đầu tối thiểu', '9 m']],
  'nerio-green': [
    ['Dẫn động', 'FWD / cầu trước'],
    ['Chế độ lái', 'Eco / Comfort / Sport'],
    ['Treo trước / sau', 'MacPherson / dầm xoắn'],
    ['Phanh trước / sau', 'Đĩa / đĩa'],
    ['Ghế lái', 'Chỉnh cơ 6 hướng'],
  ],
  ebus: [
    ['Sức chứa bản học sinh', 'Tới 30 người'],
    ['Màn hình LED', '21 inch (tùy chọn)'],
    ['Nút bấm xuống xe', 'Tùy chọn'],
    ['Túi cứu thương', 'Tùy chọn'],
    ['Tích hợp ứng dụng', 'Tùy chọn'],
  ],
  fadil: [
    ['Khoảng sáng gầm', '150 mm'],
    ['Tiêu thụ nhiên liệu kết hợp', '5,85 L/100 km'],
    ['Tiêu thụ nhiên liệu đô thị', '7,11 L/100 km'],
    ['Tiêu thụ nhiên liệu ngoài đô thị', '5,11 L/100 km'],
  ],
  'lux-a': [
    ['Khoảng sáng gầm', '150 mm'],
    ['Bình nhiên liệu', '70 L'],
  ],
  president: [
    ['Khoảng sáng gầm', '183 mm'],
    ['Bình nhiên liệu', '85 L'],
    ['Tiêu thụ nhiên liệu kết hợp', '15,83 L/100 km'],
    ['Tiêu thụ nhiên liệu đô thị', '23,43 L/100 km'],
    ['Tiêu thụ nhiên liệu ngoài đô thị', '11,58 L/100 km'],
    ['Tiêu chuẩn khí thải', 'EU 4 N1C3'],
    ['Treo trước / sau', 'Tay đòn kép / khí nén'],
    ['Camera', '360°'],
    ['Cảnh báo lệch làn', 'Có'],
    ['Cảnh báo điểm mù', 'Có'],
  ],
  'vero-x': [
    [
      'Treo trước / sau',
      'Ống lồng, giảm chấn thủy lực / giảm xóc đôi, giảm chấn thủy lực',
    ],
    ['Tăng tốc 0–50 km/h', 'Dưới 15 giây (1 người 65 kg)'],
  ],
  'amio-s': [
    [
      'Treo trước / sau',
      'Ống lồng, giảm chấn thủy lực / giảm xóc đôi, giảm chấn thủy lực',
    ],
    ['Loại động cơ', 'Inhub'],
  ],
  'evo-lite-neo': [
    ['Loại động cơ', 'Inhub'],
    [
      'Treo trước / sau',
      'Ống lồng, giảm chấn thủy lực / giảm xóc đôi, giảm chấn thủy lực',
    ],
  ],
  'evo-grand-limited': [
    ['Khối lượng gồm pin', 'Khoảng 92 kg; 110 kg khi lắp pin phụ'],
    ['Quãng đường hỗn hợp', 'Khoảng 89 km; thêm 84 km với pin phụ'],
    ['Tăng tốc 0–40 km/h', 'Dưới 16 giây (1 người 65 kg)'],
    ['Khóa', 'Smart Key'],
    ['Số lùi', 'Có'],
    ['Đỗ xe ngang dốc', 'Có'],
  ],
  evo: [['Loại động cơ', 'Inhub']],
  'evo-lite': [['Loại động cơ', 'Inhub']],
};
for (const [id, rows] of Object.entries(researchedRows)) supplement(id, rows);
get('evo-grand-limited').missing = [
  'Chưa xác minh đầy đủ cấu hình pin và thời gian sạc trong bảng hãng hiện tại',
];
// Hai cấu hình động lực có số liệu riêng; không gán trang bị cao cấp cho bản thấp.
for (const [id, definitions] of Object.entries({
  'lux-a': [
    [
      '174-rwd',
      '174 HP · RWD',
      '174 HP',
      '300 Nm',
      'RWD',
      '8,39',
      '11,11',
      '6,90',
    ],
    [
      '228-rwd',
      '228 HP · RWD',
      '228 HP',
      '350 Nm',
      'RWD',
      '8,32',
      '10,83',
      '6,82',
    ],
  ],
  'lux-sa': [
    [
      '228-rwd',
      '228 HP · RWD',
      '228 HP',
      '350 Nm',
      'RWD',
      '8,39',
      '10,46',
      '7,18',
    ],
    [
      '228-awd',
      '228 HP · AWD',
      '228 HP',
      '350 Nm',
      'AWD',
      '10,92',
      '15,81',
      '8,01',
    ],
  ],
})) {
  const model = get(id);
  model.groups = model.groups.map((group) => ({
    ...group,
    rows: group.rows.filter(
      ([label]) =>
        !/Cấu hình công suất|Công suất \/ mô-men|Hộp số \/ dẫn động|^Phiên bản$/.test(
          label,
        ),
    ),
  }));
  model.variants = definitions.map(
    ([id, name, power, torque, drive, mixed, urban, highway]) => ({
      id,
      name,
      price: null,
      image: null,
      quick: [],
      rows: [
        ['Công suất tối đa', power],
        ['Mô-men xoắn', torque],
        ['Dẫn động', drive],
        ['Hộp số', 'Tự động 8 cấp'],
        ['Tiêu thụ nhiên liệu kết hợp', mixed + ' L/100 km'],
        ['Tiêu thụ nhiên liệu đô thị', urban + ' L/100 km'],
        ['Tiêu thụ nhiên liệu ngoài đô thị', highway + ' L/100 km'],
      ],
    }),
  );
  model.sourceDate = '2026-11-15';
  model.note +=
    ' Cấu hình phân biệt theo động lực công bố; chưa quy đổi thành tên gói trang bị/năm sản xuất.';
}

const normalizeFieldText = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd');
// Mỗi phép đo có ID và một nhóm duy nhất; không nhập công suất danh định vào cực đại.
export function specificationField(label, value) {
  const key = normalizeFieldText(label),
    text = normalizeFieldText(label + ' ' + value);
  const field = (id, group, name = label) => ({ id, group, label: name });
  if (/kich thuoc khoang/.test(key))
    return field('cargo_dimensions', 'Kích thước');
  if (/(khoi|trong) luong.*(khong tai|ban than)/.test(key))
    return field('curb_weight', 'Kích thước', 'Khối lượng không tải');
  if (/(khoi|trong) luong.*toan bo/.test(key))
    return field('gross_weight', 'Kích thước', 'Khối lượng toàn bộ');
  if (/^tai trong$/.test(key)) return field('payload', 'Kích thước');
  if (/ban kinh quay/.test(key)) return field('turning_radius', 'Khung gầm');
  if (/duong kinh quay/.test(key))
    return field('turning_diameter', 'Khung gầm');
  if (/tro luc lai/.test(key)) return field('steering_assist', 'Khung gầm');
  if (/khoang hanh ly/.test(key))
    return field(
      /truoc/.test(key) ? 'cargo_front' : 'cargo_rear',
      'Kích thước',
    );
  if (/thong tin pin|xac thuc pin/.test(key))
    return field(key.replace(/\W+/g, '_'), 'Công nghệ');
  if (/cam bien.*mo.men/.test(text))
    return field('pedal_torque_sensor', 'Công nghệ');
  if (/gi(am|a)m xoc|treo/.test(key))
    return field('suspension', 'Khung gầm', 'Hệ thống treo / giảm xóc');
  if (/^phanh$|^he thong phanh$|phanh truoc/.test(key))
    return field('brakes', 'Khung gầm', 'Phanh trước / sau');
  if (/\busb\b/.test(text)) return field('usb', 'Công nghệ', 'Cổng USB');
  if (/^mam$|la.zang/.test(key)) return field('wheels', 'Khung gầm', 'La-zăng');
  if (/^lop|kich thuoc lop/.test(key))
    return field('tires', 'Khung gầm', 'Lốp');
  if (/dai.*rong.*cao|^kich thuoc/.test(key) && !/lop|la.zang/.test(key))
    return field('dimensions', 'Kích thước', 'Dài × rộng × cao');
  if (/chieu dai co so/.test(key)) return field('wheelbase', 'Kích thước');
  if (/khoang sang|gam cao/.test(key))
    return field('ground_clearance', 'Kích thước', 'Khoảng sáng gầm');
  if (/chieu cao yen|yen cao/.test(key))
    return field('seat_height', 'Kích thước', 'Chiều cao yên');
  if (/so cho/.test(key)) return field('seats', 'Kích thước', 'Số chỗ');
  if (/cop/.test(key) && !/dien|dong|mo/.test(key))
    return field(
      /2 pin|hai pin/.test(key) ? 'storage_two_batteries' : 'storage',
      'Tiện nghi',
      /2 pin|hai pin/.test(key)
        ? 'Dung tích cốp khi lắp 2 pin'
        : 'Dung tích cốp',
    );
  if (/trong luong pin|khoi luong pin/.test(key))
    return field('battery_weight', 'Pin');
  if (
    /khoi luong|tai trong|thung|khoang hang|chieu dai|cao tay|khoang cach/.test(
      key,
    )
  )
    return field(key.replace(/\W+/g, '_'), 'Kích thước');
  if (
    /cong suat|maximum power|rated power|peak power/.test(key) &&
    !/sac/.test(key)
  )
    return field(
      /danh dinh|rated/.test(key) ? 'power_rated' : 'power_peak',
      'Động cơ và vận hành',
      /danh dinh|rated/.test(key) ? 'Công suất danh định' : 'Công suất tối đa',
    );
  if (/mo.men/.test(key))
    return field('torque', 'Động cơ và vận hành', 'Mô-men xoắn cực đại');
  if (/tang toc/.test(key))
    return field(
      'acceleration_' + (text.match(/0\s*[–-]\s*(\d+)/)?.[1] || 'unspecified'),
      'Động cơ và vận hành',
    );
  if (/toc do toi da/.test(key))
    return field('top_speed', 'Động cơ và vận hành');
  if (/dan dong/.test(key)) return field('drivetrain', 'Động cơ và vận hành');
  if (/hop so/.test(key)) return field('transmission', 'Động cơ và vận hành');
  if (/loai dong co/.test(key))
    return field('motor_type', 'Động cơ và vận hành');
  if (/dong co|che do lai/.test(key))
    return field(key.replace(/\W+/g, '_'), 'Động cơ và vận hành');
  if (/quang duong|nedc|wltp|pham vi|bang ga/.test(key)) {
    const standard = /nedc/.test(text)
      ? 'nedc'
      : /wltp/.test(text)
        ? 'wltp'
        : /hon hop/.test(text)
          ? 'mixed'
          : /ho tro dap/.test(key)
            ? 'pedal'
            : /bang ga/.test(key)
              ? 'throttle'
              : 'manufacturer';
    return field(
      'range_' +
        standard +
        (/\b1 pin\b|\bmot pin\b/.test(text)
          ? '_one_battery'
          : /\b2 pin\b|\bhai pin\b|pin phu/.test(text)
            ? '_with_optional_battery'
            : ''),
      'Quãng đường',
      standard === 'nedc'
        ? 'Quãng đường NEDC'
        : standard === 'wltp'
          ? 'Quãng đường WLTP'
          : label,
    );
  }
  if (/sac/.test(key)) {
    const percentages = text.match(/(\d+)\s*[%]?\s*[–-]\s*(\d+)\s*%/);
    const id = percentages
      ? `charge_time_${percentages[1]}_${percentages[2]}`
      : /\bac\b.*\bdc\b/.test(key)
        ? 'charge_ac_dc'
        : /\bac\b/.test(key)
          ? 'charge_ac'
          : /\bdc\b/.test(key)
            ? 'charge_dc'
            : /cong/.test(key)
              ? 'charge_connector'
              : 'charger';
    return field(id, 'Sạc');
  }
  if (/loai pin/.test(key)) return field('battery_chemistry', 'Pin');
  if (/pin kha dung|dung luong pin kha dung/.test(key))
    return field('battery_usable', 'Pin', 'Dung lượng pin khả dụng');
  if (/tong dung luong|gross/.test(key)) return field('battery_gross', 'Pin');
  if (/cau hinh ac quy/.test(key)) return field('battery_pack', 'Pin');
  if (/pin|ac quy|nang luong|^dung luong$/.test(key))
    return field(
      /phu/.test(key) ? 'battery_optional' : 'battery_configuration',
      'Pin',
    );
  if (/nhien lieu|khi thai|co2/.test(key))
    return field(key.replace(/\W+/g, '_'), 'Nhiên liệu và khí thải');
  if (/phanh truoc|treo|lop|la.zang|quay dau/.test(key))
    return field(key.replace(/\W+/g, '_'), 'Khung gầm');
  if (
    /abs|hsa|ebd|esc|tcs|rom|ba$|hdc|tui khi|an toan|canh bao|camera|cam bien|ngang doc/.test(
      key,
    )
  )
    return field(
      /cam bien.*sau|cam bien do/.test(key)
        ? 'parking_sensors'
        : key.replace(/\W+/g, '_'),
      'An toàn',
    );
  if (/man hinh|hien thi/.test(key))
    return field(
      /sau vo lang/.test(key)
        ? 'driver_display'
        : /led/.test(key)
          ? 'passenger_display'
          : 'display',
      'Công nghệ',
    );
  if (/\bchia khoa\b|\bkhoa\b/.test(key))
    return field('key', 'Công nghệ', 'Khóa xe');
  if (/ung dung|dinh vi|ket noi/.test(key))
    return field(key.replace(/\W+/g, '_'), 'Công nghệ');
  if (/loc.*(cabin|khong khi)/.test(key))
    return field('cabin_filter', 'Tiện nghi', 'Lọc không khí cabin');
  return field(key.replace(/\W+/g, '_'), 'Tiện nghi');
}
function splitSpecification(label, value) {
  if (/\(mm\)/.test(label) && !/mm/.test(value)) value += ' mm';
  if (label === 'Pin' && /^LFP/.test(value))
    return [
      ['Loại pin', 'LFP'],
      ['Dung lượng pin', value.replace(/^LFP\s*[·;]?\s*/, '')],
    ];
  if (
    /^(ABS|BA|EBD|ESC|TCS|HSA|ROM|HDC)([,/ ]+(ABS|BA|EBD|ESC|TCS|HSA|ROM|HDC))*$/.test(
      value,
    )
  )
    return value.split(/[,/ ]+/).map((code) => [code, 'Có']);
  if (/^Sạc AC \/ DC/.test(label)) {
    const parts = value.split('/').map((part) => part.trim());
    if (parts.length === 2)
      return [
        ['Sạc AC tối đa', parts[0] + (/kW/.test(parts[0]) ? '' : ' kW')],
        ['Sạc DC tối đa', parts[1]],
      ];
  }
  if (label === 'HSA / ABS')
    return [
      ['HSA', value],
      ['ABS', value],
    ];
  if (label === 'Công suất / mô-men xoắn') {
    const parts = value.split(' / ');
    return [
      ['Công suất tối đa', parts[0]],
      ['Mô-men xoắn', parts[1]],
    ];
  }
  if (label === 'Hộp số / dẫn động') {
    const parts = value.split(' / ');
    return [
      ['Hộp số', parts[0]],
      ['Dẫn động', parts[1]],
    ];
  }
  if (label === 'Pin LFP')
    return [
      ['Loại pin', 'LFP'],
      ['Dung lượng pin', value],
    ];
  if (
    [
      'Trang bị',
      'Trang bị theo phiên bản',
      'Tiện nghi theo phiên bản',
      'Tiện nghi được giới thiệu',
      'Ngoại thất',
      'Nội thất',
      'Giải trí',
      'An toàn',
      'Hỗ trợ an toàn',
      'Tiện ích',
      'Tùy chọn',
    ].includes(label)
  ) {
    return String(value)
      .split(/;\s*/)
      .map((part, i) => {
        if (/^\d+\s+túi khí$/i.test(part))
          return ['Túi khí', part.match(/^\d+/)[0]];
        if (/^\d+\s+loa$/i.test(part)) return ['Hệ thống loa', part];
        const match = part.match(
          /^(Màn hình|Điều hòa|Mâm|Đèn|Phanh|Ứng dụng|Khối lượng gồm ắc quy|Công suất danh định|Tải trọng)\s+(.+)$/i,
        );
        return match
          ? [
              match[1],
              match[2] +
                (/phiên bản|Tùy chọn/.test(label)
                  ? ' (tùy phiên bản/trang bị)'
                  : ''),
            ]
          : [
              part,
              /Tùy chọn|phiên bản/.test(label)
                ? 'Tùy phiên bản/trang bị'
                : 'Có',
            ];
      });
  }
  return [[label, value]];
}
export function getSpecificationFields(model, variantIndex = 0) {
  const selected = model.variants[variantIndex];
  const fields = new Map();
  const insert = (row, variantSpecific, source = model.source) => {
    source = row[2] || source;
    for (let [label, value] of splitSpecification(...row)) {
      if (value == null || /Theo cấu hình xe/.test(value)) continue;
      const meta = specificationField(label, value);
      const existing = fields.get(meta.id);
      const alternatives = existing
        ? [...(existing.alternatives || []), { label, value, source }]
        : [];
      // Phiên bản là thẩm quyền cao nhất; bản tóm tắt không sinh thêm dòng trùng.
      if (
        !existing ||
        variantSpecific ||
        String(value).length > String(existing.value).length
      )
        fields.set(meta.id, {
          ...meta,
          value,
          source,
          verifiedDate: model.sourceDate,
          variant: selected.id,
          alternatives,
        });
      else existing.alternatives = alternatives;
    }
  };
  model.groups.forEach((group) =>
    group.rows.forEach((row) =>
      insert(row, false, group.source || model.source),
    ),
  );
  selected.quick.forEach((row) => insert(row, true));
  selected.rows.forEach((row) => insert(row, true));
  return [...fields.values()];
}
export const specificationGroupOrder = [
  'Kích thước',
  'Động cơ và vận hành',
  'Quãng đường',
  'Pin',
  'Sạc',
  'Khung gầm',
  'An toàn',
  'Công nghệ',
  'Tiện nghi',
  'Nhiên liệu và khí thải',
];
// VF 9: brochure CATL Việt Nam, trang 14. Không áp dụng sang VF 8 hay đời pin khác.
const vf9Brochure = get('vf9').additionalSources[0];
get('vf9').groups.push({
  title: 'Khung gầm',
  source: vf9Brochure,
  rows: [
    ['Dài × rộng × cao', '5.119 × 2.254 × 1.697 mm (theo brochure)'],
    ['Cấu hình động cơ', '2 motor × 150 kW'],
    ['Tốc độ tối đa', '200 km/h'],
    ['Khoang hành lý sau', '212 L; 926 L khi gập hàng ghế cuối'],
    ['Khoang hành lý trước', '100 L'],
    ['Tải trọng hành lý nóc', '75 kg'],
    ['Chế độ lái', 'Eco / Normal / Sport'],
    [
      'Treo trước / sau',
      'Tay đòn kép độc lập / liên kết đa điểm, giảm chấn khí nén',
    ],
    ['Phanh trước / sau', 'Đĩa thông gió / đĩa thông gió'],
    ['Phanh tái sinh', 'Tắt / thấp / trung bình / cao'],
  ],
});
get('vf9').variants[0].rows.push(
  ['Khoảng sáng gầm', '174 mm (không tải)'],
  ['Khối lượng không tải', '2.911 kg'],
  ['Tải trọng', '550 kg'],
  ['La-zăng', '20 inch, hợp kim'],
);
get('vf9').variants[1].rows.push(
  ['Khoảng sáng gầm', '184 mm (không tải)'],
  ['Khối lượng không tải', '2.968 kg (7 chỗ)'],
  ['Tải trọng', '550 kg (7 chỗ)'],
  ['La-zăng', '21 inch, hợp kim'],
);
get('vf9').note +=
  ' Các trường khung gầm bổ sung thuộc brochure CATL; bản Plus đang trình bày cấu hình 7 chỗ.';

// Tách thông tin ghép để hóa học pin, dung lượng, thời gian sạc không xuất hiện hai lần.
for (const model of vehicleSpecifications) {
  model.reviewedDate = '2026-11-15';
  model.conflicts = [];
  for (const group of model.groups) {
    group.rows = group.rows.flatMap(([label, value]) => {
      if (label === 'Cấu hình năng lượng' && String(value).startsWith('LFP ')) {
        return [
          ['Loại pin', 'LFP'],
          ['Dung lượng pin', value.slice(4).split('; sạc')[0]],
        ];
      }
      if (model.id === 'evo-lite-neo' && label === 'Cấu hình năng lượng')
        return [['Cấu hình ắc quy', '5 bình 12 V / 21 Ah mắc nối tiếp']];
      if (model.id === 'evo-grand-limited' && label === 'Trang bị') return [];
      if (model.id === 'amio-s' && label === 'Trang bị')
        return [['Màn hình', 'LED màu']];
      return [[label, value]];
    });
  }
  if (
    [
      'amio',
      'amio-s2',
      'flazz',
      'flazz-max',
      'zgoo',
      'evo-lite',
      'evo-grand-lite',
    ].includes(model.id)
  )
    model.conflicts.push(
      'Trang hãng ghi tăng tốc 0–50 km/h trong khi tốc độ tối đa dưới 50 km/h; không sử dụng chỉ số tăng tốc này.',
    );
  if (model.id === 'vf9')
    model.conflicts.push(
      'Trang sản phẩm ghi 402 hp / 300 hp cho Plus; dùng 300 kW theo brochure CATL đã đối chiếu.',
    );
  if (model.id === 'drgnfly')
    model.conflicts.push(
      'Trang sản phẩm ghi sạc 5 giờ, dữ liệu shop ghi hơn 5 giờ; giữ ghi chú nguồn, chưa coi là một điều kiện sạc thống nhất.',
    );
  if (model.historical)
    model.missing = [
      ...new Set([
        ...model.missing,
        'CO₂ (g/km), tốc độ tối đa; gia tốc nếu chưa có dữ liệu theo cấu hình',
      ]),
    ];
  model.status = model.missing.length ? 'PARTIAL' : 'COMPLETE';
}
// Các mô tả trang bị đọc lại từ hãng bổ sung cho bảng, không suy số liệu từ hình ảnh.
for (const model of vehicleSpecifications) {
  const rows = vehicleFeatureResearch
    .filter((item) => item.model === model.id)
    .flatMap((item) => {
      if (item.title === 'Hệ thống chiếu sáng')
        return [['Đèn pha', item.description]];
      if (item.title === 'Phanh tái sinh') return [['Phanh tái sinh', 'Có']];
      if (item.title === 'Hệ thống phanh')
        return [['Hệ thống phanh', 'Phanh cơ']];
      if (item.title === 'Hệ thống giảm xóc')
        return [['Giảm xóc', 'Giảm chấn thủy lực']];
      if (item.title === 'Màn hình')
        return [
          [
            'Màn hình',
            item.description.replace(/^Màn hình /, '').replace(/\.$/, ''),
          ],
        ];
      if (item.title === 'Khóa cơ') return [['Khóa', 'Khóa cơ']];
      if (model.id === 'evo-lite-neo' && item.title === 'Không gian chứa đồ')
        return [['Dung tích cốp', '17 L']];
      return [];
    });
  if (rows.length)
    model.groups.push({ title: 'Trang bị', rows, source: model.source });
}
supplement('viper', [
  ['Công suất tối đa', '3.000 W'],
  ['Tốc độ tối đa', '70 km/h (1 người 65 kg, Sport)'],
  ['Xác thực pin', 'Có'],
]);
// Gắn nguồn brochure cho các trường phiên bản được đối chiếu từ bảng CATL.
for (const version of get('vf9').variants)
  for (const row of version.rows) row[2] = vf9Brochure;
supplement('kinet', [
  ['Giảm xóc', 'Giảm chấn thủy lực'],
  ['Hỗ trợ ngang dốc', 'Auto hold'],
]);
get('amio-s').conflicts.push(
  'Chú thích nguồn ghi thử quãng đường ở 30 km/h nhưng tốc độ tối đa 25 km/h; chưa xác nhận điều kiện đo.',
);
// Bổ sung brochure cùng thị trường; giữ số liệu mới hơn khi brochure còn để trống.
const brochureSupplements = [
  {
    id: 'vf5',
    source:
      'https://static-cms-prod.vinfastauto.com/09042026-brochure-vf-5.pdf',
    rows: [
      ['Khoảng sáng gầm', '160 mm (không tải)'],
      ['Khoang hành lý sau', '331 L; 1.015 L khi gập hàng ghế cuối'],
      ['Khối lượng không tải', '1.340 kg'],
      ['Tải trọng', '325 kg'],
      ['Tăng tốc 0–100 km/h', '12 giây'],
      ['Dẫn động', 'FWD'],
      ['Chế độ lái', 'Eco / Sport'],
      ['Treo trước / sau', 'MacPherson / dầm xoắn'],
      ['Phanh trước / sau', 'Đĩa thông gió / đĩa'],
      ['La-zăng', 'Hợp kim 17 inch'],
      ['Trợ lực lái', 'Điện EPS'],
      ['Ghế lái', 'Chỉnh cơ 6 hướng'],
      ['Ghế phụ', 'Chỉnh cơ 4 hướng'],
      ['Chất liệu ghế', 'Giả da'],
      ['Màn hình sau vô lăng', '7 inch'],
      ['Loại pin', 'LFP'],
    ],
  },
  {
    id: 'vf7',
    source:
      'https://static-cms-prod.vinfastauto.com/statics/shared/10042026-Brochur-%20VF-7.pdf',
    rows: [
      ['Khoảng sáng gầm', '190 mm (không tải)'],
      ['Treo trước / sau', 'MacPherson / liên kết đa điểm'],
      ['Chế độ lái', 'Eco / Normal / Sport'],
      ['Ghế lái', 'Chỉnh điện 8 hướng'],
      ['Chất liệu ghế', 'Da nhân tạo'],
    ],
  },
  {
    id: 'ec-van',
    source:
      'https://static-cms-prod.vinfastauto.com/brochure-ec-van-040726-e.pdf',
    rows: [
      ['Kích thước khoang hàng', '1.600 × 1.500 × 1.195 mm'],
      ['Khoảng sáng gầm', '165 mm (không tải)'],
      ['Bán kính quay vòng', '4,85 m'],
      ['Tải trọng', '650 kg'],
      ['Số chỗ', '2'],
      ['Lốp', '175/80 R14'],
      ['Treo trước / sau', 'MacPherson / nhíp lá'],
      ['Phanh trước / sau', 'Đĩa / tang trống'],
      ['Trợ lực lái', 'Có'],
      ['Dẫn động', 'RWD'],
      ['Cổng sạc', 'CCS2'],
      ['Phanh tái sinh', 'Có'],
    ],
  },
];
for (const item of brochureSupplements) {
  const model = get(item.id);
  model.additionalSources = [
    ...new Set([...(model.additionalSources || []), item.source]),
  ];
  model.groups.push({
    title: 'Thông số brochure',
    source: item.source,
    rows: item.rows,
  });
}
get('vf7').variants.forEach((version, index) => {
  const source = brochureSupplements[1].source;
  version.rows.push(
    ['La-zăng', index === 0 ? '19 inch' : '20 inch', source],
    ['Dẫn động', index === 2 ? 'AWD' : 'FWD', source],
    ['Sạc 10–70%', `${[25, 28, 37][index]} phút`, source],
  );
});
get('vf7').conflicts.push(
  'Brochure 04/2026 chưa cập nhật quãng đường Plus/Plus AWD; giữ giá trị từ trang sản phẩm mới hơn.',
);
get('ec-van').conflicts.push(
  'Brochure 07/2026 ghi pin khả dụng 18,3 kWh; trang sản phẩm ghi 18,23 kWh. Giữ dữ liệu trang sản phẩm, chưa kết luận đây chỉ là làm tròn.',
);
get('ec-van').missing.push(
  'Trang bị theo bản cơ bản, nâng cao và nâng cao có cửa trượt chưa đối chiếu đầy đủ',
);
// Thông số bổ sung có nguồn hãng (data/spec-additions.js), áp dụng trước khi tính trạng thái.
for (const { id, rows, source, date } of specAdditions) {
  const model = get(id);
  if (!model) throw new Error(`spec-additions: không có xe "${id}"`);
  model.groups.push({
    title: 'Thông tin bổ sung đã đối chiếu',
    source,
    rows,
  });
  if (!model.sourceDate || date > model.sourceDate) model.sourceDate = date;
}
// Dữ liệu giữ nguyên chưa đồng nghĩa hồ sơ kỹ thuật toàn diện đã hoàn tất.
for (const model of vehicleSpecifications) {
  const fields = getSpecificationFields(model);
  const missing = [...model.missing];
  if (!fields.some((field) => field.id === 'top_speed'))
    missing.push('Tốc độ tối đa theo cấu hình hiện tại');
  if (!fields.some((field) => field.id.startsWith('acceleration_')))
    missing.push('Gia tốc và điều kiện đo theo cấu hình');
  if (!fields.some((field) => field.group === 'Khung gầm'))
    missing.push('Thông số treo, phanh và lốp chi tiết');
  if (model.historical)
    missing.push('Khối lượng, CO₂ và năm áp dụng theo hồ sơ lịch sử');
  else if (!fields.some((field) => field.id.startsWith('charge_time_')))
    missing.push('Thời gian sạc và phần trăm pin đầu/cuối');
  model.missing = [...new Set(missing)];
  model.status =
    model.missing.length || model.conflicts.length ? 'PARTIAL' : 'COMPLETE';
}
