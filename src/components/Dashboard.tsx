import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Clock } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ isOpen, onClose }) => {
  const { user, setUser } = useStore();

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-premium-dark/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-[101] w-full max-w-md h-full glass border-r border-white/10 flex flex-col"
          >
            <div className="p-8 border-bottom border-white/10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold">ACCOUNT</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Clock size={24} />
                </button>
              </div>

              <div className="flex items-center gap-4 p-4 glass rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-premium-dark font-bold text-2xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-white/40 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-2">
              {[
                { icon: Package, label: 'My Orders', count: 0 },
                { icon: Heart, label: 'Wishlist', count: user.wishlist.length },
                { icon: Settings, label: 'Settings' },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:text-accent transition-colors">
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count !== undefined && (
                      <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-white/40">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            <div className="p-8">
              <button
                onClick={() => { setUser(null); onClose(); }}
                className="w-full py-4 glass rounded-2xl flex items-center justify-center gap-3 text-red-400 hover:bg-red-400/10 transition-all font-bold text-sm"
              >
                <LogOut size={18} />
                SIGN OUT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
