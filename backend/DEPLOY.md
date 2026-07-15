# SmugFlex Backend - cPanel Deployment Guide

## Quick Deploy (5 minutes)

### Step 1: Prepare Database
1. Go to **phpMyAdmin** in cPanel
2. Select your database `mdpjhtua_NGO`
3. Click **Import** tab
4. Upload `database/schema.sql`
5. Click **Go**

### Step 2: Upload Backend Files
1. Open **File Manager** in cPanel
2. Navigate to `public_html/`
3. Upload ALL contents from the `backend/` folder:
   - `index.php` (root level, NOT from public/)
   - `.htaccess` (root level, NOT from public/)
   - `.env`
   - `app/` folder
   - `system/` folder
   - `writable/` folder

### Step 3: Set Database Password
1. Edit `.env` file in `public_html/`
2. Replace `CHANGE_ME` with your actual database password:
   ```
   database.password = your_actual_password
   ```

### Step 4: Set Folder Permissions
In File Manager, set these permissions:
- `writable/` → 755 (recursive)
- `writable/cache/` → 777
- `writable/logs/` → 777
- `writable/session/` → 777

### Step 5: Test API
Visit: `https://anns.com.gracelandroyalacademy.com.ng/api/v1/programs`

You should see a JSON response.

---

## File Structure on cPanel

```
public_html/
├── index.php          ← Root entry point
├── .htaccess          ← URL rewriting
├── .env               ← Database credentials
├── app/
│   ├── Config/
│   │   ├── App.php
│   │   ├── Database.php
│   │   ├── Routes.php
│   │   └── ...
│   ├── Controllers/
│   └── Libraries/
├── system/            ← CI4 system files
└── writable/
    ├── cache/
    ├── logs/
    └── session/
```

## Troubleshooting

### 500 Error
- Check `writable/logs/` is writable (777)
- Check PHP version is 8.2+ (Select PHP version in cPanel)

### CORS Errors
- The `.htaccess` already sets CORS headers
- If issues persist, add to `.htaccess`:
  ```
  Header set Access-Control-Allow-Origin "https://ngo-coral-pi.vercel.app"
  ```

### API Returns 404
- Ensure `mod_rewrite` is enabled
- Check `.htaccess` is in `public_html/` root

### Database Connection Error
- Verify password in `.env` matches cPanel database password
- Database host is `localhost` (not external)
