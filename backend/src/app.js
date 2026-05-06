import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import dns from 'node:dns';

const app = express();

dns.setServers(["8.8.8.8", "8.8.4.4"]);


const apiRoutes = [
  '/api/health',
  '/api/auth',
  '/api/users',
  '/api/transactions',
  '/api/budgets',
  '/api/reports'
];

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      const defaultOrigins = [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5174',
        'http://localhost:5174'
      ];
      const envOrigins = (process.env.CLIENT_URL || '')
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);

      const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

      // Allow non-browser clients (curl/Postman) that don't send an Origin header.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    name: 'Expense Tracker API',
    status: 'ok',
    health: '/api/health',
    routes: apiRoutes
  });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
