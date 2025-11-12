import React from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import CTAButton from './CTAButton';

const ContentSection = ({ onCTAClick }) => {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue to-navy-dark"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16 md:space-y-20">

          {/* Main message */}
          <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl mx-auto">
              RECUERDAS ESE MOMENTO INCÓMODO{' '}
              <span className="text-neon-green">CUANDO PENSASTE</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              ¿Y si hay una mejor forma de gestionar tus propiedades?
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto animate-slide-left">

            {/* Feature 1 */}
            <div className="group relative bg-navy-blue/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-neon-green/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

              <div className="relative space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-neon-green/20 to-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-neon-green" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Rápida
                </h3>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Gestión ágil y eficiente de todas tus propiedades en un solo lugar
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-navy-blue/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-neon-green/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

              <div className="relative space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-neon-green/20 to-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-neon-green" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Alertas
                </h3>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Notificaciones inteligentes para mantener todo bajo control
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-navy-blue/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-neon-green/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

              <div className="relative space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-neon-green/20 to-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-neon-green" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Manejo
                </h3>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Control total de inquilinos, pagos y mantenimiento
                </p>
              </div>
            </div>

          </div>

          {/* Black Friday Announcement */}
          <div className="text-center space-y-8 sm:space-y-10 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block">
                <div className="bg-gradient-to-r from-neon-green/20 via-neon-green/10 to-transparent px-6 py-2 rounded-full border border-neon-green/30">
                  <p className="text-neon-green text-sm sm:text-base font-bold uppercase tracking-wider">
                    Black Friday Special
                  </p>
                </div>
              </div>

              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white">
                CONSIGUE TU{' '}
                <span className="text-neon-green drop-shadow-[0_0_30px_rgba(0,255,148,0.5)]">
                  50% OFF
                </span>
              </h3>

              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-bold">
                Esta{' '}
                <span className="text-neon-green underline decoration-wavy decoration-neon-green/50">
                  Black Friday
                </span>
                {' '}(5) días la cachetada
              </p>

              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Accede ahora y transforma la manera en que gestionas tus propiedades
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center animate-slide-right">
              <CTAButton onClick={onCTAClick} />
            </div>
          </div>

          {/* Additional info */}
          <div className="text-center space-y-4 animate-fade-in">
            <p className="text-white/50 text-sm sm:text-base max-w-3xl mx-auto">
              * Oferta válida solo durante el Black Friday. Cupos limitados.
              <br />
              No requiere código promocional. Descuento aplicado automáticamente.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContentSection;
