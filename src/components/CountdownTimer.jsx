import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [phase, setPhase] = useState('before'); // 'before', 'phase1', 'phase2', 'ended'

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Black Friday dates (EST/EDT - Miami time)
      const phase1Start = new Date('2025-11-27T00:00:00-05:00'); // 27 nov, Miami
      const phase1End = new Date('2025-11-28T00:00:00-05:00');   // 28 nov (24h después)
      const phase2End = new Date('2025-11-30T00:00:00-05:00');   // 30 nov (48h después de phase1End)

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
      {/* Time box */}
      <div className="glass-card rounded-lg p-2.5 sm:p-3 min-w-[50px] sm:min-w-[60px]">
        <div className="text-4xl sm:text-5xl md:text-6xl font-black text-neon-green text-center font-mono leading-none neon-text">
          {String(value).padStart(2, '0')}
        </div>
      </div>

      {/* Label */}
      <span className="text-white/60 text-[10px] sm:text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  // Mensajes según la fase
  const getPhaseMessage = () => {
    switch(phase) {
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
    <section className="relative w-full py-8 sm:py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue/50 to-navy-dark"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-5 sm:space-y-6">

          {/* "Solo 50 descuentos disponibles" text */}
          <div className="text-center animate-fade-in">
            <p className="text-white text-base sm:text-lg md:text-xl font-medium">
              Solo <span className="text-neon-green font-bold">50</span> descuentos disponibles
            </p>
          </div>

          {/* Main countdown number */}
          <div className="text-center animate-slide-left">
            <div className="text-7xl sm:text-8xl md:text-9xl font-black text-neon-green leading-none drop-shadow-[0_0_40px_rgba(0,255,148,0.6)]">
              50
            </div>
          </div>

          {/* "Termina en" text */}
          <div className="text-center">
            <p className="text-white/80 text-sm sm:text-base font-medium uppercase tracking-widest">
              Termina en
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="w-full max-w-md animate-fade-in">
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              <TimeUnit value={timeLeft.days} label="Días" />
              <span className="text-neon-green text-3xl sm:text-4xl font-bold pb-6">:</span>
              <TimeUnit value={timeLeft.hours} label="Horas" />
              <span className="text-neon-green text-3xl sm:text-4xl font-bold pb-6">:</span>
              <TimeUnit value={timeLeft.minutes} label="Minutos" />
              <span className="text-neon-green text-3xl sm:text-4xl font-bold pb-6">:</span>
              <TimeUnit value={timeLeft.seconds} label="Segundos" />
            </div>
          </div>

          {/* Phase message */}
          <div className="text-center pt-2">
            <p className="text-neon-green text-sm sm:text-base font-semibold mb-2">
              {getPhaseMessage()}
            </p>
            <p className="text-white/50 text-xs sm:text-sm">
              Porque el tiempo pasa, y como tú lo necesitas... ¡Este es tu momento!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
