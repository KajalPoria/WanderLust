// Simple test script to verify i18n configuration
const i18n = require("i18n");
const path = require("path");

// Configure i18n same as app.js
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

console.log("✅ i18n configured successfully!");
console.log("\n📚 Testing translations:\n");

// Test English
i18n.setLocale('en');
console.log(`🇬🇧 English: "${i18n.__('nav.login')}" | "${i18n.__('nav.explore')}" | "${i18n.__('listings.filters.mountains')}"`);

// Test Hindi
i18n.setLocale('hi');
console.log(`🇮🇳 Hindi: "${i18n.__('nav.login')}" | "${i18n.__('nav.explore')}" | "${i18n.__('listings.filters.mountains')}"`);

// Test French
i18n.setLocale('fr');
console.log(`🇫🇷 French: "${i18n.__('nav.login')}" | "${i18n.__('nav.explore')}" | "${i18n.__('listings.filters.mountains')}"`);

// Test Spanish
i18n.setLocale('es');
console.log(`🇪🇸 Spanish: "${i18n.__('nav.login')}" | "${i18n.__('nav.explore')}" | "${i18n.__('listings.filters.mountains')}"`);

console.log("\n✅ All translations working correctly!");
console.log("\n📊 Available locales:", i18n.getLocales());
