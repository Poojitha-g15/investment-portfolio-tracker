export function calculateHoldingMetrics(holding) {
  const investedValue = Number((holding.quantity * holding.averageCost).toFixed(2));
  const currentValue = Number((holding.quantity * holding.currentPrice).toFixed(2));
  const unrealizedGainLoss = Number((currentValue - investedValue).toFixed(2));
  const unrealizedGainLossPercent = investedValue === 0
    ? 0
    : Number(((unrealizedGainLoss / investedValue) * 100).toFixed(2));

  return {
    investedValue,
    currentValue,
    unrealizedGainLoss,
    unrealizedGainLossPercent
  };
}

export function buildAllocation(holdings) {
  const totalValue = holdings.reduce((sum, holding) => {
    return sum + holding.quantity * holding.currentPrice;
  }, 0);

  const groups = holdings.reduce((acc, holding) => {
    const key = holding.assetType || 'Uncategorized';
    const value = holding.quantity * holding.currentPrice;
    acc[key] = (acc[key] || 0) + value;
    return acc;
  }, {});

  return Object.entries(groups).map(([assetType, value]) => ({
    assetType,
    value: Number(value.toFixed(2)),
    percentage: totalValue === 0 ? 0 : Number(((value / totalValue) * 100).toFixed(2))
  }));
}
