import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const addToCart = useStore((state) => state.addToCart);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const wishlist = useStore((state) => state.user?.wishlist || []);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative glass rounded-3xl overflow-hidden interactive"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product.id);
            }}
            className={cn(
              "p-3 rounded-full glass hover:bg-accent hover:text-premium-dark transition-all",
              isWishlisted && "bg-accent text-premium-dark"
            )}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="editorial-label">
              {product.category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-white/50 text-[10px] font-bold">
            <Star size={10} className="text-accent fill-accent" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-serif italic mb-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-white/40 text-xs font-light line-clamp-1 mb-6">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-accent hover:text-premium-dark rounded-full text-[10px] font-bold transition-all border border-white/10 uppercase tracking-widest"
          >
            <ShoppingCart size={12} />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
