import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMPACT_MESSAGES } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [freq, setFreq] = useState('onetime');
  const [amount, setAmount] = useState(50);
  const [customVal, setCustomVal] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if we need to scroll to donate section
    if (window.location.hash === '#donate-section') {
      setTimeout(() => {
        const el = document.getElementById('donate-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo('.contact-hero > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' });

      // Contact info cards
      gsap.fromTo('.contact-info-card', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.5, stagger: 0.12,
        scrollTrigger: { trigger: '.contact-section', start: 'top 80%' },
      });

      // Form
      gsap.fromTo('.contact-form', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7,
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
      });

      // Donation section
      gsap.fromTo('.donate-text > *', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.12,
        scrollTrigger: { trigger: '#donate-section', start: 'top 80%' },
      });

      gsap.fromTo('.donate-card', { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7,
        scrollTrigger: { trigger: '.donate-card', start: 'top 85%' },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const impactText = showCustom
    ? IMPACT_MESSAGES.custom
    : (IMPACT_MESSAGES[amount] || IMPACT_MESSAGES.custom);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    gsap.fromTo('.success-msg', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
  };

  const amounts = [25, 50, 100, 250];

  return (
    <main ref={pageRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: 'relative',
          background: 'var(--surface-container-low)',
          borderBottom: '1px solid var(--surface-variant)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: 'radial-gradient(circle at top right, var(--primary-container) 0%, transparent 60%)',
        }} />
        <div
          className="contact-hero"
          style={{ maxWidth: 1280, margin: '0 auto', padding: 'var(--space-xxl) var(--margin-mobile)', position: 'relative', zIndex: 10 }}
        >
          <span className="label-md" style={{ color: 'var(--secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>connect_without_contact</span>
            Let's Connect
          </span>
          <h1 className="headline-xl" style={{ color: 'var(--on-background)', marginBottom: 'var(--space-md)' }}>
            Reach out, or step up. <br />
            <span style={{ color: 'var(--primary)' }}>Your impact starts here.</span>
          </h1>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: 600 }}>
            Whether you have a question about our community programs, want to volunteer, or are ready to contribute to our mission, we are here and listening.
          </p>
        </div>
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <section className="contact-section" style={{ maxWidth: 1280, margin: '0 auto', padding: 'var(--space-xxl) var(--margin-mobile)', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-xl)' }} className="contact-grid">
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <h2 className="headline-lg" style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-md)' }}>
              Get in touch.
            </h2>

            {[
              { icon: 'location_on', title: 'Headquarters', text: 'Oodlabari, Jalpaiguri\nWest Bengal, India' },
              { icon: 'phone', title: 'Phone Line', text: '+91 (XXX) XXX-XXXX\nMon-Fri, 9am - 5pm IST' },
              { icon: 'mail', title: 'Email Us', text: 'hello@revivalmission.org' },
            ].map((info) => (
              <div
                key={info.title}
                className="contact-info-card"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-md)',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--surface-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--on-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--surface-container)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                >
                  <span className="material-symbols-outlined">{info.icon}</span>
                </div>
                <div>
                  <h3 className="label-md" style={{ fontWeight: 700, color: 'var(--on-surface)', marginBottom: 4 }}>
                    {info.title}
                  </h3>
                  <p className="body-md" style={{ color: 'var(--on-surface-variant)', whiteSpace: 'pre-line' }}>
                    {info.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div
            className="contact-form"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--outline-variant)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-lg)',
              boxShadow: 'var(--ambient-shadow)',
            }}
          >
            {formSent ? (
              <div className="success-msg" style={{ textAlign: 'center', padding: 'var(--space-xxl) var(--space-lg)' }}>
                <span className="material-symbols-outlined fill" style={{ fontSize: 64, color: 'var(--secondary)', marginBottom: 'var(--space-md)', display: 'block' }}>
                  check_circle
                </span>
                <h3 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-sm)' }}>
                  Message Sent!
                </h3>
                <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 'var(--space-lg)' }}
                  onClick={() => setFormSent(false)}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="input-label" htmlFor="contact-name">Full Name</label>
                    <input className="input-field" id="contact-name" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className="input-label" htmlFor="contact-email">Email Address</label>
                    <input className="input-field" id="contact-email" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div>
                  <label className="input-label" htmlFor="contact-subject">Subject</label>
                  <select className="input-field" id="contact-subject" defaultValue="" required>
                    <option value="" disabled>Select an inquiry type...</option>
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="donation">Donation Support</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
                <div>
                  <label className="input-label" htmlFor="contact-message">Your Message</label>
                  <textarea className="input-field" id="contact-message" rows={5} placeholder="How can we help you?" required style={{ resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-sm)' }}>
                  <button className="btn btn-primary" type="submit" style={{ padding: '14px 32px' }}>
                    Send Message
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== DONATION SECTION ===== */}
      <section
        id="donate-section"
        style={{
          background: 'var(--primary)',
          color: 'var(--on-primary)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%), repeating-linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%)',
          backgroundPosition: '0 0, 10px 10px',
          backgroundSize: '20px 20px',
        }} />

        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: 'var(--space-xxl) var(--margin-mobile)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-xxl)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
          className="donate-grid"
        >
          {/* Left – Impact Text */}
          <div className="donate-text" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <span className="label-md" style={{ color: 'var(--secondary-container)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined fill" style={{ fontSize: 16 }}>favorite</span>
              Make a Difference
            </span>
            <h2 className="headline-xl" style={{ color: 'var(--on-primary)' }}>
              Your support fuels our mission.
            </h2>
            <p className="body-lg" style={{ color: 'var(--primary-fixed-dim)', opacity: 0.9, maxWidth: 500 }}>
              We rely on the generosity of people like you to bring essential services, education, and health support to communities that need it most.
            </p>

            {/* Trust Indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--primary-container)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--secondary-container)' }}>verified_user</span>
                <div>
                  <p className="label-md" style={{ fontWeight: 700 }}>Secure Payment</p>
                  <p style={{ fontSize: 12, color: 'var(--primary-fixed-dim)' }}>256-bit encryption</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--secondary-container)' }}>receipt_long</span>
                <div>
                  <p className="label-md" style={{ fontWeight: 700 }}>Tax Deductible</p>
                  <p style={{ fontSize: 12, color: 'var(--primary-fixed-dim)' }}>501(c)(3) Certified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Donation Card */}
          <div
            className="donate-card"
            style={{
              background: 'var(--surface)',
              color: 'var(--on-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-lg)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Frequency Toggle */}
            <div style={{
              background: 'var(--surface-container)',
              borderRadius: 'var(--radius-md)',
              padding: 4,
              display: 'flex',
              marginBottom: 'var(--space-xl)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 4,
                left: freq === 'onetime' ? 4 : '50%',
                width: 'calc(50% - 4px)',
                height: 'calc(100% - 8px)',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'left 0.3s ease',
              }} />
              <button
                onClick={() => setFreq('onetime')}
                className="label-md"
                style={{
                  flex: 1,
                  padding: '10px',
                  position: 'relative',
                  zIndex: 10,
                  fontWeight: 700,
                  color: freq === 'onetime' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                  transition: 'color 0.3s',
                }}
              >
                Give Once
              </button>
              <button
                onClick={() => setFreq('monthly')}
                className="label-md"
                style={{
                  flex: 1,
                  padding: '10px',
                  position: 'relative',
                  zIndex: 10,
                  fontWeight: 700,
                  color: freq === 'monthly' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                  transition: 'color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                Monthly
                <span style={{
                  background: 'var(--secondary-container)',
                  color: 'var(--on-secondary-container)',
                  fontSize: 10,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.05em',
                }}>
                  IMPACT
                </span>
              </button>
            </div>

            {/* Amount Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              {amounts.map((a) => (
                <button
                  key={a}
                  className={`amount-btn ${amount === a && !showCustom ? 'active' : ''}`}
                  onClick={() => {
                    setAmount(a);
                    setShowCustom(false);
                    gsap.fromTo(`[data-amount="${a}"]`, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
                  }}
                  data-amount={a}
                >
                  ${a}
                </button>
              ))}
              <button
                className={`amount-btn ${showCustom ? 'active' : ''}`}
                style={{ gridColumn: 'span 2', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onClick={() => setShowCustom(true)}
              >
                {showCustom ? (
                  <>
                    $
                    <input
                      type="number"
                      value={customVal}
                      onChange={(e) => setCustomVal(e.target.value)}
                      placeholder="0"
                      autoFocus
                      style={{
                        width: 80,
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '2px solid var(--primary)',
                        outline: 'none',
                        textAlign: 'center',
                        fontSize: 24,
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        color: 'inherit',
                      }}
                    />
                  </>
                ) : (
                  'Custom Amount'
                )}
              </button>
            </div>

            {/* Impact Text */}
            <div style={{
              background: 'var(--surface-container-low)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-md)',
              marginBottom: 'var(--space-xl)',
              border: '1px solid var(--surface-variant)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', marginTop: 2 }}>
                check_circle
              </span>
              <div>
                <p className="label-md" style={{ fontWeight: 700, color: 'var(--on-surface)', marginBottom: 4 }}>
                  Your Impact
                </p>
                <p className="body-md" style={{ color: 'var(--on-surface-variant)', fontSize: 14 }}>
                  {freq === 'monthly' ? impactText.replace('A ', 'A monthly ') : impactText}
                </p>
              </div>
            </div>

            {/* Donate Button */}
            <button
              className="btn btn-gold"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: 18,
                fontWeight: 700,
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
              }}
              onClick={() => {
                gsap.fromTo('.donate-btn-anim',
                  { scale: 0.95 },
                  { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
                );
              }}
            >
              <span className="material-symbols-outlined fill" style={{ fontSize: 20 }}>lock</span>
              Donate Securely
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .contact-hero { padding: var(--space-xxl) var(--margin-desktop) !important; }
          .contact-section { padding: var(--space-xxl) var(--margin-desktop) !important; }
          .contact-grid { grid-template-columns: 1fr 2fr !important; }
          .donate-grid { grid-template-columns: 1fr 1fr !important; padding: var(--space-xxl) var(--margin-desktop) !important; }
        }
      `}</style>
    </main>
  );
}
