import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useStore } from '../store';

export const Hero: React.FC = () => {
  const settings = useStore((state) => state.settings);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Magnetic card tracking
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const magneticAlpha = useMotionValue(0);
  const magneticBeta = useMotionValue(0);
  const smoothMagneticX = useSpring(magneticAlpha, { stiffness: 200, damping: 30 });
  const smoothMagneticY = useSpring(magneticBeta, { stiffness: 200, damping: 30 });

  // Mouse tracking for reactive parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax from mouse movement
  const card1MouseX = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const card1MouseY = useTransform(smoothMouseY, [-500, 500], [-30, 30]);
  const card2MouseX = useTransform(smoothMouseX, [-500, 500], [20, -20]);
  const card2MouseY = useTransform(smoothMouseY, [-500, 500], [20, -20]);

  // Scroll animations
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const hoverScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  // Combined parallax values (Scroll + Global Mouse + Local Magnetic)
  const finalCard1X = useTransform(
    [card1MouseX, smoothMagneticX],
    ([gx, mx]) => (gx as number) + (hoveredCard === 1 ? (mx as number) : 0)
  );
  const finalCard1Y = useTransform(
    [y1, card1MouseY, smoothMagneticY],
    ([latestY, gmy, mmy]) => (latestY as number) + (gmy as number) + (hoveredCard === 1 ? (mmy as number) : 0)
  );

  const finalCard2X = useTransform(
    [card2MouseX, smoothMagneticX],
    ([gx, mx]) => (gx as number) + (hoveredCard === 2 ? (mx as number) : 0)
  );
  const finalCard2Y = useTransform(
    [y2, card2MouseY, smoothMagneticY],
    ([latestY, gmy, mmy]) => (latestY as number) + (gmy as number) + (hoveredCard === 2 ? (mmy as number) : 0)
  );

  // Dynamic 3D Twisting Rotation (Magnetic Tilt)
  const cardRotateX = useTransform(smoothMagneticY, [-120, 120], [25, -25]); // More angle
  const cardRotateY = useTransform(smoothMagneticX, [-120, 120], [-25, 25]);

  // Internal Parallax for Card Content (Glass Depth) - Intensified
  const imageShiftX = useTransform(smoothMagneticX, [-150, 150], [-25, 25]);
  const imageShiftY = useTransform(smoothMagneticY, [-150, 150], [-25, 25]);
  const textShiftX = useTransform(smoothMagneticX, [-150, 150], [10, -10]);
  const textShiftY = useTransform(smoothMagneticY, [-150, 150], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleCardMouseMove = (e: React.MouseEvent, cardId: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    magneticAlpha.set(x * 0.5); // Increased pull strength
    magneticBeta.set(y * 0.5);
    setHoveredCard(cardId);
  };

  const handleCardMouseLeave = () => {
    magneticAlpha.set(0);
    magneticBeta.set(0);
    setHoveredCard(null);
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-premium-dark"
      style={{ perspective: "1200px" }}
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
      <div 
        className="absolute top-20 right-[15%] w-64 h-80 z-10"
      >
        <div
          className="w-full h-full glass rounded-[40px] flex flex-col items-center justify-between p-6 overflow-hidden relative"
        >
          <div className="w-full h-48 rounded-3xl overflow-hidden relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=600&h=600" 
              alt="Premium Audio"
              className="w-full h-full object-cover scale-115"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-premium-dark/40 to-transparent" />
          </div>
          <div 
            className="w-full space-y-2 mt-4 relative z-10"
          >
            <div className="h-px bg-white/10 w-full" />
            <div className="flex justify-between items-center px-1">
              <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-bold italic">Series.01</span>
              <span className="text-accent text-[9px] font-bold tracking-widest uppercase">AirPods Pro Max</span>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-20 left-[10%] w-56 h-72 z-10"
      >
        <div
          className="w-full h-full glass rounded-[32px] flex flex-col items-center justify-between p-5 overflow-hidden relative"
        >
          <div className="w-full h-40 rounded-2xl overflow-hidden relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600&h=600" 
              alt="Essential Object"
              className="w-full h-full object-cover scale-115"
              referrerPolicy="no-referrer"
            />
          </div>
          <div 
            className="w-full space-y-2 mt-3 relative z-10"
          >
            <div className="h-px bg-white/10 w-full" />
            <div className="flex justify-between items-center px-1">
              <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-bold italic">MMXXVI</span>
              <span className="text-accent text-[9px] font-bold tracking-widest">COLLECTOR</span>
            </div>
          </div>
        </div>
      </div>

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
