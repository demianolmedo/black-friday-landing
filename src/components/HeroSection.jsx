import React from 'react';

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">

          {/* Green dot indicator */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-2.5 h-2.5 bg-verde-neon rounded-full animate-pulse-slow"></div>
            <div className="h-px w-8 bg-gradient-to-r from-verde-neon to-transparent"></div>
          </div>

          {/* Main Heading - 50% OFF */}
          <div className="space-y-1 animate-slide-up">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none font-outfit">
              <span className="text-verde-neon drop-shadow-[0_0_30px_rgba(0,255,127,0.5)] neon-text">
                50%
              </span>
              <span className="text-blanco text-4xl sm:text-5xl md:text-6xl ml-2 align-top">
                off
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-blanco tracking-[0.3em] uppercase font-outfit">
              DESCUENTOS<span className="text-verde-neon">%</span>
            </h2>
          </div>

          {/* Offer Card */}
          <div className="relative w-full max-w-sm mx-auto mt-2 animate-scale-in">
            <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6">

              {/* Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-verde-neon to-emerald-400 text-azul-principal px-5 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                  ¡Sin cuota de inscripción!
                </div>
              </div>

              <div className="space-y-3 mt-2">
                {/* Title */}
                <div className="text-center space-y-0.5">
                  <p className="text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-widest font-inter">
                    Hasta
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-black text-blanco leading-none font-outfit">
                    50% OFF
                  </h3>
                  <p className="text-blanco text-base sm:text-lg font-semibold uppercase tracking-wide font-outfit">
                    EN RESERVAS
                  </p>
                  <p className="text-white/50 text-xs pt-1 font-inter">
                    ¡Sin pagar la cuota de primera vez<br />y obten precios fijos!
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-verde-neon/30 to-transparent my-3"></div>

                {/* Stats Grid */}
                <div className="flex justify-between items-center px-4 text-center">
                  <div className="space-y-0.5">
                    <p className="text-verde-neon text-2xl font-black font-outfit neon-text">50</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider font-inter">
                      descuentos<br />disponibles
                    </p>
                  </div>

                  <div className="h-12 w-px bg-white/10"></div>

                  <div className="space-y-0.5">
                    <p className="text-verde-neon text-2xl font-black font-outfit neon-text">50</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider font-inter">
                      reservas<br />*Sin cuota de exp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-azul-principal to-transparent"></div>
    </section>
  );
};

export default HeroSection;
