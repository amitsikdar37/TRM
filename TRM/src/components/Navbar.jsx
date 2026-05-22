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
              Revival Mission
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
          <Link
            to="/contact#donate-section"
            ref={ctaRef}
            className="btn btn-gold desktop-only"
            style={{ display: 'none' }}
            id="nav-donate-btn"
          >
            Donate
          </Link>

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
