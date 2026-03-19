(() => {
  const counters = Array.from(document.querySelectorAll("[data-counter]"));
  if (!counters.length) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    counters.forEach((el) => {
      const end = Number(el.getAttribute("data-counter-end") || "0");
      const suffix = el.getAttribute("data-counter-suffix") || "";
      el.textContent = `${end}${suffix}`;
    });
    return;
  }

  const animate = (el) => {
    const end = Number(el.getAttribute("data-counter-end") || "0");
    const suffix = el.getAttribute("data-counter-suffix") || "";
    const duration = Number(el.getAttribute("data-counter-duration") || "1200");
    const start = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const val = Math.floor(eased * end);
      el.textContent = `${val}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = `${end}${suffix}`;
    };

    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (!(el instanceof HTMLElement)) return;
        if (el.dataset.counterDone === "1") return;
        el.dataset.counterDone = "1";
        animate(el);
      });
    },
    { threshold: 0.25 }
  );

  counters.forEach((el) => io.observe(el));
})();

