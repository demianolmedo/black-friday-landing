import React from 'react';

const ProblemaSection = ({ onCTAClick }) => {
  return (
    <section
      id="problema-section"
      className="relative w-full flex items-center justify-center overflow-hidden py-6"
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
                <p className="text-xl text-white font-inter">
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
          <div className="flex flex-col items-center gap-6 sm:gap-8 max-w-4xl mx-auto animate-fade-in pt-4">
            {/* First row - 2 cards */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <div className="relative glass-card glass-card-hover px-6 py-4 text-white/80 text-lg sm:text-xl md:text-2xl font-inter flex items-center speech-bubble">
                ¿Por que tanta fila?
              </div>
              <div className="relative glass-card glass-card-hover px-6 py-4 text-white/80 text-lg sm:text-xl md:text-2xl font-inter speech-bubble">
                ¿No se supone que era rápido?
              </div>
            </div>

            {/* Second row - 1 card with larger text */}
            <div className="relative glass-card glass-card-hover px-6 py-4 text-white/80 text-lg sm:text-xl md:text-2xl text-center font-inter speech-bubble">
              ¿Por qué mi#%$a me<br />están cobrando esto?
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemaSection;
