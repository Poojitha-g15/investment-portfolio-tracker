import express from 'express';
import Holding from '../models/Holding.js';
import { calculateHoldingMetrics } from '../utils/portfolioMath.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { search = '', assetType } = req.query;
  const query = { userId: req.user.id };

  if (search) {
    query.$or = [
      { symbol: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } }
    ];
  }

  if (assetType) {
    query.assetType = assetType;
  }

  const holdings = await Holding.find(query).sort({ symbol: 1 });
  res.json(
    holdings.map((holding) => {
      const plain = holding.toObject();
      return { ...plain, metrics: calculateHoldingMetrics(plain) };
    })
  );
});

router.post('/', async (req, res) => {
  const holding = await Holding.create({ ...req.body, userId: req.user.id });
  res.status(201).json(holding);
});

router.put('/:id', async (req, res) => {
  const holding = await Holding.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!holding) {
    return res.status(404).json({ message: 'Holding not found' });
  }

  res.json(holding);
});

router.delete('/:id', async (req, res) => {
  const holding = await Holding.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

  if (!holding) {
    return res.status(404).json({ message: 'Holding not found' });
  }

  res.status(204).send();
});

export default router;
