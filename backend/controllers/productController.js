import Product from '../models/Product.js';
import { uploadToCloudinaryOrLocal, deleteFromCloudinaryOrLocal } from '../config/cloudinary.js';
import fs from 'fs';

// @desc    Get all products (with search, category filter, sort, pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { search, category, sort, page = 1, limit = 8 } = req.query;

    const query = {};

    // Search filter (name or description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Determine sorting
    let sortOption = { createdAt: -1 }; // Default: Newest first
    if (sort) {
      if (sort === 'price_asc') sortOption = { price: 1 };
      else if (sort === 'price_desc') sortOption = { price: -1 };
      else if (sort === 'name_asc') sortOption = { name: 1 };
      else if (sort === 'name_desc') sortOption = { name: -1 };
    }

    // Pagination calculations
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 8;
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const totalPages = Math.ceil(totalProducts / limitNum);

    res.status(200).json({
      products,
      totalPages,
      currentPage: pageNum,
      totalProducts
    });
  } catch (error) {
    console.error('Get Products Error:', error.message);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

// @desc    Get a single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch related products (same category, excluding current one)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);

    res.status(200).json({ product, relatedProducts });
  } catch (error) {
    console.error('Get Product By Slug Error:', error.message);
    res.status(500).json({ message: 'Error retrieving product details' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, featured } = req.body;

    if (!name || !price || !category || !description) {
      // Clean up uploaded files in temp_uploads if validation fails
      cleanupTempFiles(req.files);
      return res.status(400).json({ message: 'Name, price, category, and description are required' });
    }

    const imageUrls = [];
    let videoUrl = '';

    // Handle Image Uploads (Max 5)
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const url = await uploadToCloudinaryOrLocal(file);
        if (url) imageUrls.push(url);
      }
    }

    // Handle Video Upload (Max 1)
    if (req.files && req.files.video && req.files.video[0]) {
      const url = await uploadToCloudinaryOrLocal(req.files.video[0]);
      if (url) videoUrl = url;
    }

    const product = new Product({
      name,
      price: parseFloat(price),
      category,
      description,
      featured: featured === 'true' || featured === true,
      images: imageUrls,
      video: videoUrl
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    cleanupTempFiles(req.files);
    console.error('Create Product Error:', error.message);
    res.status(500).json({ message: error.message || 'Error creating product' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description, featured, existingImages, removeVideo } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      cleanupTempFiles(req.files);
      return res.status(404).json({ message: 'Product not found' });
    }

    // Parse existing images to keep
    let imagesToKeep = [];
    if (existingImages) {
      imagesToKeep = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
    }

    // Delete removed images from storage
    const imagesToDelete = product.images.filter(img => !imagesToKeep.includes(img));
    for (const imgUrl of imagesToDelete) {
      await deleteFromCloudinaryOrLocal(imgUrl);
    }

    const finalImageUrls = [...imagesToKeep];

    // Upload new images (ensure max 5 images total)
    if (req.files && req.files.images) {
      const remainingSlots = 5 - finalImageUrls.length;
      const filesToUpload = req.files.images.slice(0, remainingSlots);
      
      for (const file of filesToUpload) {
        const url = await uploadToCloudinaryOrLocal(file);
        if (url) finalImageUrls.push(url);
      }

      // Cleanup any unused images if they exceeded the slots limit
      if (req.files.images.length > remainingSlots) {
        const leftoverFiles = { images: req.files.images.slice(remainingSlots) };
        cleanupTempFiles(leftoverFiles);
      }
    }

    // Handle Video updates
    let finalVideoUrl = product.video;
    
    if (removeVideo === 'true' || removeVideo === true) {
      if (product.video) {
        await deleteFromCloudinaryOrLocal(product.video);
      }
      finalVideoUrl = '';
    }

    if (req.files && req.files.video && req.files.video[0]) {
      // Delete old video if it exists
      if (product.video) {
        await deleteFromCloudinaryOrLocal(product.video);
      }
      const url = await uploadToCloudinaryOrLocal(req.files.video[0]);
      if (url) finalVideoUrl = url;
    }

    // Update fields
    product.name = name || product.name;
    product.price = price ? parseFloat(price) : product.price;
    product.category = category || product.category;
    product.description = description || product.description;
    product.featured = featured !== undefined ? (featured === 'true' || featured === true) : product.featured;
    product.images = finalImageUrls;
    product.video = finalVideoUrl;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    cleanupTempFiles(req.files);
    console.error('Update Product Error:', error.message);
    res.status(500).json({ message: error.message || 'Error updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images from storage
    for (const imgUrl of product.images) {
      await deleteFromCloudinaryOrLocal(imgUrl);
    }

    // Delete video from storage
    if (product.video) {
      await deleteFromCloudinaryOrLocal(product.video);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error.message);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// @desc    Get all unique categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    console.error('Get Categories Error:', error.message);
    res.status(500).json({ message: 'Error retrieving categories' });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const categories = await Product.distinct('category');
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalProducts,
      totalCategories: categories.length,
      recentProducts
    });
  } catch (error) {
    console.error('Get Dashboard Stats Error:', error.message);
    res.status(500).json({ message: 'Error retrieving statistics' });
  }
};

// Helper: Clean up temporary files in case of errors/leftovers
const cleanupTempFiles = (files) => {
  if (!files) return;
  
  if (files.images) {
    files.images.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  }
  
  if (files.video && files.video[0]) {
    if (fs.existsSync(files.video[0].path)) {
      fs.unlinkSync(files.video[0].path);
    }
  }
};
