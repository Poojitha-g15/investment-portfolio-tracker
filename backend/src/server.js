import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDatabase } from './config/db.js';
import { attachDemoUser } from './middleware/demoUser.js';
import holdingsRouter from './routes/holdings.js';
import portfolioRouter from './routes/portfolio.js';
import transactionsRouter from './routes/transactions.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(attachDemoUser);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Investment Portfolio Tracker API' });
});

app.use('/api/holdings', holdingsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/portfolio', portfolioRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
});

await connectDatabase();

app.listen(port, () => {
  console.log(`Portfolio API running on port ${port}`);
});
