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
- **Secure booking system with Razorpay payment integration**
- Image upload and management via Cloudinary
- Secure form validation and input sanitization

### 💡 Additional Highlights
- Responsive and mobile-friendly design
- Flash messages for user feedback
- Role-based access control
- **Real-time payment status updates via webhooks**
- MVC (Model-View-Controller) architecture
- Cloud deployment ready
- 🌐 Built-in internationalization (English, हिंदी, Français, Español)

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
│   └── review.js
├── views/
│   ├── listings/
│   ├── partials/
│   └── auth/
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   ├── js/
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
ATLAS_URL=your_mongodb_connection_string
SECRET=your_session_secret
RAZORPAY_KEY_ID=rzp_test_XXXXXXXX
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

### 4. Start the Application
```bash
nodemon app.js
```

Then navigate to the browser.

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
| `/bookings` | GET | View user bookings |
| `/bookings/new/:id` | GET | Show booking form |
| `/bookings/create-order` | POST | Create payment order |
| `/bookings/verify-payment` | POST | Verify payment |
| `/register` | POST | Register a new user |
| `/login` | POST | Log in a user |
| `/logout` | GET | Log out the current user |

---

## 🔐 Authentication System

- Uses **Passport.js** for local authentication
- Passwords are hashed using **bcrypt**
- Session handling with **express-session**
- Flash messages for feedback during login, signup, and errors

---

## 💳 Payment Integration

WanderLust integrates **Razorpay** payment gateway for secure and seamless booking transactions.

### 🎯 Payment Features

- **Secure Order Creation** - Backend generates Razorpay orders with proper validation
- **Multiple Payment Methods** - Supports Cards, UPI, Net Banking, and Wallets
- **Signature Verification** - HMAC SHA256 signature validation for security
- **Real-time Updates** - Webhook integration for instant payment notifications
- **Booking Management** - Automatic booking status updates based on payment

### 🚀 Setup Razorpay (For Developers)

1. **Create Account**
   - Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
   - Start with Test Mode for development

2. **Get API Keys**
   - Navigate to **Settings → API Keys**
   - Generate Test Keys (Key ID starts with `rzp_test_`)
   - Copy both Key ID and Key Secret

3. **Configure Webhooks** (Optional)
   - Go to **Settings → Webhooks**
   - Add webhook URL: `https://yourdomain.com/bookings/webhook`
   - Select events: `payment.captured`, `payment.failed`
   - Use [ngrok](https://ngrok.com/) for local testing

4. **Test Payment**
   - **Successful Payment:** `4111 1111 1111 1111`
   - **Failed Payment:** `4000 0000 0000 0002`
   - More test cards: [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)

### 📊 Payment Flow

```
Browse Listings → Select Dates & Guests → Proceed to Payment 
→ Razorpay Checkout → Complete Payment → Signature Verification 
→ Booking Confirmed → View in My Bookings
```

### 🎯 Booking API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/bookings/new/:id` | GET | Show booking form for listing |
| `/bookings` | GET | View all user bookings |
| `/bookings/:id` | GET | View specific booking details |
| `/bookings/create-order` | POST | Create Razorpay payment order |
| `/bookings/verify-payment` | POST | Verify payment signature |
| `/bookings/webhook` | POST | Razorpay webhook handler |
| `/bookings/:id` | DELETE | Cancel pending booking |

---

## 📈 Future Roadmap

### 🚀 Planned Enhancements
- 🌐 Expand map integration with advanced search filters
- 📱 Add progressive web app (PWA) features for mobile
- 🔔 Enable real-time notifications using Socket.io
- 🌟 Implement host verification and rating system
- 📊 Build an Admin Dashboard for analytics
- 💱 Add currency conversion
- 🤖 AI-powered personalized recommendations

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

## 🛠️ Troubleshooting

### Common Issues

**Payment Integration Issues:**
- **Invalid Key ID**: Verify `RAZORPAY_KEY_ID` in `.env` starts with `rzp_test_` for test mode
- **Signature Verification Failed**: Ensure `RAZORPAY_KEY_SECRET` matches your Key ID
- **Webhook Not Working**: Use [ngrok](https://ngrok.com/) for local testing and verify webhook secret

**Database Connection Issues:**
- Check `ATLAS_URL` is correctly set in `.env`
- Ensure MongoDB cluster allows connections from your IP
- Verify network connectivity

**Image Upload Issues:**
- Confirm Cloudinary credentials are correct
- Check file size limits and formats
- Verify API quota hasn't been exceeded

**Authentication Issues:**
- Clear browser cookies and session data
- Verify `SECRET` is set for express-session
- Check Passport.js configuration

For more help, check the [Issues](https://github.com/ItsMeArm00n/WanderLust/issues) page or create a new issue.

---

## 🌐 Internationalization (i18n)

WanderLust supports multiple languages using the `i18n` library.

Supported languages:
- English (`en` – default)
- Hindi (`hi`)
- French (`fr`)
- Spanish (`es`)

Usage:
- Change language via the navbar language switcher, or by appending `?lang=<code>` to any URL (e.g., `/listings?lang=fr`).
- The selection is stored in a cookie so it persists as you navigate the site.

Add a new language:
1. Create `locales/<code>.json` (e.g., `locales/de.json`).
2. Copy keys from `locales/en.json` and translate the values.
3. Add the new code to the `locales` array in the `i18n.configure` call in `app.js`.

Currently translated UI: navbar, footer, chat widget, and login/sign-up pages. Other pages will fall back to English where translations are not yet provided.

---

##  License

This project is licensed under the **MIT License**. Please review the LICENSE file for details.

---

## 📬 Contact

For contributions, queries, or collaborations related to open-source initiatives, reach out via:

**GitHub:** [@KajalPoria](https://github.com/KajalPoria)

---

## 💎 Acknowledgments

Special thanks to the following technologies that power WanderLust:

- **MongoDB** - NoSQL database for flexible data storage
- **Express.js** - Fast and minimalist web framework
- **Bootstrap** - Responsive UI component library
- **Cloudinary** - Cloud-based image management
- **Passport.js** - Authentication middleware
- **Razorpay** - Secure payment gateway integration
