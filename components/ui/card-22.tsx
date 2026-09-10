import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaceCardProps {
  id?: string;
  images: string[];
  tags: string[];
  rating?: number;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  logoSrc?: string;
  className?: string;
}

export const PlaceCard = ({
  id,
  images,
  tags,
  title,
  subtitle,
  description,
  price,
  logoSrc,
  className,
}: PlaceCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fix logo path based on current page depth
  const getLogoPath = () => {
    if (logoSrc) return logoSrc;
    const path = window.location.pathname;
    if (path.includes('/products/') || path.includes('/product/')) {
      return '../img/logo icon.png';
    }
    return './img/logo icon.png';
  };

  const changeImage = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  const handleCardClick = () => {
    if (id) {
      const path = window.location.pathname;
      if (path.includes('/products/') || path.includes('/product/')) {
        window.location.href = '../product/index.html?id=' + id;
      } else {
        window.location.href = './product/index.html?id=' + id;
      }
    }
  };

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '380px',
    overflow: 'hidden',
    borderRadius: '20px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
    padding: '12px',
    boxShadow: isHovered
      ? '0 20px 40px rgba(0,0,0,0.1)'
      : '0 4px 16px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    fontFamily: "'DM Sans', 'Inter', sans-serif",
  };

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    height: '240px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '14px',
    backgroundColor: '#f5f5f5',
  };

  const navBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 700,
    transition: 'background 0.2s',
    zIndex: 10,
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    color: '#fff',
    border: 'none',
    backdropFilter: 'blur(8px)',
    padding: '5px 12px',
    fontWeight: 600,
    borderRadius: '20px',
    fontSize: '11px',
    letterSpacing: '0.3px',
    fontFamily: "'DM Sans', 'Inter', sans-serif",
  };

  const logoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 10,
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    padding: '4px',
    overflow: 'hidden',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Carousel Section */}
      <div style={imageContainerStyle}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex] || ''}
            alt={title}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s',
            zIndex: 10,
          }}
        >
          <button
            style={navBtnStyle}
            onClick={(e) => {
              e.stopPropagation();
              changeImage(-1);
            }}
          >
            ‹
          </button>
          <button
            style={navBtnStyle}
            onClick={(e) => {
              e.stopPropagation();
              changeImage(1);
            }}
          >
            ›
          </button>
        </div>

        {/* Top Badge */}
        {tags[0] && <div style={badgeStyle}>{tags[0]}</div>}

        {/* Top Right Logo circle */}
        <div style={logoStyle}>
          <img
            src={getLogoPath()}
            alt="VC Organics"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Pagination Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '5px',
            zIndex: 10,
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              style={{
                height: '6px',
                width: currentIndex === index ? '16px' : '6px',
                borderRadius: '3px',
                backgroundColor:
                  currentIndex === index
                    ? '#fff'
                    : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '14px 6px 8px 6px' }}>
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#111',
            lineHeight: 1.3,
            margin: '0 0 4px 0',
            fontFamily: "'DM Sans', 'Inter', sans-serif",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            margin: '0 0 6px 0',
            fontFamily: "'DM Sans', 'Inter', sans-serif",
          }}
        >
          {subtitle}
        </div>
        <p
          style={{
            fontSize: '13px',
            color: '#666',
            lineHeight: 1.5,
            margin: '0 0 12px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: "'DM Sans', 'Inter', sans-serif",
          }}
        >
          {description}
        </p>

        {/* Footer with Pill Price and Buy Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '8px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              color: '#111',
              fontWeight: 800,
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '20px',
              fontFamily: "'DM Sans', 'Inter', sans-serif",
            }}
          >
            {price}
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '20px',
              backgroundColor: '#111',
              color: '#fff',
              padding: '8px 16px',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
              fontFamily: "'DM Sans', 'Inter', sans-serif",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            Buy Now
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                color: '#111',
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
