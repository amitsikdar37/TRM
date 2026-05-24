import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES, getBadgeClass, getMetrics, getEvents, getImageUrl } from '../data';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const metricsRef = useRef(null);
  const eventsRef = useRef(null);

  const [metrics, setMetrics] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    Promise.all([getMetrics(), getEvents()]).then(([metricsData, eventsData]) => {
      setMetrics(metricsData);
      setEvents(eventsData);
    });

    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.hero-badge', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6 })
        .fromTo('.hero-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta > *', { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.15 }, '-=0.3');

      // Floating animation for hero overlay
      gsap.to('.hero-float', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  // Separate useEffect for animations that depend on dynamic data
  useEffect(() => {
    if (metrics.length === 0 && events.length === 0) return;

    const ctx = gsap.context(() => {
      // Impact metrics - counter animation
      if (metrics.length > 0) {
        gsap.fromTo(
          '.metric-card',
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.2,
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Animate counter numbers
      document.querySelectorAll('.counter-value').forEach((el) => {
        const target = parseInt(el.dataset.target);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              el,
              { innerText: 0 },
              {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out',
                onUpdate: function () {
                  const val = Math.round(gsap.getProperty(el, 'innerText'));
                  el.textContent = val >= 10000 ? `${Math.round(val / 1000)}k` : val.toLocaleString();
                },
              }
            );
          },
          once: true,
        });
      });

      // Event cards
      if (events.length > 0) {
        gsap.fromTo(
          '.event-card',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: eventsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [metrics, events]);

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        id="hero-section"
      >
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src={IMAGES.hero}
            alt="Community gathering"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 52, 109, 0.75)',
            mixBlendMode: 'multiply',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--background), transparent 40%, transparent)',
          }} />
        </div>

        {/* Floating decorative element */}
        <div
          className="hero-float"
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,200,14,0.15), transparent 70%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 var(--margin-mobile)',
          maxWidth: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-lg)',
        }}>
          <span
            className="hero-badge label-md"
            style={{
              display: 'inline-block',
              padding: '6px 20px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--surface)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Oodlabari, Jalpaiguri
          </span>

          <h1
            className="hero-title headline-xl"
            style={{
              color: 'white',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            Truth, Way, Life
          </h1>

          <p
            className="hero-subtitle body-lg"
            style={{
              color: 'var(--surface-variant)',
              maxWidth: 600,
            }}
          >
            Committed to community upliftment, empowering the vulnerable, and building a foundation of hope through dedicated grassroots action.
          </p>

          <div className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', justifyContent: 'center', marginTop: 'var(--space-sm)' }}>
            <Link
              to="/contact#donate-section"
              className="btn btn-gold"
              style={{ padding: '14px 32px', fontSize: 14 }}
            >
              Donate Now
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline"
              style={{ padding: '14px 32px', fontSize: 14, color: 'white', borderColor: 'white' }}
            >
              Volunteer
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>group_add</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== IMPACT METRICS ===== */}
      <section
        ref={metricsRef}
        style={{ padding: 'var(--space-xxl) var(--margin-mobile)', maxWidth: 1280, margin: '0 auto' }}
        className="metrics-section"
        id="impact-section"
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h2 className="headline-lg" style={{ color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>
            Our Impact
          </h2>
          <p className="body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: 600, margin: '0 auto' }}>
            Measurable change in our community through dedicated service and support.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-gutter)' }}>
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="metric-card"
              style={{
                background: 'var(--surface-container-lowest)',
                padding: 'var(--space-xl)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(195,198,210,0.3)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {i === 1 && (
                <div style={{
                  position: 'absolute',
                  top: -16,
                  right: -16,
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: 'rgba(154,246,184,0.2)',
                  filter: 'blur(30px)',
                }} />
              )}
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: i === 0 ? 'var(--primary-fixed)' : i === 1 ? 'var(--secondary-fixed)' : 'var(--tertiary-fixed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-md)',
                transition: 'transform 0.3s ease',
              }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 32,
                    color: i === 0 ? 'var(--primary)' : i === 1 ? 'var(--on-secondary-container)' : 'var(--on-tertiary-container)',
                  }}
                >
                  {m.icon}
                </span>
              </div>
              <h3
                className="counter-value headline-md"
                data-target={m.value}
                style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-xs)' }}
              >
                0
              </h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LATEST EVENTS ===== */}
      <section
        ref={eventsRef}
        style={{ padding: 'var(--space-xxl) var(--margin-mobile)', background: 'var(--surface-container-low)' }}
        id="events-section"
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-xl)' }}>
            <div>
              <h2 className="headline-lg" style={{ color: 'var(--primary)', marginBottom: 'var(--space-xs)' }}>
                Latest Events
              </h2>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                See how we are making a difference locally.
              </p>
            </div>
            <Link
              to="/gallery"
              className="label-md desktop-link"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                color: 'var(--primary)',
                transition: 'color 0.2s',
              }}
            >
              View All
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-gutter)' }}>
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card card"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {/* Image */}
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={getImageUrl(event.image)}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-sm)',
                      right: 'var(--space-sm)',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--primary)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    {event.status}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span
                    className="label-md"
                    style={{
                      color: 'var(--secondary)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      marginBottom: 'var(--space-xs)',
                    }}
                  >
                    {event.category.toUpperCase()}
                  </span>
                  <h3 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-sm)', fontSize: 20 }}>
                    {event.title}
                  </h3>
                  <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 'var(--space-lg)', flex: 1 }}>
                    {event.description}
                  </p>

                  {/* Progress */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                      <span className="label-md" style={{ color: 'var(--on-surface-variant)' }}>Fundraising Goal</span>
                      <span className="label-md" style={{ color: 'var(--secondary)', fontWeight: 700 }}>{event.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${event.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/gallery"
            className="label-md mobile-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-xs)',
              color: 'var(--primary)',
              background: 'rgba(214,227,255,0.3)',
              padding: 'var(--space-sm)',
              borderRadius: 'var(--radius-full)',
              marginTop: 'var(--space-lg)',
            }}
          >
            View All Events
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
          </Link>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .metrics-section { padding: var(--space-xxl) var(--margin-desktop) !important; }
          #events-section { padding: var(--space-xxl) var(--margin-desktop) !important; }
          .desktop-link { display: flex !important; }
          .mobile-link { display: none !important; }
        }
      `}</style>
    </main>
  );
}
