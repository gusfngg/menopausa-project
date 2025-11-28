import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smile, Frown, Meh, 
  Moon, Sun, CloudRain, 
  Flame, Wind, ThermometerSun, // Icons for Hot Flashes
  Zap, Battery, BatteryWarning, // Icons for Energy
  Send, Sparkles, CheckCircle2, Activity 
} from 'lucide-react';
import { SymptomData, AIAdviceResponse } from '../types';
import { getPersonalizedAdvice } from '../services/geminiService';

const MoodButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button
    onClick={onClick}
    type="button"
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
      active 
        ? 'bg-rose-500 text-white shadow-lg shadow-rose-300/50 scale-105' 
        : 'bg-white text-stone-400 border border-stone-100 hover:border-rose-200 hover:text-rose-400'
    }`}
  >
    <Icon className="w-8 h-8" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const getIntensityInfo = (level: number) => {
  if (level <= 3) return { 
    label: "Suave", 
    desc: "Sinto as mudanças, mas sigo minha rotina normalmente.",
    color: "text-stone-500"
  };
  if (level <= 6) return { 
    label: "Moderado", 
    desc: "Causa desconforto e exige pequenas pausas no dia.",
    color: "text-rose-400"
  };
  if (level <= 8) return { 
    label: "Intenso", 
    desc: "Está difícil concentrar ou realizar tarefas agora.",
    color: "text-rose-600"
  };
  return { 
    label: "Extremo", 
    desc: "Preciso de acolhimento e repouso imediato.",
    color: "text-rose-800"
  };
};

const SymptomTracker: React.FC = () => {
  const [formData, setFormData] = useState<SymptomData>({
    intensity: 5,
    mood: '',
    sleepQuality: '',
    hotFlashes: '',
    energyLevel: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAdviceResponse | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.mood || !formData.sleepQuality || !formData.hotFlashes || !formData.energyLevel) return;
    
    // Save form data before resetting
    const submittedData = { ...formData };
    
    setLoading(true);
    setResult(null);
    setProgress(0);
    
    // Reset form
    setFormData({
      intensity: 5,
      mood: '',
      sleepQuality: '',
      hotFlashes: '',
      energyLevel: '',
      notes: ''
    });
    
    const messages = [
      'Analisando seus sinais...',
      'Consultando especialistas...',
      'Preparando orientações...',
      'Finalizando análise...'
    ];
    
    let currentMessage = 0;
    setLoadingMessage(messages[0]);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        
        // Change message at specific progress points
        if (next >= 25 && currentMessage === 0) {
          currentMessage = 1;
          setLoadingMessage(messages[1]);
        } else if (next >= 50 && currentMessage === 1) {
          currentMessage = 2;
          setLoadingMessage(messages[2]);
        } else if (next >= 75 && currentMessage === 2) {
          currentMessage = 3;
          setLoadingMessage(messages[3]);
        }
        
        return next;
      });
    }, 50);
    
    // Small delay to ensure UI transitions smoothly before API call
    setTimeout(async () => {
      const advice = await getPersonalizedAdvice(submittedData);
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setResult(advice);
        setLoading(false);
      }, 300);
    }, 500);
  };

  const intensityInfo = getIntensityInfo(formData.intensity);
  const isFormValid = formData.mood && formData.sleepQuality && formData.hotFlashes && formData.energyLevel;

  return (
    <section id="tracker" className="py-24 bg-rose-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-rose-200/40 border border-white"
          >
            <div className="mb-8">
              <h2 className="font-serif text-4xl text-rose-900 mb-2">Como você está hoje?</h2>
              <p className="text-stone-500">Compartilhe seus sinais para recebermos com carinho e informação.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Dynamic Intensity Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Sensação Corporal
                  </label>
                  <span className={`font-serif text-2xl font-medium transition-colors duration-300 ${intensityInfo.color}`}>
                    {intensityInfo.label}
                  </span>
                </div>
                
                <div className="relative h-14 bg-stone-100 rounded-2xl p-2 border border-stone-200">
                  <div 
                    className="absolute left-2 right-2 top-1/2 h-2 bg-gradient-to-r from-stone-300 via-rose-300 to-rose-600 rounded-full -translate-y-1/2 pointer-events-none"
                  />
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="1"
                    value={formData.intensity} 
                    onChange={(e) => setFormData({...formData, intensity: parseInt(e.target.value)})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <motion.div 
                    className="absolute top-1/2 w-10 h-10 bg-white border-4 border-rose-500 rounded-full shadow-lg -translate-y-1/2 pointer-events-none flex items-center justify-center z-0"
                    style={{ left: `calc(${((formData.intensity - 1) / 9) * 100}% - 20px)` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <span className="text-xs font-bold text-rose-900">{formData.intensity}</span>
                  </motion.div>
                </div>
                
                <motion.div 
                   key={intensityInfo.label}
                   initial={{ opacity: 0, y: -5 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-right"
                >
                  <p className="text-sm text-stone-500 italic">
                    "{intensityInfo.desc}"
                  </p>
                </motion.div>
              </div>

              {/* Mood Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-rose-900 uppercase tracking-wider">Humor</label>
                <div className="grid grid-cols-3 gap-4">
                  <MoodButton 
                    active={formData.mood === 'Feliz'} 
                    onClick={() => setFormData({...formData, mood: 'Feliz'})} 
                    icon={Smile} 
                    label="Radiante" 
                  />
                  <MoodButton 
                    active={formData.mood === 'Neutro'} 
                    onClick={() => setFormData({...formData, mood: 'Neutro'})} 
                    icon={Meh} 
                    label="Neutro" 
                  />
                  <MoodButton 
                    active={formData.mood === 'Sensível'} 
                    onClick={() => setFormData({...formData, mood: 'Sensível'})} 
                    icon={Frown} 
                    label="Sensível" 
                  />
                </div>
              </div>

              {/* Sleep Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-rose-900 uppercase tracking-wider">Sono</label>
                <div className="grid grid-cols-3 gap-4">
                  <MoodButton 
                    active={formData.sleepQuality === 'Bom'} 
                    onClick={() => setFormData({...formData, sleepQuality: 'Bom'})} 
                    icon={Sun} 
                    label="Restaurador" 
                  />
                  <MoodButton 
                    active={formData.sleepQuality === 'Regular'} 
                    onClick={() => setFormData({...formData, sleepQuality: 'Regular'})} 
                    icon={CloudRain} 
                    label="Inquieto" 
                  />
                  <MoodButton 
                    active={formData.sleepQuality === 'Ruim'} 
                    onClick={() => setFormData({...formData, sleepQuality: 'Ruim'})} 
                    icon={Moon} 
                    label="Insônia" 
                  />
                </div>
              </div>

              {/* Hot Flashes */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-rose-900 uppercase tracking-wider">Ondas de Calor</label>
                <div className="grid grid-cols-3 gap-4">
                  <MoodButton 
                    active={formData.hotFlashes === 'Ausente'} 
                    onClick={() => setFormData({...formData, hotFlashes: 'Ausente'})} 
                    icon={ThermometerSun} 
                    label="Ausente" 
                  />
                  <MoodButton 
                    active={formData.hotFlashes === 'Ocasional'} 
                    onClick={() => setFormData({...formData, hotFlashes: 'Ocasional'})} 
                    icon={Wind} 
                    label="Ocasional" 
                  />
                  <MoodButton 
                    active={formData.hotFlashes === 'Frequente'} 
                    onClick={() => setFormData({...formData, hotFlashes: 'Frequente'})} 
                    icon={Flame} 
                    label="Frequente" 
                  />
                </div>
              </div>

              {/* Energy Level */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-rose-900 uppercase tracking-wider">Disposição</label>
                <div className="grid grid-cols-3 gap-4">
                  <MoodButton 
                    active={formData.energyLevel === 'Alta'} 
                    onClick={() => setFormData({...formData, energyLevel: 'Alta'})} 
                    icon={Zap} 
                    label="Alta" 
                  />
                  <MoodButton 
                    active={formData.energyLevel === 'Estável'} 
                    onClick={() => setFormData({...formData, energyLevel: 'Estável'})} 
                    icon={Battery} 
                    label="Estável" 
                  />
                  <MoodButton 
                    active={formData.energyLevel === 'Baixa'} 
                    onClick={() => setFormData({...formData, energyLevel: 'Baixa'})} 
                    icon={BatteryWarning} 
                    label="Baixa" 
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-rose-900 uppercase tracking-wider">Notas (Opcional)</label>
                <textarea 
                  className="w-full p-4 bg-rose-50/50 rounded-2xl border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none text-rose-900 placeholder:text-rose-300 transition-all"
                  rows={2}
                  placeholder="Mais alguma coisa..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || !isFormValid}
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-rose-400/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                <Send className={`w-5 h-5 transition-transform ${loading ? 'opacity-0' : 'group-hover:translate-x-1'}`} />
                {loading ? "Enviando para análise..." : "Receber Orientação"}
              </button>
            </form>
          </motion.div>

          {/* Result Section */}
          <div className="relative min-h-[400px] flex items-center sticky top-24">
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full text-center space-y-6"
                >
                  <div className="w-64 h-64 bg-white/50 backdrop-blur rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-inner">
                    <Sparkles className="w-24 h-24 text-rose-200" />
                  </div>
                  <h3 className="font-serif text-3xl text-rose-300">Sua orientação aparecerá aqui</h3>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md mx-auto text-center"
                >
                  <div className="mb-8 relative w-32 h-32 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background Track */}
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#ffe4e6" 
                        strokeWidth="6" 
                      />
                      {/* Progress Arc */}
                      <motion.circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#e11d48" 
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * progress) / 100}
                        transition={{ duration: 0.2, ease: "linear" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-rose-600 font-bold">
                      {Math.floor(progress)}%
                    </div>
                  </div>
                  
                  <motion.div
                    key={loadingMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-12"
                  >
                    <h3 className="text-xl font-serif text-rose-900 mb-1">{loadingMessage}</h3>
                    <div className="flex justify-center gap-1">
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-white to-rose-50 p-8 rounded-[2.5rem] shadow-2xl border border-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-pink-600" />
                    
                    <h3 className="font-serif text-3xl text-rose-800 mb-6 flex items-center gap-3">
                      <Sparkles className="text-yellow-500 w-6 h-6" />
                      Seu Momento
                    </h3>
                    
                    <p className="text-lg text-stone-700 leading-relaxed mb-8 border-l-4 border-rose-300 pl-4">
                      {result.advice}
                    </p>

                    <div className="space-y-4">
                      <h4 className="font-bold text-rose-900 uppercase tracking-wider text-sm mb-4">Recomendações para hoje</h4>
                      {result.actionableSteps.map((step, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.2 }}
                          className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-rose-50"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-stone-700">{step}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-rose-100 text-center">
                       <button 
                        onClick={() => setResult(null)}
                        className="text-rose-500 text-sm font-medium hover:text-rose-700 transition-colors"
                       >
                         Nova consulta
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SymptomTracker;