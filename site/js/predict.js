// {% predict %} (docs/specs/discovery-engagement-spec.md section 4.2). The page ships a list of options and a <details> reveal, which is
// the whole feature without JavaScript. This turns it into radio buttons and a Check button, reveals the answer and marks right or wrong.
// The choice is kept in sessionStorage so a reload keeps the reveal. Nothing is sent anywhere: the only output is a `predict` event
// on `document` (detail: { page, index, option, correct }) for the measurement card to listen to later.

const store = {
  get(key) { try { return window.sessionStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { window.sessionStorage.setItem(key, value); } catch { /* private window or blocked storage */ } },
};

function mountPredict(root) {
  const index = Number(root.dataset.predict);
  const correct = Number(root.dataset.correct);
  const q = root.querySelector('.predict__q');
  const list = root.querySelector('.predict__list');
  const reveal = root.querySelector('.predict__reveal');
  if (!q || !list || !reveal || !index || !correct) return;
  const options = [...list.children].map((li) => li.innerHTML);
  const revealHtml = (reveal.querySelector('p') || reveal).innerHTML;
  const key = `predict:${location.pathname}:${index}`;
  const name = `predict-${index}`;

  const set = document.createElement('fieldset');
  set.className = 'predict__set';
  set.setAttribute('aria-labelledby', q.id);
  const radios = options.map((html, i) => {
    const label = document.createElement('label');
    label.className = 'predict__opt';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = String(i + 1);
    const text = document.createElement('span');
    text.innerHTML = html;
    label.append(input, text);
    set.append(label);
    return { input, label };
  });
  const bar = document.createElement('div');
  bar.className = 'predict__bar';
  const check = document.createElement('button');
  check.type = 'button';
  check.className = 'w-btn predict__check';
  check.textContent = 'Check';
  const msg = document.createElement('span');
  msg.className = 'predict__msg';
  msg.setAttribute('role', 'status');
  bar.append(check, msg);
  set.append(bar);

  const result = document.createElement('div');
  result.className = 'predict__result';
  result.hidden = true;
  result.setAttribute('role', 'status');
  result.setAttribute('aria-live', 'polite');

  list.replaceWith(set);
  reveal.replaceWith(result);
  root.classList.add('predict--live');

  function show(choice, emit) {
    const right = choice === correct;
    radios.forEach((r, i) => {
      r.input.checked = i + 1 === choice;
      r.input.disabled = true;
      r.label.classList.toggle('is-chosen', i + 1 === choice);
      r.label.classList.toggle('is-right', i + 1 === correct);
      r.label.classList.toggle('is-wrong', i + 1 === choice && !right);
    });
    check.disabled = true;
    msg.textContent = '';
    const verdict = document.createElement('p');
    verdict.className = 'predict__verdict';
    verdict.textContent = right ? 'Right.' : `Not quite. The answer is option ${correct}.`;
    const body = document.createElement('p');
    body.innerHTML = revealHtml;
    result.replaceChildren(verdict, body);
    result.classList.toggle('is-right', right);
    result.hidden = false;
    if (emit) {
      store.set(key, String(choice));
      document.dispatchEvent(new CustomEvent('predict', { detail: { page: location.pathname, index, option: choice, correct: right } }));
    }
  }

  check.addEventListener('click', () => {
    const picked = radios.findIndex((r) => r.input.checked);
    if (picked < 0) { msg.textContent = 'Pick an answer first.'; radios[0].input.focus(); return; }
    show(picked + 1, true);
  });
  set.addEventListener('change', () => { msg.textContent = ''; });

  const saved = Number(store.get(key));
  if (saved >= 1 && saved <= options.length) show(saved, false);
}

document.querySelectorAll('.predict[data-predict]').forEach(mountPredict);
