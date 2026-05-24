import { useState, useEffect } from 'react';
import { getTheme, updateTheme } from '../data';

export default function ThemeSettings() {
  const [theme, setTheme] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getTheme().then(setTheme);
  }, []);

  const handleChange = (key, value) => {
    setTheme({ ...theme, [key]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateTheme(theme);
    setSaving(false);
    
    // Apply immediately to current view
    const root = document.documentElement;
    if (theme.primary) root.style.setProperty('--primary', theme.primary);
    if (theme.onPrimary) root.style.setProperty('--on-primary', theme.onPrimary);
    if (theme.primaryContainer) root.style.setProperty('--primary-container', theme.primaryContainer);
    if (theme.onPrimaryContainer) root.style.setProperty('--on-primary-container', theme.onPrimaryContainer);
    if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
    if (theme.onSecondary) root.style.setProperty('--on-secondary', theme.onSecondary);
    if (theme.surface) root.style.setProperty('--surface', theme.surface);
    if (theme.onSurface) root.style.setProperty('--on-surface', theme.onSurface);
  };

  if (!theme) return <div>Loading theme settings...</div>;

  return (
    <div style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
      <h2 className="headline-md" style={{ marginBottom: 'var(--space-lg)' }}>Theme Customization</h2>
      <form onSubmit={handleSave} style={{ display: 'grid', gap: 'var(--space-md)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <div>
            <label className="input-label">Primary Color</label>
            <input type="color" className="input-field" value={theme.primary || '#000000'} onChange={e => handleChange('primary', e.target.value)} style={{ padding: 0, height: 40 }} />
          </div>
          <div>
            <label className="input-label">On Primary</label>
            <input type="color" className="input-field" value={theme.onPrimary || '#ffffff'} onChange={e => handleChange('onPrimary', e.target.value)} style={{ padding: 0, height: 40 }} />
          </div>
          <div>
            <label className="input-label">Primary Container</label>
            <input type="color" className="input-field" value={theme.primaryContainer || '#000000'} onChange={e => handleChange('primaryContainer', e.target.value)} style={{ padding: 0, height: 40 }} />
          </div>
          <div>
            <label className="input-label">On Primary Container</label>
            <input type="color" className="input-field" value={theme.onPrimaryContainer || '#000000'} onChange={e => handleChange('onPrimaryContainer', e.target.value)} style={{ padding: 0, height: 40 }} />
          </div>
          <div>
            <label className="input-label">Secondary Color</label>
            <input type="color" className="input-field" value={theme.secondary || '#000000'} onChange={e => handleChange('secondary', e.target.value)} style={{ padding: 0, height: 40 }} />
          </div>
          <div>
            <label className="input-label">On Secondary</label>
            <input type="color" className="input-field" value={theme.onSecondary || '#000000'} onChange={e => handleChange('onSecondary', e.target.value)} style={{ padding: 0, height: 40 }} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }} disabled={saving}>
          {saving ? 'Saving...' : 'Save Theme'}
        </button>
      </form>
    </div>
  );
}
