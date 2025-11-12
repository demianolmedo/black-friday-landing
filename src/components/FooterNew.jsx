import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterNew = () => {
  return (
    <footer className="relative w-full bg-azul-principal/95 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">

          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="mb-4">
              <img
                src="/src/assets/Fondos e imagenes/Logo.png"
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm font-inter leading-relaxed">
              Transformando la gestión inmobiliaria con tecnología de vanguardia.
              Rápido, seguro y confiable.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-verde-neon/20 flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-white/60 group-hover:text-verde-neon transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-verde-neon/20 flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-white/60 group-hover:text-verde-neon transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-verde-neon/20 flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-white/60 group-hover:text-verde-neon transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-verde-neon/20 flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-white/60 group-hover:text-verde-neon transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blanco font-outfit">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero-section"
                  className="text-white/60 hover:text-verde-neon transition-colors text-sm font-inter"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#problema-section"
                  className="text-white/60 hover:text-verde-neon transition-colors text-sm font-inter"
                >
                  Problema
                </a>
              </li>
              <li>
                <a
                  href="#solucion-section"
                  className="text-white/60 hover:text-verde-neon transition-colors text-sm font-inter"
                >
                  Solución
                </a>
              </li>
              <li>
                <a
                  href="#contact-form"
                  className="text-white/60 hover:text-verde-neon transition-colors text-sm font-inter"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-verde-neon transition-colors text-sm font-inter"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-verde-neon transition-colors text-sm font-inter"
                >
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blanco font-outfit">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-sm font-inter">Email</p>
                  <a
                    href="mailto:contacto@ejemplo.com"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter"
                  >
                    contacto@ejemplo.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-sm font-inter">Teléfono</p>
                  <a
                    href="tel:+1234567890"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-sm font-inter">Ubicación</p>
                  <p className="text-blanco text-sm font-inter">
                    Miami, FL, USA
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-white/40 text-sm font-inter">
              © {new Date().getFullYear()} RentSmart. Todos los derechos reservados.
            </p>
            <p className="text-white/40 text-sm font-inter">
              Black Friday 2025 - Oferta válida hasta el 30 de noviembre
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
