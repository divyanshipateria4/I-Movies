import 'dotenv/config';
import app from './app.js';
import { connectToDatabase } from './database.js';
const PORT = process.env.PORT || 5000;
connectToDatabase(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/imovies')
  .then(() => app.listen(PORT, () => console.log(`IMovies API running on http://localhost:${PORT}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
