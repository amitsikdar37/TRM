import { useState, useEffect, useRef } from 'react';
import { getLeadership, addLeadership, deleteLeadership, getImageUrl } from '../data';

export default function LeadershipManager() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ title: '', desc: '', badge: '', badgeBg: '#41d1ff' });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchMembers = async () => {
    const data = await getLeadership();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
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
    formData.append('desc', form.desc);
    formData.append('badge', form.badge);
    formData.append('badgeBg', form.badgeBg);
    formData.append('image', file);

    await addLeadership(formData);
    await fetchMembers();
    setForm({ title: '', desc: '', badge: '', badgeBg: '#41d1ff' });
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    await deleteLeadership(id);
    await fetchMembers();
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
      {/* Upload Form */}
      <div style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
        <h2 className="headline-md" style={{ marginBottom: 'var(--space-lg)' }}>Add Leadership / Partner</h2>
        <form onSubmit={handlePublish} style={{ display: 'grid', gap: 'var(--space-md)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-md)' }}>
             <div>
                <label className="input-label">Profile Image</label>
                <div style={{ border: '1px dashed var(--outline)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
                  {preview ? <img src={preview} alt="preview" style={{ maxHeight: 150, borderRadius: 8 }} /> : <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--outline)' }}>person_add</span>}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <label className="input-label">Name / Title</label>
                  <input type="text" className="input-field" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="e.g. Local Distribution Team" />
                </div>
                <div>
                  <label className="input-label">Description</label>
                  <textarea className="input-field" rows={2} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required />
                </div>
             </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            <div>
              <label className="input-label">Badge Label</label>
              <input type="text" className="input-field" value={form.badge} onChange={e => setForm({...form, badge: e.target.value})} placeholder="e.g. Community Outreach" />
            </div>
            <div>
              <label className="input-label">Badge Background Color</label>
              <input type="color" className="input-field" value={form.badgeBg} onChange={e => setForm({...form, badgeBg: e.target.value})} style={{ padding: 0, height: 40 }} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!form.title || !file}>Add Member</button>
        </form>
      </div>

      {/* Leadership List */}
      <div style={{ background: 'var(--surface-container-low)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
        <h2 className="headline-md" style={{ marginBottom: 'var(--space-lg)' }}>Manage Leadership</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Badge</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>
                  <img src={getImageUrl(member.image)} alt={member.title} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} />
                </td>
                <td>{member.title}</td>
                <td>
                  <span style={{ background: member.badgeBg, color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>{member.badge}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleDelete(member.id)} style={{ color: 'var(--error)' }}><span className="material-symbols-outlined">delete</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
