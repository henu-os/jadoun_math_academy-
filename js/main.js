(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  const announce = qs("[data-announce]");
  const announceClose = qs("[data-announce-close]");
  const announceKey = "jma_announce_closedv3";

  if (announce) {
    const closed = localStorage.getItem(announceKey) === "1";
    if (closed) announce.style.display = "none";
  }

  if (announceClose && announce) {
    announceClose.addEventListener("click", () => {
      announce.style.display = "none";
      try {
        localStorage.setItem(announceKey, "1");
      } catch {
        // ignore
      }
    });
  }

  const header = qs(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active page link highlight (fallback if not set in HTML)
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  qsa("[data-navlink]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Mobile menu
  const menu = qs("[data-menu]");
  const openBtn = qs("[data-menu-open]");
  const closeBtn = qs("[data-menu-close]");

  const openMenu = () => {
    if (!menu) return;
    menu.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    const first = qs(".menu__links a", menu);
    if (first) first.focus();
  };

  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    if (openBtn) openBtn.focus();
  };

  if (openBtn) openBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  if (menu) {
    menu.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.matches("[data-menu]")) closeMenu();
      if (t.closest(".menu__links a")) closeMenu();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Floating buttons
  const toTop = qs("[data-scrolltop]");
  const wa = qs("[data-whatsapp]");

  const onScrollBtns = () => {
    if (toTop) toTop.classList.toggle("is-show", window.scrollY > 300);
  };
  window.addEventListener("scroll", onScrollBtns, { passive: true });
  onScrollBtns();

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (wa) {
    const tooltip = qs("[data-wa-tip]");
    wa.addEventListener("mouseenter", () => tooltip?.classList.add("is-show"));
    wa.addEventListener("mouseleave", () => tooltip?.classList.remove("is-show"));
    wa.addEventListener("focus", () => tooltip?.classList.add("is-show"));
    wa.addEventListener("blur", () => tooltip?.classList.remove("is-show"));
  }
})();

