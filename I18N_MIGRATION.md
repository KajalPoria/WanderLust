# i18n Migration Guide

## Problem
Listing titles and descriptions are not showing translations on the deployed website because the production database doesn't have the `title_i18n` and `description_i18n` fields.

## Solution

### Quick Fix (Recommended for Production)

After deploying this update, visit this URL **once** to migrate the database:

```
https://your-production-url.onrender.com/admin/migrate-i18n
```

You should see a JSON response like:
```json
{
  "success": true,
  "message": "Migration complete! Updated 30 listing(s), skipped 0.",
  "updated": 30,
  "skipped": 0,
  "total": 30
}
```

This will add the missing i18n fields to all existing listings.

### Alternative: Run via Render Shell

1. Go to Render Dashboard → Your service
2. Open the **Shell** tab
3. Run:
```bash
node scripts/migrate-i18n.js
```

### Alternative: Run Locally Against Production DB

1. Temporarily update your `.env`:
```bash
ATLAS_URL=mongodb+srv://your-production-connection-string
```

2. Run:
```bash
node scripts/migrate-i18n.js
```

3. Restore your `.env` back to local MongoDB.

## After Migration

Once the migration is complete:
- All existing listings will have `title_i18n` and `description_i18n` fields
- Titles and descriptions will show in the user's selected language (Hindi, French, Spanish, English)
- The language switcher in the navbar will work correctly for listing content

## Security Note

The `/admin/migrate-i18n` endpoint should be removed or protected after use. Consider:
- Commenting out the route in `app.js` after migration
- Adding authentication middleware to protect the route
- Deleting `routes/admin.js` after successful migration

## Files Modified
- `routes/admin.js` - New migration endpoint
- `app.js` - Added admin route
- This README for documentation
