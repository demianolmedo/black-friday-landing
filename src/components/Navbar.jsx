import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);

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

  const navItems = [
    { name: 'Problema', href: '#problema-section' },
    { name: 'Solución', href: '#solucion-section' }
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <a href="#hero-section" onClick={(e) => handleNavClick(e, '#hero-section')} className="navbar-logo">
          <img
            src="/assets/Fondos e imagenes/Logo.png"
            alt="RentSmart Car Rental - Black Friday"
            loading="eager"
            fetchpriority="high"
            width="150"
            height="40"
          />
        </a>

        <button
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link"
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
          <a
            href="#contact-form"
            onClick={(e) => handleNavClick(e, '#contact-form')}
            className="navbar-cta"
          >
            Obtener 50% OFF
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
