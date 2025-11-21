import React from 'react';
import { Smartphone, QrCode } from 'lucide-react';
import QRCode from "react-qr-code";

const BoothMode: React.FC = () => {
  // Use current URL or a placeholder if running locally/dynamic
  const currentUrl = typeof window !== 'undefined' ? window.location.href : "https://menoflow.app";

  return (
    <section className="bg-stone-900 py-12 border-t border-stone-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-stone-800/50 p-6 rounded-3xl border border-stone-700">
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-900/50">
              <Smartphone className="text-white w-8 h-8" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg mb-1">Leve a MenoFlow com você</h3>
              <p className="text-stone-400 text-sm max-w-md">
                Você está visualizando a versão de demonstração em tablet. Escaneie o código para continuar sua jornada no seu celular com total privacidade.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white p-4 rounded-xl">
             <div className="h-24 w-24">
                <QRCode 
                  value={currentUrl} 
                  size={256} 
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
             </div>
             <div className="hidden sm:block">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Escaneie Agora</p>
                <div className="flex items-center gap-2 text-rose-600 font-medium text-sm">
                  <QrCode className="w-4 h-4" />
                  <span>Acesso Mobile</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BoothMode;