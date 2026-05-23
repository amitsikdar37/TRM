const mongoose = require('mongoose');
require('dotenv').config();
const Gallery = require('./models/Gallery');

const IMAGES = {
  community1: '/openairmovienight.jpg',
  community2: '/techliteracyworkshop.jpg',
  community3: '/winteroutreachdrive.jpg',
  community4: '/nightfallvillagecinema.jpg',
  performance1: '/annualyouthfestival.jpg',
  performance2: '/traditionaldanceshowcase.jpg',
  leaders1: '/communitiesleadersgathering.jpg',
  leaders2: '/eventcoordinationmeeting.jpg',
};

const DEFAULT_GALLERY = [
  {
    title: 'Open Air Movie Night',
    description: 'Bringing families together for an evening of entertainment and shared experiences in the village square.',
    category: 'Community',
    date: '2024-08-15',
    image: IMAGES.community1,
    large: true,
  },
  {
    title: 'Tech Literacy Workshop',
    description: 'Equipping local youth with essential digital skills for the modern economy.',
    category: 'Education',
    date: '2024-07-20',
    image: IMAGES.community2,
    large: false,
  },
  {
    title: 'Annual Youth Festival',
    description: 'Celebrating local talent through music, dance, and creative arts.',
    category: 'Culture',
    date: '2024-06-10',
    image: IMAGES.performance1,
    large: false,
  },
  {
    title: 'Traditional Dance Showcase',
    description: 'Preserving cultural heritage through vibrant community performances.',
    category: 'Culture',
    date: '2024-05-25',
    image: IMAGES.performance2,
    large: false,
  },
  {
    title: 'Nightfall Village Cinema',
    description: 'A magical evening under the stars, screening educational documentaries for rural communities.',
    category: 'Community',
    date: '2024-04-12',
    image: IMAGES.community4,
    large: true,
  },
  {
    title: 'Winter Outreach Drive',
    description: 'Distributing warm clothing and supplies during the colder months.',
    category: 'Community',
    date: '2024-01-18',
    image: IMAGES.community3,
    large: false,
  },
  {
    title: 'Community Leaders Gathering',
    description: 'Our dedicated local coordinators working directly with families to ensure equitable distribution.',
    category: 'Community',
    date: '2024-03-05',
    image: IMAGES.leaders1,
    large: false,
  },
  {
    title: 'Event Coordination Meeting',
    description: 'Organizing structural support and maintaining operational transparency within our communities.',
    category: 'Education',
    date: '2024-02-14',
    image: IMAGES.leaders2,
    large: false,
  },
];

const envName = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const mongoUri = envName === 'production' 
  ? process.env.MONGODB_URI_PROD 
  : process.env.MONGODB_URI_DEV;

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding data...');
    
    // Clear existing data (optional, but good for a fresh seed)
    await Gallery.deleteMany({});
    console.log('Cleared existing gallery items.');

    // Insert default items
    await Gallery.insertMany(DEFAULT_GALLERY);
    console.log(`Successfully seeded ${DEFAULT_GALLERY.length} items!`);

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  });
