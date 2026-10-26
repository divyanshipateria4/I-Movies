# IMovies — MERN Movie Booking

A cinematic, responsive movie discovery and ticket-booking app built with React + Vite, Express, MongoDB, and JWT authentication. The design uses a midnight cinema palette, bold editorial typography, poster-led discovery, and an interactive seat picker.

## Features
- Browse/search/filter a seeded movie catalog with genre and rating details
- Movie details, showtime selection, and interactive seat selection
- Register/login with hashed passwords and JWT-protected bookings
- Prevents double-booking seats for a showtime
- Booking history and booking confirmation view
- MongoDB persistence; demo movie catalog is included as seed data
- Responsive layout for desktop, tablet, and mobile

## Requirements
Node.js 18+ and MongoDB (local or Atlas).

## Quick start
1. Create `server/.env` from `server/.env.example` and set `MONGO_URI` and `JWT_SECRET`.
2. From this folder run:
   ```bash
   npm install
   npm run install:all
   npm run dev
   ```
3. Frontend: `http://localhost:5173` — API: `http://localhost:5000/api`
4. Seed demo movies: in another terminal, run `npm run seed --prefix server`.

The frontend has a demo-friendly empty-state if the API/database is not connected, but booking/auth require the backend and MongoDB.

## Deploy to Vercel
This repository is configured to deploy the Vite frontend and Express API together as one Vercel project.

1. Import the repository into Vercel and leave the project root set to the repository root.
2. In **Project Settings → Environment Variables**, add:
   - `MONGO_URI` — your MongoDB Atlas connection string.
   - `JWT_SECRET` — a long, random secret used to sign login tokens.
   - `CLIENT_URL` — optional; set this to your Vercel origin if you want to restrict API CORS. Leave unset for the same-origin deployment.
3. Deploy. The Vercel configuration installs the client and server dependencies, builds `client`, serves the frontend, and routes `/api/*` to the Express serverless function.

The frontend uses `/api` by default, so `VITE_API_URL` is not required for a same-domain deployment. For local development, Vite proxies `/api` to the Express server on port 5000. Node.js 18+ is required.

Before deploying, make sure the MongoDB Atlas database user has access to the database and that Atlas network access permits connections from your Vercel deployment. Run `npm run seed --prefix server` once if you want to add the demo movie catalog.

## API overview
- `GET /api/movies` — list/search/filter movies
- `GET /api/movies/:id` — movie detail
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `GET /api/auth/me` — current user (JWT)
- `GET /api/bookings/seats?movieId=...&showtime=...` — booked seats
- `POST /api/bookings` — create booking (JWT)
- `GET /api/bookings/mine` — user's bookings (JWT)

## Notes
This is a learning project. For production, add payment-provider integration, email confirmations, rate limiting, refresh-token/session strategy, monitoring, and stronger booking transaction guarantees using MongoDB replica-set transactions.
