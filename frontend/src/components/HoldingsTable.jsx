function money(value = 0) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function HoldingsTable({ holdings }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Holdings</h2>
        <span>{holdings.length} assets</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Avg Cost</th>
              <th>Price</th>
              <th>Value</th>
              <th>Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding._id || holding.symbol}>
                <td className="ticker">{holding.symbol}</td>
                <td>{holding.name}</td>
                <td>{holding.assetType}</td>
                <td>{holding.quantity}</td>
                <td>{money(holding.averageCost)}</td>
                <td>{money(holding.currentPrice)}</td>
                <td>{money(holding.metrics?.currentValue)}</td>
                <td className={holding.metrics?.unrealizedGainLoss >= 0 ? 'positive' : 'negative'}>
                  {money(holding.metrics?.unrealizedGainLoss)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
