(() => {
  const filterBar = document.querySelector("[data-filterbar]");
  const items = Array.from(document.querySelectorAll("[data-gallery-item]"));
  if (!items.length) return;

  if (filterBar) {
    const btns = Array.from(filterBar.querySelectorAll("[data-filter]"));

    const setActive = (id) => {
      btns.forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-filter") === id));
    };

    const applyFilter = (id) => {
      items.forEach((it) => {
        const cat = it.getAttribute("data-category") || "all";
        const show = id === "all" || cat === id;
        it.style.display = show ? "" : "none";
      });
    };

    filterBar.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      const btn = t.closest("[data-filter]");
      if (!(btn instanceof HTMLElement)) return;
      const id = btn.getAttribute("data-filter") || "all";
      setActive(id);
      applyFilter(id);
    });

    setActive("all");
    applyFilter("all");
  }

  // Simple lightbox
  const lb = document.querySelector("[data-lightbox]");
  const lbImg = document.querySelector("[data-lightbox-img]");
  const lbTitle = document.querySelector("[data-lightbox-title]");
  const lbClose = document.querySelector("[data-lightbox-close]");

  const open = ({ src, title }) => {
    if (!(lb instanceof HTMLElement)) return;
    if (lbImg instanceof HTMLImageElement) lbImg.src = src;
    if (lbTitle) lbTitle.textContent = title || "Gallery";
    lb.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    if (!(lb instanceof HTMLElement)) return;
    lb.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    if (lbImg instanceof HTMLImageElement) lbImg.src = "";
  };

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const card = t.closest("[data-gallery-open]");
    if (!(card instanceof HTMLElement)) return;
    const img = card.querySelector("img");
    const title = card.getAttribute("data-title") || "";
    if (img instanceof HTMLImageElement && img.src) {
      open({ src: img.src, title });
    }
  });

  lbClose?.addEventListener("click", close);
  lb?.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

