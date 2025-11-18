import React, { useState, useEffect, useRef, useCallback } from 'react';

const HeroSection = () => {
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
  const lastScrollYRef = useRef(0);
  const animationCompleteRef = useRef(false);
  const pinnedPositionRef = useRef(0);

  // Detectar si es móvil y preferencias de movimiento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check for reduced motion preference (accessibility)
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

  // Advanced scroll-pinning effect with buffer zone and smooth fade
  useEffect(() => {
    if (!imagesLoaded) return;

    const startFrame = 100;
    const endFrame = 129;
    const totalFrames = endFrame - startFrame + 1; // 30 frames
    const scrollPerFrame = 15; // Pixels to scroll per frame (highly optimized for mobile)
    const animationScrollNeeded = totalFrames * scrollPerFrame; // 450px for animation
    const bufferScrollNeeded = 150; // Extra 150px buffer zone for smooth fade
    const totalScrollNeeded = animationScrollNeeded + bufferScrollNeeded; // 600px total

    let ticking = false;
    let isOverImage = false;

    const updateOverlayOpacity = (scrollAccumulator) => {
      // Calculate overlay opacity based on scroll position
      if (scrollAccumulator <= animationScrollNeeded) {
        // During animation phase: overlay solid (opacity = 1)
        setOverlayOpacity(1);
      } else {
        // During buffer phase: fade overlay from 1 to 0
        const bufferProgress = (scrollAccumulator - animationScrollNeeded) / bufferScrollNeeded;
        const opacity = Math.max(0, 1 - bufferProgress);
        setOverlayOpacity(opacity);
      }
    };

    const handleWheel = (e) => {
      if (!sectionRef.current || !imageContainerRef.current) return;

      // Check if mouse is over the image container
      const imageRect = imageContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const isMouseOverImage =
        mouseX >= imageRect.left &&
        mouseX <= imageRect.right &&
        mouseY >= imageRect.top &&
        mouseY <= imageRect.bottom;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();

      // Check if section is at the top of viewport
      const isAtTop = rect.top <= 0 && rect.bottom > 0;

      // Only activate pin if mouse is over image AND section is at top
      if (isAtTop && !animationCompleteRef.current && isMouseOverImage) {
        // Entering pin phase from top
        if (!isPinned) {
          setIsPinned(true);
          setShowOverlay(true);
          scrollAccumulatorRef.current = 0;
          setOverlayOpacity(1);
        }

        // Only prevent default scroll if mouse is still over image
        if (isPinned && isMouseOverImage) {
          e.preventDefault();

          const delta = e.deltaY;
          const desktopSensitivity = 1.2;
          scrollAccumulatorRef.current += delta * desktopSensitivity;
          scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

          // Update animation progress (capped at frame animation zone)
          const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
          setScrollProgress(animationProgress);

          const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
          setCurrentFrame(frame);

          // Update overlay opacity
          updateOverlayOpacity(scrollAccumulatorRef.current);

          // Check if fully complete (animation + buffer)
          if (scrollAccumulatorRef.current >= totalScrollNeeded) {
            animationCompleteRef.current = true;
            setIsPinned(false);
            setOverlayOpacity(0);
            // Remove overlay from DOM after fade completes
            setTimeout(() => {
              setShowOverlay(false);
            }, 700); // Slightly longer than transition duration
          }
        }
      }
      // If mouse is NOT over image but we're pinned, allow normal scroll
      else if (isPinned && !isMouseOverImage && !animationCompleteRef.current) {
        // Mouse left the image area - allow normal scroll by not preventing default
        // The page will scroll naturally
      } else if (animationCompleteRef.current && e.deltaY < 0 && window.scrollY <= window.innerHeight + bufferScrollNeeded && isMouseOverImage) {
        // Re-entering from below (scrolling up) - only if mouse is over image
        if (!isPinned) {
          setIsPinned(true);
          setShowOverlay(true);
          scrollAccumulatorRef.current = totalScrollNeeded;
          setScrollProgress(1);
          setCurrentFrame(endFrame);
          setOverlayOpacity(0);
        }

        // Only prevent default scroll if mouse is still over image
        if (isPinned && isMouseOverImage) {
          e.preventDefault();

          const delta = e.deltaY;
          const desktopSensitivity = 1.2;
          scrollAccumulatorRef.current += delta * desktopSensitivity;
          scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

          // Update animation progress
          const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
          setScrollProgress(animationProgress);

          const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
          setCurrentFrame(frame);

          // Update overlay opacity (reverse fade)
          updateOverlayOpacity(scrollAccumulatorRef.current);

          // Check if back to start
          if (scrollAccumulatorRef.current <= 0) {
            animationCompleteRef.current = false;
            setIsPinned(false);
            setOverlayOpacity(1);
            // Remove overlay from DOM after fade completes
            setTimeout(() => {
              setShowOverlay(false);
            }, 700); // Slightly longer than transition duration
          }
        }
      }
      // If mouse is NOT over image during reverse scroll, allow normal scroll
      else if (isPinned && !isMouseOverImage && animationCompleteRef.current) {
        // Mouse left the image area during reverse scroll - allow normal scroll
      }
    };

    // Handle touch events for mobile - Fixed to properly accumulate across touch sessions
    let lastTouchY = 0;
    let isTouchActive = false;

    const handleTouchStart = (e) => {
      if (!sectionRef.current || !imageContainerRef.current) return;

      const touch = e.touches[0];
      const touchX = touch.clientX;
      const touchY = touch.clientY;

      // Check if touch is over the image container
      const imageRect = imageContainerRef.current.getBoundingClientRect();
      const isTouchOverImage =
        touchX >= imageRect.left &&
        touchX <= imageRect.right &&
        touchY >= imageRect.top &&
        touchY <= imageRect.bottom;

      // Store this for use in touchmove
      isOverImage = isTouchOverImage;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const isAtTop = rect.top <= 10 && rect.bottom > 0; // Slightly more lenient for mobile

      lastTouchY = touch.clientY;
      isTouchActive = true;

      // Check if we should enter pinned mode (only if touching image)
      if (isAtTop && !animationCompleteRef.current && !isPinned && isTouchOverImage) {
        setIsPinned(true);
        setShowOverlay(true);
        scrollAccumulatorRef.current = 0;
        setOverlayOpacity(1);
      }

      // Don't preventDefault on touchstart - let it handle naturally
      // Only prevent during touchmove if we're actually in the animation zone
    };

    const handleTouchMove = (e) => {
      if (!sectionRef.current || !isTouchActive) return;

      const touchCurrentY = e.touches[0].clientY;
      const touchDelta = lastTouchY - touchCurrentY; // Positive = scroll down, Negative = scroll up

      // Always update lastTouchY for continuous tracking
      lastTouchY = touchCurrentY;

      // Only process if the initial touch was over the image
      if (!isOverImage && !isPinned) {
        return; // Allow normal scroll if not touching image
      }

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const isAtTop = rect.top <= 10 && rect.bottom > 0; // Slightly more lenient for mobile

      // Forward scroll - animating from start to end
      if (isAtTop && !animationCompleteRef.current && isOverImage) {
        // We're in pinned animation mode - prevent default immediately
        e.preventDefault();
        e.stopPropagation();

        // Enter pinned mode if not already
        if (!isPinned) {
          setIsPinned(true);
          setShowOverlay(true);
          scrollAccumulatorRef.current = 0;
          setOverlayOpacity(1);
        }

        // Accumulate the touch delta (multiply for better sensitivity on mobile)
        // Use requestAnimationFrame for smoother updates
        const sensitivity = 5.0;
        scrollAccumulatorRef.current += touchDelta * sensitivity;
        scrollAccumulatorRef.current = Math.max(0, Math.min(totalScrollNeeded, scrollAccumulatorRef.current));

        // Update animation progress
        const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
        setScrollProgress(animationProgress);

        const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
        setCurrentFrame(frame);

        // Update overlay opacity
        updateOverlayOpacity(scrollAccumulatorRef.current);

        // Check if animation fully complete (including buffer zone)
        if (scrollAccumulatorRef.current >= totalScrollNeeded) {
          animationCompleteRef.current = true;
          setIsPinned(false);
          setOverlayOpacity(0);
          isTouchActive = false;
          // Delay overlay removal to allow smooth fade
          setTimeout(() => {
            if (setShowOverlay) {
              setShowOverlay(false);
            }
          }, 600);
        }
      }
      // Reverse scroll - scrolling back up through animation
      else if (animationCompleteRef.current && touchDelta < 0 && window.scrollY <= (window.innerHeight + bufferScrollNeeded)) {
        // We're in pinned animation mode - prevent default immediately
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

        // Update animation progress
        const animationProgress = Math.min(scrollAccumulatorRef.current / animationScrollNeeded, 1);
        setScrollProgress(animationProgress);

        const frame = Math.round(startFrame + animationProgress * (endFrame - startFrame));
        setCurrentFrame(frame);

        // Update overlay opacity (reverse fade)
        updateOverlayOpacity(scrollAccumulatorRef.current);

        // Check if back to start
        if (scrollAccumulatorRef.current <= 0) {
          animationCompleteRef.current = false;
          setIsPinned(false);
          setOverlayOpacity(1);
          isTouchActive = false;
          // Delay overlay removal to allow smooth fade
          setTimeout(() => {
            if (setShowOverlay) {
              setShowOverlay(false);
            }
          }, 600);
        }
      }
      // If we're in pinned mode but shouldn't be, allow natural scroll to happen
      else if (isPinned && touchDelta < 0 && scrollAccumulatorRef.current <= 0) {
        setIsPinned(false);
        animationCompleteRef.current = false;
        isTouchActive = false;
        setTimeout(() => {
          if (setShowOverlay) {
            setShowOverlay(false);
          }
        }, 100);
      }
    };

    const handleTouchEnd = (e) => {
      isTouchActive = false;
      // isOverImage = false; // Keep it to maintain state between touches
      // Don't reset lastTouchY or scrollAccumulatorRef here - this was the bug!
      // The accumulator should persist between touch sessions
    };

    // Handle navigation clicks - disable pin when clicking menu items
    const handleNavClick = (e) => {
      const target = e.target;
      // Check if click is on a navigation link
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
    document.addEventListener('click', handleNavClick, true); // Capture phase to catch early

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleNavClick, true);
    };
  }, [imagesLoaded, isPinned, scrollProgress]);

  return (
    <>
      {/* Spacer to prevent layout shift when section is pinned */}
      {isPinned && <div style={{ height: '100vh' }} />}

      {/* Dark overlay to hide sections below when pinned - with smooth fade transition */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-azul-principal z-40"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: overlayOpacity,
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        />
      )}

      <section
        id="hero-section"
        ref={sectionRef}
        className={`w-full min-h-screen overflow-hidden ${
          isPinned
            ? 'fixed top-0 left-0 right-0 z-50'
            : 'relative'
        }`}
        style={{
          height: isPinned ? '100vh' : 'auto',
          touchAction: isPinned ? 'none' : 'auto',
          transition: prefersReducedMotion
            ? 'none'
            : 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
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
            <div ref={imageContainerRef} className="relative w-full max-w-2xl mx-auto mt-12 animate-fade-in">
              <div className="relative w-full aspect-square">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-verde-neon/20 blur-3xl rounded-full"></div>

                {/* Image - Optimized for LCP (Largest Contentful Paint) */}
                <img
                  src={isMobile ? `/cachetada-movil/${currentFrame}.png` : `/assets/Fondos e imagenes/${currentFrame}.png`}
                  alt="RentSmart Black Friday - 50% OFF en alquiler de autos Miami Orlando"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
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

          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default HeroSection;
