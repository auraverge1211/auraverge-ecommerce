import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { ExploreModal } from './components/ExploreModal';
import { Product } from './types';
import { useStore } from './store';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { products, banners } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [exploreCategory, setExploreCategory] = useState<any>('All');

  return (
    <div className="min-h-screen bg-premium-dark selection:bg-accent selection:text-premium-dark">
      <CustomCursor />
      
      <Navbar 
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => {
          setIsExploreOpen(true);
        }}
        onExploreClick={() => setIsExploreOpen(true)}
        onUserClick={() => setIsDashboardOpen(true)}
      />

      <main>
        <Hero />

        {/* Dynamic Banners Section */}
        <AnimatePresence>
          {banners.filter(b => b.active).map((banner) => (
            <motion.section
              key={banner.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative h-[60vh] w-full overflow-hidden"
            >
              <img 
                src={banner.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-40" 
                alt={banner.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-transparent to-transparent" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                <span className="editorial-label mb-4 text-accent">{banner.subtitle}</span>
                <h2 className="text-5xl md:text-7xl font-display font-black italic tracking-tighter mb-8">
                  {banner.title}
                </h2>
                <button 
                  onClick={() => {
                    setExploreCategory('All');
                    setIsExploreOpen(true);
                  }}
                  className="px-8 py-4 glass rounded-2xl font-bold text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-premium-dark transition-all"
                >
                  Explore Collection
                </button>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
        
        <motion.div
          id="collection"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CategorySection 
            onCategoryClick={(cat) => {
              setExploreCategory(cat);
              setIsExploreOpen(true);
            }} 
          />
          <FeaturedProducts onProductClick={setSelectedProduct} />
        </motion.div>

        {/* Storytelling Section */}
        <section id="about" className="py-32 px-6 bg-premium-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="editorial-label mb-6 block">Our Philosophy</span>
              <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-tight mb-8 italic">
                BEYOND THE <span className="text-accent">INTERFACE</span>
              </h2>
              <p className="text-white/40 text-2xl font-light leading-relaxed italic font-serif">
                We believe shopping should be an experience, not a chore. AuraVerge combines cutting-edge technology with timeless aesthetics to create a universe where every interaction feels like magic.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
              {[
                { title: 'Curation', desc: 'Only the finest items make it to our universe.' },
                { title: 'Innovation', desc: 'Experience products in full 3D before you buy.' },
                { title: 'Security', desc: 'Your data and payments are protected by Aura Shield.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-serif italic text-white">{item.title}</h3>
                  <p className="text-white/30 text-sm font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div id="contact" />
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <ExploreModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        initialCategory={exploreCategory}
        onProductClick={(p) => {
          setSelectedProduct(p);
          setIsExploreOpen(false);
        }}
      />

      <Dashboard 
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />

      <AdminPanel />

      {/* Global Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
