const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  badge: { type: String, required: true },
  badgeBg: { type: String, default: 'var(--primary)' },
  image: { type: String, required: true } // Path to the uploaded image or URL
}, { timestamps: true });

module.exports = mongoose.model('Leadership', leadershipSchema);
