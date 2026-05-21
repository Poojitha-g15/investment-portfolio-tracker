# Investment Portfolio Tracker

A full-stack portfolio tracking application for managing holdings, transactions, and asset-level summaries through secure REST APIs and responsive dashboards.

This project was built to demonstrate practical full-stack engineering skills with **React, Node.js, Express.js, MongoDB, REST APIs, authentication-ready architecture, and dashboard-driven financial data workflows**.

## Why this project

Many finance and wealth-management applications need clean portfolio data, transaction history, asset-level summaries, and user-specific dashboards. This project simulates that workflow with a recruiter-friendly architecture that is easy to run, review, and extend.

## Features

- Portfolio dashboard with total value, cost basis, gain/loss, and allocation summaries
- Holdings management with asset symbol, quantity, average cost, current price, and asset type
- Transaction tracking for buy, sell, dividend, deposit, and withdrawal events
- Asset-level summary calculations for current value, invested value, realized activity, and unrealized gain/loss
- Search and filtering for holdings and transaction history
- REST API layer built with Node.js and Express.js
- MongoDB data models for holdings, transactions, and user-scoped records
- Reusable service layer for portfolio calculations
- Responsive React dashboard for recruiter-friendly project review
- Docker Compose setup for frontend, backend, and MongoDB
- GitHub Actions CI workflow for basic install/build checks

## Tech Stack

**Frontend:** React, Vite, JavaScript, CSS

**Backend:** Node.js, Express.js, REST APIs, Mongoose

**Database:** MongoDB

**DevOps:** Docker, Docker Compose, GitHub Actions

## Project Structure

```text
investment-portfolio-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml
├── .env.example
├── docs/
└── README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Poojitha-g15/investment-portfolio-tracker.git
cd investment-portfolio-tracker
```

### 2. Create environment file

```bash
cp .env.example .env
```

### 3. Run with Docker

```bash
docker compose up --build
```

Open:

```text
Frontend: http://localhost:5173
Backend: http://localhost:8000/api/health
```

## Run without Docker

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/holdings` | List user holdings |
| POST | `/api/holdings` | Create a holding |
| PUT | `/api/holdings/:id` | Update a holding |
| DELETE | `/api/holdings/:id` | Delete a holding |
| GET | `/api/transactions` | List transactions |
| POST | `/api/transactions` | Create a transaction |
| GET | `/api/portfolio/summary` | Portfolio-level summary |
| GET | `/api/portfolio/allocation` | Asset allocation summary |

## Resume Bullets

- Built a full-stack web application to track portfolio holdings, transactions, and asset-level summaries through secure REST APIs and responsive dashboards.
- Developed backend services using Node.js and Express.js and modeled portfolio and transaction data in MongoDB to support filtering, search, and user-specific views.
- Built interactive React components for portfolio insights, transaction history, allocation summaries, and account-level analytics.
- Designed reusable service-layer calculations for total portfolio value, cost basis, unrealized gain/loss, allocation breakdowns, and transaction summaries.

## Future Improvements

- JWT authentication and role-based access control
- Real-time market price integration
- CSV transaction import
- Portfolio performance charts
- AWS deployment with ECS, S3, CloudFront, and MongoDB Atlas
- Unit and integration test expansion
