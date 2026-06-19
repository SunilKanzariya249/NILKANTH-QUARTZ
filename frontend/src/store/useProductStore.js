import { create } from 'zustand';
import axios from 'axios';

export const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  relatedProducts: [],
  stats: null,
  
  // Cache of all products for background loading
  allProducts: [],
  allProductsFetched: false,

  // Pagination & Filtering state
  totalPages: 1,
  currentPage: 1,
  totalProductsCount: 0,
  
  filters: {
    search: '',
    category: '',
    sort: 'newest', // newest, price_asc, price_desc, name_asc, name_desc
    page: 1,
    limit: 1000
  },

  loading: false,
  actionLoading: false,
  error: null,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().fetchProducts();
  },

  resetFilters: () => {
    set({
      filters: {
        search: '',
        category: '',
        sort: 'newest',
        page: 1,
        limit: 1000
      }
    });
    get().fetchProducts();
  },

  fetchAllProducts: async () => {
    if (get().allProductsFetched && get().allProducts.length > 0) return;
    try {
      const response = await axios.get('/api/products', {
        params: { limit: 10000 }
      });
      const fetchedProducts = Array.isArray(response.data?.products) ? response.data.products : [];
      set({
        allProducts: fetchedProducts,
        allProductsFetched: true
      });
    } catch (err) {
      console.error('Error prefetching all products:', err.message);
    }
  },

  fetchProducts: async (customParams = null) => {
    set({ loading: true, error: null });
    try {
      // Ensure products are pre-fetched
      if (!get().allProductsFetched || get().allProducts.length === 0) {
        await get().fetchAllProducts();
      }

      const params = customParams || get().filters;
      let filtered = [...get().allProducts];

      // 1. Filter by category (case-insensitive)
      if (params.category) {
        const catLower = params.category.trim().toLowerCase();
        filtered = filtered.filter(p => {
          if (!p.category) return false;
          const pCatLower = p.category.trim().toLowerCase();
          
          if (catLower.includes('anchor') && pCatLower.includes('anchor')) return true;
          if ((catLower.includes('corporate') || catLower.includes('promotional')) && 
              (pCatLower.includes('corporate') || pCatLower.includes('promotional'))) return true;
          if (catLower.includes('designer') && pCatLower.includes('designer')) return true;
          if (catLower.includes('office') && pCatLower.includes('office')) return true;
          if (catLower.includes('antique') && pCatLower.includes('antique')) return true;
          if (catLower.includes('acrylic') && pCatLower.includes('acrylic')) return true;
          
          return pCatLower === catLower;
        });
      }

      // 2. Search query filter
      if (params.search) {
        const searchLower = params.search.trim().toLowerCase();
        filtered = filtered.filter(p => {
          const modelNoMatch = p.modelNo && p.modelNo.toLowerCase().includes(searchLower);
          const descMatch = p.description && p.description.toLowerCase().includes(searchLower);
          return modelNoMatch || descMatch;
        });
      }

      // 3. Sorting
      if (params.sort) {
        if (params.sort === 'newest') {
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (params.sort === 'price_asc') {
          filtered.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        } else if (params.sort === 'price_desc') {
          filtered.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        } else if (params.sort === 'name_asc') {
          filtered.sort((a, b) => (a.modelNo || '').localeCompare(b.modelNo || ''));
        } else if (params.sort === 'name_desc') {
          filtered.sort((a, b) => (b.modelNo || '').localeCompare(a.modelNo || ''));
        }
      }

      set({
        products: filtered,
        totalPages: 1,
        currentPage: 1,
        totalProductsCount: filtered.length,
        loading: false
      });
    } catch (err) {
      set({
        products: [],
        error: err.message || 'Error processing products',
        loading: false
      });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      if (!get().allProductsFetched || get().allProducts.length === 0) {
        await get().fetchAllProducts();
      }
      const featured = get().allProducts.filter(p => p.featured === true);
      set({ featuredProducts: featured, loading: false });
    } catch (err) {
      set({ featuredProducts: [], error: 'Error fetching featured products', loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axios.get('/api/categories');
      const rawCategories = Array.isArray(response.data) ? response.data : [];
      const uniqueCategories = [];
      const seen = new Set();
      for (const cat of rawCategories) {
        if (cat) {
          const lower = cat.trim().toLowerCase();
          if (!seen.has(lower)) {
            seen.add(lower);
            uniqueCategories.push(cat.trim());
          }
        }
      }
      set({ categories: uniqueCategories });
    } catch (err) {
      console.error('Error fetching categories:', err.message);
      set({ categories: [] });
    }
  },

  fetchProductBySlug: async (slug) => {
    set({ loading: true, error: null, currentProduct: null, relatedProducts: [] });
    try {
      const response = await axios.get(`/api/products/${slug}`);
      set({
        currentProduct: response.data?.product || null,
        relatedProducts: Array.isArray(response.data?.relatedProducts) ? response.data.relatedProducts : [],
        loading: false
      });
      return response.data?.product || null;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error fetching product details';
      set({ error: errMsg, loading: false, currentProduct: null, relatedProducts: [] });
      return null;
    }
  },

  createProduct: async (formData) => {
    set({ actionLoading: true, error: null, allProductsFetched: false });
    try {
      const response = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Refresh products & categories
      get().fetchProducts();
      get().fetchCategories();
      set({ actionLoading: false });
      return { success: true, product: response.data.product };
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error creating product';
      set({ error: errMsg, actionLoading: false });
      return { success: false, message: errMsg };
    }
  },

  updateProduct: async (id, formData) => {
    set({ actionLoading: true, error: null, allProductsFetched: false });
    try {
      const response = await axios.put(`/api/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Refresh products & categories
      get().fetchProducts();
      get().fetchCategories();
      set({ actionLoading: false });
      return { success: true, product: response.data.product };
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error updating product';
      set({ error: errMsg, actionLoading: false });
      return { success: false, message: errMsg };
    }
  },

  deleteProduct: async (id) => {
    set({ actionLoading: true, error: null, allProductsFetched: false });
    try {
      await axios.delete(`/api/products/${id}`);
      // Refresh products & categories
      get().fetchProducts();
      get().fetchCategories();
      set({ actionLoading: false });
      return true;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error deleting product';
      set({ error: errMsg, actionLoading: false });
      return false;
    }
  },

  fetchDashboardStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/dashboard/stats');
      set({ stats: response.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error fetching dashboard stats',
        loading: false
      });
    }
  }
}));
