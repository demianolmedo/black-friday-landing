import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full pt-16 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-blue to-navy-dark"></div>

      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/src/assets/Fondos e imagenes/Foother.png"
          alt="Footer Background"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

            {/* Company Info */}
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <img
                  src="/src/assets/Fondos e imagenes/Logo.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                La plataforma #1 para la gestión inteligente de propiedades.
                Simplifica tu trabajo y aumenta tu productividad.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-navy-blue/50 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:border-neon-green hover:text-neon-green transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-navy-blue/50 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:border-neon-green hover:text-neon-green transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-navy-blue/50 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:border-neon-green hover:text-neon-green transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-navy-blue/50 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:border-neon-green hover:text-neon-green transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-2">
                {['Inicio', 'Características', 'Precios', 'Blog', 'Contacto'].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-neon-green text-sm transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-0 h-px bg-neon-green group-hover:w-4 transition-all duration-300"></span>
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                Servicios
              </h3>
              <ul className="space-y-2">
                {[
                  'Gestión de Propiedades',
                  'Control de Inquilinos',
                  'Pagos Automatizados',
                  'Reportes y Analíticas',
                  'Soporte 24/7'
                ].map((service, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-neon-green text-sm transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-0 h-px bg-neon-green group-hover:w-4 transition-all duration-300"></span>
                      <span>{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                Contacto
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:info@rentsmart.com"
                  className="flex items-start space-x-3 text-white/70 hover:text-neon-green text-sm transition-colors duration-300 group"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="break-all">info@rentsmart.com</span>
                </a>
                <a
                  href="tel:+11234567890"
                  className="flex items-start space-x-3 text-white/70 hover:text-neon-green text-sm transition-colors duration-300 group"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span>+1 (123) 456-7890</span>
                </a>
                <div className="flex items-start space-x-3 text-white/70 text-sm">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-neon-green" />
                  <span>
                    123 Business Ave,<br />
                    Tech City, TC 12345
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-white/50 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} RentSmart. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-white/50 hover:text-neon-green transition-colors duration-300">
                Términos de Servicio
              </a>
              <a href="#" className="text-white/50 hover:text-neon-green transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/50 hover:text-neon-green transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>

          {/* Black Friday Badge */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-neon-green/20 to-emerald-500/20 border border-neon-green/30 rounded-full px-6 py-2">
              <p className="text-neon-green text-xs sm:text-sm font-bold uppercase tracking-wider">
                🎉 Black Friday Special - 50% OFF Activo
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
