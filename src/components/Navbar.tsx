import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface NavbarProps {
  onCartClick: () => void;
  onSearchClick: () => void;
  onUserClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, onSearchClick, onUserClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const settings = useStore((state) => state.settings);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'bg-premium-dark/80 backdrop-blur-md py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-black tracking-tighter flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-white uppercase">{settings.name}.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {['Collection', 'Archive', 'About', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[11px] font-bold text-white/40 hover:text-accent transition-colors uppercase tracking-[0.2em]"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
          >
            <Search size={20} className="group-hover:text-accent transition-colors" />
          </button>
          
          <button
            onClick={onUserClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
          >
            <User size={20} className="group-hover:text-accent transition-colors" />
          </button>

          <button
            onClick={onCartClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
          >
            <ShoppingCart size={20} className="group-hover:text-accent transition-colors" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-premium-dark text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-premium-dark/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {['Shop', 'Categories', 'Featured', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-display font-medium text-white/80 hover:text-accent"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
