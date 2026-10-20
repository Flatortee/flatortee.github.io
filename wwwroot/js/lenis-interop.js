// Module ES appelé par LenisService.cs. Lenis est chargé par le CDN (index.html, defer).
// Optimisation : la boucle requestAnimationFrame S'ENDORT quand la page ne défile pas
// et se réveille sur wheel / scroll / touch / clavier => 0 % CPU à l'arrêt.
let lenis = null;
let rafId = 0;
let idle = 0;

const WAKE_EVENTS = ['wheel', 'scroll', 'touchstart', 'keydown', 'pointerdown', 'resize'];
const PASSIVE = {passive: true};

const raf = time => {
    lenis.raf(time);
    idle = lenis.isScrolling ? 0 : idle + 1;
    rafId = idle > 45 ? 0 : requestAnimationFrame(raf);
};

function wake() {
    idle = 0;
    if (lenis && !rafId) rafId = requestAnimationFrame(raf);
}

async function waitForLenis() {
    for (let i = 0; i < 60 && typeof Lenis === 'undefined'; i++)
        await new Promise(r => setTimeout(r, 50));
    return typeof Lenis !== 'undefined';
}

export async function init(options = {}) {
    if (lenis) return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (!(await waitForLenis())) {
        console.warn('Lenis CDN indisponible : scroll natif.');
        return false;
    }

    lenis = new Lenis({
        duration: options.duration ?? 1.1,
        smoothWheel: options.smoothWheel ?? true,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    for (const type of WAKE_EVENTS) window.addEventListener(type, wake, PASSIVE);
    wake();
    return true;
}

export function scrollTo(target, immediate = false, offset = 0) {
    if (lenis) {
        lenis.scrollTo(target, {immediate, offset});
        wake();
        return;
    }
    if (typeof target === 'number') window.scrollTo({top: target, behavior: immediate ? 'auto' : 'smooth'});
    else document.querySelector(target)?.scrollIntoView({behavior: immediate ? 'auto' : 'smooth'});
}

export function stop() {
    lenis?.stop();
}

export function start() {
    lenis?.start();
    wake();
}

export function destroy() {
    for (const type of WAKE_EVENTS) window.removeEventListener(type, wake, PASSIVE);
    cancelAnimationFrame(rafId);
    rafId = 0;
    lenis?.destroy();
    lenis = null;
}
