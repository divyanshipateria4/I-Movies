import mongoose from 'mongoose';
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: String,
  synopsis: String,
  poster: String,
  backdrop: String,
  genre: [String],
  rating: { type: Number, default: 8.0 },
  year: Number,
  duration: String,
  language: { type: String, default: 'English' },
  certificate: { type: String, default: 'UA 13+' },
  featured: { type: Boolean, default: false },
  accent: String
}, { timestamps: true });
export default mongoose.model('Movie', movieSchema);
