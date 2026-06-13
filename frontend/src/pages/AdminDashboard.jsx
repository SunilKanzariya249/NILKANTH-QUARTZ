import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  TrendingUp, 
  Tag, 
  Clock, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  Upload, 
  CheckCircle, 
  Video,
  FileVideo,
  Image as ImageIcon
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useProductStore } from '../store/useProductStore';
import confetti from 'canvas-confetti';
import SEO from '../components/SEO';

const AdminDashboard = () => {
  const { logout, admin } = useAuthStore();
  const { 
    products, 
    stats, 
    loading, 
    actionLoading, 
    error,
    fetchProducts, 
    fetchDashboardStats, 
    createProduct, 
    updateProduct, 
    deleteProduct 
  } = useProductStore();

  const navigate = useNavigate();

  // Modal and CRUD States
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // If null, we are in ADD mode
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Form Fields State
  const [colors, setColors] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [modelNo, setModelNo] = useState('');
  const [size, setSize] = useState('');
  const [pkg, setPkg] = useState('');
  const [moq, setMoq] = useState('');
  
  // File upload state
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newVideoFile, setNewVideoFile] = useState(null);
  
  // Edit mode existing files state
  const [existingImagesToKeep, setExistingImagesToKeep] = useState([]);
  const [existingVideo, setExistingVideo] = useState('');
  const [removeExistingVideo, setRemoveExistingVideo] = useState(false);

  // Form Validation warning state
  const [formValidationWarning, setFormValidationWarning] = useState('');

  useEffect(() => {
    fetchProducts({ limit: 1000 });
    fetchDashboardStats();
  }, [fetchProducts, fetchDashboardStats]);

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Open Add modal
  const handleOpenAddModal = () => {
    setEditProduct(null);
    setColors('');
    setPrice('');
    setCategory('');
    setDescription('');
    setFeatured(false);
    setModelNo('');
    setSize('');
    setPkg('');
    setMoq('');
    setNewImageFiles([]);
    setNewVideoFile(null);
    setExistingImagesToKeep([]);
    setExistingVideo('');
    setRemoveExistingVideo(false);
    setFormValidationWarning('');
    setModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEditModal = (prod) => {
    setEditProduct(prod);
    setColors(prod.colors || '');
    setPrice(prod.price);
    setCategory(prod.category);
    setDescription(prod.description);
    setFeatured(prod.featured);
    setModelNo(prod.modelNo || '');
    setSize(prod.size || '');
    setPkg(prod.pkg || '');
    setMoq(prod.moq || '');
    setNewImageFiles([]);
    setNewVideoFile(null);
    setExistingImagesToKeep(prod.images || []);
    setExistingVideo(prod.video || '');
    setRemoveExistingVideo(false);
    setFormValidationWarning('');
    setModalOpen(true);
  };

  // Handle Multi-image input selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check constraints (Max 5 images total)
    const currentTotalCount = existingImagesToKeep.length + newImageFiles.length + files.length;
    if (currentTotalCount > 5) {
      setFormValidationWarning('Total images limit exceeded. Max 5 images allowed.');
      return;
    }
    setFormValidationWarning('');
    setNewImageFiles([...newImageFiles, ...files]);
  };

  // Remove selected local file before upload
  const removeSelectedNewImage = (idx) => {
    const updated = newImageFiles.filter((_, i) => i !== idx);
    setNewImageFiles(updated);
  };

  // Remove existing catalog image during edit
  const removeExistingCatalogImage = (imgUrl) => {
    const updated = existingImagesToKeep.filter(img => img !== imgUrl);
    setExistingImagesToKeep(updated);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setFormValidationWarning('Invalid file format. Please select a video file.');
        return;
      }
      setNewVideoFile(file);
      setFormValidationWarning('');
    }
  };

  // Delete product action
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you absolutely sure you want to delete this clock? This action is permanent.')) {
      const success = await deleteProduct(id);
      if (success) {
        triggerToast('Product deleted successfully', 'success');
        fetchDashboardStats();
        fetchProducts({ limit: 1000 });
      } else {
        triggerToast('Error deleting product', 'error');
      }
    }
  };

  // Form submit (Add or Edit)
  const handleSubmitProductForm = async (e) => {
    e.preventDefault();
    setFormValidationWarning('');

    const totalImagesCount = existingImagesToKeep.length + newImageFiles.length;
    if (totalImagesCount === 0) {
      setFormValidationWarning('Please select at least 1 image for the product');
      return;
    }

    if (totalImagesCount > 5) {
      setFormValidationWarning('Maximum 5 images allowed');
      return;
    }

    const formData = new FormData();
    formData.append('colors', colors);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('featured', featured);
    formData.append('modelNo', modelNo);
    formData.append('size', size);
    formData.append('pkg', pkg);
    formData.append('moq', moq);

    // Append new images files
    newImageFiles.forEach(file => {
      formData.append('images', file);
    });

    // Append new video file if provided
    if (newVideoFile) {
      formData.append('video', newVideoFile);
    }

    if (editProduct) {
      // Edit Mode specifications
      formData.append('existingImages', JSON.stringify(existingImagesToKeep));
      formData.append('removeVideo', removeExistingVideo || (!existingVideo && !newVideoFile));
      
      const res = await updateProduct(editProduct._id, formData);
      if (res.success) {
        triggerToast('Product updated successfully', 'success');
        setModalOpen(false);
        fetchDashboardStats();
        fetchProducts({ limit: 1000 });
      } else {
        triggerToast(res.message || 'Error updating product', 'error');
      }
    } else {
      // Add Mode specifications
      const res = await createProduct(formData);
      if (res.success) {
        // Trigger success confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        triggerToast('Product created successfully', 'success');
        setModalOpen(false);
        fetchDashboardStats();
        fetchProducts({ limit: 1000 });
      } else {
        triggerToast(res.message || 'Error creating product', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col text-white">
      <SEO title="Admin Dashboard | Nilkanth Quartz" description="Manage Nilkanth Quartz wall clock catalog products, categories, features, and upload media files." />

      {/* Toast Alert Widget */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-none shadow-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest border text-white animate-fadeIn ${
          toast.type === 'error' ? 'bg-red-600 border-red-700' : 'bg-emerald-600 border-emerald-700'
        }`}>
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header bar */}
      <header className="bg-[#121212] text-white px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3.5">
          <div className="bg-white p-2 rounded-none">
            <img src="/nilkanth-quartz-logo.png" alt="Nilkanth Logo" className="h-8 w-auto object-contain" />
          </div>
          
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-gray-500 hidden md:inline-block font-bold uppercase tracking-widest">Logged: {admin?.email || 'admin'}</span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-transparent hover:bg-brand-red border border-white/10 hover:border-brand-red px-5 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow space-y-10">
        
        {/* Statistics KPIs Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#121212] p-6 rounded-none border border-white/10 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] block">Total Clocks</span>
              <span className="text-3xl font-black text-white">{stats?.totalProducts || 0}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-none text-white">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#121212] p-6 rounded-none border border-white/10 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] block">Total Categories</span>
              <span className="text-3xl font-black text-white">{stats?.totalCategories || 0}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-none text-white">
              <Tag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#121212] p-6 rounded-none border border-white/10 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] block">Featured Items</span>
              <span className="text-3xl font-black text-white">
                {products.filter(p => p.featured).length}
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-none text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Product Management Area */}
        <section className="bg-[#121212] rounded-none border border-white/10 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02]">
            <div className="text-left">
              <h2 className="font-extrabold text-white text-base uppercase tracking-widest">Product Registry</h2>
              <p className="text-[10px] text-[#888888] tracking-wider uppercase mt-1">Add, edit, modify catalog records, and upload images/videos.</p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red/90 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-none shadow-md transition-all active:scale-95 duration-200"
            >
              <Plus className="w-4 h-4" />
              Add New Clock
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-[#888888] uppercase tracking-widest text-xs animate-pulse">Loading catalog list...</div>
          ) : (
            <div className="overflow-x-auto w-full max-w-full">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10 text-[#888888] font-bold text-[10px] uppercase tracking-[0.25em]">
                    <th className="px-3 sm:px-6 py-3.5">Image</th>
                    <th className="px-3 sm:px-6 py-3.5">Model No.</th>
                    <th className="px-3 sm:px-6 py-3.5 hidden md:table-cell">Category</th>
                    <th className="px-3 sm:px-6 py-3.5 hidden md:table-cell">Colors</th>
                    <th className="px-3 sm:px-6 py-3.5 hidden md:table-cell">Price / MOQ</th>
                    <th className="px-3 sm:px-6 py-3.5 hidden md:table-cell">Featured</th>
                    <th className="px-3 sm:px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((prod) => (
                    <tr key={prod._id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-3 sm:px-6 py-3.5">
                        <div className="w-14 h-14 rounded-none bg-white/5 border border-white/10 overflow-hidden p-1 flex items-center justify-center shadow-sm">
                          <img 
                            src={prod.images && prod.images.length > 0 ? prod.images[0] : '/nilkanth-quartz-logo.png'} 
                            alt={prod.modelNo} 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3.5 font-bold text-white font-mono text-xs tracking-wider uppercase">
                        {prod.modelNo}
                      </td>
                      <td className="px-3 sm:px-6 py-3.5 hidden md:table-cell">
                        <span className="px-3 py-1 bg-white/5 text-white text-[10px] font-bold uppercase tracking-wider rounded-none border border-white/10">
                          {prod.category}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3.5 hidden md:table-cell text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        {prod.colors}
                      </td>
                      <td className="px-3 sm:px-6 py-3.5 hidden md:table-cell font-bold text-white">
                        <span className="block">₹{prod.price}</span>
                        <span className="text-[10px] text-gray-500 block font-mono font-medium mt-0.5">MOQ: {prod.moq || 100} pcs</span>
                      </td>
                      <td className="px-3 sm:px-6 py-3.5 hidden md:table-cell">
                        {prod.featured ? (
                          <span className="text-brand-red font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                            <CheckCircle className="w-4 h-4 shrink-0 text-brand-red" /> Yes
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">No</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            title="Edit Clock details"
                            className="p-2 sm:p-2.5 bg-white/5 hover:bg-brand-red hover:text-white text-gray-400 hover:border-brand-red rounded-none border border-white/10 transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id)}
                            title="Delete Clock"
                            className="p-2 sm:p-2.5 bg-red-500/5 hover:bg-red-600 text-red-500 hover:text-white rounded-none border border-red-500/10 hover:border-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-3 sm:px-6 py-16 text-center text-gray-500 uppercase tracking-widest text-xs">
                        No product listings found in database registry. Click "Add New Clock" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>

      {/* CRUD Product Modal Dialog Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#121212] border border-white/10 rounded-none w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-white">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] sticky top-0 z-10">
              <div className="text-left">
                <h3 className="font-extrabold text-white text-base uppercase tracking-widest">
                  {editProduct ? 'Modify Wall Clock Records' : 'Add New Wall Clock'}
                </h3>
                <p className="text-[10px] text-[#888888] tracking-wider uppercase mt-1">Complete standard fields below to update catalogue.</p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-none text-gray-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmitProductForm} className="p-6 sm:p-8 space-y-6 flex-grow text-left">
              
              {/* Form Warning Prompt */}
              {formValidationWarning && (
                <div className="bg-red-500/10 text-red-400 text-xs font-semibold p-4 rounded-none border border-red-500/20 flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0" />
                  <span>{formValidationWarning}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Available Colors
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brown, Ivory, Wooden Gold"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Wholesale Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="450"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Category Range
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Designer Clocks"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none transition-all duration-200"
                    list="categories-list"
                  />
                  {/* Category suggestions */}
                  <datalist id="categories-list">
                    <option value="Designer Clocks" />
                    <option value="Office Clocks" />
                    <option value="Promotional Clocks" />
                    <option value="Acrylic Clocks" />
                    <option value="Gear Clocks" />
                  </datalist>
                </div>

                <div className="flex items-center justify-between sm:pt-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">Featured Placement</span>
                  <button
                    type="button"
                    onClick={() => setFeatured(!featured)}
                    className="text-white focus:outline-none transition-colors"
                  >
                    {featured ? (
                      <ToggleRight className="w-12 h-12 text-brand-red" />
                    ) : (
                      <ToggleLeft className="w-12 h-12 text-white/20" />
                    )}
                  </button>
                </div>
              </div>

              {/* Added Schema Fields: Model No, Size, Packaging, MOQ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Model No.
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="NK-101"
                    value={modelNo}
                    onChange={(e) => setModelNo(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Dimensions (Size)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="300mm x 300mm"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Packaging (Pkg)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="50 pcs"
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Min. Order (MOQ)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="100"
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                  Catalogue Description
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="ABS structural back shell with glass protection dial..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3.5 text-xs text-white focus:border-brand-red focus:bg-white/10 focus:outline-none resize-none transition-all duration-200"
                />
              </div>

              {/* 5-Images upload strip manager */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                  Product Images (Maximum 5)
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  
                  {/* Existing Images to Keep List */}
                  {existingImagesToKeep.map((imgUrl, idx) => (
                    <div key={`exist-${idx}`} className="relative aspect-square rounded-none bg-white/5 border border-white/10 overflow-hidden p-2 flex items-center justify-center">
                      <img src={imgUrl} alt="catalog preview" className="max-h-full max-w-full object-contain" />
                      <button
                        type="button"
                        onClick={() => removeExistingCatalogImage(imgUrl)}
                        className="absolute top-1 right-1 bg-brand-red hover:bg-brand-red/90 text-white rounded-none p-1 shadow-md border border-white/10"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Selected New Images List */}
                  {newImageFiles.map((file, idx) => {
                    const localUrl = URL.createObjectURL(file);
                    return (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-none bg-white/5 border border-brand-red/40 overflow-hidden p-2 flex items-center justify-center">
                        <img src={localUrl} alt="upload preview" className="max-h-full max-w-full object-contain" />
                        <button
                          type="button"
                          onClick={() => removeSelectedNewImage(idx)}
                          className="absolute top-1 right-1 bg-brand-red hover:bg-brand-red/90 text-white rounded-none p-1 shadow-md border border-white/10"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {/* Add Image File Selector Card */}
                  {existingImagesToKeep.length + newImageFiles.length < 5 && (
                    <label className="aspect-square rounded-none border-2 border-dashed border-white/15 hover:border-brand-red flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors p-4">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider text-center leading-tight mt-1.5">
                        Upload Image
                      </span>
                    </label>
                  )}

                </div>
              </div>

              {/* Video upload input */}
              <div className="space-y-3 pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                  Product Video (Max 1)
                </label>

                {existingVideo && !removeExistingVideo ? (
                  <div className="bg-white/5 rounded-none p-4 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/5 p-2.5 rounded-none text-brand-red shadow-sm border border-white/10">
                        <FileVideo className="w-5 h-5 text-brand-red" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block uppercase tracking-wider">Existing Video File</span>
                        <a href={existingVideo} target="_blank" rel="noreferrer" className="text-[10px] text-[#888888] hover:text-white hover:underline line-clamp-1 mt-1 block">
                          Play Attached Video
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRemoveExistingVideo(true)}
                      className="text-[10px] font-bold text-brand-red uppercase tracking-wider hover:underline"
                    >
                      Delete Video
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-3 border border-white/10 hover:border-brand-red rounded-none cursor-pointer bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-[#AAAAAA] hover:text-white transition-colors duration-200">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                      />
                      <Video className="w-4 h-4 text-brand-red" />
                      {newVideoFile ? 'Change Video File' : 'Upload Video clip'}
                    </label>
                    {newVideoFile && (
                      <span className="text-xs text-gray-400 font-semibold truncate max-w-xs uppercase tracking-wider font-mono">
                        {newVideoFile.name}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons sticky footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#121212]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3.5 border border-white/10 hover:bg-white/5 text-[#AAAAAA] hover:text-white text-[11px] font-bold uppercase tracking-widest rounded-none transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-8 py-3.5 bg-brand-red hover:bg-brand-red/90 disabled:bg-gray-800 text-white text-[11px] font-bold uppercase tracking-widest rounded-none shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
                >
                  {actionLoading ? 'Saving changes...' : editProduct ? 'Save Updates' : 'Add Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
