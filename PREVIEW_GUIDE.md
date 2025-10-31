# 🚀 Quick Preview Guide - WanderLust

## Step-by-Step to Preview Your Site

### **Option 1: Use MongoDB Atlas (Recommended - 5 minutes)**

#### 1. Get FREE MongoDB Database
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a **FREE Cluster** (M0 tier)
4. Click **"Connect"** on your cluster
5. Choose **"Connect your application"**
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

#### 2. Update `.env` File
Open `C:\Users\armaa\Documents\GitHub\WanderLust\.env` and replace:
```env
ATLAS_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority
```

**Important:** Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual MongoDB credentials!

#### 3. Start the App
```powershell
# In WanderLust folder
node app.js
```

#### 4. Open in Browser
```
http://localhost:8080
```

**That's it!** 🎉

---

### **Option 2: Use My MongoDB (If You Already Have One)**

If you already have MongoDB Atlas account or credentials:

1. Open `.env` file
2. Update `ATLAS_URL` with your connection string
3. Run `node app.js`
4. Visit http://localhost:8080

---

### **Option 3: Quick Demo Without Database (Limited)**

If you just want to see the UI without data:

**This won't work** because the app needs a database to start. You MUST use Option 1 or 2.

---

## 🧪 **Testing the Offline Features**

Once the app is running:

### **Test 1: Browse Normally**
1. Visit http://localhost:8080
2. Browse listings
3. Click on individual listings
4. Check that maps work
5. Try filters and sorting

### **Test 2: Enable Offline Mode**
1. Press **F12** to open DevTools
2. Go to **Application** tab
3. Click **Service Workers** in left sidebar
4. Check the **"Offline"** checkbox
5. **Refresh the page** (F5)
6. You should see cached content! 🎉
7. Navigate between pages you previously visited
8. Try to visit a NEW page → Should show offline.html

### **Test 3: PWA Install**
1. While online, look for **⊕ Install** button in address bar
2. Click it to install as app
3. App opens in standalone window!

### **Test 4: Back Online**
1. Uncheck "Offline" in DevTools
2. Refresh page
3. You should see green "Back Online" banner
4. Fresh content loads again

---

## 📊 **What You'll See**

### **When It Works:**
- ✅ Homepage loads
- ✅ Listings page shows properties (if you have data)
- ✅ Maps load with Leaflet
- ✅ Filters and sorting work
- ✅ Service Worker registers (check Console)
- ✅ Can go offline and still browse

### **Expected Warnings (OK to ignore for testing):**
- ⚠️ "Razorpay credentials not found" - **Normal!** Payment is optional
- ⚠️ Cloudinary warnings - **Normal!** Images won't upload but will display

---

## 🐛 **Troubleshooting**

### **Error: "Cannot init client"**
→ Your `.env` file doesn't have valid MongoDB connection string
→ **Fix:** Follow Option 1 above to get MongoDB Atlas

### **Error: "Razorpay key_id is mandatory"**
→ **Fixed!** This shouldn't happen anymore. If it does, make sure you have the latest `controllers/booking.js`

### **Page shows but no listings**
→ Database is empty (normal for first time)
→ **Solution:** Create some test listings by clicking "Add New Listing"

### **Service Worker not registering**
→ Check browser console (F12 → Console)
→ Service Workers only work on `localhost` or `https://`
→ **Fix:** Make sure you're accessing via `http://localhost:8080` not just `localhost:8080`

### **Offline mode doesn't work**
→ You must visit pages **online first** to cache them
→ **Fix:** Browse 3-4 pages online, THEN test offline

---

## ⚡ **Quick Commands Reference**

```powershell
# Start the app
node app.js

# If you installed nodemon (auto-restart on changes)
npx nodemon app.js

# Check if running
# Open browser → http://localhost:8080

# Stop the app
# Press Ctrl+C in terminal
```

---

## 🎯 **Preview Checklist**

Before merging, verify:

- [ ] App starts without errors
- [ ] Homepage loads
- [ ] Can view listings
- [ ] Maps display correctly
- [ ] Filters work
- [ ] Sorting works
- [ ] Service Worker registers (check DevTools → Application → Service Workers)
- [ ] Offline mode works (test in DevTools)
- [ ] PWA install prompt appears
- [ ] No console errors

---

## 💡 **Pro Tips**

### **Test in Incognito Mode**
```
Ctrl+Shift+N (Chrome/Edge)
```
This ensures clean cache and fresh Service Worker install.

### **Force Refresh** (bypass Service Worker)
```
Ctrl+Shift+R
```
Useful when testing updates.

### **Check Cache**
1. F12 → Application → Cache Storage
2. See what's cached
3. Can manually delete caches here

### **View Service Worker Status**
```javascript
// In browser console
navigator.serviceWorker.getRegistration()
  .then(reg => console.log('SW Status:', reg));
```

---

## 🎨 **Making It Look Good**

### **Add Sample Data**
1. Start app
2. Sign up for an account
3. Click "Add New Listing"
4. Fill in details
5. Add images (will use URLs)
6. Submit
7. Now you have data to browse!

### **Use Sample Images**
Use these free image URLs for testing:
```
https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800
https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800
https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800
```

---

## 📱 **Test on Mobile**

1. Get your computer's IP:
```powershell
ipconfig
# Look for IPv4 Address
```

2. Update `app.js` to listen on all interfaces (if needed):
```javascript
app.listen(8080, '0.0.0.0', ()=>{
    console.log("server is listening on http://localhost:8080")
});
```

3. On your phone, visit:
```
http://YOUR_IP_ADDRESS:8080
```

4. Test PWA install on mobile!

---

## ✅ **You're Ready When...**

You can confidently merge when:
- ✅ App runs without crashes
- ✅ Basic features work (view listings, maps, filters)
- ✅ Service Worker appears in DevTools
- ✅ Offline mode works after browsing
- ✅ No critical console errors

**The offline features are working if you can browse previously-viewed pages while in offline mode!**

---

## 🎉 **Need Help?**

If you get stuck:

1. **Check `.env` file** - Most common issue
2. **Look at console errors** - Press F12
3. **Verify MongoDB connection** - Is ATLAS_URL correct?
4. **See terminal output** - Any error messages?
5. **Review OFFLINE_QUICK_REF.md** - More troubleshooting tips

**You've got this!** 🚀

Once you see the site working and can test offline mode, you're 100% ready to merge!
