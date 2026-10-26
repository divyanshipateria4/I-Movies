import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: String, required: true },
  date: { type: String, required: true },
  seats: [{ type: String, required: true }],
  total: { type: Number, required: true },
  bookingCode: { type: String, unique: true, required: true }
}, { timestamps: true });
bookingSchema.index({ movie: 1, showtime: 1, date: 1, seats: 1 });
export default mongoose.model('Booking', bookingSchema);
