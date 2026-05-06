import mongoose from 'mongoose';
import { CATEGORIES, TRANSACTION_TYPES } from '../config/constants.js';

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: TRANSACTION_TYPES,
      required: true
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    note: {
      type: String,
      trim: true,
      maxlength: 240,
      default: ''
    },
    merchant: {
      type: String,
      trim: true,
      maxlength: 120,
      default: ''
    }
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, category: 1, type: 1 });

export default mongoose.model('Transaction', transactionSchema);
