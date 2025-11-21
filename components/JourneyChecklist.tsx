import React from 'react';
import { motion } from 'framer-motion';
import { JourneyStep, ChecklistStatus } from '../types';
import { Check } from 'lucide-react';

const stepsData: JourneyStep[] = [
  { id: 1, title: 'Reconhecimento', description: 'Identificar as primeiras mudanças no ciclo e no corpo.', status: ChecklistStatus.PENDING },
  { id: 2, title: 'Busca de Informação', description: 'Entender o que é perimenopausa e menopausa.', status: ChecklistStatus.PENDING },
  { id: 3, title: 'Adaptação do Estilo de Vida', description: 'Ajustes na alimentação, sono e exercícios.', status: ChecklistStatus.PENDING },
  { id: 4, title: 'Consultas Especializadas', description: 'Acompanhamento médico e hormonal se necessário.', status: ChecklistStatus.PENDING },
  { id: 5, title: 'Plenitude', description: 'Aceitação e empoderamento na nova fase.', status: ChecklistStatus.PENDING },
];

const JourneyChecklist: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="font-serif text-4xl text-rose-900 mb-4"
          >
            Sua Jornada de Florescimento
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-stone-500"
          >
            Cada passo é uma conquista. Veja seu progresso acontecer.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-100 transform -translate-x-1/2" />

          <div className="space-y-20">
            {stepsData.map((step, index) => (
              <motion.div 
                key={step.id}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }} // Trigger when item is well into the view
                className={`relative flex items-center md:justify-between gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Side */}
                <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <motion.h3 
                    variants={{
                      initial: { opacity: 0.5, color: '#a8a29e' }, // stone-400
                      animate: { opacity: 1, color: '#e11d48' }    // rose-600
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-serif text-2xl mb-2"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    variants={{
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-stone-500 text-sm md:text-base"
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Center Node - Animated Checkbox */}
                <div className="absolute left-[27px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    variants={{
                      initial: { 
                        backgroundColor: '#ffffff', 
                        borderColor: '#e7e5e4', // stone-200
                        scale: 1 
                      },
                      animate: { 
                        backgroundColor: '#f43f5e', // rose-500
                        borderColor: '#fecdd3', // rose-200
                        scale: 1.15,
                        boxShadow: "0 10px 15px -3px rgba(244, 63, 94, 0.3)"
                      }
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="w-14 h-14 rounded-full border-4 flex items-center justify-center z-10"
                  >
                    <motion.div
                      variants={{
                        initial: { scale: 0, opacity: 0 },
                        animate: { scale: 1, opacity: 1 }
                      }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Empty Side for Layout Balance */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyChecklist;