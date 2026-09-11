// VC Organic Farms - GSAP Animation Core Engine
// Handles: Sticky shrinking header, staggered page load, underline grow hovers, 3D cart droplet parallax, and hero scroll parallax layers.

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP is loaded before executing
  if (typeof gsap === 'undefined') {
    console.warn("GSAP is not loaded. Skipping animations initialization.");
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  initHeaderEntrance();
  initUnderlineHovers();
  initCartDropletParallax();
});

// Runs on complete page load (including images/React components mount)
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;

  initStickyHeader();
  initHeroParallax();
});

// 1. Staggered Page Load Entrance Animation
function initHeaderEntrance() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Smooth clean slide-in of the header container
  gsap.fromTo(".header-section", 
    { y: -20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1
    }
  );
}

// 2. Active / Hover Underline Animation
function initUnderlineHovers() {
  const navLinks = document.querySelectorAll(".header-nav-wrap a.nav-link");
  
  navLinks.forEach(link => {
    // Append a custom underline span if not already present
    if (!link.querySelector(".nav-underline")) {
      const underline = document.createElement("span");
      underline.className = "nav-underline";
      link.appendChild(underline);
    }
    
    const underline = link.querySelector(".nav-underline");
    const isCurrent = link.classList.contains("w--current");

    // Initialize scales
    if (isCurrent) {
      gsap.set(underline, { scaleX: 1, transformOrigin: "center" });
    } else {
      gsap.set(underline, { scaleX: 0, transformOrigin: "center" });
      
      // Animate hover grow from center
      link.addEventListener("mouseenter", () => {
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.45,
          ease: "power2.out"
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.45,
          ease: "power2.out"
        });
      });
    }
  });
}

// 3. 3D Milk Droplet Cart Mouse Parallax
function initCartDropletParallax() {
  const cartButton = document.querySelector(".header-cart-droplet");
  if (!cartButton) return;

  const droplet = cartButton.querySelector(".droplet-3d");
  if (!droplet) return;

  cartButton.addEventListener("mousemove", (e) => {
    const rect = cartButton.getBoundingClientRect();
    // Calculate relative cursor position from the center of the cart button
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Translate the droplet by a fraction of the delta (max translation: 3px)
    gsap.to(droplet, {
      x: x * 0.15,
      y: y * 0.15,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });

    // Translate button container slightly for complete parallax feedback
    gsap.to(cartButton, {
      x: x * 0.08,
      y: y * 0.08,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  cartButton.addEventListener("mouseleave", () => {
    // Spring/Elastic recovery
    gsap.to(droplet, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1.2, 0.4)"
    });

    gsap.to(cartButton, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  });
}

// 4. Sticky Scroll Header Transition (Ampul / Bonsai style)
function initStickyHeader() {
  const header = document.querySelector(".header-section");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// 5. ScrollTrigger Parallax System for Hero layers
function initHeroParallax() {
  const heroSection = document.getElementById("hero");
  if (!heroSection || typeof ScrollTrigger === 'undefined') return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Product cutout moves slightly slower than scroll
  if (document.querySelector(".bonsai-product-container")) {
    gsap.to(".bonsai-product-container", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    });
  }

  // Architectural 01 moves at another depth
  if (document.querySelector(".bonsai-numeral-01")) {
    gsap.to(".bonsai-numeral-01", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });
  }

  // Architectural band moves subtly
  if (document.querySelector(".bonsai-architectural-band")) {
    gsap.to(".bonsai-architectural-band", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });
  }

  // Left editorial content moves slightly slower
  if (document.querySelector(".bonsai-left-content")) {
    gsap.to(".bonsai-left-content", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    });
  }
}
