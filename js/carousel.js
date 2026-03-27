(() => {
  const root = document.querySelector(".swiper");
  if (!root) return;
  // Swiper is loaded via CDN; initialize if present
  // eslint-disable-next-line no-undef
  if (typeof Swiper === "undefined") return;

  // Hero Swiper
  if (document.querySelector(".hero-swiper")) {
    // eslint-disable-next-line no-undef
    new Swiper(".hero-swiper", {
      loop: true,
      speed: 800,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".hero-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  // Reviews/Other Swiper
  // eslint-disable-next-line no-undef
  new Swiper(".swiper:not(.hero-swiper)", {
    loop: true,
    speed: 650,
    autoplay: { delay: 2800, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination:not(.hero-pagination)", clickable: true },
    navigation: { nextEl: ".swiper-button-next:not(.hero-nav-btn)", prevEl: ".swiper-button-prev:not(.hero-nav-btn)" },
    spaceBetween: 16,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1100: { slidesPerView: 3 },
    },
  });
})();

