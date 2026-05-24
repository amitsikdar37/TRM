import { useState, useEffect } from 'react';
import { getMetrics, updateMetric } from '../data';

export default function MetricsManager() {
  const [metrics, setMetrics] = useState([]);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    getMetrics().then(setMetrics);
  }, []);

  const handleChange = (id, field, value) => {
    setMetrics(metrics.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSave = async (id) => {
    setSavingId(id);
    const metricToUpdate = metrics.find(m => m.id === id);
    if (metricToUpdate) {
      await updateMetric(id, metricToUpdate);
    }
    setSavingId(null);
  };

  return (
    <div style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
      <h2 className="headline-md" style={{ marginBottom: 'var(--space-lg)' }}>Impact Metrics</h2>
      <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
        {metrics.map(m => (
          <div key={m.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 'var(--space-md)', alignItems: 'center', background: 'var(--surface)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--primary)' }}>{m.icon}</span>
            <div>
              <label className="input-label" style={{ fontSize: 12 }}>Label</label>
              <input type="text" className="input-field" value={m.label} onChange={e => handleChange(m.id, 'label', e.target.value)} />
            </div>
            <div>
              <label className="input-label" style={{ fontSize: 12 }}>Value</label>
              <input type="number" className="input-field" value={m.value} onChange={e => handleChange(m.id, 'value', parseInt(e.target.value) || 0)} style={{ width: 100 }} />
            </div>
            <div style={{ alignSelf: 'end' }}>
              <button className="btn btn-primary" onClick={() => handleSave(m.id)} disabled={savingId === m.id} style={{ padding: '8px 16px' }}>
                {savingId === m.id ? 'Saving...' : 'Update'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
