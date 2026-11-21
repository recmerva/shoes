const p = findProduct(new URLSearchParams(location.search).get('id')) || PRODUCTS[0];
const state = { color: 0, size: null, qty: 1 };
const stageShoe = $('#stageShoe');
const sizes = $('#sizes');
const swatches = $('#swatches');

document.title = `${p.name} — PIKO`;
$('#crumb').textContent = p.name;
$('#stageText').textContent = p.name;
$('#cat').textContent = CATEGORIES[p.cat];
$('#name').textContent = p.name;
$('#desc').textContent = p.desc;
$('#weight').textContent = `${p.weight} g`;
$('#stage').style.setProperty('--tone', p.tone);
$('#rating').innerHTML = `<span class="stars" style="--r:${p.rating}">★★★★★</span><b>${p.rating.toFixed(1)}</b> / 5 ocjena kupaca`;
$('#price').innerHTML = money(p.price) + (p.old ? `<s>${money(p.old)}</s><em>−${Math.round((1 - p.price / p.old) * 100)}%</em>` : '');
$('#details').textContent = `${p.name} kombinuje prozračno AirMesh gornjište, VoltFoam međuđon za maksimalan povrat energije i GripX đon koji ne popušta ni na mokroj podlozi. Težina: ${p.weight} g (EU 42).`;

const tag = $('#tag');
if (p.tag) {
  tag.textContent = p.tag;
  tag.classList.add(`tag-${p.tag.toLowerCase()}`);
} else tag.remove();

stageShoe.innerHTML = shoeSvg(p.colors[0].c, p.type);
$('#colorName').textContent = p.colors[0].n;
swatches.innerHTML = p.colors.map((v, i) =>
  `<button class="swatch${i ? '' : ' active'}" style="--c:${v.c[0]};--c2:${v.c[2]}" data-i="${i}" aria-label="${v.n}"></button>`
).join('');

swatches.addEventListener('click', e => {
  const btn = e.target.closest('.swatch');
  if (!btn) return;
  state.color = +btn.dataset.i;
  $('.swatch.active', swatches).classList.remove('active');
  btn.classList.add('active');
  $('#colorName').textContent = p.colors[state.color].n;
  $('.shoe', stageShoe).setAttribute('style', shoeVars(p.colors[state.color].c));
  replay(stageShoe, 'swap');
});

sizes.innerHTML = [38, 39, 40, 41, 42, 43, 44, 45, 46].map(s =>
  `<button class="size" data-s="${s}"${(p.id + s) % 5 === 0 ? ' disabled' : ''}>${s}</button>`
).join('');

sizes.addEventListener('click', e => {
  const btn = e.target.closest('.size:not(:disabled)');
  if (!btn) return;
  state.size = +btn.dataset.s;
  $('.size.active', sizes)?.classList.remove('active');
  btn.classList.add('active');
});

$('#qtyBox').addEventListener('click', e => {
  const step = +e.target.closest('[data-q]')?.dataset.q || 0;
  state.qty = Math.min(10, Math.max(1, state.qty + step));
  $('#qty').textContent = state.qty;
});

function fly(from) {
  const a = from.getBoundingClientRect();
  const b = $('.cart-link').getBoundingClientRect();
  const el = Object.assign(document.createElement('div'), { className: 'fly', innerHTML: $('.shoe', stageShoe).outerHTML });
  el.style.left = `${a.left + a.width / 2}px`;
  el.style.top = `${a.top + a.height / 2}px`;
  el.style.setProperty('--dx', `${b.left + b.width / 2 - a.left - a.width / 2}px`);
  el.style.setProperty('--dy', `${b.top + b.height / 2 - a.top - a.height / 2}px`);
  document.body.append(el);
  el.addEventListener('animationend', () => el.remove());
}

$('#add').addEventListener('click', e => {
  if (!state.size) {
    replay(sizes, 'shake');
    toast('Izaberi veličinu prije dodavanja u korpu');
    return;
  }
  Cart.add({ id: p.id, color: state.color, size: state.size, qty: state.qty });
  fly(e.currentTarget);
  toast(`${p.name} je u korpi ⚡`);
});

$('#wish').addEventListener('click', e => {
  const on = e.currentTarget.classList.toggle('on');
  toast(on ? 'Dodato u listu želja ♥' : 'Uklonjeno iz liste želja');
});

$('#related').innerHTML = PRODUCTS
  .filter(x => x.id !== p.id)
  .sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat))
  .slice(0, 4)
  .map(card)
  .join('');
