import { homeMenuMarkup, homeFooterMarkup } from './home-chrome.js';
import { products } from '../data/products.js';
import { favoriteIds } from './favorite-store.js';

export const prefix = location.pathname.includes('/pages/') ? '../' : './';
export const pageURL = (page, query = '') =>
  `${prefix}pages/${page}.html${query}`;
const link = (label, url) => /* HTML */ `<a href="${url}">${label}</a>`;

export function mountNavigation() {
  document.body.classList.add('shared-chrome');
  document.querySelector('#site-header').innerHTML = /* HTML */ `<div
      class="header-inner"
    >
      <a
        class="brand"
        href="${prefix}index.html"
        aria-label="VinFast mô phỏng - Trang chủ"
        ><img
          src="${prefix}assets/shared/VinFast-logo.webp"
          alt="VinFast"
          width="125"
          height="40" /></a
      ><button
        type="button"
        class="menu-toggle"
        aria-expanded="false"
        aria-controls="main-nav"
      >
        Menu ☰
      </button>
      <nav id="main-nav" aria-label="Điều hướng chính">${homeMenuMarkup()}</nav>
      <a class="button header-cta" href="${pageURL('test-drive')}"
        >Đăng ký lái thử</a
      >
      <div class="account-area">
        <button type="button" class="account-trigger" aria-expanded="false" aria-haspopup="true"><svg class="account-trigger-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></svg><span data-account-label>Tài khoản</span></button>
        <section class="account-menu" id="account-menu" aria-label="Menu tài khoản" hidden>
          <div class="account-menu-heading"><span class="account-avatar" aria-hidden="true">V</span><div><strong data-menu-name>Xin chào</strong><small data-menu-email></small></div></div>
          <a class="account-menu-link" href="${pageURL('catalog')}"><span>Khám phá xe</span><span aria-hidden="true">→</span></a>
          <div class="favorite-menu-section"><div class="favorite-menu-title"><strong>Mẫu xe yêu thích</strong><span class="favorite-count" data-favorite-count>0</span></div><div class="favorite-menu-list" data-favorite-list></div><a class="account-menu-link favorite-browse" href="${pageURL('catalog')}">Tìm thêm mẫu xe <span aria-hidden="true">→</span></a></div>
          <a class="account-menu-link" href="${pageURL('test-drive')}"><span>Đăng ký lái thử</span><span aria-hidden="true">→</span></a>
          <button class="account-signout" type="button" data-signout>Đăng xuất</button>
        </section>
      </div>
    </div>
    <dialog id="account-notice" class="account-dialog" aria-labelledby="account-title">
      <button type="button" class="dialog-close" data-close-account aria-label="Đóng">×</button>
      <p class="eyebrow">VINFAST · TÀI KHOẢN CỦA BẠN</p><h2 id="account-title">Chào mừng trở lại</h2>
      <p class="account-intro">Đăng nhập để lưu mẫu xe yêu thích và cá nhân hóa trải nghiệm của bạn.</p>
      <div class="account-tabs" role="tablist" aria-label="Chọn hình thức tài khoản"><button type="button" role="tab" aria-selected="true" data-account-mode="login">Đăng nhập</button><button type="button" role="tab" aria-selected="false" data-account-mode="register">Tạo tài khoản</button></div>
      <form class="account-form"><label data-name-field hidden>Họ và tên<input name="name" autocomplete="name" placeholder="Nguyễn Văn An" /></label><label>Email<input name="email" type="email" autocomplete="email" placeholder="ban@email.com" required /></label><label>Mật khẩu<input name="password" type="password" minlength="6" autocomplete="current-password" placeholder="Tối thiểu 6 ký tự" required /></label><button class="account-submit" type="submit">Đăng nhập</button><p class="account-feedback" role="status">Bản mô phỏng lưu tài khoản trên thiết bị này.</p></form>
    </dialog>`;
  document.querySelector('#site-footer').innerHTML = homeFooterMarkup();
  const dialog = document.querySelector('#account-notice');
  const accountMenu = document.querySelector('#account-menu');
  const accountTrigger = document.querySelector('.account-trigger');
  function currentSession() { try { return JSON.parse(localStorage.getItem('vinfast-session') || 'null'); } catch { return null; } }
  function renderAccountMenu() {
    const session = currentSession();
    accountTrigger.querySelector('[data-account-label]').textContent = session ? (session.name || 'Tài khoản') : 'Tài khoản';
    accountTrigger.setAttribute('aria-expanded', String(!accountMenu.hidden));
    accountMenu.querySelector('[data-menu-name]').textContent = session ? `Xin chào, ${session.name || 'bạn'}` : 'Xin chào';
    accountMenu.querySelector('[data-menu-email]').textContent = session?.email || '';
    const ids = favoriteIds();
    const saved = [...ids].map((id) => products.find((product) => product.id === id)).filter(Boolean);
    accountMenu.querySelector('[data-favorite-count]').textContent = String(saved.length);
    accountMenu.querySelector('[data-favorite-list]').innerHTML = saved.length ? saved.slice(0, 4).map((product) => `<a class="favorite-menu-item" href="${product.detailPath ? pageURL(product.detailPath) : pageURL('product', '?id=' + encodeURIComponent(product.id))}">${product.image ? `<img src="${prefix}assets/${product.image}" alt="" loading="lazy">` : ''}<span>${product.name}</span><span class="favorite-item-arrow" aria-hidden="true">→</span></a>`).join('') : '<p class="favorite-empty">Nhấn vào trái tim trên mẫu xe để lưu vào đây.</p>';
  }
  accountTrigger.addEventListener('click', () => {
    if (currentSession()) {
      accountMenu.hidden = !accountMenu.hidden;
      renderAccountMenu();
    } else dialog.showModal();
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.account-area')) { accountMenu.hidden = true; accountTrigger.setAttribute('aria-expanded', 'false'); }
  });
  window.addEventListener('favoriteschange', renderAccountMenu);
  accountMenu.querySelector('[data-signout]').addEventListener('click', () => {
    localStorage.removeItem('vinfast-session');
    accountMenu.hidden = true;
    renderAccountMenu();
  });
  const accountForm = dialog.querySelector('.account-form');
  let accountMode = 'login';
  dialog.querySelector('[data-close-account]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.querySelectorAll('[data-account-mode]').forEach((tab) => tab.addEventListener('click', () => {
    accountMode = tab.dataset.accountMode;
    const registering = accountMode === 'register';
    dialog.querySelectorAll('[data-account-mode]').forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
    dialog.querySelector('[data-name-field]').hidden = !registering;
    dialog.querySelector('[name="name"]').required = registering;
    dialog.querySelector('[name="password"]').autocomplete = registering ? 'new-password' : 'current-password';
    dialog.querySelector('.account-submit').textContent = registering ? 'Tạo tài khoản' : 'Đăng nhập';
    dialog.querySelector('#account-title').textContent = registering ? 'Tạo tài khoản VinFast' : 'Chào mừng trở lại';
  }));
  accountForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(accountForm));
    let accounts = {};
    try { accounts = JSON.parse(localStorage.getItem('vinfast-accounts') || '{}'); } catch {}
    const feedback = dialog.querySelector('.account-feedback');
    if (accountMode === 'register') {
      if (accounts[data.email]) { feedback.textContent = 'Email này đã được đăng ký trên thiết bị.'; return; }
      accounts[data.email] = { name: data.name, password: data.password };
      localStorage.setItem('vinfast-accounts', JSON.stringify(accounts));
    } else if (!accounts[data.email] || accounts[data.email].password !== data.password) {
      feedback.textContent = 'Email hoặc mật khẩu chưa đúng.'; return;
    }
    localStorage.setItem('vinfast-session', JSON.stringify({ email: data.email, name: accounts[data.email].name }));
    accountTrigger.querySelector('[data-account-label]').textContent = accounts[data.email].name || 'Tài khoản';
    feedback.textContent = accountMode === 'register' ? '\u0054\u00e0i kho\u1ea3n \u0111\u00e3 \u0111\u01b0\u1ee3c t\u1ea1o tr\u00ean thi\u1ebft b\u1ecb n\u00e0y.' : '\u0110\u0103ng nh\u1eadp th\u00e0nh c\u00f4ng.';
    renderAccountMenu();
    dialog.close();
    accountMenu.hidden = true;
  });
  renderAccountMenu();
  const isHome = true;
  const header = document.querySelector('#site-header'),
    nav = header.querySelector('nav'),
    toggle = header.querySelector('.menu-toggle'),
    triggers = [...header.querySelectorAll('.nav-trigger')];
  function closeMenus() {
    triggers.forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
      document.getElementById(t.getAttribute('aria-controls')).hidden = true;
    });
  }
  function closeMobile() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    closeMenus();
  }
  triggers.forEach((t) =>
    t.addEventListener('click', (e) => {
      const open = t.getAttribute('aria-expanded') === 'true';
      const pointerOpened =
        isHome &&
        e.detail > 0 &&
        matchMedia('(hover: hover) and (min-width: 1051px)').matches;
      closeMenus();
      t.setAttribute('aria-expanded', String(pointerOpened || !open));
      document.getElementById(t.getAttribute('aria-controls')).hidden =
        pointerOpened ? false : open;
    }),
  );
  if (isHome) {
    const finePointer = matchMedia('(hover: hover) and (min-width: 1051px)');
    triggers.forEach((t) =>
      t.closest('.nav-item').addEventListener('mouseenter', () => {
        if (!finePointer.matches) return;
        closeMenus();
        t.setAttribute('aria-expanded', 'true');
        document.getElementById(t.getAttribute('aria-controls')).hidden = false;
      }),
    );
    header.addEventListener('mouseleave', () => {
      if (finePointer.matches) closeMenus();
    });
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    closeMobile();
    if (!open) {
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
    }
  });
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) closeMobile();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const active = triggers.find(
        (t) => t.getAttribute('aria-expanded') === 'true',
      );
      if (active) {
        closeMenus();
        active.focus();
      } else if (toggle.getAttribute('aria-expanded') === 'true') {
        closeMobile();
        toggle.focus();
      }
    }
  });
  header.addEventListener('focusout', () =>
    setTimeout(() => {
      if (!header.contains(document.activeElement)) closeMobile();
    }, 0),
  );
  matchMedia('(min-width: 1051px)').addEventListener('change', closeMobile);
  nav.querySelectorAll('a').forEach((a) => {
    if (a.href === location.href) a.setAttribute('aria-current', 'page');
  });
}
