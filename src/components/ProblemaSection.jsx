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

          {/* CTA Button First */}
          <div className="flex justify-center animate-fade-in">
            <button
              onClick={onCTAClick}
              className="bg-gradient-to-r from-verde-neon to-emerald-400 text-azul-principal px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform duration-300 neon-glow font-outfit"
            >
              QUIERO MI DESCUENTO AHORA
            </button>
          </div>

          {/* Main message */}
          <div className="text-center space-y-2 sm:space-y-3 animate-fade-in">
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto font-inter">
              Si todavía sigues pensando por qué,<br />
              duele más que una cachetada
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blanco leading-tight max-w-4xl mx-auto uppercase font-outfit">
              RECUERDAS ESE MOMENTO INCÓMODO{' '}
              <span className="text-verde-neon neon-text">CUANDO PENSASTE</span>
            </h2>
          </div>

          {/* Speech bubbles section */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto animate-fade-in">
            <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base font-inter">
              ¿Y esta espera?
            </div>
            <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base font-inter">
              ¡No se supone que era rápido!
            </div>
            <div className="glass-card glass-card-hover rounded-2xl px-6 py-3 text-white/80 text-sm sm:text-base text-center font-inter">
              ¿Por qué mi#%$a me<br />están cobrando esto?
            </div>
          </div>

          {/* Features text */}
          <div className="text-center space-y-3 animate-slide-left">
            <p className="text-sm sm:text-base text-white/60 font-inter">
              A tus clientes les
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blanco font-outfit">
              firmas, <span className="text-verde-neon neon-text">alertizas</span> y manejas
            </h3>
            <p className="text-xs sm:text-sm text-white/50 max-w-2xl mx-auto font-inter">
              Sin el dinero, de las formas tradicionales.
            </p>
          </div>

          {/* Spacer */}
          <div className="py-4"></div>

          {/* Black Friday Announcement */}
          <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-white/60 font-inter">
                Reserva ya con el
              </p>

              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-blanco leading-none font-outfit neon-text">
                50% OFF
              </h3>

              <div className="space-y-2">
                <p className="text-xl sm:text-2xl md:text-3xl text-blanco font-bold font-outfit">
                  Esta <span className="bg-black text-blanco px-3 py-1 rounded">Black Friday</span>, tú das la cachetada
                </p>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base text-white/70 max-w-3xl mx-auto font-inter">
                  <p>A los abusivos</p>
                  <span className="text-verde-neon">•</span>
                  <p>A los lentos pequeños</p>
                  <span className="text-verde-neon">•</span>
                  <p>A los que creen que son buenos tratándole si no eres empresas</p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto pt-4 font-inter">
                Empresas tu salta del apuro<br />
                La página se abre en directo
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-center space-y-3 animate-fade-in">
            <p className="text-sm sm:text-base text-white/50 max-w-3xl mx-auto font-inter">
              Recibe tu cotización personalizada en segundos<br />
              Y aprovecha el 30% de sobre
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemaSection;
