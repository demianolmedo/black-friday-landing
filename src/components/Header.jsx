import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-navy-dark/95 backdrop-blur-sm fixed top-0 left-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 animate-fade-in">
            <img
              src="/src/assets/Fondos e imagenes/Logo.png"
              alt="Logo"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Optional Navigation - You can add links here if needed */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Add navigation items if needed */}
          </nav>

          {/* Green dot indicator */}
          <div className="flex items-center">
            <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
