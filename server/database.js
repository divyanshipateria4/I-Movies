import mongoose from 'mongoose';

let connectionPromise;

export async function connectToDatabase(uri = process.env.MONGO_URI) {
  if (mongoose.connection.readyState === 1) return;
  if (!uri) throw new Error('MONGO_URI is not configured.');

  if (!connectionPromise || mongoose.connection.readyState === 0) {
    connectionPromise = mongoose.connect(uri).catch(error => {
      connectionPromise = undefined;
      throw error;
    });
  }

  await connectionPromise;
}