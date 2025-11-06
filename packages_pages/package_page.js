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

// GALLERY: main image + thumbnails selector
const REPO_OWNER = 'Flatortee';
const REPO_NAME = 'flatortee.github.io';
const IMG_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/packages_pages/images`;

async function initGalleries(){
  const galleries = document.querySelectorAll('[data-gallery]');
  for (const g of galleries) {
    const folder = g.dataset.gallery;
    if (folder) {
      await buildGallery(g, folder).catch(err=> console.warn('Galerie dynamique échouée', folder, err));
    }
    setupGallery(g);
  }
}

async function buildGallery(root, folder){
  // if thumbs already present assume static content exists
  if (root.querySelector('.thumbs .thumb')) return;
  // Try to read a local manifest first for deterministic ordering and exact file list
  try {
    const manifestUrl = `${location.origin}/packages_pages/images/${folder}/manifest.json`;
    const mres = await fetch(manifestUrl);
    if (mres.ok) {
      const list = await mres.json();
      if (Array.isArray(list) && list.length) {
        const thumbs = root.querySelector('.thumbs') || (function(){ const d=document.createElement('div'); d.className='thumbs'; root.appendChild(d); return d; })();
        list.forEach((name,i)=>{
          const btn = document.createElement('button');
          btn.type = 'button'; btn.className = 'thumb';
          const imgEl = document.createElement('img');
          imgEl.alt = `image-${i+1}`;
          const localUrl = `${location.origin}/packages_pages/images/${folder}/${name}`;
          const rawUrl = `${IMG_BASE}/${folder}/${name}`;
          // use raw.githubusercontent as a reliable initial src so thumbnails don't appear broken.
          // then probe the local path and swap to it if available (faster when served locally).
          imgEl.src = rawUrl;
          imgEl.dataset.raw = rawUrl;
          imgEl.dataset.local = localUrl;
          try {
            const probe = new Image();
            probe.onload = ()=>{ imgEl.src = localUrl; };
            probe.onerror = ()=>{/* keep rawUrl */};
            probe.src = localUrl;
          } catch(e) { /* ignore probe errors */ }
          // debug log and robust error handling: if both local and raw fail, hide the thumb
          (function(btn, imgEl, localUrl, rawUrl, name){
            let triedLocal = false;
            let triedRaw = !!imgEl.src;
            imgEl.addEventListener('error', function onErr(){
              // try the other source once
              if (!triedLocal && imgEl.src === rawUrl && localUrl){ triedLocal = true; imgEl.src = localUrl; return; }
              if (!triedRaw && imgEl.src === localUrl && rawUrl){ triedRaw = true; imgEl.src = rawUrl; return; }
              // final failure: hide and log
              console.warn('Thumbnail failed to load for', name, { local: localUrl, raw: rawUrl });
              btn.style.display = 'none';
              imgEl.removeEventListener('error', onErr);
            });
          })(btn, imgEl, localUrl, rawUrl, name);
          btn.appendChild(imgEl);
          thumbs.appendChild(btn);
        });
        return;
      }
    }
  } catch(err){ console.warn('No manifest or failed to read manifest', err); }
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/packages_pages/images/${folder}`;
  let files = [];
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('HTTP '+res.status);
    const json = await res.json();
    files = Array.isArray(json)?json.filter(f=>f.type==='file'):[];
  } catch(e){ console.warn('GitHub API failed', e); }
  // If contents API didn't return files, try git/trees to list repo tree (better for large folders)
  if (!files.length) {
    try {
      const treeUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/main?recursive=1`;
      const r2 = await fetch(treeUrl);
      if (r2.ok){
        const j2 = await r2.json();
        if (j2 && Array.isArray(j2.tree)){
          files = j2.tree.filter(t=> t.path && t.type==='blob' && t.path.startsWith(`packages_pages/images/${folder}/`)).map(t=>({ name: t.path.split('/').pop(), download_url: `${IMG_BASE}/${folder}/${t.path.split('/').pop()}` }));
        }
      }
    } catch(e) { console.warn('git/trees fallback failed', e); }
  }
  const exts = ['.png','.jpg','.jpeg','.webp','.gif','.avif'];
  const images = files.filter(f=> exts.some(ext=>f.name.toLowerCase().endsWith(ext)) );
  let found = [];
  if (images.length) {
    images.sort((a,b)=> a.name.localeCompare(b.name));
    found = images.map(f=> f.download_url || `${IMG_BASE}/${folder}/${f.name}`);
  } else {
    // fallback: try a set of common filename patterns in the folder
    const base = `${location.origin}/packages_pages/images/${folder}`;
    const patterns = [];
    for (let i=1;i<=12;i++){ patterns.push(`p${i}.png`); patterns.push(`p${i}.jpg`); patterns.push(`img${i}.png`); patterns.push(`img${i}.jpg`); patterns.push(`${i}.png`); patterns.push(`${i}.jpg`); }
    // Also try any files numbered with 01..12
    for (let i=1;i<=12;i++){ const s = String(i).padStart(2,'0'); patterns.push(`${s}.png`); patterns.push(`${s}.jpg`); }
    // probe these URLs with HEAD to see which exist (limited number)
    const thumbs = root.querySelector('.thumbs') || (function(){ const d=document.createElement('div'); d.className='thumbs'; root.appendChild(d); return d; })();
    for (const p of patterns){
      const url = `${base}/${p}`;
      try{
        // try to fetch as GET but only small requests; rely on cache later
        const r = await fetch(url, {method:'GET'});
        if (r.ok){ found.push(url); }
      }catch(e){}
    }
    // If still empty, try to fetch GitHub HTML tree page and parse filenames (last resort)
    if (!found.length) {
      try{
        const treeHtmlUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/main/packages_pages/images/${folder}`;
        const rh = await fetch(treeHtmlUrl);
        if (rh.ok){
          const text = await rh.text();
          // find occurrences of blob paths
          const re = new RegExp(`/`+REPO_OWNER+`/`+REPO_NAME+`/blob/main/packages_pages/images/${folder}/([\w%\-+.@()]+)`, 'g');
          const names = new Set();
          let m;
          while((m = re.exec(text)) !== null){
            names.add(decodeURIComponent(m[1]));
          }
          for(const n of names){
            const ext = n.split('.').pop().toLowerCase();
            if (['png','jpg','jpeg','webp','gif','avif'].includes(ext)) found.push(`${IMG_BASE}/${folder}/${n}`);
          }
        }
      }catch(e){ console.warn('HTML tree parse fallback failed', e); }
    }
    // if still empty, do nothing (no images)
  }
  if (!found.length) return;
  const thumbs = root.querySelector('.thumbs') || (function(){ const d=document.createElement('div'); d.className='thumbs'; root.appendChild(d); return d; })();
  // ensure uniqueness and order
  const unique = Array.from(new Set(found));
  unique.forEach((url,i)=>{
    const btn = document.createElement('button'); btn.type='button'; btn.className='thumb';
    const imgEl = document.createElement('img');
    imgEl.alt = `image-${i+1}`;
    imgEl.src = url;
    // compute a local equivalent path when possible (may be identical)
    const localEquivalent = url.startsWith(IMG_BASE) ? url.replace(IMG_BASE, `${location.origin}/packages_pages/images`) : url.replace(`${location.origin}/packages_pages/images`, IMG_BASE);
    imgEl.dataset.raw = url;
    imgEl.dataset.local = localEquivalent;
    // add error handling: try the alternate then hide the thumb if both fail
    (function(btn, imgEl, localEquivalent, url){
      let triedLocal = false;
      let triedRaw = true; // raw is initial
      imgEl.addEventListener('error', function onErr(){
        if (!triedLocal && imgEl.src === url && localEquivalent){ triedLocal = true; imgEl.src = localEquivalent; return; }
        if (!triedRaw && imgEl.src === localEquivalent && url){ triedRaw = true; imgEl.src = url; return; }
        console.warn('Thumbnail failed to load for', imgEl.alt, { local: localEquivalent, raw: url });
        btn.style.display = 'none';
        imgEl.removeEventListener('error', onErr);
      });
    })(btn, imgEl, localEquivalent, url);
    btn.appendChild(imgEl);
    thumbs.appendChild(btn);
  });
}

function ensureTrackStructure(root){
  // kept for compatibility: ensure main-image and thumbs exist
  if (!root.querySelector('.main-image')){
    const main = document.createElement('div'); main.className='main-image'; root.insertBefore(main, root.firstChild);
  }
  if (!root.querySelector('.thumbs')){
    const thumbs = document.createElement('div'); thumbs.className='thumbs'; root.appendChild(thumbs);
  }
  return root.querySelector('.main-image');
}

function setupGallery(root){
  if (!root) return;
  ensureTrackStructure(root);
  const main = root.querySelector('.main-image');
  const thumbs = root.querySelector('.thumbs');
  if (!thumbs) return;
  // If thumbs are not yet populated (async), observe and initialize when available
  const initialize = ()=>{
    const items = Array.from(thumbs.children).filter(n=> n.classList && n.classList.contains('thumb'));
    if (!items.length) return false;
    // Ensure first item is marked
    items.forEach((b,i)=> b.setAttribute('aria-current', i===0 ? 'true':'false'));
    // build images array from thumb imgs
    const images = items.map(b=> b.querySelector('img')?.src).filter(Boolean);
    function show(i){
      const src = images[i];
      if(!src) return;
      main.innerHTML = '';
      // build a resilient main image that prefers local then raw, and retries on error
      const im = document.createElement('img');
      im.alt = `${root.dataset.gallery} ${i+1}`;
      // images[] may contain URLs (string) or be derived from thumb dataset
      const thumb = items[i]?.querySelector('img');
      const localSrc = thumb?.dataset?.local || null;
      const rawSrc = thumb?.dataset?.raw || src || null;
      // try local first if available (fast on local server), otherwise raw
      im.src = localSrc || rawSrc;
      // if load fails on local, fall back to raw; if raw fails, try local once more
      let attemptedLocal = !!localSrc;
      let attemptedRaw = !!rawSrc && (!attemptedLocal || (attemptedLocal && im.src===localSrc));
      im.addEventListener('error', ()=>{
        if (attemptedLocal && !attemptedRaw && rawSrc) {
          attemptedRaw = true; im.src = rawSrc; return;
        }
        if (!attemptedLocal && localSrc) { attemptedLocal = true; im.src = localSrc; return; }
        // give up — leave broken image indicator
      });
      // default: contain to avoid cropping non-16:9 images
      im.style.objectFit = 'contain';
      im.addEventListener('load', ()=>{
        try{
          const w = im.naturalWidth || 1;
          const h = im.naturalHeight || 1;
          const ratio = w / h;
          const target = 16/9;
          // if image ratio is within 6% of 16:9, use cover to fill
          if (Math.abs(ratio - target) / target < 0.06) {
            im.style.objectFit = 'cover';
          } else {
            im.style.objectFit = 'contain';
          }
        }catch(e){}
      });
      main.appendChild(im);
      items.forEach((b,idx)=> b.setAttribute('aria-current', idx===i ? 'true':'false'));
    }
    // attach clicks (clean duplicates)
    items.forEach((b,idx)=>{
      b.replaceWith(b.cloneNode(true)); // remove previous listeners safely
    });
    const fresh = Array.from(thumbs.children).filter(n=> n.classList && n.classList.contains('thumb'));
    const setActive = (index)=>{
      fresh.forEach((el,i)=> el.setAttribute('aria-current', i===index ? 'true':'false'));
    };
    fresh.forEach((b,idx)=> b.addEventListener('click', ()=>{ show(idx); setActive(idx); try{ b.focus(); }catch(e){} }));
    // initial show first
    show(0);
    // keyboard support
    root.setAttribute('tabindex','0');
    root.addEventListener('keydown', e=>{
      const cur = fresh.findIndex(b=> b.getAttribute('aria-current')==='true');
      if (e.key === 'ArrowRight') show(Math.min(images.length-1, cur+1));
      else if (e.key === 'ArrowLeft') show(Math.max(0, cur-1));
    });
    return true;
  };
  if (initialize()) return;
  // otherwise observe for mutations (thumbs added)
  const mo = new MutationObserver((muts, obs)=>{
    if (initialize()) obs.disconnect();
  });
  mo.observe(thumbs, {childList:true});
}

// mini demo removed — demo functionality disabled (no demo form loaded)

// SOURCES: load .hpp / .cpp from packages_pages/files/<folder>/
async function initSources(){
  // Each page should set data-files attribute on a container .sources with package name
  const sourcesContainers = document.querySelectorAll('.sources[data-package]');
  for (const container of sourcesContainers) {
    const pkg = container.dataset.package;
    const folder = `packages_pages/files/${pkg}`;
    // create two source blocks: header (.hpp) and impl (.cpp)
    const hppName = `${pkg}.hpp`;
    const cppName = `${pkg}.cpp`;
    container.innerHTML = `
      <div class="source-block">
        <div class="source-header">
          <strong>.hpp — ${hppName}</strong>
          <div class="source-actions">
            <a class="source-download" download href="/${folder}/${hppName}">Download .h</a>
            <button class="source-toggle" data-target="hpp" aria-expanded="false">Show</button>
          </div>
        </div>
        <div class="source-content" data-name="${hppName}"><div class="source-empty">Chargement…</div></div>
      </div>
      <div class="source-block">
        <div class="source-header">
          <strong>.cpp — ${cppName}</strong>
          <div class="source-actions">
            <a class="source-download" download href="/${folder}/${cppName}">Download .cpp</a>
            <button class="source-toggle" data-target="cpp" aria-expanded="false">Show</button>
          </div>
        </div>
        <div class="source-content" data-name="${cppName}"><div class="source-empty">Chargement…</div></div>
      </div>`;

    // Wire toggles
    container.querySelectorAll('.source-toggle').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        const target = btn.dataset.target;
        const content = container.querySelector(`.source-content[data-name="${pkg}.${target}"]`) || container.querySelector(`.source-content[data-name="${pkg}.${target}"]`);
        // compute filename
        const filename = target === 'hpp' ? `${pkg}.hpp` : `${pkg}.cpp`;
        const contentEl = container.querySelector(`.source-content[data-name="${filename}"]`);
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          btn.setAttribute('aria-expanded','false');
          contentEl.style.display = 'none';
          return;
        }
        btn.setAttribute('aria-expanded','true');
        // load file text: try local path first, then raw.githubusercontent fallback
        const localUrl = `${location.origin}/${folder}/${filename}`;
        const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${folder}/${filename}`;
        try {
          let res = await fetch(localUrl);
          if (!res.ok) res = await fetch(rawUrl);
          if (!res.ok) throw new Error('HTTP '+res.status);
          const text = await res.text();
          contentEl.innerHTML = `<pre><code>${escapeHtml(text)}</code></pre>`;
        } catch (err) {
          contentEl.innerHTML = `<div class="source-empty">Impossible de charger ${filename} — placez-le dans ${folder} ou vérifiez le chemin.</div>`;
        }
        contentEl.style.display = 'block';
      });
    });
  }
}

function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function init(){
  applyTheme();
  initYear();
  initGalleries();
  // initInventoryDemo removed
  initSources();
  const toggleThemeBtn = document.getElementById('toggleTheme');
  if (toggleThemeBtn) toggleThemeBtn.addEventListener('click', toggleTheme);
}

if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
