import { vehicleSpecifications } from '../data/vehicle-specifications.js';
import { products } from '../data/products.js';
import { pageURL } from './navigation.js';

// Bốn tiêu chí chuẩn mà data/vehicle-specifications.js kiểm tra cho xe đang bán.
const CHECKS = [
  ['Tốc độ tối đa', 'Tốc độ tối đa theo cấu hình hiện tại'],
  ['Gia tốc', 'Gia tốc và điều kiện đo theo cấu hình'],
  ['Treo, phanh, lốp', 'Thông số treo, phanh và lốp chi tiết'],
  ['Thời gian sạc', 'Thời gian sạc và phần trăm pin đầu/cuối'],
];
const GROUPS = {
  personal: 'Xe cá nhân',
  service: 'Xe dịch vụ',
  scooter: 'Xe máy điện',
  historical: 'Xe xăng lịch sử',
};
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
  );
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');

export function summarize(models = vehicleSpecifications) {
  return models.map((m) => {
    const product = products.find((p) => (p.detailPath || p.id) === m.id);
    const checks = m.historical
      ? []
      : CHECKS.map(([label, text]) => ({
          label,
          done: !m.missing.includes(text),
        }));
    const checkTexts = CHECKS.map(([, text]) => text);
    return {
      id: m.id,
      name: m.name,
      group: product?.group ?? '',
      complete: m.status === 'COMPLETE',
      checks,
      other: m.missing.filter((text) => !checkTexts.includes(text)),
      conflicts: m.conflicts,
      date: m.sourceDate,
      source: m.source,
      href: product
        ? product.detailPath
          ? pageURL(product.detailPath)
          : pageURL('product', '?id=' + product.id)
        : null,
    };
  });
}

function row(v) {
  const done = v.checks.filter((c) => c.done).length;
  const meter = v.checks.length
    ? `<span class="ds-meter" role="img" aria-label="${done} trên ${v.checks.length} tiêu chí chuẩn đã có">${v.checks
        .map((c) => `<i class="${c.done ? 'is-done' : ''}"></i>`)
        .join(
          '',
        )}</span><span class="ds-count">${done}/${v.checks.length}</span>`
    : '<span class="ds-count">Hồ sơ lịch sử</span>';
  const todo = [
    ...v.checks.filter((c) => !c.done).map((c) => c.label),
    ...v.other,
  ];
  return /* HTML */ `<details class="ds-row">
    <summary>
      <span class="ds-name">${esc(v.name)}</span>
      <span class="ds-group">${GROUPS[v.group] || ''}</span>
      ${meter}
      <span class="ds-badge ${v.complete ? 'is-ok' : ''}"
        >${v.complete ? 'Đầy đủ' : 'Còn thiếu'}</span
      >
    </summary>
    <div class="ds-body">
      ${
        todo.length
          ? `<p>Chưa xác minh được:</p><ul>${todo.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
          : '<p>Các tiêu chí chuẩn đều đã có dữ liệu.</p>'
      }
      ${
        v.conflicts.length
          ? `<p>Nguồn chưa thống nhất:</p><ul>${v.conflicts.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
          : ''
      }
      <p class="muted">
        Đối chiếu lần cuối: ${esc(v.date || 'chưa ghi')}.
        ${v.href ? `<a class="text-link" href="${v.href}">Xem trang xe</a>` : ''}
        ${v.source ? ` <a class="text-link" href="${esc(v.source)}" rel="noopener">Nguồn hãng</a>` : ''}
      </p>
    </div>
  </details>`;
}

export function renderDataStatus(main) {
  const all = summarize();
  const complete = all.filter((v) => v.complete).length;
  main.innerHTML = /* HTML */ `<section class="container data-status">
    <h1>Trạng thái dữ liệu thông số</h1>
    <p class="muted">
      Trang này cho biết mỗi mẫu xe đã có những thông số nào và còn thiếu gì.
      “Còn thiếu” nghĩa là dự án chưa xác minh được từ nguồn hãng, không có
      nghĩa hãng không công bố. Dự án chọn để trống thay vì suy diễn.
    </p>
    <p class="ds-summary" role="status">
      <strong>${all.length}</strong> mẫu xe · <strong>${complete}</strong> đầy
      đủ · <strong>${all.length - complete}</strong> còn thiếu ít nhất một mục.
    </p>
    <form class="filters" role="search">
      <label
        >Tìm mẫu xe<input
          id="ds-search"
          type="search"
          maxlength="80"
          placeholder="Ví dụ: VF 5, Evo"
          autocomplete="off" /></label
      ><label
        >Nhóm xe<select id="ds-group">
          <option value="">Tất cả</option>
          ${Object.entries(GROUPS)
            .map(([k, v]) => `<option value="${k}">${v}</option>`)
            .join('')}
        </select></label
      ><label
        >Trạng thái<select id="ds-status">
          <option value="">Tất cả</option>
          <option value="missing">Còn thiếu</option>
          <option value="complete">Đầy đủ</option>
        </select></label
      ><button type="reset" class="secondary">Xóa bộ lọc</button>
    </form>
    <p id="ds-count" role="status"></p>
    <div id="ds-list"></div>
  </section>`;
  const form = main.querySelector('form'),
    search = main.querySelector('#ds-search'),
    group = main.querySelector('#ds-group'),
    status = main.querySelector('#ds-status'),
    list = main.querySelector('#ds-list'),
    count = main.querySelector('#ds-count');
  const update = () => {
    const q = normalize(search.value.trim());
    const shown = all.filter(
      (v) =>
        (!q || normalize(v.name).includes(q) || v.id.includes(q)) &&
        (!group.value || v.group === group.value) &&
        (!status.value || (status.value === 'complete') === v.complete),
    );
    list.innerHTML = shown.length
      ? shown.map(row).join('')
      : '<p class="muted">Không có mẫu xe nào khớp bộ lọc. Hãy xóa bộ lọc để xem tất cả.</p>';
    count.textContent = `Hiển thị ${shown.length}/${all.length} mẫu xe.`;
  };
  form.addEventListener('input', update);
  form.addEventListener('reset', () => setTimeout(update));
  form.addEventListener('submit', (e) => e.preventDefault());
  update();
}
