import { useState } from 'react';

const initialState = {
  symbol: '',
  name: '',
  assetType: 'Stock',
  quantity: '',
  averageCost: '',
  currentPrice: '',
  sector: ''
};

export default function AddHoldingForm({ onCreate }) {
  const [form, setForm] = useState(initialState);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onCreate({
      ...form,
      quantity: Number(form.quantity),
      averageCost: Number(form.averageCost),
      currentPrice: Number(form.currentPrice)
    });
    setForm(initialState);
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Add Holding</h2>
        <span>Demo portfolio</span>
      </div>
      <form className="holding-form" onSubmit={handleSubmit}>
        <input name="symbol" placeholder="Symbol" value={form.symbol} onChange={updateField} required />
        <input name="name" placeholder="Company / Asset Name" value={form.name} onChange={updateField} required />
        <select name="assetType" value={form.assetType} onChange={updateField}>
          <option>Stock</option>
          <option>ETF</option>
          <option>Crypto</option>
          <option>Bond</option>
          <option>Mutual Fund</option>
          <option>Cash</option>
        </select>
        <input name="quantity" placeholder="Quantity" type="number" step="0.0001" value={form.quantity} onChange={updateField} required />
        <input name="averageCost" placeholder="Average Cost" type="number" step="0.01" value={form.averageCost} onChange={updateField} required />
        <input name="currentPrice" placeholder="Current Price" type="number" step="0.01" value={form.currentPrice} onChange={updateField} required />
        <input name="sector" placeholder="Sector" value={form.sector} onChange={updateField} />
        <button type="submit">Add Holding</button>
      </form>
    </section>
  );
}
