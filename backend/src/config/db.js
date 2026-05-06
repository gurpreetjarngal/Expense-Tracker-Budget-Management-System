import mongoose from 'mongoose';

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Missing MONGO_URI. Create backend/.env (copy from backend/.env.example) and set MONGO_URI.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
