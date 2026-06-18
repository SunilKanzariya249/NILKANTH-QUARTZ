import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import SEO from '../components/SEO';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError, token } = useAuthStore();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard immediately
  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
    return () => clearError();
  }, [token, navigate, clearError]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    const success = await login(email, password);
    if (success) {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen flex items-center justify-center relative p-6 select-none">
      <SEO 
        title="Admin Portal Login | Nilkanth Quartz" 
        description="Admin panel login page for managing Nilkanth Quartz wall clock products and category listings."
      />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] text-gray-500 hover:text-black font-bold uppercase tracking-[0.25em] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Website
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-none p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-3">
            <div className="bg-white p-2 rounded-none w-fit mx-auto border border-gray-100 shadow-sm">
              <img 
                src="/nilkanth-quartz-logo.png" 
                alt="Nilkanth Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-black">Admin Portal</h1>
            <p className="text-gray-400 text-[10px] tracking-[0.2em] font-semibold uppercase">Nilkanth Quartz Management Desk</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-none p-4 flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@nilkanthquartz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-none pl-11 pr-4 py-3.5 text-xs text-black placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red/10 focus:outline-none transition-all duration-200"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-none pl-11 pr-4 py-3.5 text-xs text-black placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red/10 focus:outline-none transition-all duration-200"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-[#EF3826] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold uppercase tracking-widest text-[11px] py-3.5 rounded-none shadow-md transition-all active:scale-[0.98] disabled:scale-100 duration-200"
            >
              {loading ? 'Authenticating...' : 'Sign In To Panel'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
