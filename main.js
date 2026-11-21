const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n);
const findProduct = id => PRODUCTS.find(p => p.id === +id);
const replay = (el, cls) => {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
};

const ARROW = '<svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const Cart = {
  key: 'piko-cart',
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch {
      return [];
    }
  },
  save(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    updateBadge(true);
  },
  add(item) {
    const items = this.get();
    const same = items.find(i => i.id === item.id && i.size === item.size && i.color === item.color);
    if (same) same.qty += item.qty;
    else items.push(item);
    this.save(items);
  }
};

function updateBadge(bump) {
  const n = Cart.get().reduce((sum, i) => sum + i.qty, 0);
  $$('.cart-count').forEach(el => {
    el.textContent = n;
    el.classList.toggle('show', n > 0);
    if (bump) replay(el, 'bump');
  });
}

const toasts = Object.assign(document.createElement('div'), { className: 'toasts' });
document.body.append(toasts);

function toast(msg) {
  const el = Object.assign(document.createElement('div'), { className: 'toast', textContent: msg });
  toasts.append(el);
  setTimeout(() => el.classList.add('hide'), 2600);
  el.addEventListener('animationend', e => e.animationName === 'toastOut' && el.remove());
}

const card = (p, i = 0) => `
<a class="card" href="product.html?id=${p.id}" style="--i:${i};--tone:${p.tone}" data-tilt>
  ${p.tag ? `<span class="tag tag-${p.tag.toLowerCase()}">${p.tag}</span>` : ''}
  <span class="card-go">${ARROW}</span>
  <div class="card-stage">${shoeSvg(p.colors[0].c, p.type)}</div>
  <div class="card-body">
    <span class="card-cat">${CATEGORIES[p.cat]}</span>
    <h3>${p.name}</h3>
    <div class="card-foot">
      <span class="price">${p.old ? `<s>${money(p.old)}</s>` : ''}${money(p.price)}</span>
      <span class="dots">${p.colors.map(v => `<i style="background:${v.c[0]}"></i>`).join('')}</span>
    </div>
  </div>
</a>`;

$$('[data-shoe]').forEach(el => {
  const p = findProduct(el.dataset.shoe);
  el.innerHTML = shoeSvg(p.colors[el.dataset.color || 0].c, p.type);
});

$$('.band-track').forEach(t => (t.innerHTML += t.innerHTML));
updateBadge();

const header = $('.header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 30);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

$('.burger').addEventListener('click', () => document.body.classList.toggle('nav-open'));

document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a || a.target || e.ctrlKey || e.metaKey || e.shiftKey || /^(#|https?:|mailto:|tel:)/.test(a.getAttribute('href'))) return;
  e.preventDefault();
  document.body.classList.add('leaving');
  setTimeout(() => (location.href = a.href), 600);
});
addEventListener('pageshow', () => document.body.classList.remove('leaving', 'nav-open'));

const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('in');
  io.unobserve(en.target);
}), { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
$$('[data-reveal],[data-stagger]').forEach(el => io.observe(el));

const countIo = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  countIo.unobserve(en.target);
  const el = en.target;
  const end = +el.dataset.count;
  const dec = +(el.dataset.dec || 0);
  const start = performance.now();
  const tick = now => {
    const t = Math.min((now - start) / 1800, 1);
    el.textContent = (end * (1 - (1 - t) ** 3)).toLocaleString('de-DE', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}));
$$('[data-count]').forEach(el => countIo.observe(el));

$$('.newsletter').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  toast('Hvala! Prvi saznaješ za novi drop ⚡');
  form.reset();
}));

if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let tilted;
  document.addEventListener('pointermove', e => {
    const el = e.target.closest('[data-tilt]');
    if (tilted && tilted !== el) tilted.style.transform = '';
    tilted = el;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateY(-6px)`;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  });

  const cursor = Object.assign(document.createElement('div'), { className: 'cursor' });
  document.body.append(cursor);
  addEventListener('pointermove', e => {
    cursor.classList.add('on');
    cursor.style.translate = `${e.clientX}px ${e.clientY}px`;
    cursor.classList.toggle('grow', !!e.target.closest('a, button, label, input, select, textarea, [data-tilt]'));
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('on'));
}
