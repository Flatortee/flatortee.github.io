// Script partagé pour toutes les pages de packages Prism
// Fonctionnalités: thème, année, carrousel(s), mini démo inventaire si présente.

const shared = {
  theme: localStorage.getItem('theme') || 'light'
};

function applyTheme() {
  document.documentElement.dataset.theme = shared.theme;
  const btn = document.getElementById('toggleTheme');
  if (btn) btn.textContent = shared.theme === 'light' ? 'Mode sombre' : 'Mode clair';
}
function toggleTheme(){
  shared.theme = shared.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', shared.theme);
  applyTheme();
}

function initYear(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

// CARROUSEL
async function initCarousels(){
  const carousels = document.querySelectorAll('.carousel');
  for (const c of carousels) {
    const folder = c.dataset.gallery;
    if (folder) {
      await buildDynamicGallery(c, folder).catch(err=>{
        console.warn('Galerie dynamique échouée', folder, err);
      });
    }
    setupCarousel(c);
  }
}

const REPO_OWNER = 'Flatortee';
const REPO_NAME = 'flatortee.github.io';
const IMG_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/packages_pages/images`;

async function buildDynamicGallery(root, folder){
  // Si le HTML contient déjà des slides, ne pas dupliquer
  if (root.querySelector('.carousel-track .slide')) return;
  const track = ensureTrackStructure(root);
  // 1) Essayer via API GitHub (liste du dossier)
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/packages_pages/images/${folder}`;
  let files = [];
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('HTTP '+res.status);
    const json = await res.json();
    files = (Array.isArray(json)?json:[]).filter(f=>f.type==='file');
  } catch (e) {
    // Fallback: manifeste json optionnel (non encore créé) ou stop
    console.warn('API GitHub indispo, fallback simple', e);
  }
  // Extensions d'image autorisées
  const exts = ['.png','.jpg','.jpeg','.webp','.gif','.avif'];
  const images = files.filter(f=> exts.some(ext=>f.name.toLowerCase().endsWith(ext)) );
  if (!images.length) {
    root.innerHTML = '<p style="margin:0;padding:1rem;font-size:.75rem;">Aucune image trouvée dans packages_pages/images/'+folder+'</p>';
    return;
  }
  // Tri alphabétique
  images.sort((a,b)=> a.name.localeCompare(b.name));
  const frag = document.createDocumentFragment();
  images.forEach(file=>{
    const fName = file.name;
    const baseCaption = fName.replace(/[-_]/g,' ').replace(/\.[^.]+$/,'');
    const fig = document.createElement('figure');
    fig.className='slide';
    const img = document.createElement('img');
    img.loading='lazy';
    img.alt = baseCaption;
    img.src = file.download_url || `${IMG_BASE}/${folder}/${fName}`;
    const cap = document.createElement('figcaption');
    cap.textContent = baseCaption;
    fig.appendChild(img); fig.appendChild(cap); frag.appendChild(fig);
  });
  track.appendChild(frag);
}

function ensureTrackStructure(root){
  let track = root.querySelector('.carousel-track');
  if (!track) {
    track = document.createElement('div'); track.className='carousel-track'; root.appendChild(track);
  }
  // Ajouter boutons/dots si absents
  if (!root.querySelector('.carousel-btn.prev')) {
    const prev = document.createElement('button'); prev.className='carousel-btn prev'; prev.type='button'; prev.setAttribute('aria-label','Précédent'); prev.textContent='‹'; root.appendChild(prev);
  }
  if (!root.querySelector('.carousel-btn.next')) {
    const next = document.createElement('button'); next.className='carousel-btn next'; next.type='button'; next.setAttribute('aria-label','Suivant'); next.textContent='›'; root.appendChild(next);
  }
  if (!root.querySelector('.carousel-dots')) {
    const dots = document.createElement('div'); dots.className='carousel-dots'; root.appendChild(dots);
  }
  return track;
}

function setupCarousel(root){
  const track = root.querySelector('.carousel-track');
  if (!track) return;
  const slides = Array.from(track.children);
  let index = 0;
  let autoplayMs = parseInt(root.dataset.autoplay||'0',10) || 0;
  let timer;

  const prevBtn = root.querySelector('.carousel-btn.prev');
  const nextBtn = root.querySelector('.carousel-btn.next');
  const dotsWrap = root.querySelector('.carousel-dots');
  if (dotsWrap) {
    slides.forEach((_,i)=>{
      const b = document.createElement('button');
      b.type='button';
      b.setAttribute('aria-label','Aller à la diapositive '+(i+1));
      b.addEventListener('click', ()=>goTo(i));
      dotsWrap.appendChild(b);
    });
  }

  function update(){
    track.style.transform = `translateX(-${index*100}%)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll('button').forEach((b,i)=>{
        b.setAttribute('aria-current', i===index ? 'true':'false');
      });
    }
  }
  function goTo(i){
    index = (i+slides.length)%slides.length;
    update();
    restartAutoplay();
  }
  function next(){ goTo(index+1); }
  function prev(){ goTo(index-1); }

  // Désactiver navigation si une seule slide
  if (slides.length < 2) {
    if (nextBtn) nextBtn.hidden = true;
    if (prevBtn) prevBtn.hidden = true;
    if (dotsWrap) dotsWrap.hidden = true;
  }

  if (nextBtn) nextBtn.addEventListener('click', e=>{ e.stopPropagation(); next(); });
  if (prevBtn) prevBtn.addEventListener('click', e=>{ e.stopPropagation(); prev(); });

  // Gestes tactiles / souris (drag)
  let startX = 0, isDown=false, delta=0;
  root.addEventListener('pointerdown', e=>{ 
    // Ignorer si clic sur un contrôle interactif (bouton, dot)
    if (e.target.closest('.carousel-btn') || e.target.closest('.carousel-dots')) return; 
    isDown=true; startX=e.clientX; delta=0; 
    try { root.setPointerCapture(e.pointerId); } catch(_) {}
  });
  root.addEventListener('pointermove', e=>{ if(!isDown) return; delta = e.clientX - startX; });
  root.addEventListener('pointerup', e=>{
    if(!isDown) return; isDown=false; if(Math.abs(delta)>50){ delta<0?next():prev(); }
  });
  root.addEventListener('pointerleave', ()=>{ isDown=false; });

  // Keyboard
  root.setAttribute('tabindex','0');
  root.addEventListener('keydown', e=>{ if(e.key==='ArrowRight') next(); else if(e.key==='ArrowLeft') prev(); });

  function startAutoplay(){
    if(!autoplayMs) return; timer = setInterval(next, autoplayMs);
  }
  function stopAutoplay(){ if(timer) clearInterval(timer); }
  function restartAutoplay(){ stopAutoplay(); startAutoplay(); }
  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);

  update();
  startAutoplay();
}

// MINI DEMO INVENTAIRE (optionnelle) - activée si #demoForm existe
function initInventoryDemo(){
  const form = document.getElementById('demoForm');
  if(!form) return; // page sans démo
  const list = document.getElementById('demoList');
  const inventory = []; let idCounter=0;
  function render(){
    list.innerHTML='';
    inventory.forEach(item=>{
      const li=document.createElement('li');
      li.innerHTML = `<span>${item.name} × ${item.qty}</span>`;
      const del=document.createElement('button'); del.type='button'; del.textContent='X'; del.addEventListener('click',()=>{ remove(item.id); });
      li.appendChild(del); list.appendChild(li);
    });
  }
  function add(name, qty){ qty=Number(qty)||1; const existing=inventory.find(i=>i.name===name); if(existing) existing.qty+=qty; else inventory.push({id:++idCounter,name,qty}); render(); }
  function remove(id){ const i=inventory.findIndex(x=>x.id===id); if(i!==-1){ inventory.splice(i,1); render(); } }
  form.addEventListener('submit', e=>{ e.preventDefault(); const data=new FormData(form); const name=(data.get('name')||'').toString().trim(); const qty=data.get('qty'); if(!name) return; add(name, qty); form.reset(); form.elements.name.focus(); });
  render();
}

function init(){
  applyTheme();
  initYear();
  initCarousels();
  initInventoryDemo();
  const toggleThemeBtn = document.getElementById('toggleTheme');
  if (toggleThemeBtn) toggleThemeBtn.addEventListener('click', toggleTheme);
}

if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
