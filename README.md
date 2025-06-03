# EV Charging Station Management App

Welcome to the **EV Charging Station Management App**, a modern, user-friendly platform for managing electric vehicle (EV) charging stations. Built with Vue 3, vuex, Tailwind CSS, and Express.js, this app offers a **beautiful, intuitive, and robust** interface with glassmorphic design, teal-purple gradients, Poppins font, and smooth GSAP/Lottie animations. Deployed on Vercel (frontend) and Render (backend), it provides seamless authentication, charger management, and a responsive dashboard.

## Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Charger Management**: Create, read, update, and delete (CRUD) EV charging stations with details like status, power output, and connector type.
- **Interactive Dashboard**: View real-time stats (total, active, inactive chargers, average power output) with glassmorphic cards and filters.
- **Map View**: Visualize charger locations using Leaflet and MarkerCluster (in progress).
- **Premium UI**: Glassmorphic design, teal-purple gradients, Poppins font, GSAP animations for card entry, and Lottie animations for loading states.
- **Responsive Design**: Optimized for mobile, tablet, and desktop using Tailwind CSS.
- **Error Handling**: Robust error boundaries and Vuelidate form validation.
- **CORS Support**: Dynamic CORS configuration for all Vercel preview URLs and local development.

## Tech Stack

### Frontend
- **Vue 3**: Reactive and component-based framework.
- **Vue Router**: Client-side routing.
- **Tailwind CSS**: Utility-first CSS for styling.
- **GSAP**: Smooth animations for UI elements.
- **Vuelidate**: Form validation.
- **Axios**: HTTP requests to the backend.
- **Leaflet & MarkerCluster**: Map visualization.
- **Vite (via Vue CLI)**: Fast build tool.

### Backend
- **Express.js**: Node.js web framework.
- **MongoDB**: NoSQL database for storing users and chargers.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Secure authentication.
- **CORS**: Dynamic origin handling for Vercel and local environments.

### Deployment
- **Vercel**: Frontend hosting with dynamic preview URLs.
- **Render**: Backend hosting with MongoDB integration.
- **Postman**: API testing (collection included).

## Project Structure

```
ev-charging-app/
.
├── README.md
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── chargerController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Charger.js
│   │   └── User.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── auth.js
│   │   └── chargers.js
│   └── server.js
├── frontend
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.vue
│   │   ├── assets
│   │   │   ├── electric-station.png
│   │   │   ├── ev-bg.jpg
│   │   │   ├── ev-bg1.jpg
│   │   ├── components
│   │   │   ├── ChargerCard.vue
│   │   │   └── ChargerForm.vue
│   │   ├── index.css
│   │   ├── main.js
│   │   ├── router
│   │   │   └── index.js
│   │   ├── store
│   │   │   └── index.js
│   │   └── views
│   │       ├── ChargerList.vue
│   │       ├── Login.vue
│   │       └── MapView.vue
│   ├── tailwind.config.js
│   └── vue.config.js
├── package.json
└── postman_collection.json
```

## Prerequisites

- **Node.js**: v18 or higher.
- **npm**: v8 or higher.
- **MongoDB**: Cloud (MongoDB Atlas) or local instance.
- **Git**: For version control.
- **Postman**: For API testing.

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/dhiraj1155/ev-charging-stations-app.git
cd ev-charging-app
```

### Backend Setup

1. **Navigate to Backend**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Create a `.env` file in `backend/`:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ev-charging
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Start Backend**:
   ```bash
   npm start
   ```
   - Backend runs at `http://localhost:5000`.

### Frontend Setup

1. **Navigate to Frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Create a `.env` file in `frontend/`:
     ```
     VITE_API_URL=https://ev-charging-stations-app.onrender.com/api
     ```

4. **Start Frontend**:
   ```bash
   npm run serve
   ```
   - Frontend runs at `http://localhost:8080`.

### Testing APIs

- Import `postman_collection.json` into Postman.
- Test endpoints:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `GET /api/chargers`
  - `POST /api/chargers`
  - `PUT /api/chargers/:id`
  - `DELETE /api/chargers/:id`

## Deployment

### Backend (Render)

1. **Push to GitHub**:
   ```bash
   cd backend
   git add .
   git commit -m "Deploy backend to Render"
   git push origin main
   ```

2. **Configure Render**:
   - Create a new Web Service on Render.
   - Link to your GitHub repo’s `backend` directory.
   - Set environment variables:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `PORT=3000`
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Deploy at `https://ev-charging-stations-app.onrender.com`.

### Frontend (Vercel)

1. **Push to GitHub**:
   ```bash
   cd frontend
   git add .
   git commit -m "Deploy frontend to Vercel"
   git push origin main
   ```

2. **Configure Vercel**:
   - Create a new project on Vercel.
   - Link to your GitHub repo’s `frontend` directory.
   - Set environment variable:
     - `VITE_API_URL=https://ev-charging-stations-app.onrender.com/api`
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy at `https://ev-charging-stations-app-3ghb-*.vercel.app`.

## Usage

1. **Access the App**:
   - Open `http://localhost:8080` (local) or `https://ev-charging-stations-app-3ghb-*.vercel.app` (deployed).
   - Register or log in via `/login`.

2. **Manage Chargers**:
   - Navigate to `/chargers` for the dashboard.
   - View stats (total, active, inactive, avg power output).
   - Filter chargers by status, power output, or connector type.
   - Create, edit, or delete chargers using glassmorphic forms and cards.

3. **Explore Map View**:
   - Visit `/map` to see charger locations (WIP).

4. **Logout**:
   - Click the logout button in the navbar to return to `/login`.


## Troubleshooting

- **CORS Errors**:
  - Ensure `backend/src/server.js` allows your Vercel URL (dynamic regex: `https://ev-charging-stations-app-3ghb*.vercel.app`).
  - Check Render logs for CORS denials.
  - Test with:
    ```bash
    curl -X OPTIONS https://ev-charging-stations-app.onrender.com/api/auth/login -H "Origin: https://ev-charging-stations-app-3ghb-1v1gaumr5-dhiraj1155s-projects.vercel.app" -v
    ```

- **Dependency Issues**:
  - Clear `node_modules` and `package-lock.json`:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
  - Check logs: `/Users/apple/.npm/_logs/*.log`.

- **API Errors**:
  - Verify `MONGO_URI` and `JWT_SECRET` in `backend/.env`.
  - Test endpoints with Postman.


## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to branch: `git push origin feature/your-feature`.
5. Open a pull request.


## Contact

For issues or feedback, open a GitHub issue or contact [dhirajwagh2004@gmail.com].

---

**Live Demo**: [https://ev-charging-stations-app-3ghb.vercel.app/]

**API**: [https://ev-charging-stations-app.onrender.com](https://ev-charging-stations-app.onrender.com)

Happy charging! ⚡