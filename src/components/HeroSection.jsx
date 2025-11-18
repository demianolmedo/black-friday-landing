import React from 'react';

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-16">
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center justify-center text-center space-y-8">

            {/* Main Heading - 50% OFF */}
            <div className="space-y-4 animate-slide-up">
              <h1 className="flex items-end justify-center font-black tracking-tight leading-none font-outfit">
                <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] text-verde-neon drop-shadow-[0_0_40px_rgba(0,255,127,0.6)] neon-text">
                  50%
                </span>
                <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-blanco ml-4 mb-2">
                  off
                </span>
              </h1>

              {/* Separator line */}
              <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-verde-neon/50 to-transparent"></div>

              {/* Subtitle "cachetadas de" */}
              <p className="text-4xl sm:text-4xl md:text-6xl text-white/70 font-medium font-inter tracking-wide">
                cachetadas de
              </p>

              {/* DESCUENTOS% */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-blanco tracking-[0.3em] uppercase font-outfit">
                DESCUENTOS<span className="text-verde-neon">%</span>
              </h2>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
