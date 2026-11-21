const form = $('#filters');
const grid = $('#grid');

const sorters = {
  popular: (a, b) => b.rating - a.rating,
  asc: (a, b) => a.price - b.price,
  desc: (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name)
};

const cat = new URLSearchParams(location.search).get('cat');
if (CATEGORIES[cat]) form.elements.cat.value = cat;

function render() {
  const { cat, q, sort, max, sale } = Object.fromEntries(new FormData(form));
  const query = q.trim().toLowerCase();
  const list = PRODUCTS
    .filter(p => (cat === 'all' || p.cat === cat) && p.price <= +max && (!sale || p.old) && p.name.toLowerCase().includes(query))
    .sort(sorters[sort]);

  grid.innerHTML = list.map(card).join('');
  $('#empty').hidden = list.length > 0;
  $('#maxOut').textContent = money(+max);
  $('#result').textContent = `${list.length} ${list.length % 10 === 1 && list.length % 100 !== 11 ? 'model' : 'modela'}`;
}

form.addEventListener('input', render);
form.addEventListener('submit', e => e.preventDefault());
$('#reset').addEventListener('click', () => {
  form.reset();
  render();
});

if (location.hash === '#pretraga') form.elements.q.focus({ preventScroll: true });
render();
