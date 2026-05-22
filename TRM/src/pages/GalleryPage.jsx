import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllGalleryItems, getBadgeClass } from '../data';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All Events', 'Education', 'Community', 'Culture', 'Health'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All Events');
  const [lightbox, setLightbox] = useState(null);
  const [items, setItems] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setItems(getAllGalleryItems());
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.gallery-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
      gsap.fromTo('.gallery-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' });

      // Filter pills
      gsap.fromTo('.filter-pill', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, delay: 0.4 });

      // Gallery items stagger
      gsap.fromTo('.gallery-card', { y: 50, opacity: 0, scale: 0.95 }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [items, filter]);

  const filteredItems = filter === 'All Events'
    ? items
    : items.filter((i) => i.category === filter);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        ref={gridRef}
        style={{
          flex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: 'var(--space-xl) var(--margin-mobile)',
        }}
        className="gallery-container"
      >
        {/* Header */}
        <section style={{ marginBottom: 'var(--space-xl)', textAlign: 'center', maxWidth: 700, margin: '0 auto var(--space-xl)' }}>
          <h1 className="gallery-title headline-xl" style={{ color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>
            Our Impact in Action
          </h1>
          <p className="gallery-sub body-lg" style={{ color: 'var(--on-surface-variant)' }}>
            A visual journey through our community upliftment initiatives, educational programs, and healthcare outreach events.
          </p>
        </section>

        {/* Filters */}
        <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="filter-pill label-md"
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                background: filter === cat ? 'var(--primary-container)' : 'transparent',
                color: filter === cat ? 'var(--on-primary-container)' : 'var(--on-surface-variant)',
                border: filter === cat ? 'none' : '1px solid var(--outline)',
                fontWeight: filter === cat ? 700 : 500,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Gallery Grid */}
        <section className="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-card gallery-item ${item.large ? 'large' : ''}`}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
              }}
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  aspectRatio: item.large ? 'auto' : '1/1',
                  minHeight: item.large ? 300 : 250,
                }}
              />
              <div className="gallery-overlay" style={{ padding: item.large ? 'var(--space-lg)' : 'var(--space-md)' }}>
                <span className={`badge ${getBadgeClass(item.category)}`} style={{ marginBottom: 'var(--space-xs)' }}>
                  {item.category}
                </span>
                <h3
                  className="headline-md"
                  style={{ fontWeight: 700, marginBottom: 4, fontSize: item.large ? 24 : 18 }}
                >
                  {item.title}
                </h3>
                <p className="body-md truncate-2" style={{ color: 'var(--inverse-on-surface)', fontSize: item.large ? 16 : 14 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-xxl)', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.3, display: 'block', marginBottom: 'var(--space-md)' }}>
              photo_library
            </span>
            <p className="body-lg">No photos found for this category.</p>
          </div>
        )}

        {/* Load More */}
        {filteredItems.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <button
              className="btn"
              style={{
                padding: '14px 32px',
                border: '1px solid var(--outline)',
                color: 'var(--on-surface)',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.background = 'var(--surface-variant)')}
              onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            >
              Load More Memories
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          style={{ animation: 'fadeIn 0.3s ease' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              alignItems: 'center',
            }}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
              }}
            />
            <div style={{ textAlign: 'center', color: 'white' }}>
              <h3 className="headline-md" style={{ marginBottom: 4 }}>{lightbox.title}</h3>
              <p className="body-md" style={{ opacity: 0.8 }}>{lightbox.description}</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .gallery-container { padding: var(--space-xl) var(--margin-desktop) !important; }
        }
      `}</style>
    </main>
  );
}
