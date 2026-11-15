const STORAGE_KEY = 'vinfast-favorites';

export function favoriteIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

export function toggleFavorite(id) {
  const favorites = favoriteIds();
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  window.dispatchEvent(new CustomEvent('favoriteschange'));
  return favorites.has(id);
}

export function initFavoriteButtons(root = document) {
  const update = () => {
    const favorites = favoriteIds();
    root.querySelectorAll('[data-favorite]').forEach((button) => {
      const active = favorites.has(button.dataset.favorite);
      button.classList.toggle('is-favorite', active);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', `${active ? 'Bỏ khỏi' : 'Thêm vào'} danh sách yêu thích`);
      button.title = active ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích';
    });
  };
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-favorite]');
    if (!button || !root.contains(button)) return;
    event.preventDefault();
    toggleFavorite(button.dataset.favorite);
    update();
  });
  window.addEventListener('favoriteschange', update);
  update();
}
