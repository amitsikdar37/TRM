const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  value: { type: Number, required: true },
  suffix: { type: String, default: '+' },
  label: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Metric', metricSchema);
