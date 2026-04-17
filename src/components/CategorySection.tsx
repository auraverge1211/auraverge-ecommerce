import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Shirt, Home, Zap, Watch } from 'lucide-react';
import { Category } from '../types';

const categories: { name: Category; icon: any; color: string }[] = [
  { name: 'Electronics', icon: Smartphone, color: 'from-blue-500/20' },
  { name: 'Fashion', icon: Shirt, color: 'from-purple-500/20' },
  { name: 'Home', icon: Home, color: 'from-orange-500/20' },
  { name: 'Lifestyle', icon: Zap, color: 'from-yellow-500/20' },
  { name: 'Accessories', icon: Watch, color: 'from-green-500/20' },
];

export const CategorySection: React.FC = () => {
  return (
    <section id="categories" className="py-24 px-6 bg-premium-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="editorial-label mb-4 block">Collections</span>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter italic">
              BROWSE BY <span className="text-accent">CATEGORY</span>
            </h2>
          </div>
          <p className="max-w-md text-white/40 font-light text-lg">
            Explore our curated selection across multiple dimensions of style and technology.
          </p>
        </div>

        <div className="relative">
          <motion.div 
            className="flex gap-6 overflow-x-auto pb-8 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
            initial={false}
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative min-w-[280px] md:min-w-[320px] h-72 glass rounded-[40px] p-10 flex flex-col items-start justify-between cursor-pointer overflow-hidden snap-center border border-white/5 hover:border-accent/30 transition-colors"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-premium-dark transition-all duration-500 group-hover:rotate-[10deg]">
                  <cat.icon size={32} strokeWidth={1.5} />
                </div>
                
                <div className="relative z-10">
                  <span className="block text-3xl font-serif italic group-hover:text-white transition-colors mb-2">
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                    <span className="editorial-label text-[10px] opacity-60">
                      {Math.floor(Math.random() * 20) + 5} Objects
                    </span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-10 transition-all duration-700 group-hover:scale-150 group-hover:-rotate-12">
                  <cat.icon size={120} strokeWidth={0.5} />
                </div>

                {/* Decorative element */}
                <div className="absolute top-10 right-10 w-1 h-1 bg-white/10 rounded-full group-hover:bg-accent/40 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Scroll Hint */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-20">
            <div className="w-12 h-[1px] bg-white" />
            <span className="editorial-label text-[8px]">Swipe to explore</span>
            <div className="w-12 h-[1px] bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
};
