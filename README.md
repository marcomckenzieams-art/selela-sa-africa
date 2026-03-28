# Selela SA Africa (Pty) Ltd — Website

Industrial & Corporate Services Platform. Built with React + Vite, hosted on Vercel.

## Setup & Deploy

### 1. Push to GitHub

```bash
cd selela-project
git init
git add .
git commit -m "Initial commit - Selela SA Africa website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/selela-sa-africa.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `selela-sa-africa` repository
4. Settings will auto-detect — just click **Deploy**
5. Done! Your site is live.

### 3. Set Admin Password (optional)

In Vercel dashboard → your project → **Settings** → **Environment Variables**:
- Add `ADMIN_PASSWORD` = your desired password (default: `selelasaafrica101!`)

## Local Development

```bash
npm install
npm run dev     # Frontend on http://localhost:3000
```

## Project Structure

```
selela-project/
├── api/                    # Vercel Serverless Functions (backend)
│   ├── _db.js             # Shared database helper
│   ├── bookings.js        # POST /api/bookings
│   ├── contacts.js        # POST /api/contacts
│   ├── associates.js      # POST /api/associates
│   └── admin/
│       └── [...slug].js   # All admin routes (login, get, delete, patch)
├── src/
│   ├── main.jsx           # React entry point
│   └── App.jsx            # Full website (all pages, components, images)
├── public/
│   └── logo.png           # Favicon
├── index.html
├── package.json
├── vite.config.js
├── vercel.json            # Vercel routing config
└── .gitignore
```

## API Endpoints

### Public
- `POST /api/bookings` — Submit consultation booking
- `POST /api/contacts` — Submit contact inquiry
- `POST /api/associates` — Submit associate application

### Admin (requires Authorization header)
- `POST /api/admin/login` — Login
- `GET /api/admin/bookings` — All bookings
- `GET /api/admin/contacts` — All inquiries
- `GET /api/admin/associates` — All applications
- `DELETE /api/admin/:type/:id` — Delete entry
- `PATCH /api/admin/:type/:id` — Update status

## Important Note on Data Storage

The serverless functions use `/tmp` file storage which resets periodically on Vercel.
For production with persistent data, upgrade to:
- **Vercel KV** (Redis) — easiest, built into Vercel
- **Supabase** — free PostgreSQL
- **PlanetScale** — free MySQL

For a small business starting out, the current setup works fine for receiving
inquiries — just check the admin dashboard regularly.
