$('#featured').innerHTML = [1, 6, 5, 10].map((id, i) => card(findProduct(id), i)).join('');

const hero = $('.hero');
const heroShoe = $('.hero-shoe');
const volt = findProduct(1);

hero.addEventListener('pointermove', e => {
  const r = hero.getBoundingClientRect();
  hero.style.setProperty('--x', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
  hero.style.setProperty('--y', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
});

$$('.hero-swatch').forEach(btn => btn.addEventListener('click', () => {
  $('.shoe', heroShoe).setAttribute('style', shoeVars(volt.colors[btn.dataset.c].c));
  hero.style.setProperty('--tone', btn.dataset.tone);
  $('.hero-swatch.active').classList.remove('active');
  btn.classList.add('active');
  replay(heroShoe, 'swap');
}));

const tech = $('.tech');
const onTech = () => {
  const r = tech.getBoundingClientRect();
  const p = Math.min(Math.max(1 - r.bottom / (innerHeight + r.height), 0), 1);
  tech.style.setProperty('--p', p.toFixed(3));
};
addEventListener('scroll', onTech, { passive: true });
onTech();

const target = new Date();
target.setDate(target.getDate() + ((12 - target.getDay()) % 7 || 7));
target.setHours(20, 0, 0, 0);
const units = $$('#countdown b');

const countdown = () => {
  const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].forEach((v, i) => {
    const txt = String(v).padStart(2, '0');
    if (units[i].textContent === txt) return;
    units[i].textContent = txt;
    replay(units[i], 'flip');
  });
};
countdown();
setInterval(countdown, 1000);
