const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, required: true },
  image: { type: String, required: true } // Path to the uploaded image or URL
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
