import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 text-center border-t border-rose-50">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-2xl text-rose-900 mb-4">MenoFlow</h2>
        <div className="flex items-center justify-center gap-2 text-stone-500 text-sm mb-8">
          <span>Feito com</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>para todas as mulheres</span>
        </div>
        <p className="text-xs text-stone-400 max-w-lg mx-auto">
          As informações contidas neste site têm caráter informativo e não substituem o aconselhamento médico profissional. Consulte sempre seu ginecologista.
        </p>
      </div>
    </footer>
  );
};

export default Footer;