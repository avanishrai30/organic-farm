import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PlaceCard } from '@/components/ui/card-22';

// Bonsai-Style Minimalist Hero Component with GSAP Animations
const Hero = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, -60]);
  const heroRef = useRef<HTMLElement>(null);

  const handleExplore = () => {
    const el = document.getElementById('react-featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = './products/index.html';
    }
  };

  return (
    <motion.section
      className="bonsai-hero"
      id="hero"
      ref={heroRef}
      style={{ opacity: heroOpacity }}
    >
      {/* Geometric Frame Decoration */}
      <div className="bonsai-geo-frame">
        <div className="geo-filled"></div>
        <div className="geo-outline-1"></div>
        <div className="geo-outline-2"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="bonsai-scroll-indicator">
        <span className="scroll-text">scroll</span>
        <div className="scroll-line"></div>
      </div>

      {/* Main Content Area */}
      <div className="bonsai-content-wrapper">
        <div className="bonsai-canvas-mark" aria-hidden="true">01</div>
        <div className="bonsai-bottom-geometry" aria-hidden="true">
          <span className="geo-corner"></span>
          <span className="geo-square"></span>
          <span className="geo-line"></span>
        </div>

        {/* Vertical Brand Text - Left Side Column */}
        <div className="bonsai-vertical-text-wrap">
          <div className="bonsai-vertical-text">organic</div>
        </div>

        {/* Left Content */}
        <motion.div
          className="bonsai-left-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        >
          <div className="bonsai-heading-group">
            <span className="bonsai-kicker">FRESH DAIRY</span>
            <h1 className="bonsai-h1">
              <span className="bonsai-h1-large">FARM<br />FRESH</span>
              <span className="bonsai-h1-line"></span>
              <span className="bonsai-h1-sub">DAIRY, DELIVERED DAILY</span>
            </h1>
          </div>

          <p className="bonsai-desc">
            Creamy milk, cultured yogurt, and handcrafted butter from farms that put freshness first.
          </p>

          <motion.button
            className="bonsai-explore-btn"
            onClick={handleExplore}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop dairy
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* Right Image Stage */}
        <motion.div
          className="bonsai-right-stage"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        >
          {/* Background Card */}
          <div className="bonsai-stage-bg bonsai-parallax-stage"></div>

          {/* Product Relative Container */}
          <div className="bonsai-product-container bonsai-parallax-image">
            {/* Single Pedestal Image Mockup */}
            <img
              src="./img/dairy-hero-vc-panel.png"
              alt="Fresh milk, yogurt, and butter from VC Organic Farms"
              className="bonsai-product-img-single"
            />
          </div>
          <div className="bonsai-oval-stage" aria-hidden="true"></div>

          {/* Product Type Labels at Bottom */}
          <div className="bonsai-product-labels" style={{ marginTop: '24px' }}>
            <div className="bonsai-label-item">
              <span className="label-dot"></span>
              <span className="label-text">Farm fresh</span>
            </div>
            <div className="bonsai-label-item">
              <span className="label-dot"></span>
              <span className="label-text">Delivered daily</span>
            </div>
          </div>
          <div className="bonsai-mini-controls" aria-hidden="true">
            <span></span>
            <strong></strong>
            <span></span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Right Arrow/Down indicator */}
      <motion.div
        className="bonsai-down-arrow"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </motion.div>
    </motion.section>
  );
};



// Safe wrapper to fetch products database
const getProducts = () => {
  const db = (window as any).productsDb;
  if (!db) return [];
  return Object.values(db);
};

const normalizeImage = (src: string) => {
  if (!src) return '';
  const isSubfolder = 
    window.location.pathname.includes('/products/') || 
    window.location.pathname.includes('/product/') || 
    window.location.pathname.includes('/utility/') || 
    window.location.pathname.includes('/user/') || 
    window.location.pathname.includes('/upload-prescription/');
  if (!isSubfolder && src.startsWith('../')) {
    return src.replace('../', './');
  }
  return src;
};

// 1. Featured Products Component (Homepage)
const FeaturedProducts = () => {
  const allProducts = getProducts();
  
  // Highlighted bestsellers/featured items
  const featuredIds = ['fresh-organic-milk', 'premium-desi-ghee', 'fresh-butter', 'fresh-paneer'];
  const featuredProducts = allProducts.filter((p: any) => featuredIds.includes(p.id));

  // If DB not loaded or empty, fallback
  if (featuredProducts.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px', color: '#626D68', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
        Loading featured fresh produce...
      </div>
    );
  }

  return (
    <div className="w-layout-grid products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      {featuredProducts.map((product: any) => (
        <PlaceCard
          key={product.id}
          id={product.id}
          images={product.images ? product.images.map(normalizeImage) : []}
          tags={product.badge ? [product.badge] : []}
          rating={4.9}
          title={product.name}
          subtitle={product.category}
          description={product.description}
          price={`₹${product.price}`}
        />
      ))}
    </div>
  );
};

// 2. Products Catalog Component (Catalog Page with Category Tabs)
const ProductsCatalog = () => {
  const allProducts = getProducts();
  const [activeCategory, setActiveCategory] = useState('All Products');

  const categories = [
    'All Products',
    'Dairy Products',
    'Cold Press Oils',
    'Organic Groceries',
    'Superfoods & Wellness'
  ];

  const filteredProducts = activeCategory === 'All Products'
    ? allProducts
    : allProducts.filter((product: any) => product.category === activeCategory);

  if (allProducts.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px', color: '#626D68', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
        Loading products catalog...
      </div>
    );
  }

  return (
    <div className="catalog-container" style={{ width: '100%' }}>
      {/* Category Tabs with Framer Motion Sliding Pill */}
      <div 
        className="category-tabs-wrapper" 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '12px', 
          justifyContent: 'center', 
          marginBottom: '40px',
          borderBottom: '1px solid rgba(15, 58, 32, 0.08)',
          paddingBottom: '16px'
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                position: 'relative',
                padding: '10px 20px',
                borderRadius: '30px',
                border: 'none',
                background: 'transparent',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: isActive ? '#0F3A20' : '#626D68',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                outline: 'none',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 58, 32, 0.06)',
                    borderRadius: '30px',
                    zIndex: -1
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid with Layout Animations */}
      <motion.div 
        layout 
        className="products-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))', 
          gap: '28px',
          minHeight: '400px'
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product: any) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <PlaceCard
                id={product.id}
                images={product.images ? product.images.map(normalizeImage) : []}
                tags={product.badge ? [product.badge] : []}
                rating={4.9}
                title={product.name}
                subtitle={product.category}
                description={product.description}
                price={`₹${product.price}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// DOM Mounting Listeners
const mountComponents = () => {
  const heroRoot = document.getElementById('react-hero');
  if (heroRoot) {
    const root = ReactDOM.createRoot(heroRoot);
    root.render(<Hero />);
  }

  const featuredRoot = document.getElementById('react-featured-products');
  if (featuredRoot) {
    const root = ReactDOM.createRoot(featuredRoot);
    root.render(<FeaturedProducts />);
  }

  const catalogRoot = document.getElementById('react-products-catalog');
  if (catalogRoot) {
    const root = ReactDOM.createRoot(catalogRoot);
    root.render(<ProductsCatalog />);
  }
};


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountComponents);
} else {
  mountComponents();
}
