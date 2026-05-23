import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { IMAGES } from '../data';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // GSAP entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    if (logoRef.current) {
      tl.fromTo(logoRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '-=0.4');
    }
    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.08 },
        '-=0.3'
      );
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        ref={navRef}
        id="main-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(252, 249, 248, 0.95)' : 'var(--surface)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid var(--outline-variant)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: 1280,
            margin: '0 auto',
            padding: '16px var(--margin-mobile)',
          }}
          className="nav-container"
        >
          {/* Logo */}
          <Link
            to="/"
            ref={logoRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
            }}
            id="nav-logo"
          >
            <img
              src={IMAGES.logo}
              alt="Revival Mission Logo"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                objectFit: 'contain',
              }}
            />
            <span
              className="headline-md"
              style={{ color: 'var(--primary)', fontWeight: 700 }}
            >
              The Revival Mission
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            ref={linksRef}
            style={{
              display: 'none',
              gap: 'var(--space-gutter)',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="label-md"
                  style={{
                    color: isActive ? 'var(--primary)' : 'var(--on-surface-variant)',
                    fontWeight: isActive ? 700 : 500,
                    borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                    paddingBottom: 4,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.target.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.target.style.color = 'var(--on-surface-variant)';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-only" style={{ display: 'none', alignItems: 'center', gap: 'var(--space-md)' }}>
            <a href="https://www.facebook.com/Vshalsiikdar" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: 'var(--primary)', transition: 'color 0.2s', display: 'flex' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/therevivalmission?igsh=b2g5b3BzZ2hsOHYz" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color: 'var(--primary)', transition: 'color 0.2s', display: 'flex' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <Link
              to="/contact#donate-section"
              ref={ctaRef}
              className="btn btn-gold"
              id="nav-donate-btn"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'block',
              color: 'var(--primary)',
              padding: 8,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="headline-md" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Menu
          </span>
          <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="body-lg"
                style={{
                  color: isActive ? 'var(--primary)' : 'var(--on-surface)',
                  fontWeight: isActive ? 700 : 400,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--outline-variant)',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-md)', justifyContent: 'center' }}>
          <a href="https://www.facebook.com/Vshalsiikdar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', padding: 8 }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/therevivalmission?igsh=b2g5b3BzZ2hsOHYz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', padding: 8 }}>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>

        <Link
          to="/contact#donate-section"
          className="btn btn-gold"
          style={{ width: '100%', padding: '14px', marginTop: 'auto' }}
          onClick={() => setMobileOpen(false)}
        >
          Donate Now
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
        </Link>
      </div>

      {/* Responsive styles injected */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-only { display: inline-flex !important; }
          .mobile-menu-toggle { display: none !important; }
          .nav-container { padding: 16px var(--margin-desktop) !important; }
        }
      `}</style>
    </>
  );
}
