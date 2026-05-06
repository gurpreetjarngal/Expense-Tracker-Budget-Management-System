import mongoose from 'mongoose';
import { CATEGORIES } from '../config/constants.js';

const categoryBudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: CATEGORIES,
      required: true
    },
    limit: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}$/
    },
    monthlyLimit: {
      type: Number,
      required: true,
      min: 0
    },
    categories: [categoryBudgetSchema],
    notes: {
      type: String,
      trim: true,
      maxlength: 240,
      default: ''
    }
  },
  { timestamps: true }
);

budgetSchema.index({ user: 1, month: 1 }, { unique: true });

export default mongoose.model('Budget', budgetSchema);
