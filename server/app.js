import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import movieRoutes from './routes/movies.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(s => s.trim()) : true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'IMovies API' }));
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === 11000) return res.status(409).json({ message: 'This record already exists.' });
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

export default app;