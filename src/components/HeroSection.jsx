import React, { useState, useEffect, useRef, useCallback } from 'react';

const HeroSection = () => {
  const [currentFrame, setCurrentFrame] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const animationCompleteRef = useRef(false);
  const pinnedPositionRef = useRef(0);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Precargar todas las imágenes de la secuencia
  useEffect(() => {
    const startFrame = 100;
    const endFrame = 129;
    const totalFrames = endFrame - startFrame + 1;
    let loadedCount = 0;

    const basePath = isMobile ? '/cachetada-movil' : '/assets/Fondos e imagenes';

    const preloadImages = () => {
      for (let i = startFrame; i <= endFrame; i++) {
        const img = new Image();
        img.src = `${basePath}/${i}.png`;

        img.onload = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / totalFrames) * 100);
          setLoadingProgress(progress);

          if (loadedCount === totalFrames) {
            setImagesLoaded(true);
          }
        };

        img.onerror = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / totalFrames) * 100);
          setLoadingProgress(progress);

          if (loadedCount === totalFrames) {
            setImagesLoaded(true);
          }
        };
      }
    };

    preloadImages();
  }, [isMobile]);

  // Advanced scroll-pinning effect with bidirectional animation
  useEffect(() => {
    if (!imagesLoaded) return;

    const startFrame = 100;
    const endFrame = 129;
    const totalFrames = endFrame - startFrame + 1; // 30 frames
    const scrollPerFrame = 30; // Pixels to scroll per frame (adjustable)
    const totalScrollNeeded = totalFrames * scrollPerFrame; // 30 * 30 = 900px

    let ticking = false;

    const handleWheel = (e) => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();

      // Check if section is at the top of viewport
      const isAtTop = rect.top <= 0 && rect.bottom > 0;

      if (isAtTop && !animationCompleteRef.current) {
        // Entering pin phase from top
        if (!isPinned) {
          setIsPinned(true);
          scrollAccumulatorRef.current = 0;
        }

        if (isPinned) {
          e.preventDefault();

          const delta = e.deltaY;
          scrollAccumulatorRef.current += delta;
          scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

          const progress = scrollAccumulatorRef.current / totalScrollNeeded;
          setScrollProgress(progress);

          const frame = Math.round(startFrame + progress * (endFrame - startFrame));
          setCurrentFrame(frame);

          // Check if animation complete
          if (progress >= 1) {
            animationCompleteRef.current = true;
            setIsPinned(false);
          }
        }
      } else if (animationCompleteRef.current && e.deltaY < 0 && window.scrollY <= window.innerHeight + 100) {
        // Re-entering from below (scrolling up)
        if (!isPinned) {
          setIsPinned(true);
          scrollAccumulatorRef.current = totalScrollNeeded;
          setScrollProgress(1);
          setCurrentFrame(endFrame);
        }

        if (isPinned) {
          e.preventDefault();

          const delta = e.deltaY;
          scrollAccumulatorRef.current += delta;
          scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

          const progress = scrollAccumulatorRef.current / totalScrollNeeded;
          setScrollProgress(progress);

          const frame = Math.round(startFrame + progress * (endFrame - startFrame));
          setCurrentFrame(frame);

          // Check if back to start
          if (progress <= 0) {
            animationCompleteRef.current = false;
            setIsPinned(false);
          }
        }
      }
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    let lastTouchY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
    };

    const handleTouchMove = (e) => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const isAtTop = rect.top <= 0 && rect.bottom > 0;

      const touchCurrentY = e.touches[0].clientY;
      const touchDelta = lastTouchY - touchCurrentY;
      lastTouchY = touchCurrentY;

      if (isAtTop && !animationCompleteRef.current) {
        if (!isPinned) {
          setIsPinned(true);
          scrollAccumulatorRef.current = 0;
        }

        if (isPinned) {
          e.preventDefault();

          scrollAccumulatorRef.current += touchDelta * 1.5;
          scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

          const progress = scrollAccumulatorRef.current / totalScrollNeeded;
          setScrollProgress(progress);

          const frame = Math.round(startFrame + progress * (endFrame - startFrame));
          setCurrentFrame(frame);

          if (progress >= 1) {
            animationCompleteRef.current = true;
            setIsPinned(false);
          }
        }
      } else if (animationCompleteRef.current && touchDelta < 0 && window.scrollY <= window.innerHeight + 100) {
        if (!isPinned) {
          setIsPinned(true);
          scrollAccumulatorRef.current = totalScrollNeeded;
          setScrollProgress(1);
          setCurrentFrame(endFrame);
        }

        if (isPinned) {
          e.preventDefault();

          scrollAccumulatorRef.current += touchDelta * 1.5;
          scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

          const progress = scrollAccumulatorRef.current / totalScrollNeeded;
          setScrollProgress(progress);

          const frame = Math.round(startFrame + progress * (endFrame - startFrame));
          setCurrentFrame(frame);

          if (progress <= 0) {
            animationCompleteRef.current = false;
            setIsPinned(false);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [imagesLoaded, isPinned, scrollProgress]);

  return (
    <>
      {/* Spacer to prevent layout shift when section is pinned */}
      {isPinned && <div style={{ height: '100vh' }} />}

      <section
        id="hero-section"
        ref={sectionRef}
        className={`w-full min-h-screen overflow-hidden transition-all duration-300 ${
          isPinned
            ? 'fixed top-0 left-0 right-0 z-50'
            : 'relative'
        }`}
        style={{
          height: isPinned ? '100vh' : 'auto'
        }}
      >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      {/* Scroll Progress Indicator - Only visible when pinned */}
      {isPinned && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-2">
          <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-verde-neon to-verde-neon/70 transition-all duration-100 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            ></div>
          </div>
          <p className="text-white/50 text-xs font-inter rotate-90 whitespace-nowrap mt-8">
            Scroll {Math.round(scrollProgress * 100)}%
          </p>
        </div>
      )}

      {/* Loading Overlay - Mostrar mientras se cargan las imágenes */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-azul-principal">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo o texto de marca */}
            <div className="text-center">
              <h2 className="text-verde-neon font-black text-4xl md:text-6xl font-outfit neon-text">
                RentSmart
              </h2>
              <p className="text-blanco/70 text-sm md:text-base mt-2 font-inter">
                Black Friday - 50% OFF
              </p>
            </div>

            {/* Spinner de carga */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-white/10 border-t-verde-neon rounded-full animate-spin"></div>
            </div>

            {/* Barra de progreso */}
            <div className="w-64 bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-verde-neon to-verde-neon/70 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>

            {/* Porcentaje de carga */}
            <p className="text-blanco/60 text-sm font-inter">
              Cargando experiencia... {loadingProgress}%
            </p>
          </div>
        </div>
      )}

      {/* Content container */}
      <div className={`relative w-full min-h-screen flex items-center justify-center pt-32 pb-16 transition-opacity duration-700 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
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

            {/* Animated image sequence */}
            <div className="relative w-full max-w-2xl mx-auto mt-12 animate-fade-in">
              <div className="relative w-full aspect-square">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-verde-neon/20 blur-3xl rounded-full"></div>

                {/* Image - Optimized for LCP (Largest Contentful Paint) */}
                <img
                  src={isMobile ? `/cachetada-movil/${currentFrame}.png` : `/assets/Fondos e imagenes/${currentFrame}.png`}
                  alt="RentSmart Black Friday - 50% OFF en alquiler de autos Miami Orlando"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-all duration-50 ease-linear"
                  loading="eager"
                  fetchpriority="high"
                  width="800"
                  height="800"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default HeroSection;
