import React, { useState, useEffect, useRef } from 'react';

const ImageAnimationSection = () => {
  const [currentFrame, setCurrentFrame] = useState(100);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const sectionRef = useRef(null);

  // Precargar todas las imágenes de la secuencia
  useEffect(() => {
    const startFrame = 100;
    const endFrame = 129;
    const totalFrames = endFrame - startFrame + 1;
    let loadedCount = 0;

    const basePath = '/cachetadas-daniel';

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
  }, []);

  // Scroll simple - cambiar frames según posición
  useEffect(() => {
    if (!imagesLoaded) return;

    const startFrame = 100;
    const endFrame = 129;
    const totalFrames = endFrame - startFrame + 1;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();

      // Calcular cuánto de la sección está visible
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Extender el rango de scroll para que la animación sea más lenta
      // La animación ahora necesita 3x más scroll para completarse
      const scrollStart = windowHeight / 2; // Empieza cuando llega a la mitad
      const scrollEnd = -sectionHeight * 2.5; // Termina mucho después de salir (animación más lenta)

      let progress = 0;

      if (sectionTop <= scrollStart && sectionTop >= scrollEnd) {
        progress = (scrollStart - sectionTop) / (scrollStart - scrollEnd);
        progress = Math.max(0, Math.min(1, progress));
      } else if (sectionTop < scrollEnd) {
        progress = 1;
      }

      // Mapear progreso a frames
      const frame = Math.round(startFrame + progress * (totalFrames - 1));
      setCurrentFrame(Math.max(startFrame, Math.min(endFrame, frame)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al montar

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imagesLoaded]);

  return (
    <section
      id="image-animation-section"
      ref={sectionRef}
      className="relative w-full h-[50vh] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

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

      <div className={`relative z-20 w-[90vw] h-[45vh] mx-auto transition-opacity duration-700 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-verde-neon/20 blur-3xl rounded-full"></div>

          <img
            src={`/cachetadas-daniel/${currentFrame}.png`}
            alt="RentSmart Black Friday - Animación de descuento 50% OFF"
            className="relative z-30 max-w-full max-h-full object-contain drop-shadow-2xl"
            style={{
              transition: 'opacity 50ms ease-out',
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
  );
};

export default ImageAnimationSection;
