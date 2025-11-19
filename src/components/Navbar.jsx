import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="flex justify-center px-4 md:px-6 lg:px-8 py-2 md:py-3">
        <nav className="
          bg-azul-principal/50
          backdrop-blur-lg
          border border-white/30
          rounded-full
          px-6 md:px-8
          py-1.5 md:py-2
          shadow-lg shadow-black/10
          max-w-6xl
          w-full
          flex items-center justify-between
          gap-4 md:gap-8
          relative
        ">
          {/* Logo */}
          <a
            href="#hero-section"
            onClick={(e) => handleNavClick(e, '#hero-section')}
            className="flex items-center flex-shrink-0 relative z-10"
          >
            <img
              src="/assets/Fondos e imagenes/Logo.png"
              alt="RentSmart Car Rental - Black Friday"
              className="h-6 md:h-7 w-auto hover:opacity-90 transition-opacity duration-200"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 relative z-10">
            <a
              href="#problema-section"
              onClick={(e) => handleNavClick(e, '#problema-section')}
              className="text-white/90 font-medium text-sm md:text-base hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-verde-neon after:transition-all after:duration-300 hover:after:w-full"
            >
              Problema
            </a>
            <a
              href="#solucion-section"
              onClick={(e) => handleNavClick(e, '#solucion-section')}
              className="text-white/90 font-medium text-sm md:text-base hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-verde-neon after:transition-all after:duration-300 hover:after:w-full"
            >
              Solución
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="#contact-form"
            onClick={(e) => handleNavClick(e, '#contact-form')}
            className="
            bg-verde-neon
            text-azul-principal
            font-bold
            text-sm md:text-base
            px-6 md:px-8
            py-1.5 md:py-2
            rounded-full
            hover:bg-emerald-400
            hover:scale-105
            active:scale-95
            transition-all duration-200
            shadow-lg shadow-verde-neon/30
            hover:shadow-xl hover:shadow-verde-neon/50
            focus:outline-none
            focus:ring-2
            focus:ring-verde-neon
            focus:ring-offset-2
            focus:ring-offset-white/10
            flex-shrink-0
            hidden md:block
            relative z-10
          ">
            Obtener 50% OFF
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="
                  absolute top-full left-0 right-0 mt-2
                  bg-azul-principal/80
                  backdrop-blur-2xl
                  backdrop-saturate-150
                  backdrop-brightness-90
                  border border-white/30
                  rounded-2xl
                  py-4 px-2
                  shadow-lg shadow-black/10
                  md:hidden
                "
                style={{
                  backdropFilter: 'blur(40px) saturate(150%) brightness(90%)'
                }}
              >
                <div className="flex flex-col gap-2 relative z-10">
                  <a
                    href="#problema-section"
                    onClick={(e) => handleNavClick(e, '#problema-section')}
                    className="text-white/90 font-medium px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 text-center"
                  >
                    Problema
                  </a>
                  <a
                    href="#solucion-section"
                    onClick={(e) => handleNavClick(e, '#solucion-section')}
                    className="text-white/90 font-medium px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 text-center"
                  >
                    Solución
                  </a>
                  <div className="px-2 pt-2 relative z-10">
                    <a
                      href="#contact-form"
                      onClick={(e) => handleNavClick(e, '#contact-form')}
                      className="
                      w-full
                      bg-verde-neon
                      text-azul-principal
                      font-bold
                      py-3
                      rounded-full
                      hover:bg-emerald-400
                      transition-all duration-200
                      shadow-lg shadow-verde-neon/30
                      block text-center
                    ">
                      Obtener 50% OFF
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
