import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Heart, Star, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const addToCart = useStore((state) => state.addToCart);

  if (!product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-premium-dark/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl glass rounded-[40px] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 glass rounded-full hover:bg-accent hover:text-premium-dark transition-all"
            >
              <X size={24} />
            </button>

            {/* 3D Preview Section */}
            <div 
              className="w-full md:w-1/2 h-[400px] md:h-auto bg-white/5 flex items-center justify-center p-12 perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="relative w-full aspect-square max-w-md"
              >
                {/* Shadow */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/40 blur-2xl rounded-full" />
                
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  referrerPolicy="no-referrer"
                />
                
                {/* 3D Floating Labels */}
                <div className="absolute top-0 -right-4 glass p-3 rounded-2xl transform translate-z-20">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-accent">Premium Quality</span>
                </div>
              </motion.div>
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto">
              <div className="flex items-center gap-2 editorial-label mb-4">
                <span className="text-accent">Limited Release</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{product.category}</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-display font-black mb-4 tracking-tighter italic">
                {product.name}
              </h2>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-white font-bold text-lg">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-1 text-white/40 text-sm">
                  <Star size={14} className="text-accent fill-accent" />
                  <span>{product.rating}</span>
                  <span>({product.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed mb-10 text-xl font-light">
                {product.description}
              </p>

              {product.details && (
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="glass p-5 rounded-3xl">
                      <span className="block editorial-label text-[8px] mb-1">{key}</span>
                      <span className="text-sm font-bold italic font-serif">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-4 mb-12">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-6 bg-accent text-premium-dark font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 uppercase tracking-widest text-sm"
                >
                  <ShoppingCart size={20} />
                  Pre-order Now — ₹{product.price}
                </button>
                <button className="w-full py-6 glass font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                  <Heart size={20} />
                  Add to Archive
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Truck, label: 'Global Priority' },
                  { icon: Shield, label: 'Nexus Warranty' },
                  { icon: RotateCcw, label: 'Returns' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent border border-white/10">
                      <item.icon size={20} />
                    </div>
                    <span className="editorial-label text-[8px]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
