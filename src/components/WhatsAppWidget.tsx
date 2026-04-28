import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const phoneNumber = '919207115662';
  const message = 'Hello! I am interested in the AuraVerge collection.';

  const openWhatsApp = () => {
    // Standard WhatsApp link
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-80 bg-premium-dark border border-white/10 rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-xl"
            style={{ isolation: 'isolate' }}
          >
            {/* Header */}
            <div className="bg-white/5 p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <MessageCircle size={20} className="text-premium-dark" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-black text-white leading-none">AuraVerge Concierge</h4>
                  <span className="text-[10px] uppercase tracking-widest text-accent mt-1 block font-bold">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="bg-white/5 rounded-2xl p-4 text-sm text-white/60 font-light leading-relaxed italic border border-white/5">
                "Welcome to the inner circle. How can we assist with your curation today?"
              </div>
              
              <button
                onClick={openWhatsApp}
                className="w-full bg-accent text-premium-dark py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] font-black hover:bg-white transition-all flex items-center justify-center gap-2 group shadow-lg shadow-accent/10"
              >
                START CONVERSATION
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <MessageCircle size={14} fill="currentColor" />
                </motion.span>
              </button>
            </div>
            
            <div className="px-6 py-4 bg-white/[0.02] text-center border-t border-white/5">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Typically replies instantly</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-2xl bg-accent text-premium-dark flex items-center justify-center shadow-[0_0_40px_rgba(188,255,0,0.3)] relative overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Particle effect */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
};
