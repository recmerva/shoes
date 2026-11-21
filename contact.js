const form = $('#contactForm');

const rules = {
  name: v => v.length >= 2 || 'Unesi ime (najmanje 2 slova)',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Unesi ispravnu e-mail adresu',
  message: v => v.length >= 10 || 'Poruka mora imati bar 10 karaktera'
};

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  Object.entries(rules).forEach(([name, rule]) => {
    const res = rule(form.elements[name].value.trim());
    const field = form.elements[name].closest('.field');
    field.classList.toggle('error', res !== true);
    $('small', field).textContent = res === true ? '' : res;
    if (res !== true) valid = false;
  });

  if (!valid) return replay(form, 'shake');
  form.classList.add('sent');
  form.reset();
});

form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('error'));
$('#again').addEventListener('click', () => form.classList.remove('sent'));
