import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  addGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
} from '../data';
import ThemeSettings from '../components/ThemeSettings';
import MetricsManager from '../components/MetricsManager';
import EventsManager from '../components/EventsManager';
import LeadershipManager from '../components/LeadershipManager';

const CATEGORIES = ['Health', 'Education', 'Relief', 'Community', 'Culture'];
const TABS = [
  { id: 'gallery', label: 'Gallery', icon: 'photo_library' },
  { id: 'events', label: 'Events', icon: 'event' },
  { id: 'metrics', label: 'Metrics', icon: 'bar_chart' },
  { id: 'leadership', label: 'Leadership', icon: 'group' },
  { id: 'theme', label: 'Theme', icon: 'palette' },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  const [allItems, setAllItems] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', category: 'Health', description: '' });
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const loginBoxRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchItems = async () => {
    const items = await getAllGalleryItems();
    setAllItems(items);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setAuthenticated(isAdminAuthenticated());
    fetchItems();
  }, []);

  // Login animation
  useEffect(() => {
    if (!authenticated && loginBoxRef.current) {
      gsap.fromTo(loginBoxRef.current, { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setAuthenticated(true);
      setError('');
      fetchItems();
    } else {
      setError('Invalid password');
      if (loginBoxRef.current) {
        loginBoxRef.current.classList.add('animate-shake');
        setTimeout(() => loginBoxRef.current?.classList.remove('animate-shake'), 500);
      }
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthenticated(false);
    setPassword('');
  };

  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setFileData(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title || !fileData) return;

    const newItem = {
      title: form.title,
      description: form.description,
      category: form.category,
      date: form.date || new Date().toISOString().split('T')[0],
      image: fileData,
      large: false,
    };

    await addGalleryItem(newItem);
    await fetchItems();
    setForm({ title: '', date: '', category: 'Health', description: '' });
    setPreview(null);
    setFileData(null);
    setUploadSuccess(true);

    gsap.fromTo('.success-toast', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);
  };

  const handleDelete = async (id) => {
    await deleteGalleryItem(id);
    await fetchItems();
  };

  // ===== LOGIN SCREEN =====
  if (!authenticated) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-container-low)',
        padding: 'var(--space-xl)',
      }}>
        <div
          ref={loginBoxRef}
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-xxl)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--outline-variant)',
            width: '100%',
            maxWidth: 420,
            textAlign: 'center',
          }}
        >
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--primary-fixed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-lg)',
          }}>
            <span className="material-symbols-outlined fill" style={{ fontSize: 32, color: 'var(--primary)' }}>
              admin_panel_settings
            </span>
          </div>

          <h1 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-xs)' }}>
            Admin Access
          </h1>
          <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xl)' }}>
            Enter the admin password to manage the gallery.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
              id="admin-password"
              style={{ textAlign: 'center', fontSize: 18 }}
            />
            {error && (
              <p className="label-md" style={{ color: 'var(--error)', fontWeight: 600 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }}>error</span>
                {error}
              </p>
            )}
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: '100%', padding: '14px', fontSize: 16 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock_open</span>
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ===== ADMIN DASHBOARD =====
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Success Toast */}
      {uploadSuccess && (
        <div
          className="success-toast"
          style={{
            position: 'fixed',
            top: 80,
            right: 20,
            zIndex: 200,
            background: 'var(--secondary)',
            color: 'var(--on-secondary)',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span className="material-symbols-outlined fill" style={{ fontSize: 20 }}>check_circle</span>
          Photo published successfully!
        </div>
      )}

      <div
        style={{
          flex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: 'var(--space-xl) var(--margin-mobile)',
        }}
        className="admin-container"
      >
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
              <span className="material-symbols-outlined fill" style={{ color: 'var(--primary)', fontSize: 28 }}>
                admin_panel_settings
              </span>
              <h1 className="headline-lg" style={{ color: 'var(--primary)' }}>
                Photo & Event Manager
              </h1>
            </div>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: 600 }}>
              Upload new memories from recent missions, categorize events, and manage the public gallery.
            </p>
          </div>
          <button
            className="btn"
            onClick={handleLogout}
            style={{
              padding: '8px 20px',
              background: 'var(--tertiary-fixed)',
              color: 'var(--on-tertiary-fixed)',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', overflowX: 'auto', paddingBottom: 'var(--space-xs)' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                background: activeTab === tab.id ? 'var(--primary)' : 'var(--surface-container-high)',
                color: activeTab === tab.id ? 'var(--on-primary)' : 'var(--on-surface)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 700 : 500,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'theme' && <ThemeSettings />}
        {activeTab === 'metrics' && <MetricsManager />}
        {activeTab === 'events' && <EventsManager />}
        {activeTab === 'leadership' && <LeadershipManager />}

        {activeTab === 'gallery' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-gutter)' }} className="admin-grid">
            {/* Upload Card */}
            <div style={{
              background: 'var(--surface-container-low)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--outline-variant)',
              padding: 'var(--space-gutter)',
              boxShadow: 'var(--ambient-shadow)',
            }}>
              <h2 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: 'var(--space-gutter)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>cloud_upload</span>
                New Upload
              </h2>

              <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {/* Drop Zone */}
                <div
                  className={`drop-zone ${dragOver ? 'dragover' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  id="photo-drop-zone"
                >
                  {preview ? (
                    <div style={{ position: 'relative' }}>
                      <img
                        src={preview}
                        alt="Preview"
                        style={{ maxHeight: 180, borderRadius: 'var(--radius-md)', margin: '0 auto' }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                          setFileData(null);
                        }}
                        style={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: 'var(--error)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--outline)', display: 'block', marginBottom: 'var(--space-sm)' }}>
                        add_photo_alternate
                      </span>
                      <p className="label-md" style={{ color: 'var(--on-surface-variant)' }}>Drag & drop photos here</p>
                      <p className="body-md" style={{ color: 'var(--outline)', fontSize: 14, marginTop: 4 }}>or click to browse</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="photo-file-input"
                  />
                </div>

                {/* Fields */}
                <div>
                  <label className="input-label" htmlFor="event-title">Event Title</label>
                  <input
                    className="input-field"
                    id="event-title"
                    type="text"
                    placeholder="e.g. Clean Water Initiative 2024"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="input-label" htmlFor="event-date">Date</label>
                    <input
                      className="input-field"
                      id="event-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="input-label" htmlFor="event-category">Category</label>
                    <select
                      className="input-field"
                      id="event-category"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="input-label" htmlFor="event-desc">Description</label>
                  <textarea
                    className="input-field"
                    id="event-desc"
                    rows={3}
                    placeholder="Brief context for these photos..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    style={{ resize: 'none' }}
                  />
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ width: '100%', padding: '12px' }}
                  disabled={!form.title || !fileData}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>publish</span>
                  Publish to Gallery
                </button>
              </form>
            </div>

            {/* Gallery Manager */}
            <div style={{
              background: 'var(--surface-container-low)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--outline-variant)',
              overflow: 'hidden',
              boxShadow: 'var(--ambient-shadow)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                padding: 'var(--space-gutter)',
                borderBottom: '1px solid var(--outline-variant)',
                background: 'var(--surface)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-sm)',
              }}>
                <h2 className="headline-md" style={{ color: 'var(--on-surface)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 20 }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>photo_library</span>
                  Manage Gallery
                </h2>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Preview</th>
                      <th>Event Title</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div style={{
                            width: 64,
                            height: 48,
                            borderRadius: 'var(--radius-sm)',
                            overflow: 'hidden',
                            background: 'var(--surface-variant)',
                          }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        </td>
                        <td>
                          <span className="body-md" style={{ fontWeight: 500, color: 'var(--on-surface)' }}>
                            {item.title}
                          </span>
                        </td>
                        <td>
                          <span className="body-md" style={{ color: 'var(--on-surface-variant)', fontSize: 14 }}>
                            {item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                          </span>
                        </td>
                        <td>
                          <span
                            className="label-md"
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-full)',
                              fontSize: 12,
                              background:
                                item.category === 'Education' ? 'var(--primary-container)' :
                                item.category === 'Health' ? 'var(--tertiary-container)' :
                                item.category === 'Relief' ? 'var(--secondary-container)' :
                                item.category === 'Culture' ? 'var(--tertiary-fixed)' :
                                'var(--secondary-container)',
                              color:
                                item.category === 'Education' ? 'var(--on-primary-container)' :
                                item.category === 'Health' ? 'var(--on-tertiary-container)' :
                                item.category === 'Relief' ? 'var(--on-secondary-container)' :
                                item.category === 'Culture' ? 'var(--on-tertiary-fixed)' :
                                'var(--on-secondary-container)',
                            }}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                            <button
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                              style={{
                                color: 'var(--outline)',
                                padding: 4,
                                transition: 'color 0.2s',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--error)')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--outline)')}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span>
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div style={{
                padding: 'var(--space-sm) var(--space-gutter)',
                borderTop: '1px solid var(--outline-variant)',
                background: 'var(--surface)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
              }}>
                <span className="body-md" style={{ color: 'var(--on-surface-variant)', fontSize: 14 }}>
                  {allItems.length} photos total
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .admin-container { padding: var(--space-xl) var(--margin-desktop) !important; }
          .admin-grid { grid-template-columns: 1fr 2fr !important; }
        }
        .admin-grid button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  );
}
