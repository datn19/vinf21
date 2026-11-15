import {
  vehicleSpecifications,
  getSpecificationFields,
  specificationGroupOrder,
} from '../data/vehicle-specifications.js';
import { localURL } from './routes.js';
import { money } from '../data/products.js';

// Nét SVG dùng chung, chỉ mang tính trang trí; tên nhóm là nhãn truy cập.
const groupIcons = [
  'M4 8h16v10H4z M7 8V5h10v3 M8 12h8 M8 15h4',
  'M5 7h14v13H5z M9 7V4h6v3 M9 13h6 M12 10v6',
  'M13 2 5 14h6l-1 8 9-13h-6z',
  'M5 19V5h7l3 4h5v10 M5 5h7 M5 19h15',
  'M4 7h16v10H4z M7 4v3 M17 4v3 M7 17v3 M17 17v3',
  'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z M8 12l3 3 5-6',
  'M3 4h18v13H3z M8 21h8 M12 17v4',
  'M6 3v11h12v7 M6 9h9v5 M3 14h3v7',
  'M3 7h18v10H3z M7 7v4 M11 7v3 M15 7v4 M19 7v3',
  'M5 3h9v18H5z M5 9h9 M14 7h3l3 4v7h-3v-6',
];
function categoryHeading(title, index) {
  const heading = element('h3', null, 'vehicle-spec-category');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svg.namespaceURI, 'path');
  path.setAttribute('d', groupIcons[index]);
  svg.append(path);
  heading.append(svg, element('span', title));
  return heading;
}

const element = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text != null) node.textContent = String(text);
  if (className) node.className = className;
  return node;
};
function table(rows) {
  const result = element('table');
  const body = element('tbody');
  for (const item of rows) {
    const [label, value] = Array.isArray(item)
      ? item
      : [item.label, item.value];
    const row = element('tr');
    if (item.id) row.dataset.specField = item.id;
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
    element(
      'h2',
      model.variants.length > 1 ? 'Chọn phiên bản' : 'Phiên bản & giá',
    ),
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
  // Đưa toàn bộ cấu hình lên trước bảng; giữ nguyên node và các listener đang có.
  const viewerRoot = main.querySelector('[data-vehicle-viewer]');
  let configurator = viewerRoot;
  while (configurator?.parentElement && configurator.parentElement !== main)
    configurator = configurator.parentElement;
  if (configurator && configurator !== summary) summary.after(configurator);
  (configurator || summary).after(specifications);
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
    const information = element('div', null, 'vehicle-spec-information');
    const fields = getSpecificationFields(model, index);
    const groups = [
      ...specificationGroupOrder.filter((title) => title !== 'Kích thước'),
      'Kích thước',
    ];
    for (const title of groups) {
      const rows = fields.filter((field) => field.group === title);
      if (!rows.length) continue;
      const groupBlock = element('div', null, 'vehicle-spec-group');
      const fieldTable = table(rows);
      fieldTable.className = 'vehicle-spec-fields';
      fieldTable.setAttribute('aria-label', title);
      groupBlock.append(
        categoryHeading(
          title === 'Động cơ và vận hành' ? 'Động cơ & vận hành' : title,
          [
            'Động cơ và vận hành',
            'Pin',
            'Sạc',
            'Quãng đường',
            'Khung gầm',
            'An toàn',
            'Công nghệ',
            'Tiện nghi',
            'Kích thước',
            'Nhiên liệu và khí thải',
          ].indexOf(title),
        ),
        fieldTable,
      );
      information.append(groupBlock);
    }
    specifications.append(information);
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
    main.dispatchEvent(
      new CustomEvent('vehiclevariantchange', { detail: { index } }),
    );
  }
  select(0);
}
