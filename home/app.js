const spots = [
  { id: 1, name: '5th Avenue curbside', area: 'Downtown Seattle', distance: 0.2, price: 4, type: 'Unmetered', kind: 'unmetered', note: 'Free evenings after 8 PM', walk: '3 min walk', rating: 4.9 },
  { id: 2, name: 'Pike Street garage', area: 'Pike Place Market', distance: 0.4, price: 7, type: 'Covered garage', kind: 'covered', note: 'EV charging available', walk: '6 min walk', rating: 4.7 },
  { id: 3, name: 'Post Alley neighborhood', area: 'Historic district', distance: 0.3, price: 0, type: 'Unmetered curbside', kind: 'unmetered', note: '2-hour limit · public street', walk: '5 min walk', rating: 4.8 },
  { id: 4, name: 'Union Street meters', area: 'Central Business District', distance: 0.6, price: 3, type: 'Metered street', kind: 'metered', note: 'Accepted payment in app', walk: '8 min walk', rating: 4.6 },
  { id: 5, name: 'Westlake covered lot', area: 'Westlake Center', distance: 0.7, price: 9, type: 'Covered garage', kind: 'covered', note: 'Oversized vehicle space', walk: '9 min walk', rating: 4.9 }
];

const spotList = document.getElementById('spotList');
const spotCount = document.getElementById('spotCount');
const toast = document.getElementById('toast');
let activeFilter = 'all';
let priceAscending = true;
let selectedSpotId = null;

function priceLabel(price) {
  return price === 0 ? '<strong>Free</strong>' : `<strong>$${price}</strong><small>/ hr</small>`;
}

function renderSpots() {
  let visible = activeFilter === 'all' ? [...spots] : spots.filter(spot => spot.kind === activeFilter);
  visible.sort((a, b) => priceAscending ? a.price - b.price : b.price - a.price);
  spotCount.textContent = visible.length;
  spotList.innerHTML = visible.map(spot => `
    <article class="spot-card" data-id="${spot.id}" tabindex="0">
      <div class="spot-main">
        <div class="spot-icon ${spot.price === 0 ? 'free' : ''}" aria-hidden="true">P</div>
        <div class="spot-info">
          <div class="spot-title-row">
            <div><h3>${spot.name}</h3><p>${spot.area}</p></div>
            <div class="price">${priceLabel(spot.price)}</div>
          </div>
          <div class="spot-meta"><span>${spot.distance} mi · ${spot.walk}</span><span class="rating">★ ${spot.rating}</span></div>
          <div class="tag-row"><span class="tag">${spot.type}</span><span class="availability">Available now</span></div>
          <p class="spot-note">${spot.note}</p>
        </div>
      </div>
      <button class="reserve" type="button" data-name="${spot.name}">Reserve spot</button>
    </article>
  `).join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

renderSpots();

document.querySelectorAll('.filter:not(.icon-filter)').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter:not(.icon-filter)').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderSpots();
  });
});

document.getElementById('sortButton').addEventListener('click', event => {
  priceAscending = !priceAscending;
  event.currentTarget.textContent = priceAscending ? 'Price: low to high' : 'Price: high to low';
  renderSpots();
});

document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventEventDefault?.();
  event.preventDefault();
  const location = document.getElementById('location').value.trim() || 'your destination';
  showToast(`Showing parking near ${location}`);
});

spotList.addEventListener('click', event => {
  const reserve = event.target.closest('.reserve');
  if (reserve) showToast(`${reserve.dataset.name} reserved`);
  const card = event.target.closest('.spot-card');
  if (card && !reserve) selectSpot(card.dataset.id);
});

function selectSpot(id) {
  const isAlreadySelected = selectedSpotId === id;
  selectedSpotId = isAlreadySelected ? null : id;
  document.querySelectorAll('.spot-card').forEach(card => {
    card.classList.toggle('selected', !isAlreadySelected && card.dataset.id === id);
  });
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.classList.toggle('selected', !isAlreadySelected && pin.dataset.id === id);
  });
}

document.querySelectorAll('.map-pin').forEach(pin => {
  pin.addEventListener('click', () => selectSpot(pin.dataset.id));
});

document.getElementById('mapToggle').addEventListener('click', () => {
  document.querySelector('.results-layout').classList.toggle('map-focus');
  showToast(document.querySelector('.results-layout').classList.contains('map-focus') ? 'Expanded map view' : 'Showing parking list');
});
