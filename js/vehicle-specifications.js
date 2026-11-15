import {
  vehicleSpecifications,
  getSpecificationFields,
  specificationGroupOrder,
} from '../data/vehicle-specifications.js';
import { localURL } from './routes.js';
import { money } from '../data/products.js';
import { favoriteIds } from './favorite-store.js';

const element = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text != null) node.textContent = String(text);
  if (className) node.className = className;
  return node;
};
// Icon trang trí dùng chung; tên nhóm vẫn là nhãn đọc cho công cụ hỗ trợ.
const specificationIcons = {
  'Động cơ và vận hành': 'M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0',
  Pin: 'M5 7h14v14H5z M9 7V3h6v4 M9 14h6 M12 11v6',
  Sạc: 'm13 2-8 12h6l-1 8L19 9h-6z',
  'Quãng đường': 'M7 3 3 21 M17 3l4 18 M12 4v3 M12 11v3 M12 18v3',
  'Khung gầm': 'M4 7h16v10H4z M7 3v4 M17 3v4 M7 17v4 M17 17v4',
  'An toàn': 'm12 3-8 3v6c0 5 8 9 8 9s8-4 8-9V6z M8 12l3 3 5-6',
  'Công nghệ': 'M3 4h18v13H3z M8 21h8 M12 17v4',
  'Tiện nghi': 'M6 3v11h12v7 M6 9h9v5 M3 14h3v7',
  'Nhiên liệu và khí thải': 'M5 3h9v18H5z M5 9h9 M14 7h3l3 4v7h-3v-6',
};
function specificationHeading(title) {
  const heading = element('h3');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svg.namespaceURI, 'path');
  path.setAttribute('d', specificationIcons[title]);
  svg.append(path);
  heading.append(
    svg,
    element('span', title === 'Động cơ và vận hành' ? 'Động cơ & vận hành' : title),
  );
  return heading;
}
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
  // Đưa toàn bộ cấu hình lên trước bảng; giữ nguyên node và các listener đang có.
  const viewerRoot = main.querySelector('[data-vehicle-viewer]');
  let configurator = viewerRoot;
  while (configurator?.parentElement && configurator.parentElement !== main)
    configurator = configurator.parentElement;
  if (configurator && configurator !== summary) summary.after(configurator);
  (configurator || summary).after(specifications);
  const visual = element('figure');
  const illustration = new Image();
  illustration.src = localURL(viewer.image);
  illustration.alt = model.name + ' — hình tham chiếu kích thước';
  visual.append(
    illustration,
    element('figcaption', 'Ảnh tham chiếu, không phải bản vẽ theo tỉ lệ'),
  );
  const visualData = element('div');
  visual.append(visualData);
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
    const price = element(
      'p',
      variant.price != null
        ? money(variant.price)
        : '\u0047i\u00e1: ch\u01b0a x\u00e1c minh theo phi\u00ean b\u1ea3n/th\u1eddi \u0111i\u1ec3m',
      'vehicle-summary-price',
    );
    const favoriteButton = element('button');
    favoriteButton.type = 'button';
    favoriteButton.className = 'favorite-button vehicle-favorite-button';
    favoriteButton.dataset.favorite = model.id;
    favoriteButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>';
    function syncFavoriteButton() {
      const active = favoriteIds().has(model.id);
      favoriteButton.classList.toggle('is-favorite', active);
      favoriteButton.setAttribute('aria-pressed', String(active));
      favoriteButton.setAttribute('aria-label', active ? 'Bỏ khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích');
      favoriteButton.title = active ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích';
    }
syncFavoriteButton();
    const priceRow = element('div', null, 'vehicle-summary-price-row');
    priceRow.append(price, favoriteButton);
    description.append(priceRow);
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
    const information = element('div', null, 'vehicle-spec-information');
    const fields = getSpecificationFields(model, index);
    const dimensions = fields.filter((field) => field.group === 'Kích thước');
    visualData.replaceChildren(element('h3', 'Kích thước'), table(dimensions));
    visualData.hidden = !dimensions.length;
    for (const title of specificationGroupOrder.filter(
      (title) => title !== 'Kích thước',
    )) {
      const rows = fields.filter((field) => field.group === title);
      if (!rows.length) continue;
      const groupBlock = element('div', null, 'vehicle-spec-group');
      const content = element('div', null, 'vehicle-spec-content');
      content.append(table(rows));
      groupBlock.append(specificationHeading(title), content);
      information.append(groupBlock);
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
    main.dispatchEvent(
      new CustomEvent('vehiclevariantchange', { detail: { index } }),
    );
  }
  select(0);
}
