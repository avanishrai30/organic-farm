import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PlaceCard } from '@/components/ui/card-22';

// Bonsai-Style Minimalist Editorial Hero Component (Accurate Art-Direction Match)
const Hero = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.05]);
  const heroY = useTransform(scrollY, [0, 500], [0, -40]);
  const productY = useTransform(scrollY, [0, 500], [0, -20]);
  const numeralY = useTransform(scrollY, [0, 500], [0, 30]);
  const heroRef = useRef<HTMLElement>(null);

  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const products = [
    { name: 'A2 DESI COW MILK', id: 'fresh-organic-milk' },
    { name: 'BILONA GHEE', id: 'premium-desi-ghee' },
    { name: 'FRESH PANEER', id: 'fresh-paneer' },
  ];

  const handleExplore = () => {
    const el = document.getElementById('react-featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = './products/index.html';
    }
  };

  const nextProduct = () => {
    setActiveProductIdx((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setActiveProductIdx((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <motion.section
      className="bonsai-hero"
      id="hero"
      ref={heroRef}
      style={{ opacity: heroOpacity }}
    >
      {/* Bottom-Left Geometric Composition from Bonsai Reference */}
      <div className="bonsai-geo-frame" aria-hidden="true">
        <div className="geo-filled">
          <span className="geo-scroll-text">SCROLL</span>
        </div>
        <div className="geo-outline-1"></div>
        <div className="geo-outline-2"></div>
      </div>

      {/* Main Content Area */}
      <div className="bonsai-content-wrapper">
        {/* Vertical Word - Far Left (organic) */}
        <div className="bonsai-vertical-text-wrap" aria-hidden="true">
          <span className="bonsai-vertical-text">organic</span>
        </div>

        {/* Left-Middle Editorial Content */}
        <motion.div
          className="bonsai-left-content"
          style={{ y: heroY }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="bonsai-heading-group">
            <h1 className="bonsai-h1">
              <span className="bonsai-h1-large">THE ART</span>
              <span className="bonsai-h1-line"></span>
              <span className="bonsai-h1-sub">OF PURE DAIRY</span>
            </h1>
          </div>

          <p className="bonsai-desc">
            Farm-fresh dairy, traditionally prepared and delivered with purity at its heart. From fresh A2 milk to handcrafted Bilona ghee, every product begins at the farm.
          </p>

          <motion.button
            className="bonsai-explore-btn"
            onClick={handleExplore}
            whileHover={{ scale: 1.03, backgroundColor: '#0F3A20' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            explore &rarr;
          </motion.button>
        </motion.div>

        {/* Right Product Composition Stage */}
        <div className="bonsai-right-stage">
          {/* Pale grey-green horizontal architectural band behind product */}
          <div className="bonsai-architectural-band" aria-hidden="true"></div>

          {/* Oversized white architectural 01 behind product */}
          <motion.div 
            className="bonsai-numeral-01" 
            aria-hidden="true"
            style={{ y: numeralY }}
          >
            01
          </motion.div>

          {/* Product Cutout Sits Directly on Canvas (No rounded card, no box shadow) */}
          <motion.div 
            className="bonsai-product-container bonsai-parallax-image"
            style={{ y: productY }}
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <img
              src="./img/dairy-hero-cutout.png"
              alt="VC Organic Farms Pure A2 Desi Cow Milk and Handcrafted Bilona Ghee on Stone Pedestal"
              className="bonsai-product-cutout"
              loading="eager"
            />

            {/* Subtle Elliptical Orbit Line at base of product */}
            <svg 
              className="bonsai-orbit-ellipse" 
              viewBox="0 0 540 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <ellipse cx="270" cy="50" rx="250" ry="42" stroke="#1a1a1a" strokeWidth="1.2" />
            </svg>

            {/* Center Selector Indicator (- 0 -) */}
            <div className="bonsai-selector-indicator" aria-hidden="true">
              <span className="selector-dash"></span>
              <span className="selector-dot">0</span>
              <span className="selector-dash"></span>
            </div>
          </motion.div>

          {/* Beneath Product Selector & Labels with Minimal Dots and Arrows */}
          <div className="bonsai-product-labels-nav">
            <button 
              className="bonsai-nav-arrow bonsai-prev-arrow" 
              onClick={prevProduct}
              aria-label="Previous dairy product"
            >
              &larr;
            </button>

            <div className="bonsai-product-labels">
              {products.map((p, idx) => (
                <button
                  key={p.id}
                  className={`bonsai-label-item ${idx === activeProductIdx ? 'active' : ''}`}
                  onClick={() => setActiveProductIdx(idx)}
                >
                  <span className="label-bullet">&bull;</span>
                  <span className="label-text">{p.name}</span>
                </button>
              ))}
            </div>

            <button 
              className="bonsai-nav-arrow bonsai-next-arrow" 
              onClick={nextProduct}
              aria-label="Next dairy product"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Right Minimal Action Indicator */}
      <motion.button
        className="bonsai-bottom-right-action"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
        aria-label="Scroll to explore products"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </motion.button>
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
