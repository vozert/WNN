// Initialize AOS
AOS.init({
  once: true,
  offset: 100,
  duration: 800,
  easing: 'ease-in-out'
});

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Scroll to top functionality
const scrollTopButton = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopButton.classList.remove('hidden');
  } else {
    scrollTopButton.classList.add('hidden');
  }
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Offline detection
window.addEventListener('online', () => {
  document.getElementById('offline-message').classList.add('hidden');
});

window.addEventListener('offline', () => {
  document.getElementById('offline-message').classList.remove('hidden');
});

window.addEventListener('error', function(e) {
  console.error('Global error:', e);
  // Show user-friendly error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'fixed top-4 right-4 bg-red-500/90 text-white p-4 rounded-lg shadow-lg';
  errorMessage.textContent = 'Something went wrong. Please refresh the page.';
  document.body.appendChild(errorMessage);
});
