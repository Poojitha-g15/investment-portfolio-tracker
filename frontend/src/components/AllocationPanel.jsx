function money(value = 0) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function AllocationPanel({ allocation }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Allocation</h2>
        <span>By asset type</span>
      </div>
      <div className="allocation-list">
        {allocation.map((item) => (
          <div className="allocation-row" key={item.assetType}>
            <div>
              <strong>{item.assetType}</strong>
              <span>{money(item.value)}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${item.percentage}%` }} />
            </div>
            <span>{item.percentage}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
