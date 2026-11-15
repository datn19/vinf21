import { vehicleFeatures } from '../data/vehicle-features.js';
import { localURL } from './routes.js';

const node = (tag, text, className) => {
  const item = document.createElement(tag);
  if (text) item.textContent = text;
  if (className) item.className = className;
  return item;
};
export function mountVehicleFeatures(main, viewer) {
  const model = vehicleFeatures.find((item) => item.id === viewer.id);
  if (!model) return;
  const section = node('section', null, 'container vehicle-features');
  section.dataset.vehicleFeatures = model.id;
  section.append(node('h2', 'Đặc điểm nổi bật'));
  if (model.historical)
    section.append(
      node(
        'p',
        'Thông tin tham khảo của mẫu xe đã dừng kinh doanh mới.',
        'vehicle-source-note',
      ),
    );
  const tabs = node('div', null, 'vehicle-feature-tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Đặc điểm nổi bật ' + model.name);
  const stage = node('div', null, 'vehicle-feature-stage');
  const status = node('p', '', 'vehicle-source-note');
  status.setAttribute('role', 'status');
  section.append(tabs, stage, status);
  main.querySelector('[data-vehicle-technical]').after(section);
  let groups,
    buttons,
    panels,
    ticket = 0,
    activeName;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const cache = new Map();
  let heightAnimation;
  function preload(src) {
    if (!cache.has(src)) {
      const image = new Image();
      image.src = localURL(src);
      cache.set(
        src,
        image.decode().catch(() => {
          cache.delete(src);
          throw new Error('image');
        }),
      );
    }
    return cache.get(src);
  }
  async function select(index, focus = false) {
    const current = ++ticket;
    const group = groups[index];
    if (!group) return;
    status.textContent = 'Đang chuẩn bị hình ảnh…';
    try {
      await Promise.all(group.cards.map((card) => preload(card.image)));
    } catch {
      if (current === ticket)
        status.textContent =
          'Ảnh chưa tải được. Giữ nội dung đang xem; hãy thử lại.';
      return;
    }
    if (current !== ticket) return;
    const incoming = panels[index];
    incoming.replaceChildren();
    for (const card of group.cards) {
      const article = node('article', null, 'vehicle-feature-card');
      const image = new Image();
      image.src = localURL(card.image);
      image.alt = model.name + ' — ' + card.imageNote;
      image.width = 600;
      image.height = 400;
      const body = node('div');
      body.append(
        node('h3', card.title),
        node('p', card.description),
        node('small', card.imageNote),
      );
      const source = node('a', 'Nguồn VinFast');
      source.href = card.sources[0];
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      body.append(source);
      article.append(image, body);
      incoming.append(article);
    }
    // Lớp cũ còn nguyên trong lúc tải; lớp mới phủ lên cùng một ô, không đổi bố cục ảnh.
    const outgoing = [...stage.children].filter(
      (panel) => !panel.hidden && panel !== incoming,
    );
    const height = stage.getBoundingClientRect().height;
    heightAnimation?.cancel();
    incoming.hidden = false;
    panels.forEach((panel, i) => {
      panel.inert = i !== index;
      panel.setAttribute('aria-hidden', String(i !== index));
    });
    buttons.forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    activeName = group.name;
    if (focus) buttons[index].focus({ preventScroll: true });
    section.dataset.selectedCategory = String(index);
    const nextHeight = incoming.getBoundingClientRect().height;
    stage.style.height = nextHeight + 'px';
    if (!motion.matches && height > 0) {
      heightAnimation = stage.animate(
        [{ height: height + 'px' }, { height: nextHeight + 'px' }],
        { duration: 300, easing: 'ease-out' },
      );
    }
    const animation =
      !motion.matches &&
      incoming.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        easing: 'ease-out',
      });
    if (animation) await animation.finished.catch(() => {});
    if (current !== ticket) return;
    outgoing.forEach((panel) => {
      panel.hidden = true;
    });
    stage.style.height = '';
    status.textContent = '';
  }
  function render(index = 0) {
    ticket++;
    groups = model.variants[index];
    const previous = [...stage.children];
    tabs.replaceChildren();
    buttons = [];
    panels = [];
    groups.forEach((group, i) => {
      const button = node('button', group.name);
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.id = `${model.id}-feature-tab-${i}`;
      button.setAttribute(
        'aria-controls',
        `${model.id}-feature-panel-${index}-${i}`,
      );
      button.setAttribute('aria-selected', 'false');
      button.tabIndex = -1;
      const panel = node('div', null, 'vehicle-feature-grid');
      panel.id = `${model.id}-feature-panel-${index}-${i}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', button.id);
      panel.tabIndex = 0;
      panel.hidden = true;
      button.addEventListener('click', () => select(i));
      button.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (i + 1) % groups.length;
        if (event.key === 'ArrowLeft')
          next = (i + groups.length - 1) % groups.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = groups.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          select(next, true);
        }
      });
      tabs.append(button);
      stage.append(panel);
      buttons.push(button);
      panels.push(panel);
    });
    // Giữ nội dung cũ khi đổi phiên bản, sau đó dọn các panel không còn dùng.
    select(
      Math.max(
        0,
        groups.findIndex((group) => group.name === activeName),
      ),
    ).then(() => {
      previous
        .filter((panel) => panel.hidden)
        .forEach((panel) => panel.remove());
    });
  }
  main.addEventListener('vehiclevariantchange', (event) =>
    render(event.detail.index),
  );
  render();
}
