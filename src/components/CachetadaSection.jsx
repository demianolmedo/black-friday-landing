import React, { useState, useEffect, useRef } from 'react';

const CachetadaSection = () => {
  const [currentFrame, setCurrentFrame] = useState(100);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Animación comienza cuando la imagen entra en pantalla (top <= windowHeight)
      // Termina cuando la imagen sale completamente (bottom <= 0)
      const scrollStart = rect.top - windowHeight;
      const scrollEnd = rect.top;
      const scrollRange = Math.abs(scrollStart);
      const scrollProgress = Math.max(0, Math.min(1, -scrollStart / scrollRange));

      // Map progress to frame range (100-119, total 20 frames)
      const startFrame = 100;
      const endFrame = 119;
      const totalFrames = endFrame - startFrame + 1;
      const frame = Math.floor(startFrame + scrollProgress * (totalFrames - 1));

      setCurrentFrame(frame);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="cachetada-section"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Sticky container for the image */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        <div className="relative max-w-4xl mx-auto px-4">
          {/* Animated image sequence */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-verde-neon/20 blur-3xl rounded-full"></div>

            {/* Image */}
            <img
              src={`/assets/Fondos e imagenes/${currentFrame}.png`}
              alt={`Animation frame ${currentFrame}`}
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-verde-neon to-emerald-400 transition-all duration-100"
                style={{ width: `${((currentFrame - 100) / 19) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-white/40 text-xs mt-2 font-inter">
              Scroll para ver la animación
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CachetadaSection;
