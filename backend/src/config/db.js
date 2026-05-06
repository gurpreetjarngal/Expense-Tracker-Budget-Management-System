import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

let connectionPromise = null;

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI. Create backend/.env (copy from backend/.env.example) and set MONGO_URI.');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    connectionPromise ||= mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    const conn = await connectionPromise;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
};
