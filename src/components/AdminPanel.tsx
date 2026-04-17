import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Image as ImageIcon, Package, Layout, BarChart3, Trash2, Save, CheckCircle2, Settings } from 'lucide-react';
import { useStore } from '../store';
import { Product, Banner, Category } from '../types';
import { cn } from '../lib/utils';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminOpen, 
    setAdminOpen, 
    products, 
    banners, 
    addProduct, 
    removeProduct, 
    addBanner, 
    removeBanner,
    settings,
    updateSettings 
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'banners' | 'settings'>('dashboard');
  
  // Form States
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'Electronics',
    image: '',
    rating: 5,
    reviews: 0
  });

  const [newBanner, setNewBanner] = useState<Partial<Banner>>({
    title: '',
    subtitle: '',
    image: '',
    active: true
  });

  const [localSettings, setLocalSettings] = useState(settings);

  if (!isAdminOpen) return null;

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    // Brief visual feedback
    const btn = e.currentTarget.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Saved Successfully!';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      addProduct({
        ...newProduct,
        id: Math.random().toString(36).substr(2, 9),
      } as Product);
      setNewProduct({ name: '', description: '', price: 0, category: 'Electronics', image: '', rating: 5, reviews: 0 });
    }
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBanner.title && newBanner.image) {
      addBanner({
        ...newBanner,
        id: Math.random().toString(36).substr(2, 9),
      } as Banner);
      setNewBanner({ title: '', subtitle: '', image: '', active: true });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAdminOpen(false)}
          className="absolute inset-0 bg-premium-dark/95 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl h-[85vh] glass rounded-[40px] overflow-hidden flex flex-col border border-accent/20"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-premium-dark">
                <BarChart3 size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black tracking-tighter italic">AURAVERGE <span className="text-accent">ADMIN</span></h2>
                <p className="editorial-label opacity-40">Management Console v1.0</p>
              </div>
            </div>
            <button
              onClick={() => setAdminOpen(false)}
              className="p-3 glass rounded-full hover:bg-accent hover:text-premium-dark transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 p-6 space-y-2 hidden md:block">
              {[
                { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                { id: 'products', icon: Package, label: 'Products' },
                { id: 'banners', icon: Layout, label: 'Banners' },
                { id: 'settings', icon: Settings, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all group",
                    activeTab === item.id ? "bg-accent text-premium-dark" : "hover:bg-white/5 text-white/40"
                  )}
                >
                  <item.icon size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Total Products', value: products.length, icon: Package },
                      { label: 'Active Banners', value: banners.filter(b => b.active).length, icon: Layout },
                      { label: 'Total Sales', value: '₹12,45,000', icon: CheckCircle2 },
                    ].map((stat, i) => (
                      <div key={i} className="glass p-8 rounded-[32px] border border-white/5">
                        <stat.icon className="text-accent mb-4" size={32} />
                        <span className="editorial-label block mb-2">{stat.label}</span>
                        <span className="text-4xl font-display font-black italic">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="glass p-8 rounded-[32px] border border-white/5">
                    <h3 className="text-xl font-serif italic mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                              <Plus size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold">New product added</p>
                              <p className="text-xs text-white/40">2 hours ago</p>
                            </div>
                          </div>
                          <span className="text-accent text-[10px] font-bold">SUCCESS</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-8">
                  <form onSubmit={handleAddProduct} className="glass p-8 rounded-[32px] border border-accent/20 space-y-6">
                    <h3 className="text-xl font-serif italic mb-6">Add New Product</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="editorial-label">Product Name</label>
                        <input
                          type="text"
                          required
                          value={newProduct.name}
                          onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="editorial-label">Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={newProduct.price}
                          onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="editorial-label">Category</label>
                        <select
                          value={newProduct.category}
                          onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Home">Home</option>
                          <option value="Lifestyle">Lifestyle</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="editorial-label">Image URL</label>
                        <input
                          type="text"
                          required
                          value={newProduct.image}
                          onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="editorial-label">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors h-24"
                      />
                    </div>
                    <button type="submit" className="w-full py-4 bg-accent text-premium-dark font-black rounded-xl hover:scale-[1.02] transition-transform uppercase tracking-widest text-xs">
                      Create Product
                    </button>
                  </form>

                  <div className="space-y-4">
                    <h3 className="text-xl font-serif italic">Existing Products</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {products.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold">{product.name}</p>
                              <p className="text-xs text-white/40">{product.category} — ₹{product.price}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeProduct(product.id)}
                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'banners' && (
                <div className="space-y-8">
                  <form onSubmit={handleAddBanner} className="glass p-8 rounded-[32px] border border-accent/20 space-y-6">
                    <h3 className="text-xl font-serif italic mb-6">Add New Banner</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="editorial-label">Banner Title</label>
                        <input
                          type="text"
                          required
                          value={newBanner.title}
                          onChange={e => setNewBanner({...newBanner, title: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="editorial-label">Subtitle</label>
                        <input
                          type="text"
                          value={newBanner.subtitle}
                          onChange={e => setNewBanner({...newBanner, subtitle: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="editorial-label">Image URL</label>
                        <input
                          type="text"
                          required
                          value={newBanner.image}
                          onChange={e => setNewBanner({...newBanner, image: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-accent text-premium-dark font-black rounded-xl hover:scale-[1.02] transition-transform uppercase tracking-widest text-xs">
                      Create Banner
                    </button>
                  </form>

                  <div className="space-y-4">
                    <h3 className="text-xl font-serif italic">Active Banners</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {banners.map(banner => (
                        <div key={banner.id} className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <img src={banner.image} alt="" className="w-24 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold">{banner.title}</p>
                              <p className="text-xs text-white/40">{banner.subtitle}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeBanner(banner.id)}
                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <form onSubmit={handleUpdateSettings} className="space-y-8 glass p-8 rounded-[32px] border border-accent/20">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-serif italic">Global Settings</h3>
                      <p className="text-sm text-white/40">Manage your store's identity and communication channels.</p>
                    </div>
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-accent text-premium-dark font-black rounded-xl hover:scale-[1.05] transition-transform uppercase tracking-widest text-[10px]">
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="editorial-label">Store Name</label>
                        <input
                          type="text"
                          value={localSettings.name}
                          onChange={e => setLocalSettings({...localSettings, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="editorial-label">Contact Email</label>
                        <input
                          type="email"
                          value={localSettings.contactEmail}
                          onChange={e => setLocalSettings({...localSettings, contactEmail: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="editorial-label">Instagram Username</label>
                        <input
                          type="text"
                          value={localSettings.instagram}
                          onChange={e => setLocalSettings({...localSettings, instagram: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="editorial-label">WhatsApp Number</label>
                        <input
                          type="text"
                          value={localSettings.whatsapp}
                          onChange={e => setLocalSettings({...localSettings, whatsapp: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="editorial-label">Store Description</label>
                    <textarea
                      value={localSettings.description}
                      onChange={e => setLocalSettings({...localSettings, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-colors h-32"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
