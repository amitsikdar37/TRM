import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Footer() {
  const footerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      style={{
        background: 'var(--surface-container-high)',
        borderTop: '1px solid var(--outline-variant)',
        marginTop: 'auto',
      }}
    >
      <div
        className="footer-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-gutter)',
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'var(--space-xl) var(--margin-mobile)',
        }}
      >
        {/* Top Row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xl)',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div style={{ maxWidth: 350 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
              <span
                className="material-symbols-outlined fill"
                style={{ color: 'var(--secondary)', fontSize: 28 }}
              >
                volunteer_activism
              </span>
              <span className="headline-md" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                The Revival Mission
              </span>
            </div>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
              © {new Date().getFullYear()} The Revival Mission. Committed to community upliftment through Truth, Way, and Life.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-sm)' }}>
              <a href="mailto:therevivalmission60@gmail.com" title="Email" style={{ color: 'var(--primary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">mail</span>
              </a>
              <a href="tel:+919800221123" title="Phone" style={{ color: 'var(--primary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">call</span>
              </a>
              <a href="https://maps.app.goo.gl/QLFfvZKXRJwfcwYZ6" target="_blank" rel="noopener noreferrer" title="Location" style={{ color: 'var(--primary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">location_on</span>
              </a>
              <a href="https://www.facebook.com/Vshalsiikdar" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: 'var(--primary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/therevivalmission?igsh=b2g5b3BzZ2hsOHYz" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color: 'var(--primary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xxl)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <span className="label-md" style={{ fontWeight: 700, color: 'var(--on-surface)', marginBottom: 'var(--space-xs)' }}>
                Explore
              </span>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="label-md"
                  style={{
                    color: location.pathname === link.path ? 'var(--primary)' : 'var(--on-surface-variant)',
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <span className="label-md" style={{ fontWeight: 700, color: 'var(--on-surface)', marginBottom: 'var(--space-xs)' }}>
                Legal
              </span>
              <a href="#" className="label-md" style={{ color: 'var(--on-surface-variant)', transition: 'color 0.2s' }}>
                Privacy Policy
              </a>
              <a href="#" className="label-md" style={{ color: 'var(--on-surface-variant)', transition: 'color 0.2s' }}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-content { padding: var(--space-xl) var(--margin-desktop) !important; }
          .footer-grid { flex-direction: row !important; justify-content: space-between !important; }
        }
      `}</style>
    </footer>
  );
}
