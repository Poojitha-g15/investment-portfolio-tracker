import mongoose from 'mongoose';

const holdingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    assetType: {
      type: String,
      enum: ['Stock', 'ETF', 'Crypto', 'Bond', 'Mutual Fund', 'Cash'],
      default: 'Stock'
    },
    quantity: { type: Number, required: true, min: 0 },
    averageCost: { type: Number, required: true, min: 0 },
    currentPrice: { type: Number, required: true, min: 0 },
    sector: { type: String, default: 'Uncategorized' }
  },
  { timestamps: true }
);

holdingSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export default mongoose.model('Holding', holdingSchema);
