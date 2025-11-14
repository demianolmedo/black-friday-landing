import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const FooterNew = () => {
  return (
    <footer className="relative w-full bg-azul-principal/95 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">

          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="mb-4">
              <img
                src="/assets/Fondos e imagenes/Logo.png"
                alt="RentSmart Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm font-inter leading-relaxed">
              Tu mejor opción para alquiler de vehículos en Florida. Sin filas, sin sorpresas, solo la mejor experiencia.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/RENTSMARTRAC/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-verde-neon/20 flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-white/60 group-hover:text-verde-neon transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/rentsmartrac"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-verde-neon/20 flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-white/60 group-hover:text-verde-neon transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@rentsmartrac"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-verde-neon/20 flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-verde-neon transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blanco font-outfit">Enlaces Rápidos</h3>
            <ul className="space-y-2">
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
                  href="#"
                  className="text-white/60 hover:text-verde-neon transition-colors text-sm font-inter"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Miami Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blanco font-outfit">Contacto Miami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:+17862725447"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter block"
                  >
                    +1 786 272 5447
                  </a>
                  <a
                    href="tel:+17863056464"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter block"
                  >
                    +1 786 305 6464
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:reservas@rentsmartrac.com"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter"
                  >
                    reservas@rentsmartrac.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blanco text-sm font-inter">
                    3930 NW 27th St, Miami, FL 33142
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Orlando Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blanco font-outfit">Contacto Orlando</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:+17869563254"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter block"
                  >
                    +1 786 956 3254
                  </a>
                  <a
                    href="tel:+17863056464"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter block"
                  >
                    +1 786 305 6464
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:reservas@rentsmartrac.com"
                    className="text-blanco text-sm hover:text-verde-neon transition-colors font-inter"
                  >
                    reservas@rentsmartrac.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-verde-neon flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blanco text-sm font-inter">
                    5530 Butler National Dr, Orlando, FL 32812
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
              © 2025 – Todos los derechos reservados Rent Smart Car Rental
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
