import React from 'react';

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full h-[50vh] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="relative w-full h-full flex items-center justify-center pt-20 pb-8">
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center justify-center text-center space-y-8">

            {/* Main Heading - 50% OFF */}
            <div className="space-y-2 animate-slide-up">
              <h1 className="flex items-end justify-center font-black tracking-tight leading-none font-outfit">
                <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-verde-neon drop-shadow-[0_0_40px_rgba(0,255,127,0.6)] neon-text">
                  50%
                </span>
                <span className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] text-blanco ml-2 mb-1">
                  off
                </span>
              </h1>

              {/* Separator line */}
              <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-verde-neon/50 to-transparent"></div>

              {/* Subtitle "cachetadas de" */}
              <p className="text-2xl sm:text-3xl md:text-4xl text-white/70 font-medium font-inter tracking-wide">
                cachetadas de
              </p>

              {/* DESCUENTOS% */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blanco tracking-[0.3em] uppercase font-outfit">
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
