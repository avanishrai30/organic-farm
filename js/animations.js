// VC Organic Farms — Kerala Backwater motion + presentation layer
// Keeps existing ecommerce/cart/search/product behavior intact.
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function injectStyles() {
    const files = [
      ['/css/kerala-commerce-theme.css?v=2.0', 'kb-commerce-theme'],
      ['/css/kerala-signature.css?v=1.0', 'kb-signature-theme']
    ];
    files.forEach(([href, key]) => {
      if (document.querySelector(`link[data-${key}]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute(`data-${key}`, 'true');
      document.head.appendChild(link);
    });
    document.documentElement.classList.add('kerala-commerce-theme');
  }
  injectStyles();

  document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    normalizeVCContent();
    normalizeNavigation();
    initStickyHeader();
    initHeaderEntrance();
    initUnderlineHovers();
    initCartDropletParallax();
    initCinematicDairyHero();
    injectKeralaSignatureSections();
    initKeralaReveals();
    initSignatureMotion();
    initPageTransitions();
  });

  window.addEventListener('load', () => {
    initHeroParallax();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }, { once: true });

  // Remove visible pharmacy-template wording without touching scripts, style, data attributes or ecommerce logic.
  function normalizeVCContent() {
    const replacements = [
      [/Epharma/gi, 'VC Organic Farms'],
      [/e-pharmacy/gi, 'farm store'],
      [/online pharmacy/gi, 'online farm store'],
      [/pharmacy/gi, 'farm store'],
      [/medications/gi, 'farm essentials'],
      [/medication/gi, 'farm essentials'],
      [/prescriptions/gi, 'orders'],
      [/prescription/gi, 'order'],
      [/licensed U\.S\.?/gi, 'trusted local'],
      [/FDA-approved/gi, 'farm-fresh'],
      [/healthcare/gi, 'everyday nourishment']
    ];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT','STYLE','NOSCRIPT','TEXTAREA'].includes(parent.tagName)) return;
      let value = node.nodeValue;
      let next = value;
      replacements.forEach(([rx, text]) => { next = next.replace(rx, text); });
      if (next !== value) node.nodeValue = next;
    });
  }

  function normalizeNavigation() {
    $$('.header-nav-wrap a.nav-link').forEach(link => {
      const label = link.textContent.trim().toLowerCase();
      if (label === 'products') link.textContent = 'Shop';
      if (label === 'about') link.textContent = 'Our Farm';
    });
  }

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

  // Homepage only: use the existing VC dairy film as Kerala-style full-bleed media.
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

    const kicker = $('.bonsai-kicker', hero);
    const title = $('.bonsai-h1-large', hero);
    const sub = $('.bonsai-h1-sub', hero);
    const desc = $('.bonsai-desc', hero);
    const button = $('.bonsai-explore-btn', hero);
    if (kicker) kicker.textContent = 'FROM OUR FARM TO YOUR HOME';
    if (title) title.innerHTML = 'PURE FOOD';
    if (sub) sub.textContent = 'made the old way';
    if (desc) desc.textContent = 'Fresh A2 cow milk, traditionally churned Bilona ghee and honest farm-made essentials, delivered with care.';
    if (button) {
      const textNode = Array.from(button.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.nodeValue = 'Shop the farm ';
    }

    const play = () => { if (!reduced.matches && !document.hidden) video.play().catch(() => {}); };
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

  // Add only the signature Kerala modules that are missing from the current ecommerce DOM.
  // No existing store/product/cart sections are duplicated or replaced.
  function injectKeralaSignatureSections() {
    const hero = $('.bonsai-hero');
    if (!hero || $('#kb-promise')) return;

    const promise = document.createElement('section');
    promise.id = 'kb-promise';
    promise.className = 'kb-promise';
    promise.innerHTML = `
      <div class="kb-promise-inner">
        <div class="kb-promise-head" data-kb-reveal>
          <span>OUR FARM PROMISE</span>
          <h2>Good food begins <em>with better farming.</em></h2>
        </div>
        <div class="kb-stamps">
          <div class="kb-stamp-wrap"><div class="kb-stamp" data-kb-stamp><b>01</b><strong>A2 DESI COWS</strong><small>Naturally raised</small></div></div>
          <div class="kb-stamp-wrap"><div class="kb-stamp" data-kb-stamp><b>02</b><strong>FARM FRESH</strong><small>Collected daily</small></div></div>
          <div class="kb-stamp-wrap"><div class="kb-stamp" data-kb-stamp><b>03</b><strong>TRADITIONAL</strong><small>Slow crafted</small></div></div>
          <div class="kb-stamp-wrap"><div class="kb-stamp" data-kb-stamp><b>04</b><strong>CLEAN FOOD</strong><small>Nothing unnecessary</small></div></div>
        </div>
      </div>`;
    hero.insertAdjacentElement('afterend', promise);

    const featured = $('#react-featured-products');
    const anchor = featured ? featured.closest('section') : promise;
    const ribbon = document.createElement('section');
    ribbon.className = 'kb-ribbon';
    ribbon.innerHTML = `
      <div class="kb-ribbon-track">
        <span>FARM FRESH</span><b>✦</b><span>A2 MILK</span><b>✦</b><span><em>BILONA GHEE</em></span><b>✦</b><span>PURE FOOD</span><b>✦</b><span>TRADITIONAL METHODS</span><b>✦</b><span>FARM FRESH</span><b>✦</b><span>A2 MILK</span>
      </div>
      <div class="kb-ribbon-note">VC ORGANIC FARMS · FARM TO HOME</div>`;
    anchor.insertAdjacentElement('afterend', ribbon);

    const footer = $('.footer-section') || $('footer');
    if (footer && !$('#kb-process')) {
      const process = document.createElement('section');
      process.id = 'kb-process';
      process.className = 'kb-process';
      process.innerHTML = `
        <div class="kb-process-inner">
          <div class="kb-process-head" data-kb-reveal>
            <span>FARM TO DOOR</span>
            <h2>Freshness handled <em>step by step.</em></h2>
          </div>
          <div class="kb-process-grid">
            <article class="kb-step" data-kb-reveal><span class="kb-step-number">01</span><strong>Morning</strong><h3>Fresh collection</h3><p>Milk and farm essentials begin with careful morning collection and preparation.</p></article>
            <article class="kb-step" data-kb-reveal><span class="kb-step-number">02</span><strong>Quality</strong><h3>Clean handling</h3><p>Products are checked, prepared and packed with a simple farm-first process.</p></article>
            <article class="kb-step" data-kb-reveal><span class="kb-step-number">03</span><strong>Craft</strong><h3>Traditional methods</h3><p>Bilona ghee, butter and paneer follow the slower methods that define VC Organic Farms.</p></article>
            <article class="kb-step" data-kb-reveal><span class="kb-step-number">04</span><strong>Home</strong><h3>Doorstep delivery</h3><p>Your selected farm products move from our store flow to your doorstep without changing the existing checkout experience.</p></article>
          </div>
        </div>`;
      footer.insertAdjacentElement('beforebegin', process);
    }
  }

  function initKeralaReveals() {
    const candidates = [
      ...$$('main section:not(.bonsai-hero)'),
      ...$$('.products-card'),
      ...$$('.product-detail-card'),
      ...$$('.details-tabs-container'),
      ...$$('.blog-card'),
      ...$$('.faq-item'),
      ...$$('[data-kb-reveal]')
    ];
    const unique = [...new Set(candidates)].filter(el => !el.closest('.bonsai-hero'));
    unique.forEach(el => el.setAttribute('data-kb-reveal', ''));
    if (reduced.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    unique.forEach(el => {
      gsap.fromTo(el,
        { y: 24, autoAlpha: .01 },
        { y: 0, autoAlpha: 1, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true }, clearProps: 'transform,opacity,visibility' }
      );
    });
  }

  function initSignatureMotion() {
    if (reduced.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    $$('[data-kb-stamp]').forEach((el, i) => {
      gsap.fromTo(el,
        { rotation: i % 2 ? 12 : -12, y: 14 },
        { rotation: i % 2 ? 5 : -5, y: -5, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom 35%', scrub: 1.2 } }
      );
    });
    const ribbon = $('.kb-ribbon');
    const track = $('.kb-ribbon-track');
    if (ribbon && track) {
      gsap.fromTo(track, { x: -80 }, { x: -500, ease: 'none', scrollTrigger: { trigger: ribbon, start: 'top bottom', end: 'bottom top', scrub: 1.1 } });
    }
  }

  function initHeroParallax() {
    const hero = $('.bonsai-hero');
    if (!hero || reduced.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const video = $('.theme-ambient-video', hero);
    if (video) gsap.to(video, { yPercent: 11, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
    const product = $('.bonsai-right-stage', hero);
    if (product) gsap.to(product, { yPercent: -9, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .9 } });
    const copy = $('.bonsai-left-content', hero);
    if (copy) gsap.to(copy, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .8 } });
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
    document.addEventListener('visibilitychange', () => { if (!document.hidden) reset(); });

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
