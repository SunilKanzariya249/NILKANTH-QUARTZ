import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be positive']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    index: true
  },
  colors: {
    type: String,
    required: [true, 'Available colors are required'],
    trim: true
  },
  modelNo: {
    type: String,
    required: [true, 'Model number is required'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    trim: true
  },
  pkg: {
    type: String,
    required: [true, 'Packaging is required'],
    trim: true
  },
  moq: {
    type: Number,
    required: [true, 'Minimum Order Quantity is required'],
    min: [1, 'MOQ must be at least 1']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  images: {
    type: [String],
    validate: {
      validator: function(val) {
        return val.length <= 5;
      },
      message: 'Product can have a maximum of 5 images'
    },
    default: []
  },
  video: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

// Middleware to auto-generate slug before saving if changed/new
productSchema.pre('validate', function(next) {
  if (this.modelNo && (!this.slug || this.isModified('modelNo'))) {
    this.slug = this.modelNo
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
