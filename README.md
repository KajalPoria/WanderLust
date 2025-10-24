# 🌍 WanderLust

WanderLust is a travel accommodation web platform inspired by Airbnb. It allows users to explore, list, and book unique stays around the world. The platform is built using **Node.js**, **Express.js**, and **MongoDB**, providing a smooth and responsive UI through **EJS** templates and **Bootstrap**.

---

## 🏖️ Project Overview

WanderLust simplifies travel planning by allowing users to **find, book, and host** stays across multiple destinations.  

**Users can:**
- Create accounts and manage their listings  
- Browse and filter destinations  
- View property details with images, maps, and reviews  
- Leave feedback for hosts and travelers  

This project demonstrates the power of full-stack JavaScript development and cloud integrations using **Cloudinary** for image storage.

---

## ✨ Features

### 🏡 Core Functionalities
- User authentication and authorization (Passport.js)
- Create, edit, and delete listings
- Add and manage property reviews
- Image upload and management via Cloudinary
- Secure form validation and input sanitization
- **💳 Online payment integration with Razorpay**
- **📅 Booking system with date selection**
- **📊 Booking management dashboard**

### 💡 Additional Highlights
- Responsive and mobile-friendly design
- Flash messages for user feedback
- Role-based access control
- MVC (Model-View-Controller) architecture
- Cloud deployment ready
- **🔐 Secure payment processing with signature verification**
- **📱 Real-time price calculation**
- **✅ Payment status tracking**

---

## 🧩 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | EJS, Bootstrap, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, bcrypt |
| **Payment Gateway** | Razorpay |
| **Cloud Storage** | Cloudinary |
| **Deployment** | Render |

---

## 🗂️ Folder Structure

```
WanderLust/
├── models/
│   ├── listing.js
│   ├── user.js
│   ├── review.js
│   └── booking.js          # ← NEW: Booking model
├── views/
│   ├── listings/
│   ├── bookings/           # ← NEW: Booking views
│   ├── partials/
│   └── auth/
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   ├── users.js
│   └── booking.js          # ← NEW: Booking controller
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── booking.js          # ← NEW: Booking routes
├── public/
│   ├── css/
│   ├── js/
│   │   └── payment.js      # ← NEW: Payment integration
│   └── images/
├── utils/
│   ├── wrapAsync.js
│   └── ExpressError.js
├── middleware.js
├── app.js
└── package.json
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/WanderLust.git
cd WanderLust
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloud_key
CLOUDINARY_SECRET=your_cloud_secret
MONGO_URL=your_mongodb_connection_string
SECRET=your_session_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

> **📌 Note:** For detailed payment setup instructions, see [PAYMENT_SETUP.md](./PAYMENT_SETUP.md)

### 4. Start the Application
```bash
npm start
```

### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:8080
```

---

## 🧩 API and Routing Overview

| Route | Method | Description |
|-------|--------|-------------|
| `/listings` | GET | View all listings |
| `/listings/new` | GET | Form to create a new listing |
| `/listings` | POST | Create a new listing |
| `/listings/:id` | GET | View a specific listing |
| `/listings/:id/edit` | GET | Edit a listing |
| `/listings/:id` | PUT | Update a listing |
| `/listings/:id` | DELETE | Delete a listing |
| `/reviews` | POST | Add a review |
| `/reviews/:id` | DELETE | Remove a review |
| `/register` | POST | Register a new user |
| `/login` | POST | Log in a user |
| `/logout` | GET | Log out the current user |
| **`/bookings/new/:id`** | **GET** | **Show booking form for listing** |
| **`/bookings`** | **GET** | **View all user bookings** |
| **`/bookings/:id`** | **GET** | **View booking details** |
| **`/bookings/create-order`** | **POST** | **Create payment order** |
| **`/bookings/verify-payment`** | **POST** | **Verify payment** |
| **`/bookings/webhook`** | **POST** | **Razorpay webhook handler** |

---

## 🔐 Authentication System

- Uses **Passport.js** for local authentication
- Passwords are hashed using **bcrypt**
- Session handling with **express-session**
- Flash messages for feedback during login, signup, and errors

---

## 📈 Future Roadmap

### 🚀 Planned Enhancements
- 🌐 Add Map integration in WanderLust
- 📱 Add progressive web app (PWA) features for mobile
- 🔔 Enable real-time updates using Socket.io
- ~~💳 Integrate payment gateway for online booking~~ ✅ **COMPLETED**
- 📊 Build an Admin Dashboard for analytics
- 🌍 Add multilingual support and smart filters
- 📧 Email notifications for bookings
- 💰 Refund and cancellation management
- 📊 Revenue dashboard for hosts

---


## 📌 Real-World Insights

The WanderLust project demonstrates:
- Full-stack integration with real-world web patterns
- Scalable RESTful APIs for booking and listings
- Strong backend–frontend synchronization
- Clean modular code using the MVC pattern
- Secure authentication & session handling

This project serves as a practical foundation for modern travel and property platforms.

---

## 📜 License

This project is licensed under the **MIT License**. Please review the LICENSE file for details.

---

## 📬 Contact

For contributions, queries, or collaborations related to open-source initiatives, reach out via:

**GitHub:** [@KajalPoria](https://github.com/KajalPoria)

---

## 💎 Acknowledgments

- **MongoDB**
- **Express.js**
- **Bootstrap**
- **Cloudinary**
- **Passport.js**
- **Razorpay**

---

## 🎯 Payment Integration Highlights

WanderLust now features a complete **end-to-end payment system**:

### ✨ What's New:
- 💳 **Secure Razorpay Integration**: Industry-standard payment processing
- 📅 **Smart Booking System**: Date validation and price calculation
- 🔐 **Payment Verification**: HMAC SHA256 signature validation
- 📊 **Booking Management**: Track all bookings with payment status
- 🔔 **Webhook Support**: Real-time payment event handling
- 🎨 **Beautiful UI**: Responsive checkout and booking views
- 🛡️ **Security First**: Never store sensitive payment data

### 🚀 How It Works:
1. User selects dates and guest count
2. System calculates total price automatically
3. Razorpay secure checkout opens
4. Payment processed with multiple options (Card/UPI/Netbanking)
5. Backend verifies payment authenticity
6. Booking confirmed and stored in database
7. User can view all bookings in dashboard

For complete setup instructions, see [PAYMENT_SETUP.md](./PAYMENT_SETUP.md)

---

