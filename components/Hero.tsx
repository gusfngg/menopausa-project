import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-rose-100">
      {/* Abstract Background Shapes */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-200 rounded-full blur-[100px] mix-blend-multiply opacity-30"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-300 rounded-full blur-[120px] mix-blend-multiply opacity-30"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-rose-200 shadow-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-medium text-rose-800 tracking-wide uppercase">Bem-vinda à sua nova fase</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-pink-600 to-rose-500 mb-6 leading-tight"
        >
          Redescubra sua Força <br />
          <span className="italic font-normal">na Menopausa</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Uma plataforma inteligente para acompanhar sua jornada, entender seu corpo e transformar sintomas em autoconhecimento. Beleza, ciência e acolhimento em um só lugar.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={() => document.getElementById('tracker')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-rose-600 text-white rounded-full font-medium text-lg hover:bg-rose-700 transition-all shadow-lg hover:shadow-rose-300/50 flex items-center gap-2"
          >
            Começar Jornada
          </button>
          <button 
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-rose-700 border border-rose-200 rounded-full font-medium text-lg hover:bg-rose-50 transition-all shadow-sm"
          >
            Saiba Mais
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-rose-400"
      >
        <ArrowDown className="w-8 h-8 opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;