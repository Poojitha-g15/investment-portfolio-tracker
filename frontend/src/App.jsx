import { useEffect, useMemo, useState } from 'react';
import AddHoldingForm from './components/AddHoldingForm.jsx';
import AllocationPanel from './components/AllocationPanel.jsx';
import HoldingsTable from './components/HoldingsTable.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import TransactionList from './components/TransactionList.jsx';
import { api } from './services/api.js';

const fallbackSummary = {
  totals: {
    totalValue: 124500,
    totalCost: 103200,
    unrealizedGainLoss: 21300,
    unrealizedGainLossPercent: 20.64
  },
  holdings: [
    {
      _id: 'demo-1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      assetType: 'Stock',
      quantity: 20,
      averageCost: 148,
      currentPrice: 190,
      metrics: { currentValue: 3800, unrealizedGainLoss: 840 }
    },
    {
      _id: 'demo-2',
      symbol: 'VOO',
      name: 'Vanguard S&P 500 ETF',
      assetType: 'ETF',
      quantity: 45,
      averageCost: 390,
      currentPrice: 475,
      metrics: { currentValue: 21375, unrealizedGainLoss: 3825 }
    }
  ],
  allocation: [
    { assetType: 'Stock', value: 3800, percentage: 15.09 },
    { assetType: 'ETF', value: 21375, percentage: 84.91 }
  ],
  recentTransactions: [
    { _id: 'tx-1', type: 'BUY', symbol: 'VOO', quantity: 3, price: 470, fees: 0, tradeDate: new Date().toISOString() }
  ]
};

export default function App() {
  const [summary, setSummary] = useState(fallbackSummary);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('Demo data shown until the backend is connected.');

  async function loadSummary() {
    try {
      setLoading(true);
      const data = await api.getSummary();
      setSummary(data);
      setNotice('Connected to backend API.');
    } catch (error) {
      setNotice('Using demo data. Start Docker services to connect the API.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  const filteredHoldings = useMemo(() => {
    if (!search) return summary.holdings || [];
    return (summary.holdings || []).filter((holding) => {
      const text = `${holding.symbol} ${holding.name} ${holding.assetType}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [summary.holdings, search]);

  async function handleCreateHolding(payload) {
    try {
      await api.createHolding(payload);
      await loadSummary();
    } catch (error) {
      setNotice(error.message);
    }
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <span className="eyebrow">Full Stack Portfolio Dashboard</span>
          <h1>Investment Portfolio Tracker</h1>
          <p>
            Track holdings, transactions, asset allocation, and account-level performance through a clean React dashboard and REST API backend.
          </p>
        </div>
        <div className="status-card">
          <strong>{loading ? 'Loading...' : 'API Status'}</strong>
          <span>{notice}</span>
        </div>
      </header>

      <SummaryCards totals={summary.totals || {}} />

      <div className="toolbar">
        <input
          placeholder="Search holdings by symbol, name, or type"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={loadSummary}>Refresh</button>
      </div>

      <section className="content-grid">
        <div className="main-column">
          <HoldingsTable holdings={filteredHoldings} />
          <AddHoldingForm onCreate={handleCreateHolding} />
        </div>
        <div className="side-column">
          <AllocationPanel allocation={summary.allocation || []} />
          <TransactionList transactions={summary.recentTransactions || []} />
        </div>
      </section>
    </main>
  );
}
