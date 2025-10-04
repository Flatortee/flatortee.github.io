// Script spécifique page prism-inventory-system
const yearEl = document.getElementById('year');
const toggleThemeBtn = document.getElementById('toggleTheme');
const form = document.getElementById('demoForm');
const list = document.getElementById('demoList');

const themeState = { theme: localStorage.getItem('theme') || 'light' };

function applyTheme() {
  document.documentElement.dataset.theme = themeState.theme;
  toggleThemeBtn.textContent = themeState.theme === 'light' ? 'Mode sombre' : 'Mode clair';
}
function toggleTheme(){
  themeState.theme = themeState.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', themeState.theme);
  applyTheme();
}

// Mini inventaire en mémoire pour la démo
const inventory = [];
let idCounter = 0;

function renderInventory() {
  list.innerHTML = '';
  inventory.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name} × ${item.qty}</span>`;
    const del = document.createElement('button');
    del.type='button';
    del.textContent='X';
    del.title='Retirer';
    del.addEventListener('click', ()=>{ removeItem(item.id); });
    li.appendChild(del);
    list.appendChild(li);
  });
}
function addItem(name, qty) {
  qty = Number(qty)||1;
  // Fusion simple si même nom
  const existing = inventory.find(i => i.name === name);
  if (existing) existing.qty += qty; else inventory.push({ id: ++idCounter, name, qty });
  renderInventory();
}
function removeItem(id) {
  const idx = inventory.findIndex(i=>i.id===id);
  if (idx!==-1) { inventory.splice(idx,1); renderInventory(); }
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name')||'').toString().trim();
  const qty = data.get('qty');
  if (!name) return;
  addItem(name, qty);
  form.reset();
  form.elements.name.focus();
});

yearEl.textContent = new Date().getFullYear();
applyTheme();
toggleThemeBtn.addEventListener('click', toggleTheme);
renderInventory();
