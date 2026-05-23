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

// Events for home page
export const EVENTS = [
  {
    id: 'e1',
    title: 'Agape Home Independence Day',
    description: 'Flag hoisting ceremony and community gathering with the children of Agape Home.',
    category: 'Education',
    progress: 85,
    status: 'Upcoming',
    image: IMAGES.hero,
  },
  {
    id: 'e2',
    title: 'Free Medical Camp',
    description: 'Providing basic healthcare checkups and essential medicines to underserved communities in Jalpaiguri.',
    category: 'Health',
    progress: 40,
    status: 'Ongoing',
    image: IMAGES.community2,
  },
  {
    id: 'e3',
    title: 'Winter Blanket Drive',
    description: 'Collecting and distributing warm blankets to protect the homeless during the harsh winter months.',
    category: 'Community',
    progress: 100,
    status: 'Completed',
    image: IMAGES.community3,
  },
];

// Impact metrics
export const METRICS = [
  { icon: 'school', value: 500, suffix: '+', label: 'Children Educated' },
  { icon: 'local_hospital', value: 1200, suffix: '+', label: 'Medical Aids Provided' },
  { icon: 'restaurant', value: 10000, suffix: '+', label: 'Meals Distributed' },
];

// Admin password
export const ADMIN_PASSWORD = 'admin123';

const API_URL = 'http://localhost:5000/api/gallery';
const AUTH_KEY = 'trm_admin_auth';

// Gallery helpers
export async function getAllGalleryItems() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch gallery items');
    const data = await res.json();
    // Map _id to id for frontend compatibility
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export async function addGalleryItem(item) {
  try {
    const res = await fetch(API_URL, {
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
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete gallery item');
    return true;
  } catch (error) {
    console.error('Error deleting gallery item:', error);
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

// Impact messages for donation
export const IMPACT_MESSAGES = {
  25: 'A $25 donation covers essential health supplies for one child for a month.',
  50: 'A $50 donation provides a family with emergency food supplies for two weeks.',
  100: 'A $100 donation funds a community clean-water station for an entire village.',
  250: "A $250 donation sponsors a student's educational materials for a full year.",
  custom: 'Every contribution, big or small, directly fuels our on-the-ground community programs.',
};

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
