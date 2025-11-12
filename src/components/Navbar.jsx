import React from 'react';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo centrado */}
        <div className="flex justify-center mb-3 md:mb-4">
          <div className="cursor-pointer animate-fade-in" onClick={() => scrollToSection('hero-section')}>
            <img
              src="/assets/Fondos e imagenes/Logo.png"
              alt="Logo"
              className="h-8 sm:h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback text if logo doesn't load
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="text-verde-neon text-xl font-black font-outfit neon-text">BLACK FRIDAY</span>';
              }}
            />
          </div>
        </div>

        {/* Menu capsula */}
        <div className="flex justify-center">
          <nav className="glass-card rounded-full px-3 py-2 flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scrollToSection('problema-section')}
              className="text-white/80 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 rounded-full transition-all duration-300"
            >
              Problema
            </button>

            <div className="h-6 w-px bg-white/20"></div>

            <button
              onClick={() => scrollToSection('solucion-section')}
              className="text-white/80 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 rounded-full transition-all duration-300"
            >
              Solución
            </button>

            <div className="h-6 w-px bg-white/20"></div>

            <button
              onClick={() => scrollToSection('contact-form')}
              className="bg-gradient-to-r from-verde-neon to-emerald-400 text-azul-principal px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm hover:scale-105 transition-transform duration-300 neon-glow"
            >
              Contacto
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
