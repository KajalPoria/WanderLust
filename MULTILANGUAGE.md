# Multi-Language Support Implementation

## Overview
WanderLust now supports **4 languages**:
- 🇬🇧 English (en) - Default
- 🇮🇳 Hindi (hi) - हिन्दी
- 🇫🇷 French (fr) - Français
- 🇪🇸 Spanish (es) - Español

## Features Implemented

### 1. i18n Configuration
- Installed and configured `i18n` npm package
- Automatic locale detection from cookies and query parameters
- Persistent language preference across sessions
- Synchronized translation files

### 2. Language Selector
- Added language dropdown in navbar (visible on all pages)
- Real-time language switching
- Persistent language preference stored in session and cookies
- Elegant UI design matching the WanderLust theme

### 3. Translated Components
The following UI components have been translated:

#### Navigation
- Search bar placeholder
- Menu items (Explore, Login, Signup, Logout, etc.)
- Profile links (Bookings, Wishlist, Recommendations)

#### Listings
- Category filters (All, Trending, Mountains, Beach, etc.)
- Tax toggle text
- Listing cards and details
- Price labels

#### Authentication
- Login form
- Signup form
- Form labels and validation messages

#### Bookings & Wishlist
- Titles and headings
- Status labels
- Empty state messages
- Action buttons

#### Chatbot
- Assistant title
- Greeting message
- Placeholder text

## Translation Files Location
```
locales/
├── en.json (English)
├── hi.json (Hindi)
├── fr.json (French)
└── es.json (Spanish)
```

## How to Use

### For Users
1. Look for the language selector in the navbar (globe icon 🌐)
2. Select your preferred language from the dropdown
3. The entire website will switch to that language immediately
4. Your language preference is saved automatically

### For Developers

#### Adding New Translations
1. Open the relevant locale file in `locales/` directory
2. Add your translation key-value pair following the existing structure
3. Use the translation in your EJS template:

```ejs
<%= __('category.key') %>
```

#### Translation Key Structure
Translations are organized by category:
```json
{
  "nav": { ... },          // Navigation items
  "auth": { ... },         // Authentication forms
  "listings": { ... },     // Listing pages
  "bookings": { ... },     // Booking pages
  "wishlist": { ... },     // Wishlist page
  "chatbot": { ... },      // Chatbot interface
  "forms": { ... },        // Form labels
  "messages": { ... },     // Success/Error messages
  "errors": { ... },       // Error messages
  "footer": { ... }        // Footer content
}
```

#### Using Translations in Views
```ejs
<!-- Simple translation -->
<h1><%= __('auth.login') %></h1>

<!-- With HTML attributes -->
<input placeholder="<%= __('nav.search') %>">

<!-- In button text -->
<button><%= __('forms.submit') %></button>
```

#### Using Translations in Controllers
```javascript
// Flash messages
req.flash("success", req.__("messages.loginSuccess"));

// Error messages
throw new ExpressError(400, req.__("errors.unauthorized"));
```

## Technical Implementation

### app.js Configuration
```javascript
const i18n = require("i18n");

// Configure i18n
i18n.configure({
    locales: ['en', 'hi', 'fr', 'es'],
    defaultLocale: 'en',
    directory: path.join(__dirname, 'locales'),
    queryParameter: 'lang',
    cookie: 'lang',
    autoReload: true,
    syncFiles: true,
    updateFiles: false
});

// Initialize i18n middleware
app.use(i18n.init);

// Set language from session
app.use((req, res, next) => {
    if (req.session && req.session.locale) {
        req.setLocale(req.session.locale);
    }
    next();
});

// Make translation function available in views
app.use((req,res,next) => {
    res.locals.__ = res.__;
    res.locals.locale = req.getLocale();
    next();
});
```

### Language Switching Route
```javascript
app.get("/language/:lang", (req, res) => {
    const lang = req.params.lang;
    const supportedLocales = ['en', 'hi', 'fr', 'es'];
    
    if (supportedLocales.includes(lang)) {
        req.session.locale = lang;
        res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        req.setLocale(lang);
    }
    
    const redirectUrl = req.get('Referrer') || '/listings';
    res.redirect(redirectUrl);
});
```

## Adding a New Language

To add support for a new language:

1. **Create Translation File**
   ```bash
   cp locales/en.json locales/[lang-code].json
   ```

2. **Translate All Keys**
   - Open the new file
   - Translate all English values to the target language
   - Keep keys unchanged

3. **Update Configuration**
   ```javascript
   // In app.js
   i18n.configure({
       locales: ['en', 'hi', 'fr', 'es', 'new-lang'],
       // ... rest of config
   });
   ```

4. **Update Language Selector**
   ```html
   <!-- In views/includes/navbar.ejs -->
   <option value="new-lang">Language Name</option>
   ```

5. **Update Route Handler**
   ```javascript
   const supportedLocales = ['en', 'hi', 'fr', 'es', 'new-lang'];
   ```

## Best Practices

### 1. Consistent Naming
- Use dot notation for nested keys: `category.subcategory.key`
- Use camelCase for multi-word keys: `myBookings`, `viewDetails`

### 2. Context-Aware Translations
- Keep translations contextually appropriate
- Consider cultural nuances
- Maintain consistent terminology

### 3. Pluralization
Handle pluralization in templates:
```ejs
<%= booking.guests %> <%= __('bookings.guests') %><%= booking.guests > 1 ? 's' : '' %>
```

### 4. Date and Number Formatting
Use locale-aware formatting:
```javascript
// Numbers
number.toLocaleString("en-IN")

// Dates
new Date(date).toLocaleDateString('en-IN')
```

## Testing

Test the multi-language feature:

1. **Manual Testing**
   - Switch between all languages
   - Verify all UI elements are translated
   - Check for untranslated strings
   - Test language persistence

2. **Check Translation Keys**
   - Ensure all keys exist in all language files
   - Verify JSON syntax is valid
   - Check for typos in keys

3. **Browser Testing**
   - Test on different browsers
   - Clear cookies and test default language
   - Test language switching speed

## Troubleshooting

### Missing Translations
If you see translation keys instead of text:
1. Check if the key exists in the locale file
2. Verify the locale file has valid JSON syntax
3. Restart the server to reload translation files

### Language Not Persisting
1. Check if cookies are enabled
2. Verify session middleware is configured
3. Check browser console for errors

### Wrong Language Loading
1. Clear browser cookies
2. Check session storage
3. Verify the locale detection logic

## Future Enhancements

Potential improvements for the i18n system:

1. **More Languages**
   - German, Italian, Portuguese, Japanese, etc.

2. **RTL Support**
   - Add support for right-to-left languages (Arabic, Hebrew)

3. **Language-Specific Content**
   - Show region-specific listings
   - Currency conversion based on language

4. **Professional Translation**
   - Use professional translation services
   - Community-driven translations

5. **Translation Management**
   - Admin panel for managing translations
   - Automatic translation suggestions
   - Version control for translations

## Credits

- **i18n Package**: https://github.com/mashpie/i18n-node
- **Implementation**: WanderLust Development Team
- **Translations**: Community contributions welcome!

## Contributing

To contribute translations:
1. Fork the repository
2. Add/improve translations in locale files
3. Test thoroughly
4. Submit a pull request

---

**Note**: This implementation focuses on UI translation. Backend error messages and email notifications may need additional translation work.
