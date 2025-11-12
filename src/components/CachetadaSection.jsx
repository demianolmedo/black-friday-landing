import React, { useState, useEffect, useRef } from 'react';

const CachetadaSection = () => {
  const [currentFrame, setCurrentFrame] = useState(100);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through this section
      // When section top is at bottom of viewport, progress = 0
      // When section bottom is at top of viewport, progress = 1
      const scrollStart = rect.top - windowHeight;
      const scrollEnd = rect.bottom;
      const scrollRange = scrollEnd - scrollStart;
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
      className="relative w-full min-h-[200vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Sticky container for the image */}
      <div className="sticky top-[120px] w-full h-screen flex items-center justify-center">
        <div className="relative max-w-4xl mx-auto px-4">
          {/* Animated image sequence */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-verde-neon/20 blur-3xl rounded-full"></div>

            {/* Image */}
            <img
              src={`/src/assets/Fondos e imagenes/${currentFrame}.png`}
              alt={`Cachetada frame ${currentFrame}`}
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.target.style.display = 'none';
              }}
            />

            {/* Fallback placeholder if image fails to load */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-verde-neon text-6xl font-black font-outfit neon-text mb-4">
                  CACHETADA
                </div>
                <p className="text-white/50 text-sm font-inter">
                  Frame: {currentFrame}/119
                </p>
              </div>
            </div>
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
