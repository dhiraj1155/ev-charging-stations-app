const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: { type: String, enum: ['Active', 'Inactive'], required: true },
  powerOutput: { type: Number, required: true }, // in kW
  connectorType: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Charger', chargerSchema);