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
                Revival Mission
              </span>
            </div>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
              © {new Date().getFullYear()} Revival Mission. Committed to community upliftment through Truth, Way, and Life.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-sm)' }}>
              <a href="mailto:hello@revivalmission.org" style={{ color: 'var(--primary)', transition: 'color 0.2s' }}>
                <span className="material-symbols-outlined">mail</span>
              </a>
              <a href="tel:+1800555" style={{ color: 'var(--primary)', transition: 'color 0.2s' }}>
                <span className="material-symbols-outlined">call</span>
              </a>
              <a href="#" style={{ color: 'var(--primary)', transition: 'color 0.2s' }}>
                <span className="material-symbols-outlined">location_on</span>
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
