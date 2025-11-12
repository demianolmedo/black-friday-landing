import React from 'react';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full glass-card fixed top-0 left-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 animate-fade-in cursor-pointer" onClick={() => scrollToSection('hero-section')}>
            <img
              src="/src/assets/Fondos e imagenes/Logo.png"
              alt="Logo"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection('problema-section')}
              className="text-white/80 hover:text-neon-green text-sm font-medium transition-colors duration-300"
            >
              Problema
            </button>
            <button
              onClick={() => scrollToSection('solucion-section')}
              className="text-white/80 hover:text-neon-green text-sm font-medium transition-colors duration-300"
            >
              Solución
            </button>
            <button
              onClick={() => scrollToSection('contact-form')}
              className="bg-gradient-to-r from-neon-green to-neon-cyan text-navy-dark px-5 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform duration-300 neon-glow"
            >
              Contacto
            </button>
          </nav>

          {/* Green dot indicator */}
          <div className="flex items-center md:hidden">
            <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
