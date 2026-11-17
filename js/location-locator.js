import { locations as historicalLocations } from '../data/destination-content.js';
import { localURL } from './routes.js';
import { escapeHTML as esc } from './destination-shared.js';

const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();
const unique = (values) => [...new Set(values.filter(Boolean))];
const hasCoordinates = (item) =>
  Number.isFinite(item.lat) && Number.isFinite(item.lng);
const directions = (item) =>
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent(
    hasCoordinates(item)
      ? `${item.lat},${item.lng}`
      : `${item.name}, ${item.address}`,
  );
function distance(from, item) {
  if (!hasCoordinates(item)) return Infinity;
  const rad = (value) => (value * Math.PI) / 180;
  const a =
    Math.sin(rad(item.lat - from.latitude) / 2) ** 2 +
    Math.cos(rad(from.latitude)) *
      Math.cos(rad(item.lat)) *
      Math.sin(rad(item.lng - from.longitude) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function script(path) {
  return new Promise((resolve, reject) => {
    const node = document.createElement('script');
    node.src = localURL(path);
    node.onload = resolve;
    node.onerror = reject;
    document.head.append(node);
  });
}
export async function mountLocator(main) {
  // Chỉ tải danh mục toàn quốc khi mở trang tra cứu.
  const { locatorLocations: locations } =
    await import('../data/locator-locations.js');
  for (const file of [
    'assets/vendor/leaflet/leaflet.css',
    'assets/vendor/leaflet/cluster.css',
    'assets/vendor/leaflet/cluster-default.css',
    'css/location-locator.css',
  ]) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = localURL(file);
    document.head.append(link);
  }
  const categories = unique(locations.map((item) => item.category));
  main.innerHTML = `<section class="container locator-heading"><h1>Tìm Showroom & Trạm sạc</h1><p>${locations.length} địa điểm có nguồn đối chiếu, gồm ${locations.filter(hasCoordinates).length} điểm bản đồ. Phạm vi còn thiếu; địa chỉ lịch sử và tỉnh/thành phân vùng tham khảo được ghi chú riêng. Chưa xác nhận hoạt động thực địa, không có trạng thái sạc trực tiếp. <a href="https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac" target="_blank" rel="noopener">Tra cứu chính thức VinFast</a>.</p></section>
  <section class="container locator"><div class="locator-switch"><button type="button" data-view="list" aria-pressed="true">Danh sách</button><button type="button" data-view="map" aria-pressed="false">Bản đồ</button></div><aside class="locator-sidebar"><form class="locator-filters" role="search"><label>Tên hoặc địa chỉ<input name="query" type="search" placeholder="Tìm địa điểm" maxlength="150"></label><label>Tỉnh/thành phố<select name="province"><option value="">Tất cả khu vực có dữ liệu</option>${unique(
    locations.map((x) => x.province),
  )
    .map((x) => `<option>${esc(x)}</option>`)
    .join(
      '',
    )}</select></label><label>Phường/xã<select name="ward" disabled><option value="">Chưa có dữ liệu đã xác minh</option></select></label><fieldset><legend>Loại địa điểm</legend>${categories.map((category, index) => `<label><input type="checkbox" name="category" value="${index}">${esc(category)}</label>`).join('')}</fieldset><div class="locator-actions"><button type="reset">Xóa bộ lọc</button><button type="button" data-near>Gần tôi</button></div></form><p data-count role="status"></p><p data-geo role="status"></p><div class="locator-results" aria-label="Kết quả địa điểm"></div></aside><div class="locator-map-panel"><button type="button" data-map-reset>Đặt lại bản đồ</button><p data-map-status role="status">Đang tải bản đồ…</p><div id="locator-map" aria-label="Bản đồ địa điểm"></div></div></section>
  <section class="container locator-sources"><p>Dữ liệu ODbL © <a href="https://blokvolt.com/charging-stations/download/">BlokVolt</a>, cộng tác viên <a href="https://www.openstreetmap.org/copyright">OpenStreetMap — ODbL</a>. Tọa độ lấy từ đối tượng nguồn, chưa xác minh lối vào. Tỉnh/thành phân vùng tham khảo dùng ranh giới geoBoundaries cũ và tên tỉnh năm 2025; chưa xác minh phường/xã. Các địa chỉ từ hãng/đại lý có nguồn riêng, không có giấy phép dữ liệu mở. Hãy xác nhận với đơn vị vận hành trước khi đi.</p><details><summary>Địa chỉ trong các bài công bố cũ của VinFast (2022–2023)</summary>${historicalLocations.map((x) => `<p><strong>${esc(x.title)}</strong> — ${esc(x.address)}. <a href="${esc(x.url)}" target="_blank" rel="noopener">Nguồn ${esc(x.date)}</a>. Chưa đủ tọa độ để đưa lên bản đồ.</p>`).join('')}</details></section>`;
  const root = main.querySelector('.locator'),
    form = root.querySelector('form'),
    results = root.querySelector('.locator-results');
  const status = root.querySelector('[data-map-status]'),
    geo = root.querySelector('[data-geo]');
  let map,
    cluster,
    origin,
    filtered = locations,
    selected,
    request = 0;
  const markers = new Map();
  function fit() {
    if (!map) return;
    const mapped = filtered.filter(hasCoordinates);
    if (mapped.length)
      map.fitBounds(
        mapped.map((x) => [x.lat, x.lng]),
        { padding: [35, 35], maxZoom: 15, animate: false },
      );
    else map.setView([16.1, 106.3], 5);
  }
  function view(value) {
    root.dataset.view = value;
    root
      .querySelectorAll('[data-view]')
      .forEach((button) =>
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.view === value),
        ),
      );
    if (map) {
      map.invalidateSize();
      fit();
    }
  }
  function focus(id) {
    selected = id;
    results
      .querySelectorAll('article')
      .forEach((card) =>
        card.classList.toggle('is-selected', card.dataset.id === id),
      );
    if (!map) return;
    view('map');
    map.invalidateSize();
    const marker = markers.get(id);
    if (marker) cluster.zoomToShowLayer(marker, () => marker.openPopup());
  }
  function render() {
    const query = normalize(form.elements.query.value.trim()),
      province = form.elements.province.value,
      ward = form.elements.ward.value;
    const types = [...form.querySelectorAll('[name=category]:checked')].map(
      (x) => categories[Number(x.value)],
    );
    filtered = locations.filter(
      (x) =>
        (!query ||
          normalize(x.name + ' ' + x.address + ' ' + x.province).includes(
            query,
          )) &&
        (!province || x.province === province) &&
        (!ward || x.ward === ward) &&
        (!types.length || types.includes(x.category)),
    );
    if (origin)
      filtered.sort((a, b) => distance(origin, a) - distance(origin, b));
    root.querySelector('[data-count]').textContent =
      `${filtered.length} địa điểm · ${filtered.filter(hasCoordinates).length} có tọa độ${origin ? ' · sắp xếp theo khoảng cách đường chim bay' : ''}`;
    results.innerHTML = filtered.length
      ? filtered
          .map(
            (x) =>
              `<article data-id="${x.id}"><h2>${esc(x.name)}</h2><p class="locator-category">${esc(x.category)}</p><p>${esc(x.address)} · ${esc(x.province)}</p>${x.phone ? `<p>Điện thoại: ${esc(x.phone)}</p>` : ''}${x.openingHours ? `<p>Giờ theo nguồn: ${esc(x.openingHours)}</p>` : ''}${origin && hasCoordinates(x) ? `<p>Khoảng ${distance(origin, x).toFixed(1)} km đường chim bay</p>` : ''}<p class="locator-note">${esc(x.note)}</p><div class="locator-actions">${hasCoordinates(x) ? `<button type="button" data-focus="${x.id}">Xem trên bản đồ</button>` : '<span>Chưa có tọa độ xác minh</span>'}<a href="${directions(x)}" target="_blank" rel="noopener">Chỉ đường</a></div><a href="${x.source}" target="_blank" rel="noopener">${esc(x.sourceLabel)} · ${x.verifiedDate}</a></article>`,
          )
          .join('')
      : '<p>Không tìm thấy địa điểm phù hợp. Hãy xóa hoặc đổi bộ lọc.</p>';
    if (!map) return;
    cluster.clearLayers();
    markers.clear();
    filtered.filter(hasCoordinates).forEach((item) => {
      const charging = item.category.startsWith('Trạm');
      const marker = L.marker([item.lat, item.lng], {
        title: item.name,
        icon: L.divIcon({
          className: 'locator-pin ' + (charging ? 'charging' : 'showroom'),
          html: charging ? 'S' : 'X',
          iconSize: [30, 30],
        }),
      });
      marker.bindPopup(
        `<strong>${esc(item.name)}</strong><p>${esc(item.address)}</p><a href="${directions(item)}" target="_blank" rel="noopener">Chỉ đường</a>`,
      );
      marker.on('click', () => {
        selected = item.id;
        results
          .querySelectorAll('article')
          .forEach((card) =>
            card.classList.toggle('is-selected', card.dataset.id === selected),
          );
        results
          .querySelector(`[data-id="${item.id}"]`)
          ?.scrollIntoView({ block: 'nearest' });
      });
      cluster.addLayer(marker);
      markers.set(item.id, marker);
    });
    fit();
  }
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', render);
  form.elements.province.addEventListener('change', () => {
    const wards = unique(
      locations
        .filter((x) => x.province === form.elements.province.value)
        .map((x) => x.ward),
    );
    form.elements.ward.innerHTML =
      `<option value="">${wards.length ? 'Tất cả phường/xã' : 'Chưa có dữ liệu đã xác minh'}</option>` +
      wards.map((x) => `<option>${esc(x)}</option>`).join('');
    form.elements.ward.disabled = !wards.length;
    render();
  });
  form.addEventListener('reset', () => {
    request++;
    origin = null;
    geo.textContent = '';
    setTimeout(() => {
      form.elements.province.dispatchEvent(new Event('change'));
      render();
    }, 0);
  });
  root.querySelector('[data-near]').addEventListener('click', () => {
    if (!navigator.geolocation) {
      geo.textContent = 'Trình duyệt không hỗ trợ vị trí.';
      return;
    }
    const ticket = ++request;
    geo.textContent = 'Đang xác định vị trí…';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (ticket !== request) return;
        origin = position.coords;
        geo.textContent =
          'Khoảng cách ước tính theo đường chim bay; vị trí chỉ dùng trong phiên này.';
        render();
      },
      (error) => {
        if (ticket === request)
          geo.textContent =
            error.code === 1
              ? 'Bạn chưa cho phép truy cập vị trí. Vẫn có thể tìm bằng bộ lọc.'
              : 'Không lấy được vị trí. Vui lòng thử lại.';
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false },
    );
  });
  results.addEventListener('click', (event) => {
    const button = event.target.closest('[data-focus]');
    if (button) focus(button.dataset.focus);
  });
  root
    .querySelectorAll('[data-view]')
    .forEach((button) =>
      button.addEventListener('click', () => view(button.dataset.view)),
    );
  root.querySelector('[data-map-reset]').addEventListener('click', fit);
  view('list');
  render();
  try {
    await script('assets/vendor/leaflet/leaflet.js');
    await script('assets/vendor/leaflet/cluster.js');
    map = L.map('locator-map', { zoomAnimation: false }).setView(
      [21.04, 105.83],
      11,
    );
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
      .on('tileerror', () => {
        status.textContent =
          'Không tải được nền bản đồ. Danh sách và chỉ đường vẫn dùng được.';
      })
      .addTo(map);
    cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      animate: false,
    });
    map.addLayer(cluster);
    status.textContent = '';
    render();
    new ResizeObserver(() => map.invalidateSize()).observe(
      root.querySelector('.locator-map-panel'),
    );
  } catch {
    status.textContent =
      'Không tải được thư viện bản đồ. Bạn vẫn có thể dùng danh sách và Chỉ đường.';
  }
}
