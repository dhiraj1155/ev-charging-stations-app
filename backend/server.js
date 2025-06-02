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
// app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('/', (req, res) => res.send('EV Charging Station API')); // Add root route
app.use('/api/auth', authRoutes);
app.use('/api/chargers', chargerRoutes);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
// });

// MongoDB Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
//   const cors = require('cors');
//   const dotenv = require('dotenv');
//   const connectDB = require('./config/db');
//   const authRoutes = require('./routes/auth');
//   const chargerRoutes = require('./routes/chargers');

//   dotenv.config();
//   console.log('MONGO_URI:', process.env.MONGO_URI); // Debug

//   const app = express();

//   // Allow specific frontend origins
// const allowedOrigins = [
//   'https://ev-charging-stations-app-3ghb.vercel.app',
//   'https://ev-charging-stations-app-3ghb-o2l3dcnex-dhiraj1155s-projects.vercel.app',
//   'http://localhost:5002',
//   'http://localhost:8080' // 👈 Add this line
// ];


//   app.use(cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   }));

//   app.use(express.json());

//   app.get('/', (req, res) => res.send('EV Charging Station API')); // Debug route
//   app.use('/api/auth', authRoutes);
//   app.use('/api/chargers', chargerRoutes);

//   connectDB();

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));