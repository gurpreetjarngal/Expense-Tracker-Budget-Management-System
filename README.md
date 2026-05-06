# FinTrack Expense Tracker and Budget Management System

A production-ready MERN expense tracker with JWT authentication, transaction management, monthly budgets, category alerts, chart analytics, PDF/Excel exports, and a modern responsive finance dashboard.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, React Router, React Hook Form, Yup, Axios, Tailwind CSS, Recharts, Framer Motion, Lucide icons
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Joi, Helmet, rate limiting
- Exports: PDFKit and XLSX

## Project Structure

```text
backend/
  src/config         MongoDB and constants
  src/controllers    Auth, users, transactions, budgets, reports
  src/middleware     Auth, validation, async, error handling
  src/models         User, Transaction, Budget
  src/routes         REST API routes
  src/validators     Joi schemas
frontend/
  src/components     Layout, charts, tables, forms, shared UI
  src/pages          Dashboard, transactions, budgets, reports, auth
  src/redux          Toolkit store and slices
  src/services       Axios API client
  src/utils          Constants and formatting helpers
```

## Setup

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Create environment files:

```bash
npm run setup
```

3. Update `backend/.env` with your MongoDB URI and a long `JWT_SECRET`.

4. Start MongoDB locally or use MongoDB Atlas.

If you have Docker installed, you can start a local MongoDB with:

```bash
npm run db:up
```

5. Seed demo data:

```bash
npm run seed --prefix backend
```

Demo login:

```text
demo@fintrack.com
password123
```

6. Run the full stack:

```bash
npm run dev
```

Frontend runs at `http://127.0.0.1:5173` and the API runs at `http://127.0.0.1:5000`.

## API Overview

Use `Authorization: Bearer <token>` for protected routes.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/users/profile`
- `GET /api/transactions?search=&type=&category=&page=1&limit=10`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`
- `GET /api/transactions/export/pdf`
- `GET /api/transactions/export/xlsx`
- `GET /api/budgets?month=2026-04`
- `POST /api/budgets`
- `GET /api/budgets/history`
- `GET /api/reports/dashboard`

## Postman Testing Flow

1. Register or log in with `/api/auth/login`.
2. Copy the returned token.
3. Set a collection variable named `token`.
4. Add this header to protected requests:

```text
Authorization: Bearer {{token}}
```

5. Create transactions, save a budget, then call `/api/reports/dashboard` to verify charts and cards.

## Deployment

- Backend: deploy to Render, Railway, Fly.io, or a Node-capable VPS. Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and `NODE_ENV=production`.
- Backend health check: open `https://your-backend-domain.com/api/health`. Opening the backend root also returns API info.
- Frontend: deploy `frontend/dist` to Vercel, Netlify, or static hosting. Set `VITE_API_URL` to your deployed API URL including `/api`, for example `https://your-backend-domain.com/api`.
- If the frontend and backend are deployed on different domains, set backend `CLIENT_URL` to the deployed frontend origin, for example `https://your-frontend-domain.com`.
- MongoDB: use MongoDB Atlas in production.
- Security: use HTTPS, a strong JWT secret, production CORS origin, and avoid committing `.env` files.

## Notes

The dashboard is intentionally data-driven. Empty charts will populate after adding transactions and budgets. Budget alerts appear when monthly spending exceeds the saved monthly limit.
