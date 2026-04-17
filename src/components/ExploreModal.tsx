import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, Filter, LayoutGrid } from 'lucide-react';
import { useStore } from '../store';
import { Category, Product } from '../types';
import { ProductCard } from './ProductCard';
import { cn } from '../lib/utils';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
  initialCategory?: Category | 'All';
}

export const ExploreModal: React.FC<ExploreModalProps> = ({ 
  isOpen, 
  onClose, 
  onProductClick,
  initialCategory = 'All'
}) => {
  const { products, settings } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(initialCategory);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isRandom, setIsRandom] = useState(false);

  // Initialize display products
  useEffect(() => {
    if (isOpen) {
      setDisplayProducts(products);
      setSelectedCategory(initialCategory);
      setIsRandom(false);
    }
  }, [isOpen, products, initialCategory]);

  const categories: (Category | 'All')[] = ['All', 'Electronics', 'Fashion', 'Home', 'Lifestyle', 'Accessories'];

  const filteredProducts = useMemo(() => {
    if (isRandom) return displayProducts;
    return products.filter(p => selectedCategory === 'All' || p.category === selectedCategory);
  }, [selectedCategory, products, isRandom, displayProducts]);

  const handleRandomize = () => {
    setIsRandom(true);
    setSelectedCategory('All');
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setDisplayProducts(shuffled);
  };

  const handleCategorySelect = (cat: Category | 'All') => {
    setIsRandom(false);
    setSelectedCategory(cat);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-premium-dark/95 backdrop-blur-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-premium-dark/80 backdrop-blur-md border-b border-white/5 px-6 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-accent">
                  <Sparkles size={24} />
                </span>
                <h2 className="text-2xl font-display font-black italic tracking-tighter uppercase">
                  {settings.name} <span className="text-accent underline decoration-white/20 underline-offset-8">EXPLORE</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Collections Navigation */}
            <div className="mb-16 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={cn(
                        "px-8 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all border",
                        !isRandom && selectedCategory === cat
                          ? "bg-accent text-premium-dark border-accent scale-105 shadow-lg shadow-accent/20"
                          : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:bg-white/10"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRandomize}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all border",
                    isRandom
                      ? "bg-white text-premium-dark border-white scale-105 shadow-lg shadow-white/20"
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:bg-white/10"
                  )}
                >
                  <Sparkles size={16} className={isRandom ? "text-premium-dark" : "text-accent"} />
                  DISCOVER RANDOM
                </button>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onClick={() => onProductClick(product)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-32 text-center">
                <LayoutGrid size={64} className="mx-auto text-white/10 mb-6" strokeWidth={1} />
                <p className="text-xl font-light text-white/40 italic">Nothing found in this universe.</p>
                <button
                  onClick={() => handleCategorySelect('All')}
                  className="mt-6 text-accent font-bold uppercase tracking-widest text-sm"
                >
                  Reset Universe
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
