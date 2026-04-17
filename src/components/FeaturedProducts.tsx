import React from 'react';
import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { useStore } from '../store';

interface FeaturedProductsProps {
  onProductClick: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  const products = useStore((state) => state.products);
  const featured = products.filter(p => p.isFeatured);

  return (
    <section id="featured" className="py-24 px-6 bg-premium-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="editorial-label mb-4 block">Curated</span>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter italic">
              FEATURED <span className="text-accent">DROPS</span>
            </h2>
          </div>
          <p className="max-w-md text-white/40 font-light text-lg">
            Hand-picked essentials that define the Nexus aesthetic. Limited availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
