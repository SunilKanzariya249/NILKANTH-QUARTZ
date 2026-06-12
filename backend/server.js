import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { getCategories, getDashboardStats } from './controllers/productController.js';
import protect from './middleware/auth.js';
import Product from './models/Product.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Security Middlewares
// Customize Helmet content security policy to allow serving images locally
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

  // Dynamic seeding of dummy data if Product database is empty
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Product catalog is empty. Seeding dummy premium wall clocks...');
      
      const seedProducts = [
        {
          name: 'Imperial Mahogany Designer Clock',
          price: 1850,
          category: 'Designer Clocks',
          description: 'A luxurious wooden-finish wall clock with gold accents. Designed for modern living rooms and executive lounges, featuring silent sweep movement.',
          images: [
            'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: true
        },
        {
          name: 'Minimalist Office White Clock',
          price: 850,
          category: 'Office Clocks',
          description: 'Clean, lightweight, and highly visible white wall clock with bold black hands. Perfect for corporate offices, study desks, and class rooms.',
          images: [
            'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: true
        },
        {
          name: 'Classic Corporate Metal Quartz',
          price: 1200,
          category: 'Office Clocks',
          description: 'Industrial grade aluminum frame clock built for heavy usage. Durable glass cover with high precision time quartz crystal movement.',
          images: [
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: false
        },
        {
          name: 'Nilkanth Branded Promotional Clock',
          price: 450,
          category: 'Promotional Clocks',
          description: 'Budget-friendly customized wall clock. Perfect for retail brand promotions, corporate gifts, franchise giveaways, and wedding return gifts.',
          images: [
            'https://images.unsplash.com/photo-1561070791-26c113006238?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: false
        },
        {
          name: 'Aura Premium Acrylic Laser Clock',
          price: 2400,
          category: 'Acrylic Clocks',
          description: 'Laser-cut acrylic glass double-layered luxury clock. Modern abstract art style, adding premium decorative value to lobby walls and dining spaces.',
          images: [
            'https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: true
        },
        {
          name: 'Vintage Industrial Gear Clock',
          price: 3200,
          category: 'Gear Clocks',
          description: 'Stunning open skeleton wall clock with moving mechanical gear designs. Dark iron-grey body, bringing rustic loft styling and steampunk vibes.',
          images: [
            'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: true
        },
        {
          name: 'Sleek Sapphire Glass Pendulum',
          price: 2800,
          category: 'Designer Clocks',
          description: 'Premium modern pendulum wall clock. Sleek glass front with a brushed silver bob pendulum. Creates an elegant visual pulse in hallways.',
          images: [
            'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: false
        },
        {
          name: 'Nordic Wooden Craft Clock',
          price: 1650,
          category: 'Acrylic Clocks',
          description: 'Crafted from eco-friendly premium oak wood with geometric patterns. Simple, warm, and natural design perfect for Scandinavian interiors.',
          images: [
            'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop'
          ],
          video: '',
          featured: false
        }
      ];

      await Product.insertMany(seedProducts);
      console.log('Seeded 8 premium wall clocks successfully.');
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
