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
    <div className="bg-brand-dark min-h-screen flex items-center justify-center relative p-6">
      <SEO 
        title="Admin Portal Login | Nilkanth Quartz" 
        description="Admin panel login page for managing Nilkanth Quartz wall clock products and category listings."
      />

      {/* Decorative gradient glowing spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-red/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] text-[#AAAAAA] hover:text-white font-bold uppercase tracking-[0.25em] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Website
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-[#111111] border border-white/10 rounded-none p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="bg-white p-2.5 rounded-none w-fit mx-auto">
              <img 
                src="/nilkanth-quartz-logo.png" 
                alt="Nilkanth Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Admin Portal</h1>
            <p className="text-[#AAAAAA] text-[10px] tracking-[0.2em] font-semibold uppercase">Nilkanth Quartz Management Desk</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-none p-4 flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#AAAAAA] mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@nilkanthquartz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-none pl-11 pr-4 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/[0.08] focus:outline-none transition-all duration-200"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#AAAAAA]">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-none pl-11 pr-4 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/[0.08] focus:outline-none transition-all duration-200"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red/90 disabled:bg-gray-800 text-white font-bold uppercase tracking-widest text-[15px] py-4.5 rounded-none shadow-lg transition-all active:scale-[0.98] disabled:scale-100 duration-200"
            >
              {loading ? 'Authenticating...' : 'Sign In To Panel'}
            </button>
          </form>

          {/* Setup seed reminder */}
          <div className="text-center pt-2">
            <span className="text-[10px] text-gray-600 block uppercase tracking-wider">
              Default Seeding: admin@nilkanthquartz.com / NilkanthAdmin2026!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
