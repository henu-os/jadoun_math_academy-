// (kept in separate module file) see other patch

(() => {
  const canvas = document.getElementById("heroCanvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches;
  const particleCount = prefersReduced ? 0 : isMobile ? 30 : 80;

  const symbols = ["π", "∑", "√", "∞", "△", "∫"];
  const colors = ["#F5A800", "#FFD700", "rgba(245,168,0,0.35)"];

  let w = 0;
  let h = 0;
  let mouse = { x: 0, y: 0 };
  let raf = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  window.addEventListener("resize", resize, { passive: true });
  resize();

  const particles = Array.from({ length: particleCount }).map(() => makeParticle(true));

  function makeParticle(randomY = false) {
    const size = rand(1.2, 4.2);
    const speed = rand(0.25, 0.95);
    const hasSymbol = Math.random() < 0.22;
    return {
      x: rand(0, w),
      y: randomY ? rand(0, h) : h + rand(10, 120),
      r: size,
      vy: speed,
      vx: rand(-0.08, 0.08),
      c: colors[(Math.random() * colors.length) | 0],
      sym: hasSymbol ? symbols[(Math.random() * symbols.length) | 0] : null,
      alpha: rand(0.28, 0.85),
      drift: rand(0.2, 1),
    };
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);

    // subtle vignette
    const g = ctx.createRadialGradient(w * 0.25, h * 0.2, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
    g.addColorStop(0, "rgba(245,168,0,0.08)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const mx = mouse.x || w * 0.5;
    const my = mouse.y || h * 0.35;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 220);

      p.x += p.vx + influence * (dx > 0 ? 0.15 : -0.15) * p.drift;
      p.y -= p.vy + influence * 0.1 * p.drift;

      if (p.y < -140 || p.x < -140 || p.x > w + 140) {
        particles[i] = makeParticle(false);
        continue;
      }

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.sym) {
        ctx.globalAlpha = Math.min(1, p.alpha + 0.15);
        ctx.font = `800 ${Math.max(14, p.r * 6)}px Poppins, sans-serif`;
        ctx.fillStyle = "rgba(255,215,0,0.85)";
        ctx.fillText(p.sym, p.x + 6, p.y - 6);
      }
    }

    ctx.globalAlpha = 1;
    raf = window.requestAnimationFrame(tick);
  }

  if (!prefersReduced) tick();

  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  window.addEventListener("mousemove", onMove, { passive: true });

  // touch fallback
  window.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      mouse = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    },
    { passive: true }
  );

  // Cleanup if page hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (!prefersReduced) tick();
  });
})();

