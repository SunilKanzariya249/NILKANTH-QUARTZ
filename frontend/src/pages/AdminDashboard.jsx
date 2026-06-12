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
    <div className="min-h-screen bg-brand-light flex flex-col">
      <SEO title="Admin Dashboard | Nilkanth Quartz" description="Manage Nilkanth Quartz wall clock catalog products, categories, features, and upload media files." />

      {/* Toast Alert Widget */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold border text-white animate-fadeIn ${
          toast.type === 'error' ? 'bg-red-500 border-red-600' : 'bg-emerald-500 border-emerald-600'
        }`}>
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header bar */}
      <header className="bg-brand-dark text-white px-6 sm:px-8 py-5 border-b border-white/5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg">
            <img src="/nilkanth-quartz-logo.png" alt="Nilkanth Logo" className="h-8 w-auto" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-wider leading-none">NILKANTH QUARTZ</h1>
            <span className="text-[10px] text-brand-red uppercase font-semibold tracking-widest mt-1 block">Control Desk</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 hidden sm:inline-block font-medium">Logged in as: {admin?.email || 'admin'}</span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/5 hover:bg-brand-red border border-white/10 hover:border-brand-red px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow space-y-10">
        
        {/* Statistics KPIs Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Total Clocks</span>
              <span className="text-3xl font-black text-brand-dark">{stats?.totalProducts || 0}</span>
            </div>
            <div className="bg-brand-light p-3 rounded-2xl text-brand-dark">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Total Categories</span>
              <span className="text-3xl font-black text-brand-dark">{stats?.totalCategories || 0}</span>
            </div>
            <div className="bg-brand-light p-3 rounded-2xl text-brand-dark">
              <Tag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Featured Items</span>
              <span className="text-3xl font-black text-brand-dark">
                {products.filter(p => p.featured).length}
              </span>
            </div>
            <div className="bg-brand-light p-3 rounded-2xl text-brand-dark">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Product Management Area */}
        <section className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">Product Registry</h2>
              <p className="text-xs text-gray-400">Add, edit, modify catalog records, and upload images/videos.</p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 duration-200"
            >
              <Plus className="w-4 h-4" />
              Add New Clock
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400 animate-pulse">Loading catalog list...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold text-xs uppercase tracking-wider">
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Model No.</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Available Colors</th>
                    <th className="px-6 py-4">Price / MOQ</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {products.map((prod) => (
                    <tr key={prod._id} className="hover:bg-brand-light/35 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 border overflow-hidden p-1 flex items-center justify-center shadow-sm">
                          <img 
                            src={prod.images && prod.images.length > 0 ? prod.images[0] : '/nilkanth-quartz-logo.png'} 
                            alt={prod.modelNo} 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 font-mono">
                        {prod.modelNo}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md">
                          {prod.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600 font-medium">
                        {prod.colors}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        <span className="block">₹{prod.price}</span>
                        <span className="text-[10px] text-gray-400 block font-mono font-medium">MOQ: {prod.moq || 100} pcs</span>
                      </td>
                      <td className="px-6 py-4">
                        {prod.featured ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1 text-xs">
                            <CheckCircle className="w-4 h-4 shrink-0" /> Yes
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs font-medium">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            title="Edit Clock details"
                            className="p-2 bg-gray-100 hover:bg-brand-dark hover:text-white text-gray-600 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id)}
                            title="Delete Clock"
                            className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors border border-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">
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
        <div className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-gray-50/50 sticky top-0 z-10">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">
                  {editProduct ? 'Modify Wall Clock Records' : 'Add New Wall Clock'}
                </h3>
                <p className="text-xs text-gray-400">Complete standard fields below to update catalogue.</p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-brand-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmitProductForm} className="p-6 sm:p-8 space-y-6 flex-grow">
              
              {/* Form Warning Prompt */}
              {formValidationWarning && (
                <div className="bg-red-50 text-red-500 text-xs font-semibold p-3.5 rounded-xl border border-red-100 flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0" />
                  <span>{formValidationWarning}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Available Colors
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brown, Ivory, Wooden Gold"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Wholesale Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="450"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Category Range
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Designer Clocks"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white"
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

                <div className="flex items-center justify-between sm:pt-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Featured Placement</span>
                  <button
                    type="button"
                    onClick={() => setFeatured(!featured)}
                    className="text-brand-dark focus:outline-none transition-colors"
                  >
                    {featured ? (
                      <ToggleRight className="w-12 h-12 text-brand-red" />
                    ) : (
                      <ToggleLeft className="w-12 h-12 text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Added Schema Fields: Model No, Size, Packaging, MOQ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Model No.
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="NK-101"
                    value={modelNo}
                    onChange={(e) => setModelNo(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Dimensions (Size)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="300mm x 300mm"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Packaging (Pkg)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="50 pcs"
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Min. Order (MOQ)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="100"
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Catalogue Description
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="ABS structural back shell with glass protection dial..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red focus:bg-white resize-none"
                />
              </div>

              {/* 5-Images upload strip manager */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                  Product Images (Maximum 5)
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  
                  {/* Existing Images to Keep List */}
                  {existingImagesToKeep.map((imgUrl, idx) => (
                    <div key={`exist-${idx}`} className="relative aspect-square rounded-xl bg-gray-50 border overflow-hidden p-2 flex items-center justify-center">
                      <img src={imgUrl} alt="catalog preview" className="max-h-full max-w-full object-contain" />
                      <button
                        type="button"
                        onClick={() => removeExistingCatalogImage(imgUrl)}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Selected New Images List */}
                  {newImageFiles.map((file, idx) => {
                    const localUrl = URL.createObjectURL(file);
                    return (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-xl bg-gray-50 border border-brand-red/25 overflow-hidden p-2 flex items-center justify-center">
                        <img src={localUrl} alt="upload preview" className="max-h-full max-w-full object-contain" />
                        <button
                          type="button"
                          onClick={() => removeSelectedNewImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {/* Add Image File Selector Card */}
                  {existingImagesToKeep.length + newImageFiles.length < 5 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-brand-red flex flex-col items-center justify-center cursor-pointer hover:bg-brand-light/35 transition-colors p-4">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase text-center leading-tight">
                        Upload Image
                      </span>
                    </label>
                  )}

                </div>
              </div>

              {/* Video upload input */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                  Product Video (Max 1)
                </label>

                {existingVideo && !removeExistingVideo ? (
                  <div className="bg-brand-light rounded-xl p-4 border border-gray-150 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg text-brand-red shadow-sm border">
                        <FileVideo className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-gray-900 block">Existing Video File</span>
                        <a href={existingVideo} target="_blank" rel="noreferrer" className="text-[10px] text-brand-red hover:underline line-clamp-1">
                          Play Attached Video
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRemoveExistingVideo(true)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Delete Video
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-3 border border-gray-200 hover:border-brand-red rounded-xl cursor-pointer bg-brand-light hover:bg-white text-xs font-bold uppercase tracking-wider text-gray-600 transition-colors">
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
                      <span className="text-xs text-gray-500 font-semibold truncate max-w-xs">
                        {newVideoFile.name}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons sticky footer */}
              <div className="pt-6 border-t border-gray-150 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-8 py-3.5 bg-brand-dark hover:bg-brand-red disabled:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
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
