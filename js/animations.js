(() => {
  const els = Array.from(document.querySelectorAll("[data-animate]"));
  if (!els.length) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    els.forEach((el) => el.classList.add("animate"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (!(el instanceof HTMLElement)) return;
        el.classList.add("animate");
        io.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
})();

(() => {
  const els = Array.from(document.querySelectorAll("[data-animate]"));
  if (!els.length) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    els.forEach((el) => el.classList.add("animate"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (!(el instanceof HTMLElement)) return;
        el.classList.add("animate");
        io.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
})();

(() => {
  const els = Array.from(document.querySelectorAll("[data-animate]"));
  if (!els.length) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    els.forEach((el) => el.classList.add("animate"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (!(el instanceof HTMLElement)) return;
        el.classList.add("animate");
        io.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
})();

