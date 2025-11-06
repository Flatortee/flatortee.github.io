// Prism Engine Packages - Client side catalogue
// Architecture simple sans build step.
// Données mockées pour démarrer. Remplacez ensuite par un fetch JSON.

const PACKAGES = [
  {
    id: 'core',
    name: 'prism-core',
    description: 'Coeur de Prism Engine: gestion des scènes, lifecycle, events.',
    version: '1.0.0',
    tags: ['noyau', 'moteur', 'runtime'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-core',
    page: 'packages_pages/core.html'
  },
  {
    id: 'render-gl',
    name: 'prism-render-gl',
    description: 'Backend de rendu WebGL/GL abstrait pour Prism.',
    version: '0.7.2',
    tags: ['render', 'webgl', 'gpu'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-render-gl',
    page: 'packages_pages/render_gl.html'
  },
  {
    id: 'ui',
    name: 'prism-ui',
    description: 'Composants UI overlay et widgets (debug panels, stats).',
    version: '0.3.1',
    tags: ['ui', 'widgets'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-ui',
    page: 'packages_pages/ui.html'
  },
  {
    id: 'physics',
    name: 'prism-physics',
    description: 'Intégration physique modulaire (plugins Bullet, Rapier).',
    version: '0.1.0',
    tags: ['physique', 'simulation'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-physics',
    page: 'packages_pages/physics.html'
  },
  {
    id: 'assets',
    name: 'prism-assets',
    description: 'Gestionnaire d\'assets async, cache, loaders glTF, textures.',
    version: '0.4.5',
    tags: ['assets', 'io'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-assets',
    page: 'packages_pages/assets.html'
  },
  {
    id: 'math',
    name: 'prism-math',
    description: 'Lib math optimisée (vecteurs, matrices, quaternions).',
    version: '1.1.0',
    tags: ['math', 'noyau'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-math',
    page: 'packages_pages/math.html'
  },
  {
    id: 'net',
    name: 'prism-net',
    description: 'Synchronisation réseau / netcode expérimental.',
    version: '0.0.8',
    tags: ['reseau', 'multijoueur', 'experimental'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-net',
    page: 'packages_pages/net.html'
  },
  {
    id: 'ai',
    name: 'prism-ai',
    description: 'Composants IA: pathfinding, behaviour trees.',
    version: '0.2.0',
    tags: ['ia', 'pathfinding'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-ai',
    page: 'packages_pages/ai.html'
  },
  // Nouveau package Inventory System lié à la page existante
  {
    id: 'inventory-system',
    name: 'prism-inventory-system',
    description: 'Système d\'inventaire modulaire (stack, slots, persistance).',
    version: '0.1.0',
    tags: ['ui', 'assets'],
    license: 'MIT',
    repo: 'https://github.com/Flatortee/prism-inventory-system',
    page: 'packages_pages/inventory_system.html'
  }
];

// Config
const TAG_ORDER = [
  'noyau','runtime','render','gpu','webgl','math','assets','io','physique','simulation','ui','widgets','reseau','multijoueur','ia','pathfinding','experimental'
];

// State
const state = {
  search: '',
  activeTags: new Set(),
  theme: localStorage.getItem('theme') || 'light'
};

// Elements
const el = {
  search: document.getElementById('search'),
  clearSearch: document.getElementById('clearSearch'),
  tagContainer: document.getElementById('tags'),
  tagSummary: document.getElementById('tagSummary'),
  grid: document.getElementById('grid'),
  empty: document.getElementById('emptyState'),
  selectAll: document.getElementById('selectAllTags'),
  clearTags: document.getElementById('clearTags'),
  year: document.getElementById('year'),
  toggleTheme: document.getElementById('toggleTheme')
};

// Utility: debounce
function debounce(fn, delay=120) { let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), delay); }; }

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'');
}

function buildTagIndex() {
  const counts = new Map();
  for (const p of PACKAGES) {
    for (const tg of p.tags) {
      counts.set(tg, (counts.get(tg)||0)+1);
    }
  }
  return counts;
}

function renderTags() {
  const counts = buildTagIndex();
  const tags = Array.from(counts.keys());
  tags.sort((a,b)=>{
    const ia = TAG_ORDER.indexOf(a); const ib = TAG_ORDER.indexOf(b);
    if (ia!==-1 && ib!==-1) return ia-ib;
    if (ia!==-1) return -1; if (ib!==-1) return 1;
    return a.localeCompare(b);
  });
  el.tagContainer.innerHTML='';
  tags.forEach(tag=>{
    const count = counts.get(tag);
    const btn = document.createElement('button');
    btn.type='button';
    btn.className='tag';
    btn.dataset.tag = tag;
    btn.dataset.active = state.activeTags.has(tag);
    btn.innerHTML = `<span class="label">${tag}</span><span class="count">${count}</span>`;
    btn.addEventListener('click', ()=>toggleTag(tag));
    el.tagContainer.appendChild(btn);
  });
  updateTagSummary();
}

function updateTagSummary() {
  if (!state.activeTags.size) { el.tagSummary.textContent = 'Aucun tag sélectionné'; return; }
  el.tagSummary.textContent = `${state.activeTags.size} tag(s) actifs: ${Array.from(state.activeTags).join(', ')}`;
}

function toggleTag(tag) {
  if (state.activeTags.has(tag)) state.activeTags.delete(tag); else state.activeTags.add(tag);
  renderTags();
  renderGrid();
}

function clearAllTags() { state.activeTags.clear(); renderTags(); renderGrid(); }
function selectAllTags() {
  const counts = buildTagIndex();
  state.activeTags = new Set(counts.keys());
  renderTags(); renderGrid();
}

function packageMatches(p) {
  const searchTokens = normalize(state.search).split(/\s+/).filter(Boolean);
  if (searchTokens.length) {
    const hay = normalize([p.name, p.description, p.tags.join(' ')].join(' '));
    for (const t of searchTokens) if (!hay.includes(t)) return false;
  }
  if (state.activeTags.size) {
    for (const tag of state.activeTags) if (!p.tags.includes(tag)) return false;
  }
  return true;
}

function highlight(text, terms) {
  if (!terms.length) return text;
  let result = text;
  terms.forEach(t=>{ if(!t) return; const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,`ig`); result = result.replace(re,'<mark>$1</mark>'); });
  return result;
}

function renderGrid() {
  const terms = normalize(state.search).split(/\s+/).filter(Boolean);
  const filtered = PACKAGES.filter(packageMatches);
  el.grid.setAttribute('aria-busy','true');
  el.grid.innerHTML = '';
  if (!filtered.length) {
    el.empty.hidden = false; el.grid.setAttribute('aria-busy','false'); return;
  }
  el.empty.hidden = true;
  const frag = document.createDocumentFragment();
  filtered.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'package-card';
    card.setAttribute('role','listitem');
    card.innerHTML = `
      <h3>${highlight(p.name, terms)}</h3>
      <p class="desc">${highlight(p.description, terms)}</p>
      <div class="package-meta">
        ${p.tags.map(t=>`<span class="badge" data-tag="${t}">${t}</span>`).join('')}
      </div>
      <div class="package-footer">
        <span class="badge" title="Version">v${p.version}</span>
        <a class="more" href="${p.page || p.repo}" ${p.page ? '' : 'target="_blank" rel="noopener"'}>Show →</a>
      </div>`;
    frag.appendChild(card);
  });
  el.grid.appendChild(frag);
  el.grid.setAttribute('aria-busy','false');
}

function handleSearchInput(e) {
  state.search = e.target.value;
  renderGrid();
}

function clearSearch() {
  state.search = '';
  el.search.value = '';
  renderGrid();
  el.search.focus();
}

function initTheme() {
  document.documentElement.dataset.theme = state.theme;
  updateThemeBtn();
}
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', state.theme);
  document.documentElement.dataset.theme = state.theme;
  updateThemeBtn();
}
function updateThemeBtn() {
  el.toggleTheme.textContent = state.theme === 'light' ? 'Mode sombre' : 'Mode clair';
  el.toggleTheme.setAttribute('aria-pressed', state.theme === 'dark');
}

function registerShortcuts() {
  window.addEventListener('keydown', (e)=>{
    if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
      e.preventDefault(); el.search.focus();
    } else if ((e.key === 'Escape')) {
      if (el.search === document.activeElement && el.search.value) { clearSearch(); }
    } else if (e.key === '/' && (e.ctrlKey || e.metaKey)) { // Ctrl+/ focus
      e.preventDefault(); el.search.focus();
    }
  });
}

function initYear() { el.year.textContent = new Date().getFullYear(); }

function init() {
  initTheme();
  initYear();
  renderTags();
  renderGrid();
  el.search.addEventListener('input', debounce(handleSearchInput, 180));
  el.clearSearch.addEventListener('click', clearSearch);
  el.clearTags.addEventListener('click', clearAllTags);
  el.selectAll.addEventListener('click', selectAllTags);
  el.toggleTheme.addEventListener('click', toggleTheme);
  registerShortcuts();
}

// DOM Ready (works even if script at end)
if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
