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
    primary: 'bg-gradient-to-r from-neon-green to-neon-cyan hover:from-neon-green-light hover:to-neon-green text-navy-dark neon-glow',
    secondary: 'glass-card border-2 border-neon-green text-neon-green hover:bg-neon-green/10',
    outline: 'border-2 border-white/30 text-white hover:border-neon-green hover:text-neon-green'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative group
        ${variants[variant]}
        font-bold text-sm sm:text-base md:text-lg
        px-10 sm:px-12 md:px-14 py-3.5 sm:py-4 md:py-4.5
        rounded-xl
        transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        transform hover:scale-105 hover:neon-glow-lg
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
