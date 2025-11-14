import React from 'react';

const ProblemaSection = ({ onCTAClick }) => {
  return (
    <section
      id="problema-section"
      className="relative w-full flex items-center justify-center overflow-hidden py-16 sm:py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal to-azul-principal"></div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">

          {/* Metallic ribbon banner message */}
          <div className="relative animate-fade-in mb-8 sm:mb-10" style={{
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
                <p className="text-sm sm:text-base text-white font-inter">
                  Sí, todos hemos pasado por eso
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit">
                  Y duele más que una cachetada
                </h2>
              </div>
            </div>
          </div>

          {/* Main message */}
          <div className="text-center space-y-2 sm:space-y-3 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blanco leading-tight max-w-4xl mx-auto uppercase font-outfit">
              RECUERDAS ESE MOMENTO INCÓMODO{' '}
              <span className="text-verde-neon neon-text">CUANDO PENSASTE</span>
            </h2>
          </div>

          {/* Speech bubbles section */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-4xl mx-auto animate-fade-in">
            {/* First row - 2 cards */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base font-inter flex items-center">
                ¿Y esta espera?
              </div>
              <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base font-inter">
                ¡No se supone que era rápido!
              </div>
            </div>

            {/* Second row - 1 card with larger text */}
            <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-base sm:text-lg md:text-xl text-center font-inter">
              ¿Por qué mi#%$a me<br />están cobrando esto?
            </div>
          </div>

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
                <p className="text-sm sm:text-base text-white font-inter">
                  Aquí es diferente
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit">
                  firmas, aterrizas y manejas
                </h3>
                <p className="text-sm sm:text-base text-white font-inter">
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

              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-blanco leading-none font-outfit neon-text">
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
                    color: '#000000'
                  }}>Black Friday</span>, tú das la cachetada
                </p>

                <div className="text-center space-y-3 text-base sm:text-lg md:text-xl text-white font-inter">
                  <p>A los abusivos <span className="text-verde-neon">•</span> A los lentos pequeños</p>
                  <p><span className="text-verde-neon">•</span> A los que creen que son buenos tratándole si no eres empresas</p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-white text-center max-w-3xl mx-auto pt-4 font-inter">
                y alquila tu auto sin drama
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-center space-y-3 animate-fade-in">
            <p className="text-sm sm:text-base text-white max-w-3xl mx-auto font-inter">
              Recibe tu cotización personalizada en segundos
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemaSection;
