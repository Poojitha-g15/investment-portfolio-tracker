import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    type: {
      type: String,
      enum: ['BUY', 'SELL', 'DIVIDEND', 'DEPOSIT', 'WITHDRAWAL'],
      required: true
    },
    quantity: { type: Number, default: 0, min: 0 },
    price: { type: Number, default: 0, min: 0 },
    fees: { type: Number, default: 0, min: 0 },
    notes: { type: String, default: '' },
    tradeDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

transactionSchema.index({ userId: 1, symbol: 1, tradeDate: -1 });

export default mongoose.model('Transaction', transactionSchema);
