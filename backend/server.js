const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({ origin: 'https://ev-charging-stations-app-3ghb.vercel.app/' }));

// Routes
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use('/api/auth', authRoutes);
app.use('/api/chargers', chargerRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// MongoDB Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));