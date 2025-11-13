import React from 'react';

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center justify-center text-center space-y-6">

          {/* Green dot indicator */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-2.5 h-2.5 bg-verde-neon rounded-full animate-pulse-slow"></div>
            <div className="h-px w-8 bg-gradient-to-r from-verde-neon to-transparent"></div>
          </div>

          {/* Main Heading - 50% OFF */}
          <div className="space-y-2 animate-slide-up">
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

        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-azul-principal to-transparent"></div>
    </section>
  );
};

export default HeroSection;
