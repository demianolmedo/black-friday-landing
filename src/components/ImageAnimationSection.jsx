import React, { useState, useEffect, useRef } from 'react';

const ImageAnimationSection = () => {
  const [currentFrame, setCurrentFrame] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const animationCompleteRef = useRef(false);

  // Detectar si es móvil y preferencias de movimiento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionPreferenceChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
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

  // Lock/unlock body scroll on mobile
  useEffect(() => {
    if (isPinned && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isPinned, isMobile]);

  // Scroll-pinning effect - activates when section reaches center
  useEffect(() => {
    if (!imagesLoaded) return;

    const startFrame = 100;
    const endFrame = 129;
    const totalFrames = endFrame - startFrame + 1;
    const scrollPerFrame = 15;
    const animationScrollNeeded = totalFrames * scrollPerFrame;
    const bufferScrollNeeded = 150;
    const totalScrollNeeded = animationScrollNeeded + bufferScrollNeeded;

    let isTouchActive = false;
    let lastTouchY = 0;

    const updateOverlayOpacity = (scrollAccumulator) => {
      if (scrollAccumulator <= animationScrollNeeded) {
        setOverlayOpacity(1);
      } else {
        const bufferProgress = (scrollAccumulator - animationScrollNeeded) / bufferScrollNeeded;
        const opacity = Math.max(0, 1 - bufferProgress);
        setOverlayOpacity(opacity);
      }
    };

    const handleWheel = (e) => {
      if (!sectionRef.current || !imageContainerRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();

      // Check if section is visible in viewport (at least partially)
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      // Forward scroll - animating from start to end
      if (isVisible && !animationCompleteRef.current) {
        if (!isPinned) {
          setIsPinned(true);
          setShowOverlay(true);
          scrollAccumulatorRef.current = 0;
          setOverlayOpacity(1);
        }

        e.preventDefault();

        const delta = e.deltaY;
        const desktopSensitivity = 1.2;
        scrollAccumulatorRef.current += delta * desktopSensitivity;
        scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

        const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
        setScrollProgress(animationProgress);

        const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
        setCurrentFrame(frame);

        updateOverlayOpacity(scrollAccumulatorRef.current);

        if (scrollAccumulatorRef.current >= totalScrollNeeded) {
          animationCompleteRef.current = true;
          setIsPinned(false);
          setOverlayOpacity(0);
          setTimeout(() => {
            setShowOverlay(false);
          }, 700);
        }
      }
      // Reverse scroll
      else if (animationCompleteRef.current && e.deltaY < 0 && window.scrollY <= window.innerHeight * 2) {
        if (!isPinned) {
          setIsPinned(true);
          setShowOverlay(true);
          scrollAccumulatorRef.current = totalScrollNeeded;
          setScrollProgress(1);
          setCurrentFrame(endFrame);
          setOverlayOpacity(0);
        }

        e.preventDefault();

        const delta = e.deltaY;
        const desktopSensitivity = 1.2;
        scrollAccumulatorRef.current += delta * desktopSensitivity;
        scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

        const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
        setScrollProgress(animationProgress);

        const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
        setCurrentFrame(frame);

        updateOverlayOpacity(scrollAccumulatorRef.current);

        if (scrollAccumulatorRef.current <= 0) {
          animationCompleteRef.current = false;
          setIsPinned(false);
          setOverlayOpacity(1);
          setTimeout(() => {
            setShowOverlay(false);
          }, 700);
        }
      }
    };

    const handleTouchStart = (e) => {
      if (!sectionRef.current) return;

      const touch = e.touches[0];
      lastTouchY = touch.clientY;
      isTouchActive = true;
    };

    const handleTouchMove = (e) => {
      if (!sectionRef.current || !isTouchActive) return;

      const touchCurrentY = e.touches[0].clientY;
      const touchDelta = lastTouchY - touchCurrentY;

      lastTouchY = touchCurrentY;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();

      // Check if section is visible in viewport
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      // Forward scroll
      if (isVisible && !animationCompleteRef.current) {
        e.preventDefault();
        e.stopPropagation();

        if (!isPinned) {
          setIsPinned(true);
          setShowOverlay(true);
          scrollAccumulatorRef.current = 0;
          setOverlayOpacity(1);
        }

        const sensitivity = 5.0;
        scrollAccumulatorRef.current += touchDelta * sensitivity;
        scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

        const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
        setScrollProgress(animationProgress);

        const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
        setCurrentFrame(frame);

        updateOverlayOpacity(scrollAccumulatorRef.current);

        if (scrollAccumulatorRef.current >= totalScrollNeeded) {
          animationCompleteRef.current = true;
          setIsPinned(false);
          setOverlayOpacity(0);
          isTouchActive = false;
          setTimeout(() => {
            setShowOverlay(false);
          }, 600);
        }
      }
      // Reverse scroll
      else if (animationCompleteRef.current && touchDelta < 0) {
        e.preventDefault();
        e.stopPropagation();

        if (!isPinned) {
          setIsPinned(true);
          setShowOverlay(true);
          scrollAccumulatorRef.current = totalScrollNeeded;
          setScrollProgress(1);
          setCurrentFrame(endFrame);
          setOverlayOpacity(0);
        }

        const sensitivity = 5.0;
        scrollAccumulatorRef.current += touchDelta * sensitivity;
        scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

        const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
        setScrollProgress(animationProgress);

        const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
        setCurrentFrame(frame);

        updateOverlayOpacity(scrollAccumulatorRef.current);

        if (scrollAccumulatorRef.current <= 0) {
          animationCompleteRef.current = false;
          setIsPinned(false);
          setOverlayOpacity(1);
          isTouchActive = false;
          setTimeout(() => {
            setShowOverlay(false);
          }, 600);
        }
      }
    };

    const handleTouchEnd = () => {
      isTouchActive = false;
    };

    const handleNavClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.hash) {
        if (isPinned) {
          setIsPinned(false);
          setShowOverlay(false);
          animationCompleteRef.current = true;
          scrollAccumulatorRef.current = totalScrollNeeded;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('click', handleNavClick, true);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleNavClick, true);
    };
  }, [imagesLoaded, isPinned]);

  return (
    <>
      {isPinned && <div style={{ height: '100vh' }} />}

      {showOverlay && (
        <div
          className="fixed inset-0 bg-azul-principal z-40"
          style={{
            opacity: overlayOpacity,
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        />
      )}

      <section
        id="image-animation-section"
        ref={sectionRef}
        className={`w-full h-[50vh] flex items-center justify-center ${
          isPinned ? 'fixed top-0 left-0 right-0 z-50' : 'relative'
        }`}
        style={{
          height: isPinned ? '100vh' : '50vh',
          touchAction: isPinned ? 'none' : 'auto',
          transition: prefersReducedMotion
            ? 'none'
            : 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

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

        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-azul-principal">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h2 className="text-verde-neon font-black text-4xl md:text-6xl font-outfit neon-text">
                  RentSmart
                </h2>
                <p className="text-blanco/70 text-sm md:text-base mt-2 font-inter">
                  Black Friday - 50% OFF
                </p>
              </div>

              <div className="relative">
                <div className="w-20 h-20 border-4 border-white/10 border-t-verde-neon rounded-full animate-spin"></div>
              </div>

              <div className="w-64 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-verde-neon to-verde-neon/70 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>

              <p className="text-blanco/60 text-sm font-inter">
                Cargando experiencia... {loadingProgress}%
              </p>
            </div>
          </div>
        )}

        <div className={`relative z-10 w-[90vw] h-[45vh] mx-auto transition-opacity duration-700 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div ref={imageContainerRef} className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-verde-neon/20 blur-3xl rounded-full"></div>

            <img
              src={isMobile ? `/cachetada-movil/${currentFrame}.png` : `/assets/Fondos e imagenes/${currentFrame}.png`}
              alt="RentSmart Black Friday - Animación de descuento 50% OFF"
              className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl"
              style={{
                transition: 'opacity 30ms ease-out',
                willChange: 'opacity'
              }}
              loading="eager"
              fetchpriority="high"
              width="800"
              height="800"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageAnimationSection;
