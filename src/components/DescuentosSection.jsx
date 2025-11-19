import React, { useState, useEffect } from 'react';
import { Lock, Zap } from 'lucide-react';

const DescuentosSection = ({ onCTAClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [phase, setPhase] = useState('before');
  const [reservasRestantes, setReservasRestantes] = useState(100);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Fechas clave (EST/EDT - Miami time)
      const startDate = new Date('2025-11-13T00:00:00-05:00'); // Inicio del conteo
      const blackFridayStart = new Date('2025-11-28T00:00:00-05:00'); // Black Friday
      const blackFridayEnd = new Date('2025-11-29T00:00:00-05:00'); // Fin Black Friday
      const extensionEnd = new Date('2025-12-01T00:00:00-05:00'); // Fin extensión 48h

      let targetDate;
      let currentPhase;
      let reservas = 100;

      // Calcular reservas restantes según la fase
      if (now < blackFridayStart) {
        // FASE 1: Antes del Black Friday (13 nov - 27 nov)
        targetDate = blackFridayStart;
        currentPhase = 'before';

        const diffMs = now - startDate;
        const hours12Passed = Math.floor(diffMs / (1000 * 60 * 60 * 12));
        reservas = Math.max(0, 100 - (hours12Passed * 2)); // 2 reservas cada 12h

      } else if (now >= blackFridayStart && now < blackFridayEnd) {
        // FASE 2: Black Friday (28 nov)
        targetDate = blackFridayEnd;
        currentPhase = 'phase1';

        // Calcular reservas desde el inicio hasta el Black Friday
        const diffStart = blackFridayStart - startDate;
        const hours12BeforeBF = Math.floor(diffStart / (1000 * 60 * 60 * 12));
        const reservasAntesBF = 100 - (hours12BeforeBF * 2);

        // Durante Black Friday: 1 reserva por hora
        const diffBF = now - blackFridayStart;
        const hoursPassed = Math.floor(diffBF / (1000 * 60 * 60));
        reservas = Math.max(0, reservasAntesBF - hoursPassed);

      } else if (now >= blackFridayEnd && now < extensionEnd) {
        // FASE 3: Extensión 48h (29-30 nov)
        targetDate = extensionEnd;
        currentPhase = 'phase2';

        // Empezamos con 20 reservas
        const diffExt = now - blackFridayEnd;
        const hours3Passed = Math.floor(diffExt / (1000 * 60 * 60 * 3));
        reservas = Math.max(0, 20 - hours3Passed); // 1 reserva cada 3h

      } else {
        // Promoción finalizada
        currentPhase = 'ended';
        reservas = 0;
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setPhase(currentPhase);
        setReservasRestantes(0);
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
        setReservasRestantes(reservas);
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
      className="relative w-full flex items-center justify-center overflow-hidden py-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/50 to-azul-principal"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">

          {/* Two Connected Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 relative animate-scale-in">

            {/* TARJETA 1: Hasta 50% OFF */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl text-center shadow-lg hover:bg-white/[0.05] hover:border-[#00FF7F]/20 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto min-w-[320px] px-6 sm:px-8 md:px-12 py-6">
              <p className="text-white text-sm font-inter mb-4 tracking-wide">
                Hasta
              </p>
              <h3 className="text-white font-outfit font-bold text-5xl leading-none" style={{ transform: 'skewX(-15deg)', transformOrigin: 'center', display: 'inline-block' }}>
                50% OFF
              </h3>
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

            {/* TARJETA 2: 100 reservas */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl text-center shadow-lg hover:bg-white/[0.05] hover:border-[#00FF7F]/20 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto min-w-[320px] px-6 sm:px-8 md:px-12 py-6">
              <p className="text-white text-sm font-inter mb-4 tracking-wide">
                solo para las primeras
              </p>
              <h3 className="text-white font-outfit font-bold text-5xl leading-none mb-5" style={{ transform: 'skewX(-15deg)', transformOrigin: 'center', display: 'inline-block' }}>
                <span className="text-white">100</span> reservas
              </h3>
              <p className="text-white text-xl font-inter leading-relaxed mb-1">
                las filas no esperan...
              </p>
              <p className="text-white text-xl font-inter leading-relaxed">
                y estos precios tampoco
              </p>
            </div>

          </div>

          {/* Countdown Card with Liquid Glass Effect */}
          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl text-center shadow-lg hover:bg-white/[0.05] hover:border-[#00FF7F]/20 transition-all duration-300 w-full max-w-2xl mx-auto px-6 sm:px-8 md:px-12 py-6 animate-scale-in overflow-hidden">

            {/* Badge diagonal VIP (solo visible en fase 1 - antes del Black Friday) */}
            {phase === 'before' && (
              <div className="absolute top-0 right-0 z-20">
                <div className="bg-gradient-to-br from-verde-neon to-emerald-400 w-[200px] py-2 transform rotate-45 translate-x-[50px] translate-y-[30px] shadow-xl">
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wide whitespace-nowrap flex items-center justify-center gap-1.5 text-azul-principal">
                    <Lock size={14} className="sm:w-5 sm:h-5" strokeWidth={3} />
                    <span>ACCESO VIP</span>
                  </p>
                </div>
              </div>
            )}

            {/* Badge diagonal de extensión (solo visible en fase 3) */}
            {phase === 'phase2' && (
              <div className="absolute top-0 right-0 z-20">
                <div className="bg-gradient-to-br from-verde-neon to-emerald-400 w-[220px] py-2 transform rotate-45 translate-x-[55px] translate-y-[30px] shadow-xl">
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wide whitespace-nowrap flex items-center justify-center gap-1.5 text-azul-principal">
                    <Zap size={14} className="sm:w-5 sm:h-5" strokeWidth={3} fill="#021938" />
                    <span>¡EXTENDIDO 48H!</span>
                  </p>
                </div>
              </div>
            )}

            {/* Texto de reservas disponibles con contador integrado */}
            <div className="text-center mb-6">
              <h2 className="font-black leading-tight font-outfit flex items-center justify-center gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl md:text-3xl text-white">Solo</span>
                <span className="text-3xl sm:text-4xl md:text-5xl text-verde-neon drop-shadow-[0_0_40px_rgba(0,255,127,0.6)] neon-text">{reservasRestantes}</span>
                <span className="text-xl sm:text-2xl md:text-3xl text-white">reservas disponibles</span>
              </h2>
            </div>

            {/* "Termina en" */}
            <div className="text-center mb-6">
              <p className="text-white/80 text-sm sm:text-base font-medium uppercase tracking-widest font-inter">
                Termina en
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="w-full max-w-md mx-auto mb-6">
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

          </div>

          {/* Subtitle text */}
          <div className="text-center mt-6 px-4">
            <p className="text-white text-lg sm:text-xl font-inter leading-relaxed">
              Porque el verdadero drama... no está en la novela
            </p>
            <p className="text-white text-lg sm:text-xl font-inter font-bold leading-relaxed mt-1">
              Está en alquilar tu auto sin drama
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8 animate-fade-in">
            <button
              onClick={onCTAClick}
              className="bg-gradient-to-r from-verde-neon to-emerald-400 text-azul-principal px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform duration-300 neon-glow font-outfit"
            >
              QUIERO MI DESCUENTO AHORA
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DescuentosSection;
