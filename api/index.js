import app from '../server/app.js';
import { connectToDatabase } from '../server/database.js';

export default async function handler(req, res) {
  // Normalize URL if rewritten by Vercel
  const matchedPath = req.headers['x-matched-path'] || req.headers['x-forwarded-uri'];
  if (matchedPath && matchedPath.startsWith('/api') && (req.url === '/api' || req.url === '/' || req.url === '/api/index.js')) {
    req.url = matchedPath;
  }

  // Connect to MongoDB if MONGO_URI is set
  if (process.env.MONGO_URI) {
    try {
      await connectToDatabase();
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      if (!req.url.includes('/health')) {
        return res.status(500).json({ message: 'Database connection failed.', error: error.message });
      }
    }
  }

  return app(req, res);
}
