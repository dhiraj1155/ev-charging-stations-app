const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., server-to-server, Postman)
    if (!origin) return callback(null, true);

    // Allow local development
    const localOrigins = ['http://localhost:5173', 'http://localhost:8080'];
    if (localOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow Vercel origins dynamically
    const vercelOriginRegex = /^https:\/\/ev-charging-stations-app-3ghb(-[a-z0-9]+)?\.vercel\.app$/;
    if (vercelOriginRegex.test(origin)) {
      return callback(null, true);
    }

    // Deny other origins
    callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chargers', chargerRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});