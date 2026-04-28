import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface NavbarProps {
  onCartClick: () => void;
  onSearchClick: () => void;
  onUserClick: () => void;
  onExploreClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, onSearchClick, onUserClick, onExploreClick }) => {
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
        <div className="hidden md:flex items-center gap-12 relative z-[60]">
          {['Collection', 'Archive', 'About', 'Contact'].map((item, i) => (
            <motion.button
              key={item}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item === 'Collection' || item === 'Archive') {
                  onExploreClick();
                } else {
                  const targetId = item === 'About' ? 'about' : 'contact';
                  const el = document.getElementById(targetId);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }
                }
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[11px] font-bold text-white/40 hover:text-accent transition-all uppercase tracking-[0.2em] cursor-pointer py-2 px-1 relative z-[70] bg-transparent border-none appearance-none"
            >
              <span className="relative z-[80]">{item}</span>
            </motion.button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchClick}
            aria-label="Search"
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
          >
            <Search size={20} className="group-hover:text-accent transition-colors" />
          </button>
          
          <button
            onClick={onUserClick}
            aria-label="Account"
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
          >
            <User size={20} className="group-hover:text-accent transition-colors" />
          </button>

          <button
            onClick={onCartClick}
            aria-label="View Cart"
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
            aria-label="Toggle mobile menu"
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
              {[
                { label: 'Collection', type: 'modal' },
                { label: 'Archive', type: 'modal' },
                { label: 'About', type: 'scroll' },
                { label: 'Contact', type: 'scroll' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.type === 'modal') {
                      onExploreClick();
                    } else {
                      const el = document.getElementById(item.label.toLowerCase());
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-display font-medium text-white/80 hover:text-accent text-left uppercase tracking-tighter"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
