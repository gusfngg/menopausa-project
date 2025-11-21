import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Flower2 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-white/70 backdrop-blur-lg border border-white p-8 rounded-3xl shadow-xl shadow-rose-100/50 hover:shadow-rose-200/50 transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors">
      <Icon className="w-7 h-7 text-rose-600" />
    </div>
    <h3 className="font-serif text-2xl text-rose-900 mb-3">{title}</h3>
    <p className="text-stone-600 leading-relaxed font-sans">{description}</p>
  </motion.div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-gradient-to-b from-white to-rose-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-rose-900 mb-6"
          >
            Entenda, Acompanhe, Acolha
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-stone-600"
          >
            A menopausa não é um fim, mas um novo começo. Nossa tecnologia ajuda você a navegar pelos sinais do seu corpo com inteligência e carinho, transformando incertezas em controle e bem-estar.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Activity} 
            title="Monitoramento Inteligente" 
            description="Registre seus sintomas diários, desde ondas de calor até variações de humor, e visualize padrões claros sobre sua saúde."
            delay={0.2}
          />
          <FeatureCard 
            icon={Heart} 
            title="Cuidado Personalizado" 
            description="Receba orientações adaptadas especificamente para o que você está sentindo agora, baseadas em ciência e bem-estar."
            delay={0.4}
          />
          <FeatureCard 
            icon={Flower2} 
            title="Conexão com seu Corpo" 
            description="Reaprenda a ouvir seu corpo. Ferramentas de mindfulness e checklists para celebrar cada etapa dessa jornada poderosa."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default About;