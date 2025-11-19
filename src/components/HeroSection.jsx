import React from 'react';

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full h-[50vh] overflow-x-hidden mb-8 md:mb-0 lg:mb-0 xl:mb-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="relative w-full h-full flex items-center justify-center pt-12 sm:pt-20 md:pt-0 lg:pt-0 xl:pt-16 2xl:pt-12 pb-2 md:pb-0 lg:pb-0">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center justify-center text-center space-y-3 md:space-y-0 lg:space-y-0 xl:space-y-3">

            {/* Main Heading - 50% OFF */}
            <div className="space-y-1 md:space-y-0 lg:space-y-0 xl:space-y-1 animate-slide-up">
              <h1 className="flex items-end justify-center font-black tracking-tight leading-[0.75] font-outfit">
                <span className="text-[8rem] sm:text-[8rem] md:text-[2.5rem] lg:text-[3.5rem] xl:text-[20rem] text-verde-neon drop-shadow-[0_0_40px_rgba(0,255,127,0.6)] neon-text">
                  50%
                </span>
                <span className="text-[4rem] sm:text-[4rem] md:text-[1.25rem] lg:text-[1.75rem] xl:text-[10rem] text-blanco ml-1 md:ml-0.5 lg:ml-1 mb-1 md:mb-0 lg:mb-0">
                  off
                </span>
              </h1>

              {/* Separator line */}
              <div className="h-px w-32 sm:w-48 md:w-20 lg:w-24 mx-auto bg-gradient-to-r from-transparent via-verde-neon/50 to-transparent md:hidden lg:hidden xl:block"></div>

              {/* Subtitle "cachetadas de" */}
              <p className="text-3xl sm:text-3xl md:text-[12px] lg:text-[14px] xl:text-[54px] text-white font-medium font-inter tracking-wide leading-none m-0 mb-1 md:mb-0 lg:mb-0">
                cachetadas de
              </p>

              {/* DESCUENTOS% */}
              <h2 className="text-[33px] sm:text-[33px] md:text-[14px] lg:text-[16px] xl:text-[57px] font-black text-blanco tracking-[0.2em] md:tracking-[0.15em] lg:tracking-[0.2em] uppercase font-outfit leading-none m-0">
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
