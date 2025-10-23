# 🌍 WanderLust

WanderLust is a travel accommodation web platform inspired by Airbnb. It allows users to explore, list, and book unique stays around the world. The platform is built using **Node.js**, **Express.js**, and **MongoDB**, providing a smooth and responsive UI through **EJS** templates and **Bootstrap**.

---

## 🏖️ Project Overview

WanderLust simplifies travel planning by allowing users to **find, book, and host** stays across multiple destinations.  
Users can:
- Create accounts and manage their listings  
- Browse and filter destinations  
- View property details with images, maps, and reviews  
- Leave feedback for hosts and travelers  

This project demonstrates the power of full-stack JavaScript development and cloud integrations using **Cloudinary** for image storage.


## ✨ Features

### 🏡 Core Functionalities
- User authentication and authorization (Passport.js)
- Create, edit, and delete listings
- Add and manage property reviews
- Image upload and management via Cloudinary
- Secure form validation and input sanitization

### 💡 Additional Highlights
- Responsive and mobile-friendly design
- Flash messages for user feedback
- Role-based access control
- MVC (Model-View-Controller) architecture
- Cloud deployment ready

## 🧰 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | EJS, Bootstrap, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, Express-session |
| **Cloud Storage** | Cloudinary |
| **Map & Geolocation** | Mapbox API |
| **Deployment (Optional)** | Render / Vercel / Railway |

## 🗂️ Folder Structure
WanderLust/
│
├── controllers/ # Handles logic for routes
├── models/ # MongoDB schema definitions
├── routes/ # Express routing for listings, users, and reviews
├── views/ # EJS templates (UI components)
├── public/ # Static assets (CSS, JS, images)
├── utils/ # Helper functions and middleware
├── init/ # Seed data or initial setup scripts
├── middleware.js # Custom middleware functions
├── cloudConfig.js # Cloudinary configuration
├── app.js # Main entry point
├── package.json # Dependencies and scripts
└── .gitignore # Ignored files


## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/WanderLust.git
cd WanderLust

npm install ( to install dependencies)

Create a .env file and add all these info in that
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloud_key
CLOUDINARY_SECRET=your_cloud_secret
MONGO_URL=your_mongodb_connection_string
SECRET=your_session_secret

To run the application
npm start

Then open in your browser
👉 http://localhost:8080

```

🧩 API and Routing Overview
| Route                | Method | Description                  |
| -------------------- | ------ | ---------------------------- |
| `/listings`          | GET    | View all listings            |
| `/listings/new`      | GET    | Form to create a new listing |
| `/listings`          | POST   | Create a new listing         |
| `/listings/:id`      | GET    | View a specific listing      |
| `/listings/:id/edit` | GET    | Edit a listing               |
| `/listings/:id`      | PUT    | Update a listing             |
| `/listings/:id`      | DELETE | Delete a listing             |
| `/reviews`           | POST   | Add a review                 |
| `/reviews/:id`       | DELETE | Remove a review              |
| `/register`          | POST   | Register a new user          |
| `/login`             | POST   | Log in a user                |
| `/logout`            | GET    | Log out the current user     |

<img width="785" height="696" alt="image" src="https://github.com/user-attachments/assets/1ca0ed85-977d-4e9c-9431-65fbf7f52322" />

🔐 Authentication System
Uses Passport.js for local authentication
Passwords are hashed using bcrypt
Session handling with express-session
Flash messages for feedback during login, signup, and errors







