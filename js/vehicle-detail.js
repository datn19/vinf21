// Module này chỉ được nạp bởi các trang chi tiết xe, không nạp ở trang chủ.
import './app.js';
import { vehicleViewers } from '../data/vehicle-viewers.js';
import { colorGalleryMarkup, initColorGallery } from './color-gallery.js';
import { localURL } from './routes.js';
import { mountVehicleViewer } from './vehicle-viewer.js';
import { exteriorColors } from '../data/exterior-colors.js';
import { mountExteriorColors } from './exterior-colors.js';
import { mountVehicleSpecifications } from './vehicle-specifications.js';
import { mountVehicleFeatures } from './vehicle-features.js';

const id =
  document.body.dataset.page === 'product'
    ? new URLSearchParams(location.search).get('id')
    : document.body.dataset.page;
const config = vehicleViewers.find((item) => item.id === id);
const main = document.querySelector('main');
if (config) {
  const specificationStyles = document.createElement('link');
  specificationStyles.rel = 'stylesheet';
  specificationStyles.href = localURL('css/vehicle-specifications.css');
  document.head.append(specificationStyles);
  let root = main.querySelector('[data-color-gallery]');
  let stage = root?.querySelector('.color-gallery-stage');
  let swatches = root?.querySelector('.swatches');
  let name = root?.querySelector('[data-color-name]');
  if (id === 'viper') {
    root = main.querySelector('.viper-colors');
    stage = root.querySelector('[data-viper-colors]');
    swatches = root.querySelector('.swatches');
    name = root.querySelector('[data-viper-color-name]');
  } else if (id === 'kinet') {
    root = main.querySelector('.configuration');
    stage = root.querySelector('.vehicle-stage');
    swatches = root.querySelector('.swatches');
    name = root.querySelector('#selection');
  }
  if (!root) {
    root = document.createElement('section');
    root.className = 'container vehicle-configurator';
    const colors = config.colors.map((item) => ({
      ...item,
      image: localURL(item.image),
    }));
    root.innerHTML =
      `<h2>Khám phá ${config.name}</h2>` +
      (colors.length
        ? colorGalleryMarkup(id, colors)
        : `<div class="vehicle-still"><img src="${localURL(config.image)}" alt="${config.name}" loading="lazy" /></div>`);
    const firstSection = main.querySelector('section');
    if (firstSection) firstSection.after(root);
    else main.append(root);
    if (colors.length)
      initColorGallery(root.querySelector('[data-color-gallery]'), colors);
    stage = root.querySelector('.color-gallery-stage, .vehicle-still');
    swatches = root.querySelector('.swatches');
    name = root.querySelector('[data-color-name]');
  }
  const palette = exteriorColors[id];
  let elements = { stage, swatches, name };
  if (palette) elements = mountExteriorColors(root, config, palette, elements);
  mountVehicleViewer(
    root,
    palette
      ? {
          ...config,
          colors: palette.colors,
          missing: 'Chưa có dữ liệu 3D hoặc ảnh đủ 360° đã xác minh.',
        }
      : config,
    elements,
  );
  mountVehicleSpecifications(main, config);
  mountVehicleFeatures(main, config);
  unifyVehicleLayout(main, root, config, elements);
}

function unifyVehicleLayout(main, root, config, { stage, swatches, name }) {
  let previousContainer = root;
  while (previousContainer.parentElement !== main)
    previousContainer = previousContainer.parentElement;
  const notes = document.createElement('section');
  notes.className = 'container vehicle-reference-notes';
  notes.innerHTML = '<h2>Thông tin tham khảo</h2>';
  // Di chuyển chính các node để giữ listener, trạng thái tải và nguồn ảnh.
  for (const note of root.querySelectorAll('.viewer-note')) notes.append(note);
  const controls = [
    ...root.querySelectorAll('.viewer-controls, .viewer-modes'),
  ];
  const interactive = root.querySelector('.viewer-interactive');
  const title = document.createElement('h1');
  title.textContent = config.name;
  const preview = document.createElement('p');
  preview.className = 'vehicle-preview-label';
  preview.setAttribute('role', 'status');
  const nodes = [stage, interactive, swatches, name, ...controls].filter(
    Boolean,
  );
  nodes.forEach((node) => node.remove());
  root.querySelectorAll('h1, h2, .eyebrow').forEach((node) => node.remove());
  for (const child of [...root.children]) {
    if (child.textContent.trim() || child.querySelector('img, a, button'))
      notes.append(child);
  }
  root.replaceChildren(title, stage);
  if (interactive) root.append(interactive);
  if (swatches) root.append(swatches);
  if (name) root.append(name);
  root.append(preview, ...controls);
  root.className = 'container vehicle-configurator';
  const updatePreview = () => {
    const state = root.dataset.previewState;
    preview.textContent =
      state === 'approximate'
        ? 'Màu mô phỏng gần đúng'
        : state === 'unavailable'
          ? 'Chưa có ảnh màu này · đang hiển thị ảnh tham chiếu'
          : state === 'loading'
            ? 'Đang tải ảnh…'
            : '';
  };
  new MutationObserver(updatePreview).observe(root, {
    attributes: true,
    attributeFilter: ['data-preview-state'],
  });
  updatePreview();
  const top = document.createElement('section');
  top.className = 'vehicle-product-top';
  top.append(root, main.querySelector('[data-vehicle-summary]'));
  const breadcrumb = main.querySelector(':scope > .breadcrumb');
  if (breadcrumb) top.prepend(breadcrumb);
  main.prepend(top);
  if (
    previousContainer !== root &&
    !previousContainer.querySelector('img, video, table, button, form')
  )
    notes.append(previousContainer);
  const technical = main.querySelector('[data-vehicle-technical]');
  top.after(technical);
  technical.after(main.querySelector('[data-vehicle-features]'));
  // Banner giới thiệu cũ vẫn ở phần nội dung phía dưới; chỉ còn một h1 đầu trang.
  for (const heading of main.querySelectorAll('h1')) {
    if (heading === title) continue;
    const replacement = document.createElement('h2');
    replacement.className = heading.className;
    replacement.append(...heading.childNodes);
    heading.replaceWith(replacement);
  }
  main.append(notes);
}
