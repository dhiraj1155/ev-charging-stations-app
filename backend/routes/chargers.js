const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createCharger, getChargers, updateCharger, deleteCharger } = require('../controllers/chargerController');

router.use(authMiddleware);

router.post('/', createCharger);
router.get('/', getChargers);
router.put('/:id', updateCharger);
router.delete('/:id', deleteCharger);

module.exports = router;