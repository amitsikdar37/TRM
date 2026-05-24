import { useState, useEffect, useRef } from 'react';
import { getEvents, addEvent, deleteEvent, getImageUrl } from '../data';

const CATEGORIES = ['Health', 'Education', 'Relief', 'Community', 'Culture'];

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'Health', progress: 0, status: 'Upcoming' });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedFile.type.startsWith('image/')) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title || !file) return;

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('progress', form.progress);
    formData.append('status', form.status);
    formData.append('image', file);

    await addEvent(formData);
    await fetchEvents();
    setForm({ title: '', description: '', category: 'Health', progress: 0, status: 'Upcoming' });
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    await fetchEvents();
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
      {/* Upload Form */}
      <div style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
        <h2 className="headline-md" style={{ marginBottom: 'var(--space-lg)' }}>Add New Event</h2>
        <form onSubmit={handlePublish} style={{ display: 'grid', gap: 'var(--space-md)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-md)' }}>
             <div>
                <label className="input-label">Image</label>
                <div style={{ border: '1px dashed var(--outline)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
                  {preview ? <img src={preview} alt="preview" style={{ maxHeight: 150, borderRadius: 8 }} /> : <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--outline)' }}>add_photo_alternate</span>}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <label className="input-label">Title</label>
                  <input type="text" className="input-field" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                </div>
                <div>
                  <label className="input-label">Description</label>
                  <textarea className="input-field" rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
                </div>
             </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
            <div>
              <label className="input-label">Category</label>
              <select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Progress (%)</label>
              <input type="number" min="0" max="100" className="input-field" value={form.progress} onChange={e => setForm({...form, progress: parseInt(e.target.value) || 0})} />
            </div>
            <div>
              <label className="input-label">Status</label>
              <select className="input-field" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!form.title || !file}>Add Event</button>
        </form>
      </div>

      {/* Events List */}
      <div style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
        <h2 className="headline-md" style={{ marginBottom: 'var(--space-lg)' }}>Manage Events</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>
                  <img src={getImageUrl(event.image)} alt={event.title} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                </td>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.status}</td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleDelete(event.id)} style={{ color: 'var(--error)' }}><span className="material-symbols-outlined">delete</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
