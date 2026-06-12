import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => {
  // Read initial token and admin from localStorage
  const savedToken = localStorage.getItem('nilkanth_admin_token') || null;
  const savedAdmin = localStorage.getItem('nilkanth_admin_user') 
    ? JSON.parse(localStorage.getItem('nilkanth_admin_user')) 
    : null;

  // Set default auth header if token exists
  if (savedToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
  }

  return {
    token: savedToken,
    admin: savedAdmin,
    loading: false,
    error: null,

    login: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        const { token, admin } = response.data;

        // Cache token and details
        localStorage.setItem('nilkanth_admin_token', token);
        localStorage.setItem('nilkanth_admin_user', JSON.stringify(admin));

        // Set Axios defaults
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        set({ token, admin, loading: false });
        return true;
      } catch (err) {
        const errMsg = err.response?.data?.message || 'Login failed. Please check credentials.';
        set({ error: errMsg, loading: false });
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem('nilkanth_admin_token');
      localStorage.removeItem('nilkanth_admin_user');
      delete axios.defaults.headers.common['Authorization'];
      set({ token: null, admin: null, error: null });
    },

    clearError: () => set({ error: null })
  };
});
