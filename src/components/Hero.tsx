import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useStore } from '../store';

export const Hero: React.FC = () => {
  const settings = useStore((state) => state.settings);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const hoverScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-premium-dark"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-30" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, '-20%', '20%'],
              x: [null, '10%', '-10%'],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
          />
        ))}
      </div>

      {/* Massive Editorial Background Text */}
      <motion.div 
        style={{ y: y1, opacity: 0.03 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[260px] font-black tracking-tighter select-none pointer-events-none whitespace-nowrap uppercase"
      >
        PRECISION
      </motion.div>

      {/* Floating 3D Elements (Abstract) */}
      <motion.div 
        style={{ y: y1, rotate }}
        animate={{ 
          y: [0, -8, 0],
          rotate: [12, 13, 12]
        }}
        whileHover={{ 
          scale: 1.05,
          rotate: 15,
          y: -10
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            type: "spring",
            stiffness: 80,
            damping: 15
          }
        }}
        className="absolute top-20 right-[15%] w-64 h-80 glass rounded-[40px] rotate-12 flex flex-col items-center justify-between p-6 opacity-60 z-10 overflow-hidden group hover:opacity-100 transition-opacity cursor-pointer"
      >
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
        <div className="w-full h-48 rounded-3xl overflow-hidden relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=600&h=600" 
            alt="Premium Audio"
            className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-premium-dark/40 to-transparent" />
        </div>
        <div className="w-full space-y-2 mt-4 relative z-10">
          <div className="h-px bg-white/10 w-full" />
          <div className="flex justify-between items-center px-1">
            <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-bold italic">Series.01</span>
            <span className="text-accent text-[9px] font-bold tracking-widest uppercase">AirPods Pro Max</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y2, rotate: -rotate, scale: hoverScale }}
        animate={{ 
          y: [0, 8, 0],
          rotate: [-12, -13, -12]
        }}
        whileHover={{ 
          scale: 1.05,
          rotateY: -10,
          rotate: -15,
          y: 10
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          },
          scale: {
            type: "spring",
            stiffness: 80,
            damping: 15
          }
        }}
        className="absolute bottom-20 left-[10%] w-56 h-72 glass rounded-[32px] opacity-40 flex flex-col items-center justify-between p-5 z-10 overflow-hidden group hover:opacity-100 transition-opacity cursor-pointer shadow-2xl shadow-accent/0 hover:shadow-accent/5"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        <div className="w-full h-40 rounded-2xl overflow-hidden relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600&h=600" 
            alt="Essential Object"
            className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full space-y-2 mt-3 relative z-10">
          <div className="h-px bg-white/10 w-full" />
          <div className="flex justify-between items-center px-1">
            <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-bold italic">MMXXVI</span>
            <span className="text-accent text-[9px] font-bold tracking-widest">COLLECTOR</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ opacity, scale }}
        >
          <span className="text-accent text-[10px] font-bold tracking-[0.8em] uppercase mb-6 block">
            {settings.name} Universe — MMXXVI
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-[140px] font-display font-black tracking-tighter leading-[0.9] mb-8 italic">
            <span className="block text-white uppercase">{settings.name}.</span>
          </h1>
          <p className="max-w-xl mx-auto text-white/40 text-lg md:text-xl font-light leading-relaxed">
            Curated precision for the modern collector. Established to redefine the boundaries of physical and digital design.
          </p>
        </motion.div>
      </div>

      {/* Vertical Label */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.4em] text-white/20 uppercase font-bold whitespace-nowrap hidden lg:block">
        ESTABLISHED MMXXVI — ALL RIGHTS RESERVED
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="interaction-hint text-[10px] text-white/30 uppercase tracking-[0.3em] border border-white/10 px-6 py-3 rounded-full glass">
          Scroll to Explore
        </div>
      </motion.div>
    </section>
  );
};
