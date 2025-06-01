EV Charging Station Management App
This is a full-stack application for managing electric vehicle (EV) charging stations, built with Node.js, Express, MongoDB, and Vue.js. The backend provides a REST API for CRUD operations on charging stations and user authentication using JWT. The frontend includes a login screen and a charger listing page with filters.
Project Structure
/ev-charging-app
├── /backend
│   ├── /config           # Database configuration
│   ├── /controllers      # API logic
│   ├── /models           # MongoDB schemas
│   ├── /routes           # API routes
│   ├── /middleware       # Authentication middleware
│   ├── .env             # Environment variables
│   ├── package.json      # Backend dependencies
│   └── server.js         # Main server file
├── /frontend
│   ├── /public          # Static assets
│   ├── /src
│   │   ├── /assets      # Images, fonts
│   │   ├── /components  # Vue components
│   │   ├── /views       # Vue page components
│   │   ├── /store       # Vuex store
│   │   ├── /router      # Vue Router configuration
│   │   ├── App.vue      # Root Vue component
│   │   └── main.js      # Vue app entry point
│   ├── package.json     # Frontend dependencies
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── vue.config.js    # Vue CLI configuration
└── README.md            # Project documentation

Backend Setup
Prerequisites

Node.js (v16 or higher)
MongoDB (local or cloud instance, e.g., MongoDB Atlas)
npm

Installation

Navigate to the backend folder:
cd backend


Install dependencies:
npm install


Create a .env file in the backend folder with the following:
MONGO_URI=mongodb://localhost:27017/ev-charging
JWT_SECRET=your_jwt_secret_key
PORT=5000

Replace MONGO_URI with your MongoDB connection string and JWT_SECRET with a secure key.

Start the MongoDB server (if using local MongoDB).

Run the backend server:
npm start

For development with auto-restart:
npm run dev



API Endpoints

Auth Routes:
POST /api/auth/register - Register a new user (username, password)
POST /api/auth/login - Login and receive JWT token


Charger Routes (Protected):
POST /api/chargers - Create a new charging station
GET /api/chargers - List all charging stations
PUT /api/chargers/:id - Update a charging station
DELETE /api/chargers/:id - Delete a charging station



Authentication

Use the /api/auth/register and /api/auth/login endpoints to obtain a JWT token.
Include the token in the Authorization header as Bearer <token> for protected routes.

Frontend Setup
Prerequisites

Node.js (v16 or higher)
npm

Installation

Navigate to the frontend folder:cd frontend


Install dependencies:npm install


Ensure the backend is running at http://localhost:5000 (or update the API URL in src/store/index.js if different).
Run the frontend development server:npm run serve

The app will be available at http://localhost:8080.

Features

Login Screen: Register or log in to access the app. JWT token is stored in Vuex and localStorage.
Charger Listing Page:
Displays all charging stations in a grid.
Supports filtering by status, power output, and connector type.
Allows adding, editing, and deleting chargers (protected by JWT).



Next Steps

Implement the map view using OpenStreetMap (Leaflet.js) to display chargers.
Integrate frontend with backend APIs for the map view.
Deploy the application to a cloud platform (e.g., Render, Vercel).
Provide a Postman collection for API testing.

License
MIT
# ev-charging-stations
