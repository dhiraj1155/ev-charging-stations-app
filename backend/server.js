const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');
require('dotenv').config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://ev-charging-stations-app-3ghb.vercel.app',
  'https://ev-charging-stations-app-3ghb-o2l3dcnex-dhiraj1155-e-projects.vercel.app',
  'https://ev-charging-stations-app-3ghb-k117fgctx-dhiraj1155s-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:8080'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
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
