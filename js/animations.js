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
  // Position navbar ready for slide down
  gsap.set(".header-section", { y: -100, opacity: 0 });

  gsap.to(".header-section", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.1
  });

  // Stagger navigation items
  if (document.querySelectorAll(".header-nav-wrap a.nav-link").length > 0) {
    gsap.fromTo(".header-nav-wrap a.nav-link",
      { opacity: 0, y: -15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.4
      }
    );
  }

  // Fade in brand logo
  gsap.fromTo(".header-brand",
    { scale: 0.92, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.3
    }
  );
  
  // Fade in right buttons
  gsap.fromTo(".header-button-block > *",
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.6
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

// 4. Sticky Scroll Header Shrink
function initStickyHeader() {
  if (typeof ScrollTrigger === 'undefined') return;

  // Header shrink from 82px -> 70px, background becomes more solid
  gsap.to(".header-section", {
    height: "48px",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderColor: "rgba(22, 61, 43, 0.1)",
    boxShadow: "0 8px 32px rgba(22, 61, 43, 0.08)",
    scrollTrigger: {
      trigger: "body",
      start: "top -30px",
      end: "top -120px",
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  });

  // Scale down the logo size slightly on scroll
  gsap.to(".header-brand-logo", {
    scale: 0.9,
    scrollTrigger: {
      trigger: "body",
      start: "top -30px",
      end: "top -120px",
      scrub: 0.5
    }
  });
  
  // Fade out milk wave slightly as you scroll down
  gsap.to(".header-milk-wave", {
    opacity: 0.6,
    y: -10,
    scrollTrigger: {
      trigger: "body",
      start: "top -20px",
      end: "top -150px",
      scrub: 0.5
    }
  });
}

// 5. ScrollTrigger Parallax System for Hero layers
function initHeroParallax() {
  const heroSection = document.getElementById("hero");
  if (!heroSection || typeof ScrollTrigger === 'undefined') return;

  // Background Stage (Speed 0.15)
  if (document.querySelector(".bonsai-parallax-stage")) {
    gsap.to(".bonsai-parallax-stage", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Product image parallax - moves up slower than scroll
  if (document.querySelector(".bonsai-parallax-image")) {
    gsap.to(".bonsai-parallax-image", {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Hero text contents parallax offset (content moves slower)
  if (document.querySelector(".bonsai-left-content")) {
    gsap.to(".bonsai-left-content", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Geometric frame parallax (moves slightly)
  if (document.querySelector(".bonsai-geo-frame")) {
    gsap.to(".bonsai-geo-frame", {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Product labels fade and move
  if (document.querySelector(".bonsai-product-labels")) {
    gsap.to(".bonsai-product-labels", {
      yPercent: -10,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Vertical text parallax
  if (document.querySelector(".bonsai-vertical-text-wrap")) {
    gsap.to(".bonsai-vertical-text-wrap", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
}
