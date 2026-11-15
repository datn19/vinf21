import {
  vehicleSpecifications,
  getSpecificationFields,
} from './vehicle-specifications.js';
import { vehicleFeatureResearch } from './vehicle-feature-research.js';
import { vehicleViewers } from './vehicle-viewers.js';
import { products } from './products.js';
import { newCars } from './new-cars.js';

// Tái sử dụng đúng snapshot đã kiểm chứng, không suy tính năng giữa các đời xe.
// Ảnh tổng thể chỉ minh họa mẫu xe; thiếu ảnh chi tiết được ghi rõ trong checklist.
const detailImages = {
  kinet: {
    'Màn hình': 'assets/kinet/screen.webp',
    Cốp: 'assets/kinet/storage.webp',
  },
  vf6: { 'Màn hình': 'assets/vf6/interior.webp' },
};
// Chỉ khai báo ảnh đang tồn tại và đã có nguồn trong manifest của chính mẫu xe.
const modelImagery = {
  vf2: ['assets/vf2/front.webp', 'assets/vf2/interior.webp'],
  vf3: ['assets/vf3/front.webp', 'assets/vf3/interior.webp'],
  vf5: ['assets/vf5/exterior.webp', 'assets/vf5/interior.webp'],
  vf6: ['assets/vf6/gallery-1.webp', 'assets/vf6/interior.webp'],
  vf7: ['assets/vf7/body.webp', 'assets/vf7/interior.webp'],
  vf8: ['assets/vf8/body.webp', 'assets/vf8/interior.webp'],
  vf9: ['assets/vf9/gallery-1.webp', 'assets/vf9/interior.webp'],
  'vf8-new': ['assets/vf8-new/front.webp', 'assets/vf8-new/interior.webp'],
  'vf-mpv7': ['assets/vf-mpv7/exterior-1.webp', 'assets/vf-mpv7/interior.webp'],
  fadil: [
    'assets/extended/fadil/exterior.webp',
    'assets/extended/fadil/interior.webp',
  ],
  'lux-a': [
    'assets/extended/lux-a/exterior.webp',
    'assets/extended/lux-a/interior.webp',
  ],
  president: [
    'assets/extended/president/exterior.webp',
    'assets/extended/president/interior.webp',
  ],
  ebus: [
    'assets/extended/ebus/exterior.webp',
    'assets/extended/ebus/interior-school.webp',
  ],
};
Object.assign(detailImages, {
  viper: {
    'Màn hình': 'assets/viper/screen.webp',
    'Dung tích cốp': 'assets/viper/storage.webp',
  },
  'evo-grand': {
    'Dung tích cốp': 'assets/evo-grand/storage.webp',
    'Loại pin': 'assets/evo-grand/battery.webp',
    'Công suất tối đa': 'assets/evo-grand/motor.webp',
  },
  'evo-grand-premia': {
    'Dung tích cốp': 'assets/premia/storage.webp',
    'Loại pin': 'assets/premia/battery.webp',
    'Khóa xe': 'assets/premia/key.webp',
    'Màn hình': 'assets/premia/screen.webp',
  },
});
detailImages.kinet['Dung tích cốp'] = detailImages.kinet.Cốp;
function featureImage(id, title, category, fallback) {
  const detail = detailImages[id]?.[title];
  const gallery =
    modelImagery[id]?.[/Công nghệ|Tiện nghi/.test(category) ? 1 : 0];
  return {
    image: detail || gallery || fallback,
    imageKind: detail
      ? 'detail'
      : gallery
        ? 'model-gallery'
        : 'model-reference',
    imageNote: detail
      ? 'Ảnh chi tiết tham khảo'
      : gallery
        ? 'Ảnh gallery đúng mẫu; trang bị tùy phiên bản'
        : 'Ảnh đại diện đúng mẫu xe',
  };
}
const illustratedFeatures = {
  vf6: [
    [
      'Thiết kế',
      'led',
      'Dải đèn định vị LED',
      'Dải đèn mang nhận diện cánh chim VinFast.',
    ],
    [
      'Công nghệ',
      'headlight',
      'Đèn pha tự động',
      'Trang bị trên phiên bản Plus.',
      'plus',
    ],
  ],
  kinet: [
    [
      'An toàn',
      'brake',
      'Hỗ trợ ngang dốc',
      'Auto hold hỗ trợ giữ xe khi khởi hành ngang dốc.',
    ],
    [
      'Thiết kế',
      'suspension',
      'Giảm chấn thủy lực',
      'Hệ thống giảm xóc sử dụng giảm chấn thủy lực.',
    ],
  ],
};
function category(label, scooter) {
  if (/phanh|ABS|HSA|Túi khí|An toàn|Cảm biến sau/i.test(label))
    return 'An toàn';
  if (
    /pin|sạc|ắc quy|năng lượng|Quãng đường|NEDC|WLTP|Phạm vi|bằng ga/i.test(
      label,
    )
  )
    return scooter ? 'Pin và quãng đường' : 'Pin và sạc';
  if (/động cơ|Công suất|Mô.men|Dẫn động|Tốc độ|Tăng tốc|Hộp số/i.test(label))
    return scooter ? 'Động cơ' : 'Hệ truyền động';
  if (/Màn hình|Hiển thị|Ứng dụng|Khóa|Khoá/i.test(label))
    return scooter ? 'Công nghệ và tiện ích' : 'Công nghệ';
  if (/Điều hòa|Lọc|Cốp|cốp|chỗ|Trang bị|Tiện nghi/i.test(label))
    return scooter ? 'Công nghệ và tiện ích' : 'Tiện nghi';
  if (/Dài|Kích thước|Chiều|Thiết kế|Lốp|gầm/i.test(label)) return 'Thiết kế';
  return null;
}
export const vehicleFeatures = vehicleSpecifications.map((model) => {
  const viewer = vehicleViewers.find((item) => item.id === model.id);
  const product = products.find(
    (item) => (item.detailPath || item.id) === model.id,
  );
  const scooter = product.group === 'scooter';
  const variants = model.variants.map((variant, variantIndex) => {
    const categories = new Map();
    const seen = new Set();
    for (const [
      name,
      file,
      title,
      description,
      variantId,
    ] of illustratedFeatures[model.id] || []) {
      if (variantId && variantId !== variant.id) continue;
      if (!categories.has(name)) categories.set(name, []);
      categories.get(name).push({
        title,
        description,
        image: `assets/${model.id}/${file}.webp`,
        imageKind: 'detail',
        imageNote: 'Ảnh trang bị tham khảo đúng mẫu xe',
        sources: [model.source],
        verifiedDate: model.sourceDate,
        verification: 'VERIFIED_EXISTING_DATA',
        variant: variant.name,
      });
    }
    if (newCars[model.id]?.features) {
      categories.set(
        'Thiết kế',
        newCars[model.id].features.map(([file, title, description]) => ({
          title,
          description,
          image: `assets/${model.id}/${file}.webp`,
          imageKind: 'detail',
          imageNote: 'Ảnh chi tiết tham khảo đúng mẫu xe',
          sources: [model.source],
          verifiedDate: model.sourceDate,
          verification: 'VERIFIED_EXISTING_DATA',
          variant: variant.name,
        })),
      );
    }
    for (const item of vehicleFeatureResearch.filter(
      (item) => item.model === model.id,
    )) {
      if (!categories.has(item.category)) categories.set(item.category, []);
      categories.get(item.category).push({
        title: item.title,
        description: item.description,
        ...featureImage(model.id, item.title, item.category, viewer.image),
        sources: [item.source],
        verifiedDate: item.verifiedDate,
        verification: 'VERIFIED_PRIMARY_SOURCE',
        variant: variant.name,
      });
      seen.add(item.title);
      const equivalentTitles = {
        'Không gian chứa đồ': 'Dung tích cốp',
        'Hệ thống giảm xóc': 'Hệ thống treo / giảm xóc',
        'Hệ thống phanh': 'Phanh trước / sau',
        'Hệ thống chiếu sáng': 'Đèn pha',
        'Khóa cơ': 'Khóa xe',
      };
      if (equivalentTitles[item.title]) seen.add(equivalentTitles[item.title]);
    }
    const rows = getSpecificationFields(model, variantIndex).map((field) => [
      field.label,
      field.value,
    ]);
    for (const [label, value] of rows) {
      if (!value || /chưa|Theo cấu hình|Đang cập nhật/i.test(value)) continue;
      const name = category(label, scooter);
      if (!name || seen.has(label)) continue;
      seen.add(label);
      if (!categories.has(name)) categories.set(name, []);
      const cards = categories.get(name);
      if (cards.length >= 3) continue;
      cards.push({
        title: label,
        description: String(value),
        ...featureImage(model.id, label, name, viewer.image),
        sources: [model.source, ...(model.additionalSources || [])],
        verifiedDate: model.sourceDate,
        verification: 'VERIFIED_EXISTING_DATA',
        variant: variant.name,
      });
    }
    const order = scooter
      ? [
          'Thiết kế',
          'Động cơ',
          'Pin và quãng đường',
          'An toàn',
          'Công nghệ và tiện ích',
        ]
      : [
          'Thiết kế',
          'Hệ truyền động',
          'Pin và sạc',
          'Công nghệ',
          'An toàn',
          'Tiện nghi',
        ];
    return order
      .filter((name) => categories.has(name))
      .map((name) => ({ name, cards: categories.get(name) }));
  });
  return {
    id: model.id,
    route: viewer.route,
    name: model.name,
    historical: model.historical,
    variants,
    status: variants.some((groups) => groups.length)
      ? 'PARTIAL'
      : 'MISSING DATA',
    limitation:
      'Nội dung dựa trên thông số đã đối chiếu; chưa đủ bộ ảnh riêng cho từng tính năng. Không coi ảnh tổng thể là ảnh chi tiết trang bị.',
  };
});
