(() => {
  const root = document.querySelector(".swiper");
  if (!root) return;
  // Swiper is loaded via CDN; initialize if present
  // eslint-disable-next-line no-undef
  if (typeof Swiper === "undefined") return;

  // eslint-disable-next-line no-undef
  new Swiper(".swiper", {
    loop: true,
    speed: 650,
    autoplay: { delay: 2800, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    spaceBetween: 16,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1100: { slidesPerView: 3 },
    },
  });
})();

