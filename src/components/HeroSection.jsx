import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [currentFrame, setCurrentFrame] = useState(100);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Animation starts from page load (frame 100 visible)
      // and progresses quickly as user scrolls

      // Get total scroll position from top of page
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;

      // Animation completes in first 800px of scroll (very fast)
      const animationRange = 800;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, scrolled / animationRange));

      // Map progress to frame range (100-119, total 20 frames)
      const startFrame = 100;
      const endFrame = 119;
      const frame = Math.round(startFrame + scrollProgress * (endFrame - startFrame));

      setCurrentFrame(frame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
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

            {/* Green dot indicator */}
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-3 h-3 bg-verde-neon rounded-full animate-pulse-slow"></div>
              <div className="h-px w-12 bg-gradient-to-r from-verde-neon to-transparent"></div>
            </div>

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
              <p className="text-xl sm:text-2xl md:text-3xl text-white/70 font-medium font-inter tracking-wide">
                cachetadas de
              </p>

              {/* DESCUENTOS% */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-blanco tracking-[0.3em] uppercase font-outfit">
                DESCUENTOS<span className="text-verde-neon">%</span>
              </h2>
            </div>

            {/* Animated image sequence */}
            <div className="relative w-full max-w-2xl mx-auto mt-12 animate-fade-in">
              <div className="relative w-full aspect-square">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-verde-neon/20 blur-3xl rounded-full"></div>

                {/* Image */}
                <img
                  src={`/assets/Fondos e imagenes/${currentFrame}.png`}
                  alt={`Animation frame ${currentFrame}`}
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-all duration-50 ease-linear"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
