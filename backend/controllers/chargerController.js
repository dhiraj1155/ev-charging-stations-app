const Charger = require('../models/Charger');

const createCharger = async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;
  try {
    const charger = new Charger({
      name,
      location,
      status,
      powerOutput,
      connectorType,
      createdBy: req.user.id,
    });
    await charger.save();
    res.status(201).json(charger);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getChargers = async (req, res) => {
  try {
    const chargers = await Charger.find().populate('createdBy', 'username');
    res.json(chargers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCharger = async (req, res) => {
  const { id } = req.params;
  const { name, location, status, powerOutput, connectorType } = req.body;
  try {
    const charger = await Charger.findById(id);
    if (!charger) {
      return res.status(404).json({ message: 'Charger not found' });
    }
    if (charger.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    charger.name = name || charger.name;
    charger.location = location || charger.location;
    charger.status = status || charger.status;
    charger.powerOutput = powerOutput || charger.powerOutput;
    charger.connectorType = connectorType || charger.connectorType;

    await charger.save();
    res.json(charger);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCharger = async (req, res) => {
  const { id } = req.params;
  try {
    const charger = await Charger.findById(id);
    if (!charger) {
      return res.status(404).json({ message: 'Charger not found' });
    }
    if (charger.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await charger.remove();
    res.json({ message: 'Charger deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createCharger, getChargers, updateCharger, deleteCharger };