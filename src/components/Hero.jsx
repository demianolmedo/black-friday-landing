import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen pt-20 sm:pt-24 pb-12 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue to-navy-dark"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent opacity-50"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">

          {/* Green dot indicator */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-slow"></div>
            <div className="h-px w-12 bg-gradient-to-r from-neon-green to-transparent"></div>
          </div>

          {/* Main Heading - 50% OFF */}
          <div className="space-y-2 sm:space-y-4 animate-slide-left">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
              <span className="text-neon-green drop-shadow-[0_0_30px_rgba(0,255,148,0.5)]">
                50%
              </span>
              <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl ml-3">
                off
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              DESCUENTOS<span className="text-neon-green">%</span>
            </h2>
          </div>

          {/* Person Image */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-fade-in">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-neon-green/20 blur-3xl rounded-full"></div>
              {/* You can add the person image here if you have it */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-full bg-gradient-to-br from-navy-blue to-navy-dark border-4 border-neon-green/30 overflow-hidden">
                {/* Placeholder for person image - replace with actual image */}
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <span className="text-sm">Person Image</span>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Card */}
          <div className="relative w-full max-w-md mx-auto mt-8 animate-slide-right">
            <div className="bg-navy-blue/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">

              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-neon-green to-emerald-400 text-navy-dark px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  ¡Sin cuota de inscripción!
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {/* 50% OFF EN RESERVAS */}
                <div className="text-center space-y-2">
                  <p className="text-white/80 text-sm sm:text-base font-medium uppercase tracking-wider">
                    50% OFF
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    EN RESERVAS
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Aprovecha esta oferta exclusiva
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"></div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-neon-green text-xl sm:text-2xl font-bold">50</p>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Cupos</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-neon-green text-xl sm:text-2xl font-bold">Termina en</p>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Tiempo limitado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-navy-dark to-transparent"></div>
    </section>
  );
};

export default Hero;
