import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, X, ExternalLink } from 'lucide-react';

const Resources: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  // ---------------------------------------------------------------------------
  // INSTRUÇÃO PARA O USUÁRIO:
  // Quando seu PDF estiver pronto, coloque-o na pasta 'public' do projeto.
  // Exemplo: public/meu-guia.pdf
  // Depois, mude a linha abaixo para: const pdfUrl = "/meu-guia.pdf";
  // ---------------------------------------------------------------------------
  const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; 

  return (
    <section className="py-24 bg-gradient-to-b from-rose-50 to-white relative">
      <div className="container mx-auto px-6">
        <div className="bg-rose-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-800 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-700 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 opacity-50" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-rose-800/50 border border-rose-700 text-rose-200 text-sm mb-6">
                Material Exclusivo
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                Guia Completo: <br/>Nutrição e Hormônios
              </h2>
              <p className="text-rose-100 text-lg mb-8 max-w-lg">
                Um ebook preparado por especialistas com receitas, dicas de fitoterápicos e estratégias naturais para aliviar sintomas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href={pdfUrl} 
                  download="Guia-MenoFlow.pdf"
                  className="px-6 py-3 bg-white text-rose-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Baixar PDF
                </a>
                <button 
                  onClick={() => setShowPreview(true)}
                  className="px-6 py-3 bg-rose-800/50 border border-rose-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-rose-800 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  Pré-visualizar
                </button>
              </div>
            </div>

            {/* Visual Representation of PDF */}
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 2 }}
              onClick={() => setShowPreview(true)}
              className="relative w-64 md:w-80 aspect-[3/4] bg-white rounded-2xl shadow-2xl rotate-3 border-4 border-rose-100/20 flex flex-col overflow-hidden cursor-pointer group"
            >
              {/* Overlay Hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-20 flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                   <Eye className="w-6 h-6 text-rose-600" />
                </div>
              </div>

              <div className="h-2/3 bg-rose-100 p-6 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
                    <FileText className="text-rose-500 w-6 h-6" />
                 </div>
                 <div className="z-10">
                   <h3 className="font-serif text-2xl text-rose-900 leading-none mb-1">Guia</h3>
                   <h3 className="font-serif text-3xl text-rose-900 leading-none font-bold">Essencial</h3>
                 </div>
              </div>
              <div className="h-1/3 bg-white p-6 flex items-end">
                <div className="w-full">
                  <div className="h-2 bg-stone-100 rounded mb-2 w-3/4"></div>
                  <div className="h-2 bg-stone-100 rounded mb-2 w-full"></div>
                  <div className="h-2 bg-stone-100 rounded w-1/2"></div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* PDF PREVIEW MODAL */}
      <AnimatePresence>
        {showPreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm"
              onClick={() => setShowPreview(false)}
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <FileText className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800">Guia Essencial</h3>
                    <p className="text-xs text-stone-500">Visualização Rápida</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <a 
                    href={pdfUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
                    title="Abrir em nova aba"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-colors text-stone-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer (Iframe) */}
              <div className="flex-1 bg-stone-100 relative">
                <iframe 
                  src={`${pdfUrl}#toolbar=0`} 
                  className="w-full h-full"
                  title="PDF Preview"
                />
                {/* Loading/Fallback State for Iframe */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resources;