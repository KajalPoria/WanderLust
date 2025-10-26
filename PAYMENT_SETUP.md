# 💳 Razorpay Payment Integration Setup Guide

This guide will help you set up the Razorpay payment gateway for WanderLust.

## 📋 Prerequisites

- Active Razorpay account ([Sign up here](https://dashboard.razorpay.com/signup))
- Node.js and npm installed
- MongoDB database running

## 🚀 Setup Steps

### 1. Create Razorpay Account

1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
2. Complete the signup process
3. You'll start in **Test Mode** (perfect for development)

### 2. Get API Keys

1. Navigate to **Settings** → **API Keys** in the Razorpay Dashboard
2. Click on **Generate Test Keys** (or use existing ones)
3. You'll see:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (click "Show" to reveal)

### 3. Configure Environment Variables

Add the following to your `.env` file:

```env
# Razorpay Configuration (Payment Gateway)
# Get these from https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Razorpay Webhook Secret
# Get this from https://dashboard.razorpay.com/app/webhooks
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

**Important:** Replace the placeholder values with your actual keys!

### 4. Set Up Webhooks (Optional but Recommended)

Webhooks allow Razorpay to notify your server about payment events in real-time.

1. Go to **Settings** → **Webhooks** in Razorpay Dashboard
2. Click **Add New Webhook**
3. Enter your webhook URL: `https://yourdomain.com/bookings/webhook`
   - For local development, use a tool like [ngrok](https://ngrok.com/) to create a public URL
4. Select events to track:
   - ✅ `payment.captured`
   - ✅ `payment.failed`
5. Copy the **Webhook Secret** and add it to your `.env` file

### 5. Install Dependencies

The Razorpay package has already been installed. If you need to reinstall:

```bash
npm install razorpay
```

### 6. Test the Integration

1. Start your application:
   ```bash
   npm start
   ```

2. Navigate to any listing and click "Book Now"

3. Fill in the booking details and click "Proceed to Payment"

4. Use **Razorpay Test Cards**:

   **Successful Payment:**
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date

   **Failed Payment:**
   - Card Number: `4000 0000 0000 0002`
   - CVV: Any 3 digits
   - Expiry: Any future date

   **More test cards:** [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)

## 🔍 Features Implemented

### ✅ Complete Payment Flow
- Secure payment order creation
- Razorpay checkout integration
- Payment signature verification (HMAC SHA256)
- Real-time payment status updates

### ✅ Booking Management
- Date validation and price calculation
- Guest count management
- Booking history with payment status
- Cancel pending bookings

### ✅ Security
- Server-side signature verification
- No sensitive payment data stored
- Webhook signature validation
- Environment variable protection

## 📊 Payment Flow

```
User clicks "Book Now"
    ↓
Fills booking details (dates, guests)
    ↓
System calculates total price
    ↓
Clicks "Proceed to Payment"
    ↓
Backend creates Razorpay order
    ↓
Razorpay checkout opens (Card/UPI/Netbanking)
    ↓
User completes payment
    ↓
Backend verifies payment signature
    ↓
Booking status updated to "completed"
    ↓
User redirected to booking confirmation
```

## 🛠️ Troubleshooting

### Issue: "Invalid Key ID"
**Solution:** Double-check your `RAZORPAY_KEY_ID` in `.env` file. Make sure it starts with `rzp_test_` for test mode.

### Issue: "Signature verification failed"
**Solution:** Ensure your `RAZORPAY_KEY_SECRET` is correct and matches your Key ID.

### Issue: Webhook not receiving events
**Solution:** 
- Verify your webhook URL is publicly accessible
- Check webhook secret matches in `.env`
- Review webhook logs in Razorpay Dashboard

### Issue: Payment successful but booking not updating
**Solution:** 
- Check server logs for errors
- Verify database connection
- Ensure booking ID is being passed correctly

## 📱 Testing Workflow

1. **Create a booking:**
   - Login to your account
   - Browse listings
   - Click "Book Now" on any listing
   - Select dates and guest count
   - Proceed to payment

2. **Test successful payment:**
   - Use test card `4111 1111 1111 1111`
   - Complete payment
   - Verify booking appears in "My Bookings"
   - Check payment status is "COMPLETED"

3. **Test failed payment:**
   - Create another booking
   - Use test card `4000 0000 0000 0002`
   - Verify payment fails gracefully
   - Check booking status is "FAILED"

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/bookings/new/:id` | GET | Show booking form for listing |
| `/bookings` | GET | View all user bookings |
| `/bookings/:id` | GET | View specific booking details |
| `/bookings/create-order` | POST | Create Razorpay payment order |
| `/bookings/verify-payment` | POST | Verify payment signature |
| `/bookings/webhook` | POST | Razorpay webhook handler |
| `/bookings/:id` | DELETE | Cancel pending booking |

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive keys
2. **Use environment variables** - Don't hardcode API keys
3. **Verify signatures** - Always verify payment signatures on backend
4. **Use HTTPS** - Required for production webhooks
5. **Implement rate limiting** - Prevent abuse of payment endpoints
6. **Log everything** - Monitor payment events and errors

## 📚 Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Test Mode](https://razorpay.com/docs/payments/dashboard/test-mode/)
- [Payment Gateway Integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- [Webhook Guide](https://razorpay.com/docs/webhooks/)

## 🆘 Support

If you encounter issues:
1. Check Razorpay Dashboard logs
2. Review server console for errors
3. Verify all environment variables are set
4. Contact Razorpay support for payment-related issues

## 🎉 Next Steps

Once testing is complete:
1. Switch to **Live Mode** in Razorpay Dashboard
2. Generate Live API keys
3. Update `.env` with live keys
4. Submit KYC documents to Razorpay
5. Deploy to production with HTTPS

---

**Note:** Always test thoroughly in test mode before going live!
