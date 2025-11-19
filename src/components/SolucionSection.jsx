import React from 'react';

const SolucionSection = () => {
  return (
    <section
      id="solucion-section"
      className="relative w-full flex items-center justify-center overflow-hidden py-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">

          {/* Second ribbon banner */}
          <div className="relative animate-fade-in mt-8 sm:mt-10 mb-8 sm:mb-10" style={{
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            width: '100vw',
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)',
            backgroundColor: '#01132a'
          }}>
            <div className="relative py-3 px-4 sm:px-6 lg:px-8 backdrop-blur-md" style={{
              background: 'linear-gradient(90deg, #021938 0%, #0f2847 15%, #2a5580 35%, #6B95BF 50%, #2a5580 65%, #0f2847 85%, #021938 100%)'
            }}>
              <div className="text-center space-y-2">
                <p className="text-xl text-white font-inter">
                  Aquí es diferente
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit">
                  Aterrizas, firmas y manejas
                </h3>
                <p className="text-xl text-white font-inter">
                  Sin el drama, de las novelas mexicanas
                </p>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="py-4"></div>

          {/* Black Friday Announcement */}
          <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
            <div className="space-y-3">
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/60 font-inter uppercase" style={{ letterSpacing: '0.3em' }}>
                Reserva ya con el
              </p>

              <h3 className="text-7xl sm:text-8xl md:text-9xl lg:text-[144px] font-black text-blanco leading-none font-outfit neon-text">
                50% OFF
              </h3>

              <div className="space-y-16 sm:space-y-20 mt-16 sm:mt-20 md:mt-24">
                <p className="text-xl sm:text-2xl md:text-3xl text-blanco font-bold font-outfit">
                  Este <span className="px-2 rounded-full backdrop-blur-xl" style={{
                    paddingTop: '0',
                    paddingBottom: '0',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)',
                    color: '#000000',
                    transform: 'skewX(-15deg)',
                    transformOrigin: 'center',
                    display: 'inline-block'
                  }}>Black Friday</span>, tú das la cachetada
                </p>

                <div className="text-center space-y-3 text-lg sm:text-xl md:text-2xl text-white font-inter mt-12 sm:mt-16 md:mt-20">
                  <p>A los <span className="font-bold">abusos</span>, a las <span className="font-bold">letras pequeñas</span></p>
                  <p>A los que creen que aún pueden <span className="font-bold">tratarte como si no supieras</span></p>
                  <p className="!mt-12 sm:!mt-16 md:!mt-20 font-bold">Empieza tu viaje sin drama</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolucionSection;
