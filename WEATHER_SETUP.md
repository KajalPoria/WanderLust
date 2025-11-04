# Quick Setup Guide for Weather Integration

## Step 1: Get Your OpenWeather API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click "Sign Up" or "Sign In"
3. After logging in, go to "API Keys" section
4. Copy your API key (or generate a new one)

## Step 2: Add API Key to Your Project

1. Open your `.env` file in the project root
2. Add this line (replace with your actual API key):
   ```
   OPENWEATHER_API_KEY=your_actual_api_key_here
   ```
3. Save the file

## Step 3: Restart Your Application

```bash
# If using nodemon
nodemon app.js

# Or if using node
node app.js
```

## Step 4: Test the Integration

1. Open your browser and go to `http://localhost:8080`
2. Click on any listing to view its details
3. You should see a beautiful weather widget showing:
   - Current temperature
   - Weather description
   - Weather icon
   - Humidity, wind speed, and more!

## Example `.env` File

Your `.env` file should look something like this:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloud_key
CLOUDINARY_SECRET=your_cloud_secret
ATLAS_URL=your_mongodb_connection_string
SECRET=your_session_secret
RAZORPAY_KEY_ID=rzp_test_XXXXXXXX
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pq
```

## Troubleshooting

### Weather Widget Not Showing?

1. **Check Console**: Open browser DevTools (F12) and look for errors
2. **Verify API Key**: Make sure your API key is correct and active
3. **Check Listing Data**: Ensure the listing has location or coordinates
4. **Restart Server**: Stop and restart your Node.js server after adding the API key

### API Key Issues?

- **New keys take ~10 minutes to activate**: Wait a bit and try again
- **Free tier limit**: 1,000 calls per day (should be plenty for development)
- **Invalid key error**: Double-check you copied the entire key without spaces

### Still Not Working?

- Check the server console for error messages
- Ensure all dependencies are installed (`npm install`)
- Make sure you're viewing a listing detail page (not the listings index)

## Features You'll See

✅ Real-time weather for each destination  
✅ Beautiful gradient design  
✅ Dark mode compatible  
✅ Mobile responsive  
✅ Multi-language support (EN, ES, FR, HI)  
✅ Temperature, humidity, wind speed, cloudiness  
✅ Official OpenWeather icons  

## Need Help?

Check `WEATHER_INTEGRATION.md` for detailed technical documentation.
