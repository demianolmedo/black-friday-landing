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

          {/* Offer Card */}
          <div className="relative w-full max-w-sm mx-auto animate-scale-in">
            <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6">

              {/* Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-verde-neon to-emerald-400 text-azul-principal px-5 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                  ¡Sin cuota de inscripción!
                </div>
              </div>

              <div className="space-y-3 mt-2">
                {/* Title */}
                <div className="text-center space-y-0.5">
                  <p className="text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-widest font-inter">
                    Hasta
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-black text-blanco leading-none font-outfit">
                    50% OFF
                  </h3>
                  <p className="text-blanco text-base sm:text-lg font-semibold uppercase tracking-wide font-outfit">
                    EN RESERVAS
                  </p>
                  <p className="text-white/50 text-xs pt-1 font-inter">
                    ¡Sin pagar la cuota de primera vez<br />y obten precios fijos!
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-verde-neon/30 to-transparent my-3"></div>

                {/* Stats Grid */}
                <div className="flex justify-between items-center px-4 text-center">
                  <div className="space-y-0.5">
                    <p className="text-verde-neon text-2xl font-black font-outfit neon-text">50</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider font-inter">
                      descuentos<br />disponibles
                    </p>
                  </div>

                  <div className="h-12 w-px bg-white/10"></div>

                  <div className="space-y-0.5">
                    <p className="text-verde-neon text-2xl font-black font-outfit neon-text">50</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider font-inter">
                      reservas<br />*Sin cuota de exp
                    </p>
                  </div>
                </div>
              </div>
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
