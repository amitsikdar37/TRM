const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const Gallery = require('./models/Gallery');
const Theme = require('./models/Theme');
const Metric = require('./models/Metric');
const Event = require('./models/Event');
const Leadership = require('./models/Leadership');

const app = express();

// Middleware
// We need a larger limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// MongoDB connection
const mongoUri = process.env.NODE_ENV === 'production' 
  ? process.env.MONGODB_URI_PROD 
  : process.env.MONGODB_URI_DEV;

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// 1. Get all gallery items
app.get('/api/gallery', async (req, res) => {
  try {
    // Sort by createdAt descending (newest first)
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// 2. Add a new gallery item
app.post('/api/gallery', async (req, res) => {
  try {
    const { title, description, category, date, image, large } = req.body;
    
    if (!title || !image) {
      return res.status(400).json({ error: 'Title and image are required' });
    }

    const newItem = new Gallery({
      title,
      description,
      category,
      date: date || new Date().toISOString().split('T')[0],
      image,
      large: large || false
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error saving gallery item:', error);
    res.status(500).json({ error: 'Failed to save gallery item' });
  }
});

// 3. Delete a gallery item
app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Gallery.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// ============================================
// THEME ROUTES
// ============================================
app.get('/api/theme', async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) {
      theme = await Theme.create({}); // Create default if doesn't exist
    }
    res.json(theme);
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ error: 'Failed to fetch theme' });
  }
});

app.put('/api/theme', async (req, res) => {
  try {
    const theme = await Theme.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(theme);
  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(500).json({ error: 'Failed to update theme' });
  }
});

// ============================================
// METRICS ROUTES
// ============================================
app.get('/api/metrics', async (req, res) => {
  try {
    const metrics = await Metric.find().sort({ order: 1 });
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

app.put('/api/metrics/:id', async (req, res) => {
  try {
    const metric = await Metric.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(metric);
  } catch (error) {
    console.error('Error updating metric:', error);
    res.status(500).json({ error: 'Failed to update metric' });
  }
});

// ============================================
// EVENTS ROUTES
// ============================================
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, progress, status } = req.body;
    let imageUrl = '';
    
    // Check if an image was uploaded via multer
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      // Fallback if URL is provided directly (e.g. from seed script)
      imageUrl = req.body.image;
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }

    const newEvent = new Event({ title, description, category, progress, status, image: imageUrl });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ error: 'Failed to save event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// ============================================
// LEADERSHIP ROUTES
// ============================================
app.get('/api/leadership', async (req, res) => {
  try {
    const members = await Leadership.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.error('Error fetching leadership:', error);
    res.status(500).json({ error: 'Failed to fetch leadership' });
  }
});

app.post('/api/leadership', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, badge, badgeBg } = req.body;
    let imageUrl = '';
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }

    const newMember = new Leadership({ title, desc, badge, badgeBg, image: imageUrl });
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Error saving leadership member:', error);
    res.status(500).json({ error: 'Failed to save leadership member' });
  }
});

app.delete('/api/leadership/:id', async (req, res) => {
  try {
    await Leadership.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leadership member deleted successfully' });
  } catch (error) {
    console.error('Error deleting leadership member:', error);
    res.status(500).json({ error: 'Failed to delete leadership member' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
