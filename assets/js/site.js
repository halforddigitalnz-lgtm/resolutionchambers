(function () {
  var root = document.documentElement;

  // Hero entrance: start once the display font is ready so lines don't reflow mid-animation.
  function ready() { root.classList.add('is-ready'); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { requestAnimationFrame(ready); });
  } else {
    ready();
  }

  // Header gains a solid background once the page scrolls.
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu.
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('menu');
  if (!toggle || !menu) return;

  var label = toggle.querySelector('[data-menu-label]');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Close' : 'Menu';
    menu.classList.toggle('is-open', open);
    root.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = menu.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close the menu if the viewport grows past the mobile breakpoint.
  var wide = window.matchMedia('(min-width: 768px)');
  var onWide = function (mq) { if (mq.matches) setOpen(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide);
})();
