import { vehicleViewers } from './vehicle-viewers.js';
import { products } from './products.js';
import { extendedProducts } from './extended-products.js';
import { newCars } from './new-cars.js';
import { specificationBaseline } from './vehicle-spec-baseline.js';

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
