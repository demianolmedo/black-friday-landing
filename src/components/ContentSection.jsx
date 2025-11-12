import React from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import CTAButton from './CTAButton';

const ContentSection = ({ onCTAClick }) => {
  return (
    <section className="relative w-full py-10 sm:py-12 md:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue to-navy-dark"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 sm:space-y-12 md:space-y-14">

          {/* CTA Button First */}
          <div className="flex justify-center animate-fade-in">
            <CTAButton
              text="QUIERO MI DESCUENTO AHORA"
              onClick={onCTAClick}
            />
          </div>

          {/* Main message */}
          <div className="text-center space-y-4 sm:space-y-6 animate-fade-in">
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
              Si todavía sigues pensando por qué,<br/>
              duele más que una cachetada
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl mx-auto uppercase">
              RECUERDAS ESE MOMENTO INCÓMODO{' '}
              <span className="text-neon-green">CUANDO PENSASTE</span>
            </h2>
          </div>

          {/* Speech bubbles section */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto animate-fade-in">
            <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base">
              ¿Y esta espera?
            </div>
            <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base">
              ¡No se supone que era rápido!
            </div>
            <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base text-center">
              ¿Por qué mi#%$a me<br/>están cobrando esto?
            </div>
          </div>

          {/* Features text */}
          <div className="text-center space-y-3 animate-slide-left">
            <p className="text-sm sm:text-base text-white/60">
              A tus clientes les
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              firmas, <span className="text-neon-green">alertizas</span> y manejas
            </h3>
            <p className="text-xs sm:text-sm text-white/50 max-w-2xl mx-auto">
              Sin el dinero, de las formas tradicionales.
            </p>
          </div>

          {/* Spacer */}
          <div className="py-4"></div>

          {/* Black Friday Announcement */}
          <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-white/60">
                Reserva ya con el
              </p>

              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none">
                50% OFF
              </h3>

              <div className="space-y-2">
                <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold">
                  Esta <span className="bg-black text-white px-3 py-1 rounded">Black Friday</span>, tú das la cachetada
                </p>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base text-white/70 max-w-3xl mx-auto">
                  <p>A los abusivos</p>
                  <span className="text-neon-green">•</span>
                  <p>A los lentos pequeños</p>
                  <span className="text-neon-green">•</span>
                  <p>A los que creen que son buenos tratándole si no eres empresas</p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto pt-4">
                Empresas tu salta del apuro<br/>
                La página se abre en directo
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-center space-y-3 animate-fade-in">
            <p className="text-sm sm:text-base text-white/50 max-w-3xl mx-auto">
              Recibe tu cotización personalizada en segundos<br/>
              Y aprovecha el 30% de sobre
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContentSection;
