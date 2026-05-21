function formatCurrency(value = 0) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function SummaryCards({ totals }) {
  const gainClass = totals?.unrealizedGainLoss >= 0 ? 'positive' : 'negative';

  return (
    <section className="cards-grid">
      <div className="card">
        <span>Total Value</span>
        <strong>{formatCurrency(totals?.totalValue)}</strong>
      </div>
      <div className="card">
        <span>Cost Basis</span>
        <strong>{formatCurrency(totals?.totalCost)}</strong>
      </div>
      <div className="card">
        <span>Unrealized Gain/Loss</span>
        <strong className={gainClass}>{formatCurrency(totals?.unrealizedGainLoss)}</strong>
      </div>
      <div className="card">
        <span>Return</span>
        <strong className={gainClass}>{totals?.unrealizedGainLossPercent ?? 0}%</strong>
      </div>
    </section>
  );
}
