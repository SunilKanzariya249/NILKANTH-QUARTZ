import { create } from 'zustand';
import axios from 'axios';

export const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  relatedProducts: [],
  stats: null,
  
  // Pagination & Filtering state
  totalPages: 1,
  currentPage: 1,
  totalProductsCount: 0,
  
  filters: {
    search: '',
    category: '',
    sort: 'newest', // newest, price_asc, price_desc, name_asc, name_desc
    page: 1,
    limit: 8
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
        limit: 8
      }
    });
    get().fetchProducts();
  },

  fetchProducts: async (customParams = null) => {
    set({ loading: true, error: null });
    try {
      const params = customParams || get().filters;
      
      const response = await axios.get('/api/products', {
        params
      });

      set({
        products: Array.isArray(response.data?.products) ? response.data.products : [],
        totalPages: response.data?.totalPages || 1,
        currentPage: response.data?.currentPage || 1,
        totalProductsCount: response.data?.totalProducts || 0,
        loading: false
      });
    } catch (err) {
      set({
        products: [],
        error: err.response?.data?.message || 'Error fetching products',
        loading: false
      });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Fetch products with featured query or limit
      const response = await axios.get('/api/products', {
        params: { limit: 100 } // Get all to filter or let server handle
      });
      const prods = Array.isArray(response.data?.products) ? response.data.products : [];
      const featured = prods.filter(p => p.featured === true);
      set({ featuredProducts: featured, loading: false });
    } catch (err) {
      set({ featuredProducts: [], error: 'Error fetching featured products', loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axios.get('/api/categories');
      set({ categories: Array.isArray(response.data) ? response.data : [] });
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
    set({ actionLoading: true, error: null });
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
    set({ actionLoading: true, error: null });
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
    set({ actionLoading: true, error: null });
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
