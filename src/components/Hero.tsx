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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-premium-dark"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* Massive Editorial Background Text */}
      <motion.div 
        style={{ y: y1, opacity: 0.03 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[260px] font-black tracking-tighter select-none pointer-events-none whitespace-nowrap"
      >
        PRECISION
      </motion.div>

      {/* Floating 3D Elements (Abstract) */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 right-[15%] w-64 h-64 glass rounded-[40px] rotate-12 flex items-center justify-center p-8 opacity-40 z-10"
      >
        <div className="w-full h-full border border-white/20 rounded-3xl flex items-center justify-center">
          <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-bold">Aura Pro X</span>
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-20 left-[10%] w-48 h-48 glass rounded-[32px] opacity-30 flex items-center justify-center z-10"
      >
        <div className="w-3/4 h-3/4 border-2 border-dashed border-accent/30 rounded-2xl" />
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
            Limited Release — MMXXIV
          </span>
          <h1 className="text-8xl md:text-[140px] font-display font-black tracking-tighter leading-[0.85] mb-8 italic">
            <span className="block text-white uppercase">{settings.name}.</span>
            <span className="block text-accent uppercase">OBJECTS</span>
          </h1>
          <p className="max-w-xl mx-auto text-white/40 text-lg md:text-xl font-light leading-relaxed">
            Curated precision for the modern collector. Established to redefine the boundaries of physical and digital design.
          </p>
        </motion.div>
      </div>

      {/* Vertical Label */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.4em] text-white/20 uppercase font-bold whitespace-nowrap hidden lg:block">
        ESTABLISHED MMXXIV — ALL RIGHTS RESERVED
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
