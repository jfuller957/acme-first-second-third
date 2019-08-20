const slots = ['first', 'second', 'third'];

const users = [
  { id: 1, name: 'moe', slot: 'first' },
  { id: 2, name: 'larry', slot: 'second' },
  { id: 3, name: 'curly', slot: 'third' },
  { id: 4, name: 'lucy', slot: 'third', selected: true },
];

const render = (slot)=> {
  const list = document.querySelector(`#${slot}`);
  const idx = [...list.parentNode.children].indexOf(list);
  const first = idx === 0;
  const last = [...list.parentNode.children].length - 1 === idx;
  const _users = users.filter( user => user.slot === slot);
  let html = _users.map( user => `
    <li ${ user.selected ? 'class="selected"': ''} data-id='${user.id}'>${ user.name }</li>
    `).join('');
  html = `
    <button ${ first ? 'disabled': ''}>&lt;</button>
    <button ${ last ? 'disabled': ''}>&gt;</button>
    <h2>${ slot }</h2>
    <ul>
      ${html}
    </ul>
  `;
  list.innerHTML = html;
};


slots.forEach( (slot, idx) => {
  document.querySelector(`#${slot}`).addEventListener('click', (evt)=> {
    const target = evt.target;
    if(target.tagName === 'BUTTON'){
      const direction = target.innerHTML === '&lt;' ? -1: 1;
      const newSlot = slots[idx + direction];
      const _users = users.filter( user => user.slot === slot && user.selected);
      _users.forEach(user => {
        user.slot = newSlot;
      });
      render(slot);
      render(newSlot);
    }
    if(target.tagName === 'LI'){
      const id = target.getAttribute('data-id')*1;
      const user = users.find( user => user.id === id);
      user.selected = !user.selected;
      render(slot);
    }
  });
  render(slot);
});
