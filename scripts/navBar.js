const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.remove('bg-white/30', 'backdrop-blur-md', 'rounded-xl', 'top-4', 'mx-4');
      navbar.classList.add('bg-white', 'rounded-none', 'top-0', 'left-0', 'right-0', 'mx-0');
    } else {
      navbar.classList.add('bg-white/30', 'backdrop-blur-md', 'rounded-xl', 'top-4', 'mx-4');
      navbar.classList.remove('bg-white', 'rounded-none', 'top-0', 'mx-0');
    }
  });