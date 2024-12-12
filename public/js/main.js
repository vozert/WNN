// Initialize AOS
AOS.init({
  duration: 800,
  offset: 100,
  once: true,
});

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
