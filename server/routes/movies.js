import express from 'express';
import Movie from '../models/Movie.js';
const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    const { search, genre, featured } = req.query;
    const filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (genre && genre !== 'All') filter.genre = genre;
    if (featured === 'true') filter.featured = true;
    const movies = await Movie.find(filter).sort({ featured: -1, rating: -1 });
    res.json(movies);
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try { const movie = await Movie.findById(req.params.id); if (!movie) return res.status(404).json({ message: 'Movie not found.' }); res.json(movie); }
  catch (e) { next(e); }
});
export default router;
