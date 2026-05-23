const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, required: true },
  date: { type: String, required: true }, // Keeping as string to match existing logic ('2024-08-15')
  image: { type: String, required: true }, // URL or Base64 string
  large: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
