import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, X, ExternalLink } from 'lucide-react';

const Resources: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  const demoPdfData = "/guia-menopausa.pdf";

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
                Material Exclusivo UNISO
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                Guia de Autocuidado: <br/>Menopausa
              </h2>
              <p className="text-rose-100 text-lg mb-8 max-w-lg">
                Um guia completo preparado com carinho pela Nutrição, contendo checklists, receitas, caça-palavras e orientações para viver essa fase com leveza.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href={demoPdfData} 
                  download="Guia-Menopausa-UNISO.pdf"
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

            {/* Visual Representation of PDF (Estilizado como a sua capa real) */}
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 2 }}
              onClick={() => setShowPreview(true)}
              className="relative w-64 md:w-80 aspect-[3/4] bg-[#F5C7C7] rounded-xl shadow-2xl rotate-3 border-2 border-white/20 flex flex-col overflow-hidden cursor-pointer group"
            >
              {/* Overlay Hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-20 flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                   <Eye className="w-6 h-6 text-rose-600" />
                </div>
              </div>

              {/* Capa Simulada baseada na imagem enviada */}
              <div className="flex-1 p-6 flex flex-col items-center justify-start text-center relative">
                 <div className="absolute top-4 flex gap-2 mb-4 opacity-70">
                    <div className="w-8 h-8 rounded-full bg-blue-900/20"></div> {/* Logo simulado */}
                    <div className="w-8 h-8 rounded-full bg-green-900/20"></div> {/* Logo simulado */}
                 </div>
                 
                 <div className="mt-16 w-full">
                   <p className="font-handwriting text-[#B04A3B] text-lg rotate-[-5deg] mb-2 font-serif italic">Pensando em Você!</p>
                   <h3 className="font-sans text-5xl font-black text-[#B04A3B] leading-none tracking-tighter uppercase mb-2">
                     MENO<br/>PAUSA
                   </h3>
                   <p className="text-[#B04A3B] text-xs font-bold uppercase tracking-widest">Seu Guia de Autocuidado!</p>
                 </div>

                 <div className="mt-auto mb-4">
                    <p className="text-[#B04A3B] font-bold text-sm">UNISO<br/>2025</p>
                 </div>
                 
                 {/* Avatares rodapé simulados */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-center gap-1 opacity-80 px-2">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-full h-8 bg-[#B04A3B]/20 rounded-t-lg"></div>
                    ))}
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
                    <h3 className="font-bold text-stone-800">Guia UNISO - Menopausa</h3>
                    <p className="text-xs text-stone-500">Visualização Modo Demonstração (PDF Interno)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <a 
                    href={demoPdfData} 
                    download="Guia-Menopausa-Demo.pdf"
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
                    title="Baixar Arquivo"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-colors text-stone-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer - Usando <object> para maior compatibilidade com Data URI */}
              <div className="flex-1 bg-stone-100 relative">
                <object
                  data={demoPdfData}
                  type="application/pdf"
                  className="w-full h-full"
                  aria-label="Visualização do PDF"
                >
                  <div className="flex flex-col items-center justify-center h-full text-stone-500 p-8 text-center">
                    <FileText className="w-12 h-12 mb-4 text-stone-300" />
                    <p className="mb-4">Não foi possível exibir a prévia neste navegador.</p>
                    <a 
                      href={demoPdfData} 
                      download="Guia-Menopausa-Demo.pdf"
                      className="text-rose-600 underline hover:text-rose-700 font-medium"
                    >
                      Clique aqui para baixar o arquivo
                    </a>
                  </div>
                </object>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resources;