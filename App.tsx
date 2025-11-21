import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import SymptomTracker from './components/SymptomTracker';
import JourneyChecklist from './components/JourneyChecklist';
import Resources from './components/Resources';
import BoothMode from './components/BoothMode';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom cursor logic just for desktop aesthetic
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(244, 63, 94, 0.3)", // rose-500
    }
  }

  return (
    <div className="min-h-screen font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 to-pink-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Custom Cursor (Hidden on Touch devices by CSS mostly, but visible on Desktop) */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 blur-sm mix-blend-multiply"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <main className="relative z-0">
        <Hero />
        <About />
        <SymptomTracker />
        <JourneyChecklist />
        <Resources />
        <BoothMode />
      </main>

      <Footer />
    </div>
  );
};

export default App;