# IMovies — Full-Stack MERN Movie Booking (Single-Service Vercel Deployment)

A cinematic, responsive movie discovery and ticket-booking app built with React + Vite, Express, MongoDB, and JWT authentication. The design features a midnight cinema palette, bold editorial typography, poster-led discovery, and an interactive seat picker.

## Features
- **Single-Service Architecture**: Deploy both frontend (Vite SPA) and entire backend API on Vercel as a single project.
- **Zero Extra Backend Services Needed**: No Render, Railway, or external Node hosting required.
- **Strictly 1 Serverless Function**: Consolidates all API routes (`/api/*`) into **1 single function** (`api/index.js`), staying well below Vercel Free / Hobby tier limit of 12 serverless functions.
- **Same-Origin API Routing**: Frontend queries `/api` directly on the same domain with no CORS hurdles or separate backend URLs.
- **Interactive Seat Picker**: Select up to 8 seats per booking with double-booking prevention.
- **Authentication**: JWT-based authentication with bcrypt-hashed passwords.
- **Booking History**: Track past bookings and view confirmation codes.
- **Responsive Design**: Optimized for desktop, tablet, and mobile screens.

## Requirements
- Node.js 18+
- MongoDB database (MongoDB Atlas recommended for cloud deployment)

## Quick Start (Local Development)

1. Create `.env` or set environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. (Optional) Seed demo movies to your database:
   ```bash
   npm run seed
   ```
4. Start both frontend and backend concurrently:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

## Deploy to Vercel (Single-Service)

This project is configured out of the box to deploy as a unified full-stack application on Vercel's Free / Hobby plan.

### Steps:
1. Push your code to GitHub / GitLab / Bitbucket.
2. In Vercel, click **Add New... → Project** and import the repository.
3. Keep the **Root Directory** as `./` (repository root).
4. Under **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection URI.
   - `JWT_SECRET`: A secure secret string for signing JWT tokens.
5. Click **Deploy**.

### How Vercel Deployment Works:
- **Build & Static Assets**: Vercel executes `npm run build` which compiles the Vite client into `client/dist`.
- **API Routing**: `vercel.json` rewrites all `/api/(.*)` requests to `api/index.js`.
- **Function Count**: There is only **1 serverless function** deployed, well below the Hobby tier ceiling of 12 functions.
- **SPA Fallback**: Any non-API route falls back to `/index.html` for client-side routing.

## API Overview
- `GET  /api/health` — API health check
- `GET  /api/movies` — List/search/filter movies
- `GET  /api/movies/:id` — Movie detail
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET  /api/auth/me` — Current user profile (JWT required)
- `GET  /api/bookings/seats?movieId=...&showtime=...&date=...` — Booked seats
- `POST /api/bookings` — Create seat booking (JWT required)
- `GET  /api/bookings/mine` — Current user's bookings (JWT required)
