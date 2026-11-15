import { vehicleSpecifications } from '../data/vehicle-specifications.js';
import { localURL } from './routes.js';
import { money } from '../data/products.js';

const element = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text != null) node.textContent = String(text);
  if (className) node.className = className;
  return node;
};
function table(rows) {
  const result = element('table');
  const body = element('tbody');
  for (const [label, value] of rows) {
    const row = element('tr');
    const heading = element('th', label);
    heading.scope = 'row';
    row.append(heading, element('td', value));
    body.append(row);
  }
  result.append(body);
  return result;
}
export function mountVehicleSpecifications(main, viewer) {
  const model = vehicleSpecifications.find((item) => item.id === viewer.id);
  if (!model) return;
  main.classList.add('vehicle-detail-layout');
  // Giữ các gallery/màu xe; chỉ thay khối phiên bản và bảng thông số.
  const oldSpecs = [...main.querySelectorAll('section')].find(
    (section) =>
      section.querySelector('table') &&
      /Thông số/.test(section.querySelector('h2')?.textContent || ''),
  );
  const specifications = element(
    'section',
    null,
    'container vehicle-technical',
  );
  specifications.id = oldSpecs?.id || 'vehicle-technical';
  specifications.dataset.vehicleTechnical = model.id;
  const oldVersions =
    main
      .querySelector('[data-vf3-scenes], [data-vf7-scenes], [data-suv-scenes]')
      ?.closest('section') ||
    (model.id === 'vf6'
      ? main.querySelector('.configuration')
      : main.querySelector('#product-summary'));
  const summary = element('section', null, 'container vehicle-summary');
  summary.id = oldVersions?.id || 'vehicle-summary';
  summary.dataset.vehicleSummary = model.id;
  summary.append(
    element(
      'p',
      model.historical ? 'HỒ SƠ XE LỊCH SỬ' : 'KHÁM PHÁ PHIÊN BẢN',
      'vehicle-kicker',
    ),
    element('h2', model.variants.length > 1 ? 'Chọn phiên bản' : model.name),
  );
  const choices = element('div', null, 'vehicle-variant-choices');
  choices.setAttribute('role', 'group');
  choices.setAttribute('aria-label', 'Chọn phiên bản ' + model.name);
  choices.hidden = model.variants.length === 1;
  const content = element('div', null, 'vehicle-summary-content');
  const loading = element('p', '', 'vehicle-source-note');
  loading.setAttribute('role', 'status');
  summary.append(choices, content, loading);
  if (oldVersions) oldVersions.replaceWith(summary);
  else main.querySelector('section')?.after(summary);
  main.querySelector('section')?.after(summary);
  if (oldSpecs && oldSpecs !== oldVersions && oldSpecs.isConnected)
    oldSpecs.replaceWith(specifications);
  else summary.after(specifications);
  const buttons = model.variants.map((variant, index) => {
    const button = element('button', variant.name);
    button.type = 'button';
    button.dataset.specVariant = index;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => select(index));
    choices.append(button);
    return button;
  });
  let request = 0;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  async function select(index) {
    const pending = ++request;
    const variant = model.variants[index];
    loading.textContent = 'Đang chuẩn bị phiên bản…';
    const image = new Image();
    image.src = localURL(variant.image || viewer.image);
    image.alt = `${model.name} — ${variant.image ? variant.name : 'ảnh tham chiếu chung, chưa có ảnh riêng phiên bản'}`;
    try {
      await image.decode();
    } catch {
      if (pending === request)
        loading.textContent =
          'Không tải được ảnh phiên bản; giữ thông tin đang xem.';
      return;
    }
    if (pending !== request) return;
    const next = element('div', null, 'vehicle-summary-scene');
    const description = element('div');
    description.append(
      element(
        'h3',
        model.variants.length > 1
          ? `${model.name} · ${variant.name}`
          : model.name,
      ),
    );
    description.append(
      element(
        'p',
        variant.price != null
          ? money(variant.price)
          : 'Giá: chưa xác minh theo phiên bản/thời điểm',
        'vehicle-summary-price',
      ),
    );
    const quick = element('dl', null, 'vehicle-quick-stats');
    for (const [label, value] of [
      ...variant.quick,
      ...variant.rows.slice(0, 2),
    ].slice(0, 4)) {
      const item = element('div');
      item.append(element('dt', label), element('dd', value));
      quick.append(item);
    }
    description.append(quick);
    next.append(image, description);
    // Ảnh đã decode mới cập nhật cùng tên, giá và bảng; không xóa khung lúc chờ tải.
    content.replaceChildren(next);
    if (!motion.matches)
      next.animate([{ opacity: 0.65 }, { opacity: 1 }], {
        duration: 250,
        easing: 'ease-out',
      });
    buttons.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(i === index)),
    );
    summary.dataset.selectedVariant = String(index);
    specifications.replaceChildren(element('h2', 'Thông số kỹ thuật'));
    const layout = element('div', null, 'vehicle-technical-grid');
    const visual = element('figure');
    const illustration = image.cloneNode();
    visual.append(
      illustration,
      element('figcaption', 'Ảnh tham khảo · trang bị tùy phiên bản'),
    );
    const information = element('div');
    information.append(
      element('h3', variant.name),
      table([...variant.quick, ...variant.rows]),
    );
    for (const group of model.groups) {
      const details = element('details');
      details.open = model.groups.indexOf(group) === 0;
      details.append(element('summary', group.title), table(group.rows));
      information.append(details);
    }
    layout.append(visual, information);
    specifications.append(layout);
    const source = element('a', 'Thông tin từ VinFast');
    source.href = model.source;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    const note = element(
      'p',
      `${model.historical ? 'Xe đã dừng kinh doanh mới. ' : ''}Dữ liệu tham chiếu ngày ${model.sourceDate}. Giá không phải báo giá. Quãng đường, thời gian sạc phụ thuộc điều kiện thử nghiệm. ${model.note}`,
      'vehicle-source-note',
    );
    const missing = element(
      'p',
      `Chưa đủ dữ liệu: ${model.missing.join('; ')}.`,
      'vehicle-source-note',
    );
    missing.hidden = model.missing.length === 0;
    specifications.append(note, missing, source);
    for (const url of model.additionalSources || []) {
      const brochure = element('a', ' · Brochure đối chiếu');
      brochure.href = url;
      brochure.target = '_blank';
      brochure.rel = 'noopener noreferrer';
      specifications.append(brochure);
    }
    loading.textContent = variant.image
      ? ''
      : 'Ảnh tham chiếu chung; chưa có ảnh riêng cho cấu hình này.';
  }
  select(0);
}
