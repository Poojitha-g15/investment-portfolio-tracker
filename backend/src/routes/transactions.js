import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { symbol, type } = req.query;
  const query = { userId: req.user.id };

  if (symbol) query.symbol = symbol.toUpperCase();
  if (type) query.type = type.toUpperCase();

  const transactions = await Transaction.find(query).sort({ tradeDate: -1 });
  res.json(transactions);
});

router.post('/', async (req, res) => {
  const transaction = await Transaction.create({ ...req.body, userId: req.user.id });
  res.status(201).json(transaction);
});

export default router;
