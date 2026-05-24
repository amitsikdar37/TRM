// ============================================
// THE REVIVAL MISSION — Data Layer
// ============================================

// Image paths — high-resolution local files in /public
export const IMAGES = {
  logo: '/logo/trmlogo.jpg',
  hero: '/backgroundheroimage.jpg',
  community1: '/openairmovienight.jpg',
  community2: '/techliteracyworkshop.jpg',
  community3: '/winteroutreachdrive.jpg',
  community4: '/nightfallvillagecinema.jpg',
  performance1: '/annualyouthfestival.jpg',
  performance2: '/traditionaldanceshowcase.jpg',
  leaders1: '/communitiesleadersgathering.jpg',
  leaders2: '/eventcoordinationmeeting.jpg',
};

// Default gallery items
export const DEFAULT_GALLERY = [
  {
    id: 'g1',
    title: 'Open Air Movie Night',
    description: 'Bringing families together for an evening of entertainment and shared experiences in the village square.',
    category: 'Community',
    date: '2024-08-15',
    image: IMAGES.community1,
    large: true,
  },
  {
    id: 'g2',
    title: 'Tech Literacy Workshop',
    description: 'Equipping local youth with essential digital skills for the modern economy.',
    category: 'Education',
    date: '2024-07-20',
    image: IMAGES.community2,
    large: false,
  },
  {
    id: 'g3',
    title: 'Annual Youth Festival',
    description: 'Celebrating local talent through music, dance, and creative arts.',
    category: 'Culture',
    date: '2024-06-10',
    image: IMAGES.performance1,
    large: false,
  },
  {
    id: 'g4',
    title: 'Traditional Dance Showcase',
    description: 'Preserving cultural heritage through vibrant community performances.',
    category: 'Culture',
    date: '2024-05-25',
    image: IMAGES.performance2,
    large: false,
  },
  {
    id: 'g5',
    title: 'Nightfall Village Cinema',
    description: 'A magical evening under the stars, screening educational documentaries for rural communities.',
    category: 'Community',
    date: '2024-04-12',
    image: IMAGES.community4,
    large: true,
  },
  {
    id: 'g6',
    title: 'Winter Outreach Drive',
    description: 'Distributing warm clothing and supplies during the colder months.',
    category: 'Community',
    date: '2024-01-18',
    image: IMAGES.community3,
    large: false,
  },
  {
    id: 'g7',
    title: 'Community Leaders Gathering',
    description: 'Our dedicated local coordinators working directly with families to ensure equitable distribution.',
    category: 'Community',
    date: '2024-03-05',
    image: IMAGES.leaders1,
    large: false,
  },
  {
    id: 'g8',
    title: 'Event Coordination Meeting',
    description: 'Organizing structural support and maintaining operational transparency within our communities.',
    category: 'Education',
    date: '2024-02-14',
    image: IMAGES.leaders2,
    large: false,
  },
];

// Impact messages for donation
export const IMPACT_MESSAGES = {
  25: 'A $25 donation covers essential health supplies for one child for a month.',
  50: 'A $50 donation provides a family with emergency food supplies for two weeks.',
  100: 'A $100 donation funds a community clean-water station for an entire village.',
  250: "A $250 donation sponsors a student's educational materials for a full year.",
  custom: 'Every contribution, big or small, directly fuels our on-the-ground community programs.',
};

// Admin password
export const ADMIN_PASSWORD = 'admin123';

let API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (API_BASE.endsWith('/gallery')) {
  API_BASE = API_BASE.slice(0, -8);
}
const AUTH_KEY = 'trm_admin_auth';

// Helper to format image URLs
export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
  // If it's an uploaded file from backend
  if (imagePath.startsWith('/uploads')) {
    const backendDomain = API_BASE.replace('/api', '');
    return `${backendDomain}${imagePath}`;
  }
  // If it's a local public asset
  return imagePath;
}

// Gallery helpers
export async function getAllGalleryItems() {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    if (!res.ok) throw new Error('Failed to fetch gallery items');
    const data = await res.json();
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export async function addGalleryItem(item) {
  try {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to save gallery item');
    return await res.json();
  } catch (error) {
    console.error('Error saving gallery item:', error);
    throw error;
  }
}

export async function deleteGalleryItem(id) {
  try {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete gallery item');
    return true;
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
}

// Theme helpers
export async function getTheme() {
  try {
    const res = await fetch(`${API_BASE}/theme`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching theme:', error);
    return null;
  }
}

export async function updateTheme(theme) {
  try {
    const res = await fetch(`${API_BASE}/theme`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme),
    });
    return await res.json();
  } catch (error) {
    console.error('Error updating theme:', error);
    throw error;
  }
}

// Metrics helpers
export async function getMetrics() {
  try {
    const res = await fetch(`${API_BASE}/metrics`);
    const data = await res.json();
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }
}

export async function updateMetric(id, data) {
  try {
    const res = await fetch(`${API_BASE}/metrics/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error('Error updating metric:', error);
    throw error;
  }
}

// Events helpers
export async function getEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    const data = await res.json();
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function addEvent(formData) {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      body: formData, // FormData sends multipart/form-data automatically
    });
    if (!res.ok) throw new Error('Failed to save event');
    return await res.json();
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
}

export async function deleteEvent(id) {
  try {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

// Leadership helpers
export async function getLeadership() {
  try {
    const res = await fetch(`${API_BASE}/leadership`);
    const data = await res.json();
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching leadership:', error);
    return [];
  }
}

export async function addLeadership(formData) {
  try {
    const res = await fetch(`${API_BASE}/leadership`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to save leadership member');
    return await res.json();
  } catch (error) {
    console.error('Error saving leadership member:', error);
    throw error;
  }
}

export async function deleteLeadership(id) {
  try {
    const res = await fetch(`${API_BASE}/leadership/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete leadership member');
    return true;
  } catch (error) {
    console.error('Error deleting leadership member:', error);
    throw error;
  }
}

// Auth helpers
export function isAdminAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function loginAdmin(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem(AUTH_KEY);
}



// Category badge class mapping
export function getBadgeClass(category) {
  const map = {
    'Education': 'badge-education',
    'Health': 'badge-health',
    'Community': 'badge-community',
    'Culture': 'badge-culture',
    'Relief': 'badge-relief',
  };
  return map[category] || 'badge-community';
}
