import mongoose from 'mongoose';

const escapeRegex = (string) => {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const generateBaseSlug = (text) => {
  if (!text) return 'product';
  const base = text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return base || 'product';
};

const productSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
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
    unique: false,
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

// Middleware to auto-generate unique incremental slug before saving if changed/new
productSchema.pre('validate', async function(next) {
  try {
    if (!this.modelNo) {
      return next();
    }

    const baseSlug = generateBaseSlug(this.modelNo);

    // If slug is already set and modelNo was not modified, keep existing slug
    if (this.slug && !this.isModified('modelNo')) {
      return next();
    }

    const ProductModel = this.constructor;

    // Find all products whose slug starts with baseSlug (e.g. 999, 999-1, 999-2)
    const slugRegex = new RegExp(`^${escapeRegex(baseSlug)}(-[0-9]+)?$`);
    const query = { slug: slugRegex };
    if (this._id) {
      query._id = { $ne: this._id };
    }

    const existingDocs = await ProductModel.find(query, 'slug').lean();
    const existingSlugs = new Set(existingDocs.map(d => d.slug));

    // If current slug is already valid for this baseSlug and unique, keep it
    if (this.slug && slugRegex.test(this.slug) && !existingSlugs.has(this.slug)) {
      return next();
    }

    // Otherwise, assign baseSlug if free, or incremental baseSlug-1, baseSlug-2, etc.
    if (!existingSlugs.has(baseSlug)) {
      this.slug = baseSlug;
    } else {
      let count = 1;
      while (existingSlugs.has(`${baseSlug}-${count}`)) {
        count++;
      }
      this.slug = `${baseSlug}-${count}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
