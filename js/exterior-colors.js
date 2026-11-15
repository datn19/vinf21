import { localURL } from './routes.js';
import { paintMasks } from '../data/paint-masks.js';
import { colorAuditDate } from '../data/exterior-colors.js';

const images = new Map();
function loadImage(path) {
  if (!images.has(path)) {
    const image = new Image();
    image.src = localURL(path);
    images.set(
      path,
      image.decode().then(() => image),
    );
  }
  return images.get(path);
}

export async function paintPreview(color) {
  const mask = paintMasks[color.mask];
  const original = await loadImage(mask.image);
  const canvas = document.createElement('canvas');
  canvas.width = original.naturalWidth;
  canvas.height = original.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(original, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const stencil = document.createElement('canvas');
  stencil.width = canvas.width;
  stencil.height = canvas.height;
  const pen = stencil.getContext('2d', { willReadFrequently: true });
  for (const [part, hex] of [
    ['body', color.hex],
    ['roof', color.roof || color.hex],
  ]) {
    pen.clearRect(0, 0, stencil.width, stencil.height);
    pen.save();
    pen.scale(canvas.width / mask.width, canvas.height / mask.height);
    pen.fill(new Path2D(mask[part]), 'evenodd');
    pen.restore();
    const coverage = pen.getImageData(0, 0, canvas.width, canvas.height).data;
    const rgb = [1, 3, 5].map((start) =>
      parseInt(hex.slice(start, start + 2), 16),
    );
    // Giữ độ sáng/bóng phản chiếu của ảnh gốc. Ngoài mặt nạ giữ nguyên từng pixel.
    for (let i = 0; i < pixels.data.length; i += 4) {
      if (!coverage[i + 3] || !pixels.data[i + 3]) continue;
      const amount = coverage[i + 3] / 255;
      const light =
        (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 765;
      for (let channel = 0; channel < 3; channel++) {
        const shade = rgb[channel] * Math.min(1, light / 0.82);
        const reflection = Math.max(0, light - 0.82) * (255 - rgb[channel]) * 2;
        pixels.data[i + channel] =
          pixels.data[i + channel] * (1 - amount) +
          (shade + reflection) * amount;
      }
    }
  }
  context.putImageData(pixels, 0, 0);
  return canvas.toDataURL('image/png');
}

export function mountExteriorColors(root, config, palette, elements) {
  const oldStage = elements.stage;
  const stage = document.createElement('div');
  stage.className = 'exterior-stage';
  oldStage.replaceWith(stage);
  const picture = document.createElement('img');
  picture.draggable = false;
  stage.append(picture);
  const swatches = document.createElement('div');
  swatches.className = 'swatches exterior-swatches';
  if (elements.swatches) elements.swatches.replaceWith(swatches);
  else stage.after(swatches);
  const name = elements.name || document.createElement('p');
  if (!elements.name) swatches.after(name);
  name.dataset.colorName = '';
  const notice = document.createElement('p');
  notice.className = 'viewer-note exterior-status';
  notice.setAttribute('role', 'status');
  const scope = document.createElement('p');
  scope.className = 'viewer-note exterior-scope';
  scope.textContent = palette.scope + ' ' + (palette.limitation || '');
  const source = document.createElement('p');
  source.className = 'viewer-note exterior-source';
  source.append(`Đối chiếu ${colorAuditDate}: `);
  palette.sources.forEach((url, index) => {
    if (index) source.append(' · ');
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = index ? `Nguồn VinFast ${index + 1}` : 'Nguồn VinFast';
    source.append(link);
  });
  name.after(notice, scope, source);
  root.dataset.paletteStatus = palette.status;
  let ticket = 0;
  const reference = palette.reference || config.image;
  const previews = new Map();
  const buttons = palette.colors.map((color, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.colorIndex = index;
    button.setAttribute('aria-label', color.name);
    button.setAttribute('aria-pressed', 'false');
    button.title = color.name;
    button.style.setProperty(
      '--swatch',
      color.roof
        ? `linear-gradient(135deg, ${color.hex} 50%, ${color.roof} 50%)`
        : color.hex,
    );
    button.append(document.createElement('span'));
    button.addEventListener('click', () => select(index));
    swatches.append(button);
    return button;
  });
  async function select(index) {
    const current = ++ticket;
    const color = palette.colors[index];
    const available = Boolean(color?.image || color?.mask);
    root.dataset.previewState = 'loading';
    stage.setAttribute('aria-busy', 'true');
    // Ẩn ảnh cũ trong khi tải để tên màu mới không đi cùng ảnh màu trước đó.
    picture.style.visibility = 'hidden';
    buttons.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(i === index)),
    );
    name.textContent = color?.name || 'Ảnh xe tham chiếu';
    if (config.id === 'kinet') {
      const caption = document.querySelector('#spec-table caption');
      if (caption) caption.textContent = `${config.name} ${color.name}`;
    }
    notice.textContent = 'Đang tải ảnh…';
    try {
      let src;
      if (color?.mask) {
        if (!previews.has(index)) previews.set(index, paintPreview(color));
        src = await previews.get(index);
      } else {
        await loadImage(color?.image || reference);
        src = localURL(color?.image || reference);
      }
      if (current !== ticket) return;
      picture.src = src;
      await picture.decode();
      if (current !== ticket) return;
      picture.alt = `${config.name} — ${available ? color.name : 'ảnh tham chiếu gốc, chưa có ảnh màu đã chọn'}`;
      root.dataset.previewState = color?.mask
        ? 'approximate'
        : available
          ? 'original'
          : 'unavailable';
      notice.textContent = color?.mask
        ? 'Mô phỏng màu sơn gần đúng trên ảnh tham chiếu; không phải màu sơn xuất xưởng chính xác.'
        : available
          ? 'Ảnh màu chính thức để tham khảo; màu hiển thị có thể khác thực tế.'
          : 'Chưa có bản xem trước đáng tin cậy cho màu này. Đang giữ ảnh gốc tham chiếu, không phải màu vừa chọn.';
      if (!palette.colors.length)
        notice.textContent =
          'Chưa xác minh được bảng màu ngoại thất tiêu chuẩn. Hiển thị ảnh gốc, chưa hỗ trợ chọn màu.';
      root.dataset.selectedColor = String(index);
    } catch {
      if (current !== ticket) return;
      root.dataset.previewState = 'unavailable';
      root.dataset.selectedColor = String(index);
      picture.src = localURL(reference);
      picture.alt = `${config.name} — ảnh gốc tham chiếu`;
      notice.textContent =
        'Không tải được bản xem trước. Hiển thị ảnh gốc tham chiếu; màu đã chọn chưa được mô phỏng.';
    } finally {
      if (current === ticket) {
        picture.style.visibility = '';
        stage.setAttribute('aria-busy', 'false');
      }
    }
  }
  select(0);
  return { stage, swatches, name };
}
