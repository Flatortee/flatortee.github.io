const once = new WeakMap();
let io = null;

function ensureObserver() {
    return io ??= new IntersectionObserver(entries => {
        for (const entry of entries) {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.classList.add('is-visible');
                if (once.get(el) !== false) {
                    io.unobserve(el);
                    once.delete(el);
                }
            } else if (once.get(el) === false) {
                el.classList.remove('is-visible');
            }
        }
    }, {threshold: 0.12, rootMargin: '0px 0px -8% 0px'});
}

export function observe(el, isOnce = true) {
    if (!el) return;
    once.set(el, isOnce);
    ensureObserver().observe(el);
}

export function unobserve(el) {
    if (!el || !io) return;
    io.unobserve(el);
    once.delete(el);
}
