import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import { useStore } from '../store';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const setAdminOpen = useStore((state) => state.setAdminOpen);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase() === 'auravergeceo@gmail.com') {
      setAdminOpen(true);
      setEmail('');
    } else {
      alert('Thank you for joining the AuraVerge universe!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-premium-dark border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="text-4xl font-display font-black tracking-tighter mb-8 flex items-center gap-3">
              <span className="text-white">AURAVERGE.</span>
            </div>
            <p className="max-w-sm text-white/40 text-xl font-light leading-relaxed mb-8 italic font-serif">
              Redefining the digital shopping experience through immersive design and premium curation.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#E0FF00' }}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/60 transition-colors border border-white/10"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="editorial-label mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Collections', 'Archive', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-accent transition-colors flex items-center gap-2 group text-sm font-bold uppercase tracking-widest">
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="editorial-label mb-8">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6 font-light">Join the AuraVerge universe for exclusive drops.</p>
            <form onSubmit={handleNewsletter} className="relative">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold tracking-widest focus:outline-none focus:border-accent transition-colors uppercase"
              />
              <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 bg-white text-premium-dark rounded-xl font-black text-[10px] tracking-widest hover:bg-accent transition-colors">
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
            © 2026 AURAVERGE UNIVERSE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-[10px] text-white/20 tracking-[0.2em] uppercase hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
