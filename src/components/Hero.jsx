import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full pt-4 sm:pt-6 pb-8 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue to-navy-dark"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent opacity-50"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-start text-center space-y-4 sm:space-y-6">

          {/* Green dot indicator */}
          <div className="flex items-center space-x-2 animate-fade-in mt-4">
            <div className="w-2.5 h-2.5 bg-neon-green rounded-full animate-pulse-slow"></div>
            <div className="h-px w-8 bg-gradient-to-r from-neon-green to-transparent"></div>
          </div>

          {/* Main Heading - 50% OFF */}
          <div className="space-y-1 sm:space-y-2 animate-slide-left">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none">
              <span className="text-neon-green drop-shadow-[0_0_30px_rgba(0,255,148,0.5)]">
                50%
              </span>
              <span className="text-white text-4xl sm:text-5xl md:text-6xl ml-2 align-top">
                off
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-[0.3em] uppercase">
              DESCUENTOS<span className="text-neon-green">%</span>
            </h2>
          </div>

          {/* Person Image */}
          <div className="w-full max-w-sm sm:max-w-md animate-fade-in mt-2">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-neon-green/10 blur-3xl"></div>
              {/* Person image placeholder */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto overflow-hidden">
                {/* Placeholder for person image - replace with actual image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-transparent via-navy-blue/30 to-navy-dark rounded-b-full">
                  <span className="text-white/20 text-sm">Person Image</span>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Card */}
          <div className="relative w-full max-w-sm mx-auto -mt-4 animate-slide-right">
            <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6">

              {/* Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-neon-green to-emerald-400 text-navy-dark px-5 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                  ¡Sin cuota de inscripción!
                </div>
              </div>

              <div className="space-y-3 mt-2">
                {/* Title */}
                <div className="text-center space-y-0.5">
                  <p className="text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                    Hasta
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-black text-white leading-none">
                    50% OFF
                  </h3>
                  <p className="text-white text-base sm:text-lg font-semibold uppercase tracking-wide">
                    EN RESERVAS
                  </p>
                  <p className="text-white/50 text-xs pt-1">
                    ¡Sin pagar la cuota de primera vez<br/>y obten precios fijos!
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent my-3"></div>

                {/* Stats Grid */}
                <div className="flex justify-between items-center px-4 text-center">
                  <div className="space-y-0.5">
                    <p className="text-neon-green text-2xl font-black">50</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider">descuentos<br/>disponibles</p>
                  </div>

                  <div className="h-12 w-px bg-white/10"></div>

                  <div className="space-y-0.5">
                    <p className="text-neon-green text-2xl font-black">50</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider">reservas<br/>*Sin cuota de exp</p>
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
