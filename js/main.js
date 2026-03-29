/* =============================================================
   REAL TEAM Digital — realteamdigital.sk
   Created: 2026-03-28
   Last updated: 2026-03-28
   ============================================================= */

/* ===== ROTATING TEXT ==================================== */
(function initRotatingText() {
  const container = document.querySelector('.rotating-text');
  if (!container) return;

  const items = container.querySelectorAll('span');
  if (!items.length) return;

  let current = 0;

  // Measure the widest span after fonts load, then fix the container width
  function setContainerWidth() {
    let maxWidth = 0;
    items.forEach(item => {
      const prev = item.style.cssText;
      item.style.cssText = 'position:absolute;visibility:hidden;opacity:0;transform:none;';
      const w = item.scrollWidth;
      item.style.cssText = prev;
      if (w > maxWidth) maxWidth = w;
    });
    container.style.width = (maxWidth + 4) + 'px';
  }

  // Show first item
  items[current].classList.add('active');

  // Set width after fonts load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setContainerWidth);
  } else {
    setTimeout(setContainerWidth, 200);
  }

  function rotate() {
    const prev = current;
    current = (current + 1) % items.length;

    items[prev].classList.remove('active');
    items[prev].classList.add('exit');

    setTimeout(() => {
      items[prev].classList.remove('exit');
    }, 500);

    items[current].classList.add('active');
  }

  setInterval(rotate, 2400);
})();


/* ===== NAV SCROLL BEHAVIOR ============================== */
(function initNav() {
  const wrapper = document.querySelector('.nav-wrapper');
  if (!wrapper) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      wrapper.classList.add('scrolled');
    } else {
      wrapper.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ===== MOBILE NAV ======================================= */
(function initMobileNav() {
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const closeBtn   = document.querySelector('.nav-mobile-close');
  const mobileLinks = document.querySelectorAll('.nav-mobile-links a');

  if (!hamburger || !mobileMenu) return;

  function open() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function close() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);

  mobileLinks.forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();


/* ===== SCROLL REVEAL ==================================== */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();
