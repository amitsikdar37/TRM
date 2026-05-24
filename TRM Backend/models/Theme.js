const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  primary: { type: String, default: '#00346d' },
  onPrimary: { type: String, default: '#ffffff' },
  primaryContainer: { type: String, default: '#1a4b8c' },
  onPrimaryContainer: { type: String, default: '#99bdff' },
  secondary: { type: String, default: '#006d3d' },
  onSecondary: { type: String, default: '#ffffff' },
  surface: { type: String, default: '#fcf9f8' },
  onSurface: { type: String, default: '#1b1b1c' },
}, { timestamps: true });

module.exports = mongoose.model('Theme', themeSchema);
