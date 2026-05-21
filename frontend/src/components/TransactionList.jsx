function money(value = 0) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function TransactionList({ transactions }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Recent Transactions</h2>
        <span>{transactions.length} shown</span>
      </div>
      <div className="transaction-list">
        {transactions.map((tx) => (
          <div className="transaction" key={tx._id || `${tx.symbol}-${tx.tradeDate}`}>
            <div>
              <strong>{tx.type} {tx.symbol}</strong>
              <span>{new Date(tx.tradeDate).toLocaleDateString()}</span>
            </div>
            <div>
              <strong>{tx.quantity} @ {money(tx.price)}</strong>
              <span>Fees: {money(tx.fees)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
