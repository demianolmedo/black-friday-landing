import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTAButton = ({
  text = 'ACCEDE AL DESCUENTO AQUÍ',
  onClick = () => {},
  variant = 'primary',
  className = '',
  showIcon = true
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-neon-green to-emerald-400 hover:from-neon-green-light hover:to-emerald-300 text-navy-dark',
    secondary: 'bg-navy-blue border-2 border-neon-green text-neon-green hover:bg-neon-green/10',
    outline: 'border-2 border-white/30 text-white hover:border-neon-green hover:text-neon-green'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative group
        ${variants[variant]}
        font-bold text-base sm:text-lg md:text-xl
        px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6
        rounded-full
        transition-all duration-300 ease-out
        transform hover:scale-105 hover:shadow-2xl
        active:scale-95
        overflow-hidden
        ${className}
      `}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Sparkle effect on hover */}
      {showIcon && (
        <Sparkles className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />
      )}

      {/* Button content */}
      <span className="relative flex items-center justify-center space-x-2 sm:space-x-3 uppercase tracking-wider">
        <span>{text}</span>
        {showIcon && (
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </span>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full blur-xl bg-neon-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </button>
  );
};

export default CTAButton;
