import React from 'react';

const FormularioSection = () => {
  return (
    <section
      id="contact-form"
      className="relative w-full flex items-center justify-center overflow-hidden py-16 sm:py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal to-azul-principal"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-verde-neon/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-verde-neon/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Heading */}
        <div className="text-center space-y-3 mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blanco font-outfit leading-tight">
            Recibe tu{' '}
            <span className="text-verde-neon neon-text">cotización</span>{' '}
            personalizada en segundos<br />
            y alquila tu auto sin drama
          </h2>
        </div>

        {/* Form Container - Empty placeholder for script */}
        <div className="relative animate-slide-up">
          <div className="relative bg-azul-principal/40 glass-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl min-h-[400px] flex items-center justify-center">

            {/* ⚠️ ESPACIO RESERVADO PARA EL SCRIPT DEL FORMULARIO */}
            {/* NO implementar campos aquí - este contenedor está listo para recibir el script externo */}

            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-verde-neon/10 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-verde-neon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blanco font-outfit">
                Formulario de Contacto
              </h3>
              <p className="text-white/60 text-sm sm:text-base font-inter max-w-md mx-auto">
                Este espacio está preparado para integrar tu formulario de contacto personalizado.
              </p>
              <div className="pt-4">
                <div className="inline-block px-4 py-2 rounded-lg bg-verde-neon/10 border border-verde-neon/30">
                  <p className="text-verde-neon text-xs font-mono">
                    {`<!-- Inserta aquí el script del formulario -->`}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Promotion disclaimer */}
        <div className="text-center mt-6 sm:mt-8 space-y-4 animate-fade-in">
          <p className="text-white/60 text-xs sm:text-sm font-inter">
            *Promoción válida hasta agotar cupos.
          </p>

          <a
            href="#contact-form"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-verde-neon to-emerald-400 text-azul-principal font-black text-sm sm:text-base rounded-full hover:shadow-[0_0_30px_rgba(0,255,127,0.5)] transition-all duration-300 uppercase tracking-wide font-outfit"
          >
            RESERVA YA - Quiero mi 50% OFF
          </a>

          <p className="text-white/60 text-xs sm:text-sm font-inter max-w-2xl mx-auto">
            Toca antes de que otro tome el último auto. Tus próximas vacaciones ya están esperando.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FormularioSection;
