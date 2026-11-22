import { products, money, normalize } from '../data/products.js';
import { prefix, pageURL } from './navigation.js';
import { favoriteIds } from './favorite-store.js';

export function card(p) {
  const favorite = favoriteIds().has(p.id);
  return /* HTML */ `<article class="product-card">
    ${p.image ? /* HTML */ `<img src="${prefix}assets/${p.image}" alt="${p.name}" loading="lazy" />` : ''}
    <p class="eyebrow">${p.segment}</p>
    <h3>${p.name}</h3>
    <div class="product-price-row">
      <p>
        ${p.group === 'historical' ? 'Hồ sơ lịch sử · Đã dừng kinh doanh xe mới' : Number.isFinite(p.price) ? 'Giá snapshot: ' + money(p.price) : 'Xem cấu hình tại trang chi tiết'}
      </p>
      <button class="favorite-button ${favorite ? 'is-favorite' : ''}" type="button" data-favorite="${p.id}" aria-pressed="${favorite}" aria-label="${favorite ? 'Bỏ khỏi' : 'Thêm vào'} danh sách yêu thích" title="${favorite ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg></button>
    </div>
    ${p.detail || p.detailPath ? /* HTML */ `<a class="text-link" href="${p.detailPath ? pageURL(p.detailPath) : pageURL('product', '?id=' + p.id)}">Khám phá ${p.name} →</a>` : '<p class="muted">Đã có dữ liệu danh mục; chưa tái tạo trang chi tiết.</p>'}
  </article>`;
}

export function renderCatalog(main) {
  const params = new URLSearchParams(location.search);
  const seatOptions = [
    ...new Set(products.map((p) => p.seats).filter(Boolean)),
  ].sort((a, b) => a - b);
  main.innerHTML = /* HTML */ `<section class="container">
    <p class="eyebrow">Khám phá sản phẩm</p>
    <h1>Các dòng xe VinFast</h1>
    <p class="muted">
      Bộ lọc và tìm kiếm là chức năng bổ sung cho đồ án. Danh mục hiện có
      ${products.length} mẫu trong dự án, gồm cả hồ sơ xe xăng lịch sử. Giá
      snapshot không phải báo giá hiện tại.
      <a class="text-link" href="${pageURL('data-status')}"
        >Xem trạng thái dữ liệu thông số</a
      >.
    </p>
    <form class="filters" role="search">
      <label
        >Tìm mẫu xe<input
          id="search"
          type="search"
          maxlength="80"
          placeholder="Ví dụ: VF 6, Kinet"
          autocomplete="off" /></label
      ><label
        >Nhóm xe<select id="group">
          <option value="">Tất cả</option>
          <option value="personal">Xe cá nhân</option>
          <option value="service">Xe dịch vụ</option>
          <option value="scooter">Xe máy điện</option>
          <option value="historical">Xe xăng lịch sử</option>
        </select></label
      ><label
        >Phân khúc<select id="segment">
          <option value="">Tất cả</option>
          ${[...new Set(products.map((p) => p.segment))].map((s) => /* HTML */ `<option>${s}</option>`).join('')}
        </select></label
      ><label
        >Số chỗ<select id="seats">
          <option value="">Tất cả</option>
          ${seatOptions.map((n) => /* HTML */ `<option value="${n}">${n} chỗ</option>`).join('')}
        </select></label
      ><label
        >Giá từ (triệu đồng)<input
          id="price-min"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          placeholder="Ví dụ: 20" /></label
      ><label
        >Giá đến (triệu đồng)<input
          id="price-max"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          placeholder="Ví dụ: 800" /></label
      ><label
        >Sắp xếp<select id="sort">
          <option value="">Mặc định</option>
          <option value="price-asc">Giá thấp đến cao</option>
          <option value="price-desc">Giá cao đến thấp</option>
          <option value="name">Tên A–Z</option>
        </select></label
      ><button type="reset" class="secondary">Xóa bộ lọc</button>
    </form>
    <p id="result-count" role="status"></p>
    <div id="results" class="product-grid"></div>
  </section>`;
  const form = main.querySelector('form'),
    search = main.querySelector('#search'),
    group = main.querySelector('#group'),
    segment = main.querySelector('#segment'),
    seats = main.querySelector('#seats'),
    priceMin = main.querySelector('#price-min'),
    priceMax = main.querySelector('#price-max'),
    sort = main.querySelector('#sort');
  group.value = params.get('group') || '';
  segment.value = params.get('segment') || '';
  seats.value = params.get('seats') || '';
  priceMin.value = params.get('pmin') || '';
  priceMax.value = params.get('pmax') || '';
  sort.value = params.get('sort') || '';
  search.value = params.get('q') || '';
  // Ô giá nhập theo triệu đồng; để trống nghĩa là không giới hạn.
  const toVND = (input) =>
    input.value.trim() === '' ? null : Number(input.value) * 1e6;
  const hasPrice = (p) => Number.isFinite(p.price);
  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name, 'vi'),
  };
  function filter() {
    const min = toVND(priceMin),
      max = toVND(priceMax),
      priceActive = min !== null || max !== null,
      seatsActive = seats.value !== '',
      invalidRange = min !== null && max !== null && min > max;
    const base = products.filter(
      (p) =>
        (!group.value || p.group === group.value) &&
        (!segment.value || p.segment === segment.value) &&
        normalize(p.name)
          .replace(/\s/g, '')
          .includes(normalize(search.value).replace(/\s/g, '')),
    );
    const result = invalidRange
      ? []
      : base.filter(
          (p) =>
            (!priceActive ||
              (hasPrice(p) &&
                (min === null || p.price >= min) &&
                (max === null || p.price <= max))) &&
            (!seatsActive || String(p.seats) === seats.value),
        );
    // Mẫu chưa có giá luôn xếp cuối khi sắp xếp theo giá.
    if (sorters[sort.value])
      result.sort((a, b) =>
        sort.value === 'name'
          ? sorters.name(a, b)
          : hasPrice(b) - hasPrice(a) ||
            (hasPrice(a) ? sorters[sort.value](a, b) : 0),
      );
    const notes = [];
    if (invalidRange) notes.push('Giá tối thiểu đang lớn hơn giá tối đa.');
    const noPrice =
      priceActive && !invalidRange
        ? base.filter((p) => !hasPrice(p)).length
        : 0;
    const noSeats = seatsActive ? base.filter((p) => !p.seats).length : 0;
    if (noPrice) notes.push(`Chưa tính ${noPrice} mẫu chưa có giá snapshot.`);
    if (noSeats) notes.push(`Chưa tính ${noSeats} mẫu chưa có dữ liệu số chỗ.`);
    main.querySelector('#result-count').textContent =
      `${result.length} mẫu xe phù hợp. ${notes.join(' ')}`.trim();
    main.querySelector('#results').innerHTML = result.length
      ? result.map(card).join('')
      : '<p>Không tìm thấy mẫu xe. Hãy thử tên khác hoặc xóa bộ lọc.</p>';
    const query = new URLSearchParams();
    if (group.value) query.set('group', group.value);
    if (segment.value) query.set('segment', segment.value);
    if (seats.value) query.set('seats', seats.value);
    if (priceMin.value.trim()) query.set('pmin', priceMin.value.trim());
    if (priceMax.value.trim()) query.set('pmax', priceMax.value.trim());
    if (sort.value) query.set('sort', sort.value);
    if (search.value.trim()) query.set('q', search.value.trim());
    history.replaceState(
      null,
      '',
      location.pathname + (query.size ? '?' + query : ''),
    );
  }
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('input', filter);
  form.addEventListener('reset', () => setTimeout(filter, 0));
  filter();
}
