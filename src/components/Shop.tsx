import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Category, Product } from '../types';
import { cn } from '../lib/utils';
import { useStore } from '../store';

interface ShopProps {
  onProductClick: (product: Product) => void;
}

export const Shop: React.FC<ShopProps> = ({ onProductClick }) => {
  const products = useStore((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // 'newest' (default order in mock data)
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop" className="py-24 px-6 bg-premium-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="editorial-label mb-4 block">Marketplace</span>
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-12 italic">
            THE <span className="text-accent">COLLECTION</span>
          </h2>

          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between glass p-8 rounded-[40px]">
            <div className="flex flex-wrap gap-4">
              {['All', 'Electronics', 'Fashion', 'Home', 'Lifestyle', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={cn(
                    "px-8 py-3.5 rounded-full text-[10px] font-bold transition-all border uppercase tracking-[0.2em]",
                    selectedCategory === cat 
                      ? "bg-accent text-premium-dark border-accent" 
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="SEARCH OBJECTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold tracking-widest focus:outline-none focus:border-accent transition-colors uppercase"
                />
              </div>
              
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-14 text-[10px] font-bold tracking-widest focus:outline-none focus:border-accent transition-colors cursor-pointer uppercase"
                >
                  <option value="newest">NEWEST</option>
                  <option value="price-low">PRICE: LOW</option>
                  <option value="price-high">PRICE: HIGH</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onProductClick(product)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center opacity-40">
            <p className="text-2xl font-light">No products found matching your criteria.</p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-accent font-bold uppercase tracking-widest"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
