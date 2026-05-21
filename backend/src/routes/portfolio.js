import express from 'express';
import { getPortfolioSummary } from '../services/portfolioService.js';

const router = express.Router();

router.get('/summary', async (req, res) => {
  const summary = await getPortfolioSummary(req.user.id);
  res.json(summary);
});

router.get('/allocation', async (req, res) => {
  const summary = await getPortfolioSummary(req.user.id);
  res.json(summary.allocation);
});

export default router;
