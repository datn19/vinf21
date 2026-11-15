import { vehicleSpecifications } from './vehicle-specifications.js';
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
  const variants = model.variants.map((variant) => {
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
    const rows = [
      ...variant.rows,
      ...variant.quick,
      ...model.groups.flatMap((group) => group.rows),
    ];
    for (const [label, value] of rows) {
      if (!value || /chưa|Theo cấu hình|Đang cập nhật/i.test(value)) continue;
      const name = category(label, scooter);
      if (!name || seen.has(label)) continue;
      seen.add(label);
      if (!categories.has(name)) categories.set(name, []);
      const cards = categories.get(name);
      if (cards.length === 3) continue;
      const detail = detailImages[model.id]?.[label];
      cards.push({
        title: label,
        description: String(value),
        image: detail || viewer.image,
        imageKind: detail ? 'detail' : 'model-reference',
        imageNote: detail
          ? 'Ảnh chi tiết tham khảo'
          : `Ảnh tổng thể ${model.name}; chưa có ảnh riêng cho đặc điểm này`,
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
