# PWA Icon Generation Guide

The current icon files are SVG placeholders. For production, you should generate proper PNG icons.

## Quick Icon Generation

### Option 1: Using Online Tools (Easiest)
1. Visit [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
2. Upload a 512x512 PNG logo
3. Download the generated icons
4. Replace files in `/public/icons/`

### Option 2: Using a Design Tool
1. Create a 512x512px square logo in Figma/Photoshop/GIMP
2. Export the following sizes:
   - 72x72px
   - 96x96px
   - 128x128px
   - 144x144px
   - 152x152px
   - 192x192px
   - 384x384px
   - 512x512px
3. Save as PNG with transparency
4. Place in `/public/icons/`

### Option 3: Using ImageMagick (CLI)
```bash
# Install ImageMagick first
# Then run:
convert icon-512x512.png -resize 192x192 icon-192x192.png
convert icon-512x512.png -resize 96x96 icon-96x96.png
convert icon-512x512.png -resize 72x72 icon-72x72.png
# ... repeat for other sizes
```

## Required Sizes for Manifest

The manifest.json expects these icon files:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png (important for Android)
- icon-384x384.png
- icon-512x512.png (important for splash screens)

## Design Recommendations

### Colors
- Primary: #fe424d (WanderLust red)
- Background: White or transparent
- Text: White or dark gray

### Style
- Keep it simple and recognizable at small sizes
- Use the compass icon or "WL" initials
- Ensure good contrast
- Add padding/safe area around edges

### Testing
Test your icons at different sizes to ensure they look good on:
- Android home screens
- iOS home screens
- Browser install prompts
- Splash screens
- Notification badges

## Screenshot Files

For enhanced PWA install prompts, add screenshots:
1. Desktop screenshot: 1280x720px → `/public/screenshots/desktop.png`
2. Mobile screenshot: 640x1136px → `/public/screenshots/mobile.png`

These are optional but improve the install experience.

## Current Status
✅ SVG placeholders are in place
⚠️ Replace with proper PNG icons for production
✅ Manifest.json is configured and ready

The app will work with current SVG placeholders, but proper PNG icons will provide better quality across all devices.
