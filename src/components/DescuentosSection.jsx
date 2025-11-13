import React, { useState, useEffect } from 'react';

const DescuentosSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [phase, setPhase] = useState('before');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Black Friday dates (EST/EDT - Miami time)
      const phase1Start = new Date('2025-11-27T00:00:00-05:00');
      const phase1End = new Date('2025-11-28T00:00:00-05:00');
      const phase2End = new Date('2025-11-30T00:00:00-05:00');

      let targetDate;
      let currentPhase;

      if (now < phase1Start) {
        targetDate = phase1Start;
        currentPhase = 'before';
      } else if (now >= phase1Start && now < phase1End) {
        targetDate = phase1End;
        currentPhase = 'phase1';
      } else if (now >= phase1End && now < phase2End) {
        targetDate = phase2End;
        currentPhase = 'phase2';
      } else {
        currentPhase = 'ended';
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setPhase(currentPhase);
        return;
      }

      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setPhase(currentPhase);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center space-y-1.5">
      <div className="glass-card rounded-lg p-2.5 sm:p-3 min-w-[50px] sm:min-w-[60px]">
        <div className="text-4xl sm:text-5xl md:text-6xl font-black text-verde-neon text-center font-mono leading-none neon-text">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <span className="text-white/60 text-[10px] sm:text-xs font-medium uppercase tracking-wide font-inter">
        {label}
      </span>
    </div>
  );

  const getPhaseMessage = () => {
    switch (phase) {
      case 'before':
        return 'La oferta comienza pronto';
      case 'phase1':
        return 'Black Friday - Primera Fase (24h)';
      case 'phase2':
        return '¡Prórroga Especial! - Últimas 48 horas';
      case 'ended':
        return 'Oferta finalizada';
      default:
        return '';
    }
  };

  return (
    <section
      id="descuentos-section"
      className="relative w-full flex items-center justify-center overflow-hidden py-8 sm:py-12"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/50 to-azul-principal"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">

          {/* Two Connected Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 relative animate-scale-in">

            {/* TARJETA 1: Hasta 50% OFF */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl text-center shadow-lg hover:bg-white/[0.05] hover:border-[#00FF7F]/20 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto min-w-[320px] px-20 py-14">
              <p className="text-white/60 text-sm font-inter mb-4 tracking-wide">
                Hasta
              </p>
              <h3 className="text-white font-outfit font-bold italic text-5xl leading-none mb-4">
                50% OFF
              </h3>
              <p className="text-white text-sm font-inter">
                solo para las primeras
              </p>
            </div>

            {/* LÍNEA CONECTORA (Desktop) */}
            <div className="hidden md:flex items-center justify-center mx-6">
              <svg
                width="160"
                height="8"
                viewBox="0 0 160 8"
                className="connection-line"
                style={{ overflow: 'visible' }}
              >
                <circle cx="4" cy="4" r="4" fill="#00FF7F" />
                <line
                  x1="8"
                  y1="4"
                  x2="152"
                  y2="4"
                  stroke="#00FF7F"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="156" cy="4" r="4" fill="#00FF7F" />
              </svg>
            </div>

            {/* LÍNEA VERTICAL (Mobile) */}
            <div className="flex md:hidden items-center justify-center my-6">
              <svg
                width="8"
                height="60"
                viewBox="0 0 8 60"
                className="connection-line-vertical"
              >
                <circle cx="4" cy="4" r="4" fill="#00FF7F" />
                <line
                  x1="4"
                  y1="8"
                  x2="4"
                  y2="52"
                  stroke="#00FF7F"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="4" cy="56" r="4" fill="#00FF7F" />
              </svg>
            </div>

            {/* TARJETA 2: 50 reservas */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl text-center shadow-lg hover:bg-white/[0.05] hover:border-[#00FF7F]/20 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto min-w-[320px] px-20 py-14">
              <h3 className="text-white font-outfit font-bold italic text-5xl leading-none mb-5">
                <span className="text-white">50</span> reservas
              </h3>
              <p className="text-white/60 text-[13px] font-inter leading-relaxed mb-1">
                las filas no esperan...
              </p>
              <p className="text-white/60 text-[13px] font-inter leading-relaxed">
                y estos precios tampoco
              </p>
            </div>

          </div>

          {/* "Solo 50 descuentos disponibles" */}
          <div className="text-center animate-fade-in">
            <p className="text-blanco text-base sm:text-lg md:text-xl font-medium font-inter">
              Solo <span className="text-verde-neon font-bold neon-text">50</span> descuentos disponibles
            </p>
          </div>

          {/* Main countdown number */}
          <div className="text-center animate-slide-up">
            <div className="text-7xl sm:text-8xl md:text-9xl font-black text-verde-neon leading-none drop-shadow-[0_0_40px_rgba(0,255,127,0.6)] font-outfit neon-text">
              50
            </div>
          </div>

          {/* "Termina en" */}
          <div className="text-center">
            <p className="text-white/80 text-sm sm:text-base font-medium uppercase tracking-widest font-inter">
              Termina en
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="w-full max-w-md animate-fade-in">
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              <TimeUnit value={timeLeft.days} label="Días" />
              <span className="text-verde-neon text-3xl sm:text-4xl font-bold pb-6">:</span>
              <TimeUnit value={timeLeft.hours} label="Horas" />
              <span className="text-verde-neon text-3xl sm:text-4xl font-bold pb-6">:</span>
              <TimeUnit value={timeLeft.minutes} label="Minutos" />
              <span className="text-verde-neon text-3xl sm:text-4xl font-bold pb-6">:</span>
              <TimeUnit value={timeLeft.seconds} label="Segundos" />
            </div>
          </div>

          {/* Phase message */}
          <div className="text-center pt-2">
            <p className="text-verde-neon text-sm sm:text-base font-semibold mb-2 font-inter">
              {getPhaseMessage()}
            </p>
            <p className="text-white/50 text-xs sm:text-sm font-inter">
              Porque el tiempo pasa, y como tú lo necesitas... ¡Este es tu momento!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DescuentosSection;
