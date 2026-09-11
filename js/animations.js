// VC Organic Farms — Kerala Backwater motion layer
// Keeps existing ecommerce/cart/search/product behavior intact; this file only adds theme + presentation motion.
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function injectTheme() {
    if (document.querySelector('link[data-kb-commerce-theme]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/kerala-commerce-theme.css?v=1.0';
    link.dataset.kbCommerceTheme = 'true';
    document.head.appendChild(link);
    document.documentElement.classList.add('kerala-commerce-theme');
  }
  injectTheme();

  document.addEventListener('DOMContentLoaded', () => {
    injectTheme();
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    initStickyHeader();
    initHeaderEntrance();
    initUnderlineHovers();
    initCartDropletParallax();
    initCinematicDairyHero();
    initKeralaReveals();
    initPageTransitions();
  });

  window.addEventListener('load', () => {
    initHeroParallax();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }, { once: true });

  function initHeaderEntrance() {
    if (reduced.matches || typeof gsap === 'undefined') return;
    const header = $('.header-section');
    if (!header) return;
    gsap.fromTo(header,
      { y: -18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: .9, ease: 'power3.out', delay: .08, clearProps: 'transform,opacity,visibility' }
    );
  }

  function initUnderlineHovers() {
    $$('.header-nav-wrap a.nav-link').forEach(link => {
      let underline = $('.nav-underline', link);
      if (!underline) {
        underline = document.createElement('span');
        underline.className = 'nav-underline';
        link.appendChild(underline);
      }
      if (typeof gsap === 'undefined') return;
      const active = link.classList.contains('w--current');
      gsap.set(underline, { scaleX: active ? 1 : 0, transformOrigin: 'center' });
      if (!active) {
        link.addEventListener('mouseenter', () => gsap.to(underline, { scaleX: 1, duration: .35, ease: 'power2.out' }));
        link.addEventListener('mouseleave', () => gsap.to(underline, { scaleX: 0, duration: .35, ease: 'power2.out' }));
      }
    });
  }

  function initCartDropletParallax() {
    const cartButton = $('.header-cart-droplet');
    if (!cartButton || typeof gsap === 'undefined' || reduced.matches) return;
    const droplet = $('.droplet-3d', cartButton);
    if (!droplet) return;
    cartButton.addEventListener('mousemove', e => {
      const r = cartButton.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(droplet, { x: x * .12, y: y * .12, scale: 1.04, duration: .3, ease: 'power2.out' });
      gsap.to(cartButton, { x: x * .05, y: y * .05, duration: .3, ease: 'power2.out' });
    });
    cartButton.addEventListener('mouseleave', () => {
      gsap.to(droplet, { x: 0, y: 0, scale: 1, duration: .7, ease: 'elastic.out(1.1,.45)' });
      gsap.to(cartButton, { x: 0, y: 0, duration: .5, ease: 'power2.out' });
    });
  }

  function initStickyHeader() {
    const header = $('.header-section');
    if (!header || header.dataset.kbStickyBound) return;
    header.dataset.kbStickyBound = 'true';
    const update = () => header.classList.toggle('header-scrolled', window.scrollY > 45);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // Homepage only: reuse the repository's existing dairy film as the Kerala-style full-bleed hero media.
  function initCinematicDairyHero() {
    const hero = $('.bonsai-hero');
    if (!hero || hero.querySelector('.theme-ambient-video')) return;

    const video = document.createElement('video');
    video.className = 'theme-ambient-video';
    video.setAttribute('aria-hidden', 'true');
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = '/img/dairy_farm_bg.png';
    video.src = '/img/milk%20vidoe.mp4';
    hero.prepend(video);

    const play = () => {
      if (!reduced.matches && !document.hidden) video.play().catch(() => {});
    };
    if (reduced.matches) video.pause(); else play();
    video.addEventListener('loadeddata', play, { once: true });
    document.addEventListener('visibilitychange', () => document.hidden ? video.pause() : play());
    window.addEventListener('pageshow', play);
    reduced.addEventListener?.('change', e => e.matches ? video.pause() : play());

    if (typeof gsap !== 'undefined' && !reduced.matches) {
      const heroItems = $$('.bonsai-left-content > *', hero);
      if (heroItems.length) {
        gsap.fromTo(heroItems,
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: .95, stagger: .11, ease: 'power3.out', delay: .12, clearProps: 'transform,opacity,visibility' }
        );
      }
      const product = $('.bonsai-right-stage', hero);
      if (product) gsap.fromTo(product, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, delay: .35, ease: 'power3.out' });
    }
  }

  // Same quiet reveal language as kerala-backwater: complete blocks, no fractured headings.
  function initKeralaReveals() {
    const candidates = [
      ...$$('main section:not(.bonsai-hero)'),
      ...$$('.products-card'),
      ...$$('.product-detail-card'),
      ...$$('.details-tabs-container'),
      ...$$('.blog-card'),
      ...$$('.faq-item')
    ];
    const unique = [...new Set(candidates)].filter(el => !el.closest('.bonsai-hero'));
    unique.forEach(el => el.setAttribute('data-kb-reveal', ''));
    if (reduced.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    unique.forEach(el => {
      gsap.fromTo(el,
        { y: 24, autoAlpha: .01 },
        {
          y: 0, autoAlpha: 1, duration: .85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
          clearProps: 'transform,opacity,visibility'
        }
      );
    });
  }

  function initHeroParallax() {
    const hero = $('.bonsai-hero');
    if (!hero || reduced.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const video = $('.theme-ambient-video', hero);
    if (video) {
      gsap.to(video, {
        yPercent: 11, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 }
      });
    }
    const product = $('.bonsai-right-stage', hero);
    if (product) {
      gsap.to(product, {
        yPercent: -9, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .9 }
      });
    }
    const copy = $('.bonsai-left-content', hero);
    if (copy) {
      gsap.to(copy, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .8 }
      });
    }
  }

  function initPageTransitions() {
    if (reduced.matches || typeof gsap === 'undefined' || $('.kb-page-transition')) return;
    const wipe = document.createElement('div');
    wipe.className = 'kb-page-transition';
    wipe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(wipe);
    const reset = () => gsap.set(wipe, { opacity: 0, pointerEvents: 'none' });
    reset();
    window.addEventListener('pageshow', reset);

    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      let url;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin || url.pathname === location.pathname || url.hash || a.closest('.w-commerce-commercecartwrapper')) return;
      e.preventDefault();
      gsap.set(wipe, { pointerEvents: 'auto' });
      gsap.to(wipe, { opacity: 1, duration: .18, ease: 'power1.out', onComplete: () => location.assign(url.href) });
      setTimeout(reset, 1600);
    });
  }
})();
