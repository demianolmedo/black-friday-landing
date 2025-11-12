import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = ({ targetDate = '2025-11-29T23:59:59' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-neon-green/20 blur-xl rounded-lg"></div>

        {/* Time box */}
        <div className="relative bg-navy-blue/80 backdrop-blur-sm border border-neon-green/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 min-w-[60px] sm:min-w-[80px] md:min-w-[100px] shadow-lg">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neon-green text-center font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(0,255,148,0.5)]">
            {String(value).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Label */}
      <span className="text-white/70 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue/50 to-navy-dark"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8 sm:space-y-12">

          {/* Heading */}
          <div className="text-center space-y-3 sm:space-y-4 animate-fade-in">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-neon-green animate-pulse-slow" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
                Solo por{' '}
                <span className="text-neon-green">TIEMPO LIMITADO</span>
              </h2>
            </div>
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Aprovecha esta oferta exclusiva antes de que termine el Black Friday
            </p>
          </div>

          {/* Countdown Display */}
          <div className="w-full max-w-4xl animate-slide-left">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <TimeUnit value={timeLeft.days} label="Días" />
              <TimeUnit value={timeLeft.hours} label="Horas" />
              <TimeUnit value={timeLeft.minutes} label="Minutos" />
              <TimeUnit value={timeLeft.seconds} label="Segundos" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-2xl">
            <div className="h-2 bg-navy-blue/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-green to-emerald-400 rounded-full transition-all duration-1000 ease-out animate-pulse-slow"
                style={{ width: '65%' }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-white/50">
              <span>Oferta iniciada</span>
              <span className="text-neon-green font-semibold">35% de cupos restantes</span>
              <span>Oferta termina</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
