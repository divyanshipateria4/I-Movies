import express from 'express';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/seats', async (req, res, next) => {
  try {
    const { movieId, showtime, date } = req.query;
    if (!movieId || !showtime || !date) return res.status(400).json({ message: 'movieId, showtime and date are required.' });
    const bookings = await Booking.find({ movie: movieId, showtime, date }).select('seats -_id');
    res.json({ bookedSeats: bookings.flatMap(b => b.seats) });
  } catch (e) { next(e); }
});
router.post('/', protect, async (req, res, next) => {
  try {
    const { movieId, showtime, date, seats } = req.body;
    if (!movieId || !showtime || !date || !Array.isArray(seats) || seats.length < 1 || seats.length > 8) return res.status(400).json({ message: 'Choose between 1 and 8 seats.' });
    if (new Set(seats).size !== seats.length || seats.some(s => !/^[A-F][1-8]$/.test(s))) return res.status(400).json({ message: 'One or more seats are invalid.' });
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found.' });
    const conflicts = await Booking.findOne({ movie: movieId, showtime, date, seats: { $in: seats } });
    if (conflicts) return res.status(409).json({ message: 'One or more selected seats were just booked. Please choose again.' });
    const booking = await Booking.create({ user: req.user.id, movie: movieId, showtime, date, seats, total: seats.length * 220, bookingCode: 'IM' + Math.random().toString(36).slice(2, 8).toUpperCase() });
    await booking.populate('movie');
    res.status(201).json(booking);
  } catch (e) { next(e); }
});
router.get('/mine', protect, async (req, res, next) => {
  try { res.json(await Booking.find({ user: req.user.id }).populate('movie').sort({ createdAt: -1 })); }
  catch (e) { next(e); }
});
export default router;
