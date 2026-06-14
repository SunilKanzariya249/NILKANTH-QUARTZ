import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { getCategories, getDashboardStats } from './controllers/productController.js';
import protect from './middleware/auth.js';
import Product from './models/Product.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Gzip Compression
app.use(compression());

// Security Middlewares
// Customize Helmet content security policy to allow serving images locally
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nilkanthquartz.com",
    "https://www.nilkanthquartz.com",
    "https://nilkanth-quartz-frontend.onrender.com",
    "https://nilkanth-quartz-backend.onrender.com"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Serve local static uploads if they exist
const uploadsPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Direct mapping for requested endpoints
app.get('/api/categories', getCategories);
app.get('/api/dashboard/stats', protect, getDashboardStats);

// Base route indicator
app.get('/', (req, res) => {
  res.send('Nilkanth Quartz API Server is Running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler Captured:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Database and Server Start
const startServer = async () => {
  // Connect to DB
  await connectDB();


  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
