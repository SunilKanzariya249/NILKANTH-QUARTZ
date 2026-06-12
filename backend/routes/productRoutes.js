import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getDashboardStats
} from '../controllers/productController.js';
import protect from '../middleware/auth.js';
import { productUpload } from '../middleware/upload.js';

const router = express.Router();

// Public Routes
router.get('/', getProducts);
router.get('/categories', getCategories); // Also mapped to /api/categories in server.js
router.get('/:slug', getProductBySlug);

// Private Admin Routes
router.post('/', protect, productUpload, createProduct);
router.put('/:id', protect, productUpload, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/dashboard/stats', protect, getDashboardStats); // Mapped under /api/dashboard/stats in server.js

export default router;
