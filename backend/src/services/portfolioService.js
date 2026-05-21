import Holding from '../models/Holding.js';
import Transaction from '../models/Transaction.js';
import { buildAllocation, calculateHoldingMetrics } from '../utils/portfolioMath.js';

export async function getPortfolioSummary(userId) {
  const holdings = await Holding.find({ userId }).sort({ symbol: 1 });
  const transactions = await Transaction.find({ userId }).sort({ tradeDate: -1 }).limit(10);

  const enrichedHoldings = holdings.map((holding) => {
    const plain = holding.toObject();
    return {
      ...plain,
      metrics: calculateHoldingMetrics(plain)
    };
  });

  const totals = enrichedHoldings.reduce(
    (acc, holding) => {
      acc.totalCost += holding.metrics.investedValue;
      acc.totalValue += holding.metrics.currentValue;
      acc.unrealizedGainLoss += holding.metrics.unrealizedGainLoss;
      return acc;
    },
    { totalCost: 0, totalValue: 0, unrealizedGainLoss: 0 }
  );

  totals.totalCost = Number(totals.totalCost.toFixed(2));
  totals.totalValue = Number(totals.totalValue.toFixed(2));
  totals.unrealizedGainLoss = Number(totals.unrealizedGainLoss.toFixed(2));
  totals.unrealizedGainLossPercent = totals.totalCost === 0
    ? 0
    : Number(((totals.unrealizedGainLoss / totals.totalCost) * 100).toFixed(2));

  return {
    totals,
    holdings: enrichedHoldings,
    recentTransactions: transactions,
    allocation: buildAllocation(enrichedHoldings)
  };
}
