// Quick test to verify i18n setup
const path = require('path');
const i18n = require('i18n');

i18n.configure({
    locales: ["en", "hi", "fr", "es"],
    defaultLocale: "en",
    directory: path.join(__dirname, "..", "locales"),
    objectNotation: true,
});

console.log('\n=== Testing i18n Configuration ===\n');

// Test English
i18n.setLocale('en');
console.log('English (en):');
console.log('  navbar.menu:', i18n.__('navbar.menu'));
console.log('  listings.index.filters.all:', i18n.__('listings.index.filters.all'));
console.log('  users.login.title:', i18n.__('users.login.title'));

// Test Hindi
i18n.setLocale('hi');
console.log('\nHindi (hi):');
console.log('  navbar.menu:', i18n.__('navbar.menu'));
console.log('  listings.index.filters.all:', i18n.__('listings.index.filters.all'));
console.log('  users.login.title:', i18n.__('users.login.title'));

// Test French
i18n.setLocale('fr');
console.log('\nFrench (fr):');
console.log('  navbar.menu:', i18n.__('navbar.menu'));
console.log('  listings.index.filters.all:', i18n.__('listings.index.filters.all'));
console.log('  users.login.title:', i18n.__('users.login.title'));

// Test Spanish
i18n.setLocale('es');
console.log('\nSpanish (es):');
console.log('  navbar.menu:', i18n.__('navbar.menu'));
console.log('  listings.index.filters.all:', i18n.__('listings.index.filters.all'));
console.log('  users.login.title:', i18n.__('users.login.title'));

console.log('\n=== Test Complete ===\n');
