const list = $('#cartList');
const FREE = 100;
let promo = false;

function summary(items) {
  const sub = items.reduce((sum, i) => sum + findProduct(i.id).price * i.qty, 0);
  const disc = promo ? sub * 0.1 : 0;
  const ship = sub >= FREE || !sub ? 0 : 7;
  $('#sub').textContent = money(sub);
  $('#ship').textContent = ship ? money(ship) : 'Besplatna';
  $('#discRow').hidden = !promo;
  $('#disc').textContent = `−${money(disc)}`;
  $('#total').textContent = money(sub - disc + ship);
  $('#shipFill').style.width = `${Math.min(sub / FREE, 1) * 100}%`;
  $('#shipText').innerHTML = sub >= FREE
    ? 'Ostvario si <b>besplatnu dostavu</b> 🎉'
    : `Još <b>${money(FREE - sub)}</b> do besplatne dostave`;
}

function render() {
  const items = Cart.get();
  $('#cartWrap').hidden = !items.length;
  $('#emptyCart').hidden = items.length > 0;
  list.innerHTML = items.map((item, i) => {
    const p = findProduct(item.id);
    const v = p.colors[item.color];
    return `<li class="cart-item" style="--i:${i}">
      <a href="product.html?id=${p.id}" class="cart-thumb" style="--tone:${p.tone}">${shoeSvg(v.c, p.type)}</a>
      <div class="cart-info"><h3>${p.name}</h3><span>${v.n} · EU ${item.size}</span><b>${money(p.price)}</b></div>
      <div class="qty"><button data-act="dec" data-i="${i}" aria-label="Manje">−</button><span>${item.qty}</span><button data-act="inc" data-i="${i}" aria-label="Više">+</button></div>
      <b class="cart-line">${money(p.price * item.qty)}</b>
      <button class="cart-remove" data-act="remove" data-i="${i}" aria-label="Ukloni">×</button>
    </li>`;
  }).join('');
  summary(items);
}

list.addEventListener('click', e => {
  const btn = e.target.closest('[data-act]');
  if (!btn || btn.closest('.out')) return;
  const items = Cart.get();
  const i = +btn.dataset.i;
  list.classList.remove('intro');

  if (btn.dataset.act === 'remove') {
    btn.closest('.cart-item').classList.add('out');
    setTimeout(() => {
      items.splice(i, 1);
      Cart.save(items);
      render();
    }, 400);
    return;
  }

  items[i].qty = Math.min(10, Math.max(1, items[i].qty + (btn.dataset.act === 'inc' ? 1 : -1)));
  Cart.save(items);
  render();
});

$('#promo').addEventListener('submit', e => {
  e.preventDefault();
  const ok = $('#code').value.trim().toUpperCase() === 'PIKO10';
  promo = promo || ok;
  toast(ok ? 'Kod PIKO10 je aktiviran: −10% ⚡' : 'Nevažeći promo kod');
  if (!ok) replay(e.target, 'shake');
  summary(Cart.get());
});

$('#checkout').addEventListener('click', () => {
  $('#orderNo').textContent = `#PK${String(Date.now()).slice(-6)}`;
  promo = false;
  Cart.save([]);
  render();
  $('#modal').hidden = false;
});

$('#modal').addEventListener('click', e => {
  if (e.target.matches('.modal, .modal-close')) $('#modal').hidden = true;
});

render();
