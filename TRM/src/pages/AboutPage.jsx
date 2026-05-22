import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../data';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    icon: 'menu_book',
    title: 'Truth',
    desc: 'Unwavering transparency in every action, ensuring absolute trust with our donors and communities.',
    bg: 'var(--primary-container)',
    color: 'var(--on-primary-container)',
  },
  {
    icon: 'explore',
    title: 'Way',
    desc: 'Providing structured, proven paths to upliftment through education, health, and sustainable support.',
    bg: 'var(--secondary)',
    color: 'var(--on-secondary)',
  },
  {
    icon: 'favorite',
    title: 'Life',
    desc: 'Fostering vibrant, self-sustaining communities where every individual has the opportunity to thrive.',
    bg: 'var(--tertiary-container)',
    color: 'var(--on-tertiary-container)',
  },
];

export default function AboutPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo('.about-hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.about-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' });

      // Story section
      gsap.fromTo('.story-card', { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7,
        scrollTrigger: { trigger: '.story-section', start: 'top 75%' },
      });

      // Values cards
      gsap.fromTo('.value-card', { x: 40, opacity: 0, scale: 0.95 }, {
        x: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.15,
        scrollTrigger: { trigger: '.values-col', start: 'top 80%' },
      });

      // Team cards
      gsap.fromTo('.team-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.2,
        scrollTrigger: { trigger: '.team-section', start: 'top 75%' },
      });

      // CTA section
      gsap.fromTo('.cta-content > *', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.15,
        scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef}>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: 'relative',
          padding: 'var(--space-xxl) var(--margin-mobile)',
          background: 'var(--surface-container-low)',
          overflow: 'hidden',
        }}
        className="about-hero-section"
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          background: 'radial-gradient(circle at top right, var(--primary-container), transparent 60%)',
        }} />
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <h1
            className="about-hero-title headline-xl text-balance"
            style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)', maxWidth: 800 }}
          >
            Dedicated to Community Upliftment Through Truth, Way, and Life.
          </h1>
          <p
            className="about-hero-sub body-lg"
            style={{ color: 'var(--on-surface-variant)', maxWidth: 650 }}
          >
            Since our inception, Revival Mission has operated on the foundational belief that sustainable change requires an institutional commitment to compassion and radical transparency.
          </p>
        </div>
      </section>

      {/* ===== OUR JOURNEY + VALUES ===== */}
      <section
        className="story-section"
        style={{ padding: 'var(--space-xxl) var(--margin-mobile)', maxWidth: 1280, margin: '0 auto' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-gutter)' }} className="story-grid">
          {/* Main Narrative */}
          <div
            className="story-card"
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--outline-variant)',
              padding: 'var(--space-xl)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 4,
              height: '100%',
              background: 'var(--primary)',
            }} />
            <h2 className="headline-lg" style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-lg)' }}>
              Our Journey
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                Revival Mission was born from a simple yet profound realization: real community empowerment requires more than temporary relief; it demands structural support, enduring trust, and a commitment to walking alongside those in need. We are a collective of dedicated volunteers, professionals, and community leaders united by a shared vision.
              </p>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                We operate with the stability of a global organization but the heartbeat of a local grassroots movement. By focusing on direct community engagement, rigorous transparency in our operations, and data-driven impact strategies, we ensure that every contribution translates into meaningful, measurable change.
              </p>
            </div>
          </div>

          {/* Values Column */}
          <div className="values-col" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gutter)' }}>
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="value-card"
                style={{
                  background: v.bg,
                  color: v.color,
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-md)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'default',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span className="material-symbols-outlined fill" style={{ fontSize: 32, flexShrink: 0 }}>
                  {v.icon}
                </span>
                <div>
                  <h3 className="headline-md" style={{ marginBottom: 'var(--space-xs)' }}>{v.title}</h3>
                  <p className="body-md" style={{ opacity: 0.9 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section
        className="team-section"
        style={{ padding: 'var(--space-xxl) var(--margin-mobile)', background: 'var(--surface-container-high)' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <h2 className="headline-lg" style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)' }}>
              Leadership & Community Partners
            </h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: 600, margin: '0 auto' }}>
              Meet the dedicated individuals driving our mission forward on the ground. We believe in faces behind the impact.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
            {[
              { img: IMAGES.leaders1, badge: 'Community Outreach', badgeBg: 'var(--secondary)', title: 'Local Distribution Team', desc: 'Our dedicated local coordinators working directly with families to ensure equitable distribution of essential resources.' },
              { img: IMAGES.leaders2, badge: 'Leadership', badgeBg: 'var(--primary)', title: 'Event Coordinators', desc: 'Organizing structural support and maintaining the operational transparency that builds lasting trust within the communities we serve.' },
            ].map((member, i) => (
              <div
                key={i}
                className="team-card"
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--outline-variant)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={member.img}
                    alt={member.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    padding: 'var(--space-md)',
                  }}>
                    <span
                      className="label-md"
                      style={{
                        background: member.badgeBg + 'e6',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {member.badge}
                    </span>
                  </div>
                </div>
                <div style={{ padding: 'var(--space-lg)' }}>
                  <h3 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-xs)', fontSize: 20 }}>
                    {member.title}
                  </h3>
                  <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section
        className="cta-section"
        style={{
          padding: 'var(--space-xxl) var(--margin-mobile)',
          background: 'var(--primary)',
          color: 'var(--on-primary)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          background: 'radial-gradient(circle at center, white, transparent 60%)',
        }} />
        <div className="cta-content" style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <h2 className="headline-lg" style={{ marginBottom: 'var(--space-lg)' }}>
            Join the Movement
          </h2>
          <p className="body-lg" style={{ opacity: 0.9, marginBottom: 'var(--space-xl)' }}>
            Whether through donations or volunteering, your commitment helps us build a foundation of hope and stability.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-md)' }}>
            <Link
              to="/contact#donate-section"
              className="btn btn-gold"
              style={{ padding: '14px 32px' }}
            >
              Donate Now
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline"
              style={{ padding: '14px 32px', color: 'white', borderColor: 'white' }}
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .about-hero-section { padding: var(--space-xxl) var(--margin-desktop) !important; }
          .story-section { padding: var(--space-xxl) var(--margin-desktop) !important; }
          .story-grid { grid-template-columns: 2fr 1fr !important; }
          .team-section { padding: var(--space-xxl) var(--margin-desktop) !important; }
          .cta-section { padding: var(--space-xxl) var(--margin-desktop) !important; }
        }
      `}</style>
    </main>
  );
}
