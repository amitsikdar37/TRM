const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Gallery = require('./models/Gallery');

const app = express();

// Middleware
// We need a larger limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
