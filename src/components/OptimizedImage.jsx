import React, { useState, useRef, useEffect } from 'react';

/**
 * Componente de imagen optimizada con lazy loading nativo y placeholder
 * Mejora LCP (Largest Contentful Paint) y reduce el tamaño de carga inicial
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false, // true para imágenes above-the-fold
  placeholder = 'blur', // 'blur' | 'empty'
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Si es priority, carga inmediatamente
  const imgRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Empieza a cargar 50px antes de ser visible
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, [priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {/* Placeholder mientras carga */}
      {!isLoaded && placeholder === 'blur' && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-azul-principal/50 to-azul-principal/30 animate-pulse"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Imagen real */}
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          className={`
            transition-opacity duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
