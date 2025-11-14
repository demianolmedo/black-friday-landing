'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import WhatsAppModal from './WhatsAppModal';

const FormularioSection = () => {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('miami'); // Miami activo por defecto
  const [formularioCargado, setFormularioCargado] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wrapperRef = useRef(null);
  const scriptRef = useRef(null);

  // Configuración de las ciudades
  const ciudades = {
    miami: {
      brand: 'tgnod2fe-peiu-myim-xv1r-pdcpmrppkgsp',
      wrapperId: 'hq-wrapper-miami',
      reservationPage: window.location.origin + '/reservations-miami'
    },
    orlando: {
      brand: 'y4clmciv-fp5g-dlrp-yadw-1babsnc1xqyt',
      wrapperId: 'hq-wrapper-orlando',
      reservationPage: window.location.origin + '/reservations-orlando'
    }
  };

  const ciudadActual = ciudadSeleccionada ? ciudades[ciudadSeleccionada] : null;

  // Función para limpiar completamente HQ del DOM
  const limpiarHQ = () => {
    // Remover todos los divs de HQ
    const hqElements = document.querySelectorAll('.hq-rental-software-integration');
    hqElements.forEach(el => el.remove());

    // Remover iframes de HQ
    const iframes = document.querySelectorAll('iframe[src*="rentsmartrac"]');
    iframes.forEach(iframe => iframe.remove());

    // Limpiar el wrapper
    if (wrapperRef.current) {
      wrapperRef.current.innerHTML = '';
    }
  };

  // Función para cargar el script de HQ
  const cargarScriptHQ = () => {
    return new Promise((resolve, reject) => {
      const scriptId = 'hq-integrator-script';

      // Si ya existe, resolver inmediatamente
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://rent-smart-car-rental.rentsmartrac.com/public/car-rental/integrations/assets/integrator';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load HQ script'));

      document.body.appendChild(script);
      scriptRef.current = script;
    });
  };

  // Cargar formulario de HQ cuando cambia la ciudad
  useEffect(() => {
    // Solo cargar si hay una ciudad seleccionada
    if (!ciudadSeleccionada || !ciudadActual) return;

    let timeoutId;
    let observerRef;

    const inicializarFormulario = async () => {
      setFormularioCargado(false);

      // Limpiar cualquier snippet anterior
      limpiarHQ();

      // Esperar un momento para que el DOM se limpie
      await new Promise(resolve => setTimeout(resolve, 300));

      try {
        // Asegurar que el script esté cargado
        await cargarScriptHQ();

        // Esperar más tiempo para que el script se inicialice completamente
        await new Promise(resolve => setTimeout(resolve, 800));

        // Crear el contenedor del snippet usando innerHTML (como en WordPress)
        if (wrapperRef.current) {
          // Usar innerHTML directamente como lo haría HQ en WordPress
          // IMPORTANTE: data-reservation_page debe tener la URL COMPLETA (absoluta)
          wrapperRef.current.innerHTML = `
            <div class="hq-rental-software-integration"
                 data-integrator_link="https://rent-smart-car-rental.rentsmartrac.com/public/car-rental/integrations"
                 data-brand="${ciudadActual.brand}"
                 data-snippet="reservation-form"
                 data-skip_language=""
                 data-skip_redirect="1"
                 data-reservation_page="${ciudadActual.reservationPage}"
                 data-layout="vertical"
                 data-currency=""
                 data-rate_type_uuid=""
                 data-referral="hq-form"
                 data-forced_locale="es">
              <div class="hq-loading">Cargando formulario de reserva...</div>
            </div>
          `;

          const snippetDiv = wrapperRef.current.querySelector('.hq-rental-software-integration');
          if (snippetDiv) {
            // Forzar re-inicialización de HQ Integrator
            // Método 1: Disparar evento DOMContentLoaded en el snippet
            const event = new Event('DOMContentLoaded', { bubbles: true });
            snippetDiv.dispatchEvent(event);

            // Método 2: Si HQ expone una API global, usarla
            if (window.HQRentalSoftware && typeof window.HQRentalSoftware.init === 'function') {
              window.HQRentalSoftware.init();
            }

            // Método 3: Forzar mutation observable en el elemento
            snippetDiv.setAttribute('data-hq-initialized', 'false');
          }

          // Detectar cuando se carga el formulario HQ (iframe O formulario directo)
          observerRef = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (mutation.addedNodes.length > 0) {
                // Buscar iframe (método antiguo)
                const iframeAdded = Array.from(mutation.addedNodes).some(
                  node => node.tagName === 'IFRAME'
                );

                // Buscar formulario directo en DOM (método actual)
                const formAdded = Array.from(mutation.addedNodes).some(
                  node => node.tagName === 'FORM' || (node.querySelector && node.querySelector('form'))
                );

                if (iframeAdded || formAdded) {
                  setFormularioCargado(true);

                  // Remover loading indicator
                  const loader = snippetDiv?.querySelector('.hq-loading');
                  if (loader) loader.remove();

                  observerRef.disconnect();
                }
              }
            }
          });

          if (snippetDiv && observerRef) {
            observerRef.observe(snippetDiv, { childList: true, subtree: true });
          }

          // Timeout fallback
          timeoutId = setTimeout(() => {
            const snippetDiv = wrapperRef.current?.querySelector('.hq-rental-software-integration');
            if (snippetDiv) {
              const loader = snippetDiv.querySelector('.hq-loading');
              if (loader) loader.remove();
            }
            setFormularioCargado(true);
            if (observerRef) observerRef.disconnect();
          }, 15000);
        }
      } catch (error) {
        setFormularioCargado(true);
      }
    };

    inicializarFormulario();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (observerRef) observerRef.disconnect();
    };
  }, [ciudadSeleccionada]);

  const handleCiudadChange = (ciudad) => {
    if (ciudad !== ciudadSeleccionada) {
      setCiudadSeleccionada(ciudad);
    }
  };

  return (
    <>
      <section
        id="contact-form"
        className="relative w-full flex items-center justify-center overflow-hidden py-16 sm:py-24"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal to-azul-principal"></div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-verde-neon/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-verde-neon/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="text-blanco font-black text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 font-outfit">
              Recibe tu <span className="text-verde-neon neon-text">cotización</span> personalizada en segundos y alquila tu auto sin drama
            </h2>

            {/* Grid de Selección - 2 Columnas con Separador */}
            <div className="selection-grid">
              {/* Columna Izquierda: Botones de Ciudad */}
              <div className="selection-grid-left">
                <button
                  onClick={() => handleCiudadChange('miami')}
                  className={`
                    city-selector-btn
                    ${ciudadSeleccionada === 'miami' ? 'active' : ''}
                  `}
                >
                  <span className="city-btn-content">Cotizar Miami</span>
                </button>
                <button
                  onClick={() => handleCiudadChange('orlando')}
                  className={`
                    city-selector-btn
                    ${ciudadSeleccionada === 'orlando' ? 'active' : ''}
                  `}
                >
                  <span className="city-btn-content">Cotizar Orlando</span>
                </button>
              </div>

              {/* Separador Vertical */}
              <div className="selection-grid-divider"></div>

              {/* Columna Derecha: Botón de WhatsApp */}
              <div className="selection-grid-right">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="whatsapp-btn-grid"
                >
                  <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="whatsapp-text">Cotizar con un agente</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contenedor del Formulario HQ - Solo visible cuando hay ciudad seleccionada */}
          {ciudadSeleccionada && ciudadActual && (
            <motion.div
              key={ciudadSeleccionada}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative mt-8"
            >
              <div
                ref={wrapperRef}
                id={ciudadActual.wrapperId}
                className="min-h-[400px]"
              />
            </motion.div>
          )}

          {/* Promotion disclaimer */}
          <div className="text-center mt-6 sm:mt-8 animate-fade-in">
            <p className="text-white/60 text-xs sm:text-sm font-inter">
              *Promoción válida hasta agotar cupos. RESERVA YA - Quiero mi 50% OFF. Toca antes de que otro tome el último auto. Tus próximas vacaciones ya están esperando.
            </p>
          </div>
        </div>
      </section>

      {/* Estilos del Loading Indicator y WhatsApp Button */}
      <style jsx>{`
        .hq-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          color: white;
          font-size: 1.2em;
          font-family: 'Outfit', sans-serif;
          text-align: center;
        }

        .hq-loading::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 12px;
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          border-top-color: #00FF7F;
          animation: hq-spinner 0.8s ease infinite;
          vertical-align: middle;
        }

        @keyframes hq-spinner {
          to { transform: rotate(360deg); }
        }

        /* Estilos para iframes de HQ */
        :global(.hq-rental-software-integration iframe) {
          border: none;
          width: 100%;
          min-height: 600px;
        }

        /* ===== BOTONES 3D CON EFECTO DE RELIEVE (Tendencia 2025) ===== */
        .city-selector-btn {
          position: relative;
          padding: 16px 36px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.5px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          outline: none;
          overflow: hidden;
        }

        /* Estado ELEVADO (no seleccionado) - Botón sobresale */
        .city-selector-btn:not(.active) {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #00FF7F;
          position: relative;
          overflow: hidden;

          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);

          transform: translateY(0);
        }

        /* Gradiente interno hover */
        .city-selector-btn:not(.active)::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .city-selector-btn:not(.active):hover::before {
          opacity: 1;
        }

        /* Hover en botón no seleccionado */
        .city-selector-btn:not(.active):hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.25),
            0 0 20px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);

          transform: translateY(-2px) scale(1.05);
        }

        /* Active/Press en botón no seleccionado */
        .city-selector-btn:not(.active):active {
          transform: translateY(1px);
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        /* Estado HUNDIDO (seleccionado) - Botón presionado hacia adentro */
        .city-selector-btn.active {
          background: linear-gradient(
            145deg,
            #00FF7F 0%,
            #00E070 50%,
            #00C960 100%
          );
          color: #021938;
          border: 1.5px solid rgba(255, 255, 255, 0.4);

          box-shadow:
            inset 0 3px 8px rgba(0, 0, 0, 0.25),
            inset 0 1px 2px rgba(0, 0, 0, 0.3),
            inset 0 -1px 0 rgba(255, 255, 255, 0.3),
            0 0 20px rgba(0, 255, 127, 0.4),
            0 0 40px rgba(0, 255, 127, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.15);

          transform: translateY(1px);
        }

        /* Hover en botón seleccionado - Mantiene estado hundido */
        .city-selector-btn.active:hover {
          background: linear-gradient(
            145deg,
            #33FFA0 0%,
            #20F088 50%,
            #15E078 100%
          );

          box-shadow:
            inset 0 3px 8px rgba(0, 0, 0, 0.22),
            inset 0 1px 2px rgba(0, 0, 0, 0.28),
            inset 0 -1px 0 rgba(255, 255, 255, 0.35),
            0 0 24px rgba(0, 255, 127, 0.5),
            0 0 48px rgba(0, 255, 127, 0.25),
            0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Contenido del botón */
        .city-btn-content {
          position: relative;
          z-index: 10;
          display: block;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        /* Active button text shadow más fuerte */
        .city-selector-btn.active .city-btn-content {
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.2),
            0 0 8px rgba(255, 255, 255, 0.4);
        }

        /* Efecto de brillo en botón activo */
        .city-selector-btn.active::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0%, 100% {
            left: -100%;
          }
          50% {
            left: 200%;
          }
        }

        /* Responsive - Mobile */
        @media (max-width: 768px) {
          .city-selector-btn {
            padding: 14px 28px;
            font-size: 16px;
            border-radius: 14px;
          }
        }

        @media (max-width: 480px) {
          .city-selector-btn {
            padding: 12px 24px;
            font-size: 15px;
            border-radius: 12px;
          }
        }

        /* ===== GRID DE SELECCIÓN - 2 COLUMNAS CON SEPARADOR ===== */
        .selection-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 32px;
          align-items: center;
          margin-bottom: 0;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Columna Izquierda - Botones de Ciudad */
        .selection-grid-left {
          display: flex;
          gap: 16px;
          justify-content: flex-start;
          align-items: center;
        }

        /* Separador Vertical Elegante */
        .selection-grid-divider {
          width: 1px;
          height: 60px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          position: relative;
        }

        .selection-grid-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: rgba(0, 255, 127, 0.4);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(0, 255, 127, 0.6);
        }

        /* Columna Derecha - Botón WhatsApp */
        .selection-grid-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        /* Botón de WhatsApp en Grid */
        .whatsapp-btn-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.5) 0%, rgba(18, 140, 126, 0.5) 100%);
          backdrop-filter: blur(8px);
          color: white;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 16px;
          padding: 16px 32px;
          border: 1px solid rgba(37, 211, 102, 0.3);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow:
            0 2px 10px rgba(37, 211, 102, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .whatsapp-btn-grid:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 4px 20px rgba(37, 211, 102, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.65) 0%, rgba(18, 140, 126, 0.65) 100%);
        }

        .whatsapp-btn-grid:active {
          transform: translateY(0) scale(0.98);
        }

        /* Responsive - Tablet */
        @media (max-width: 1024px) {
          .selection-grid {
            gap: 24px;
            padding: 20px;
          }

          .selection-grid-left {
            gap: 12px;
          }

          .whatsapp-btn-grid {
            font-size: 15px;
            padding: 14px 24px;
          }
        }

        /* Responsive - Mobile: Todo en columna vertical */
        @media (max-width: 768px) {
          .selection-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 16px;
          }

          .selection-grid-left {
            flex-direction: column;
            width: 100%;
            gap: 12px;
          }

          .selection-grid-left .city-selector-btn {
            width: 100%;
          }

          /* Separador horizontal en mobile */
          .selection-grid-divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0) 100%
            );
          }

          .selection-grid-divider::before {
            top: 50%;
            left: 50%;
          }

          .selection-grid-right {
            justify-content: center;
            width: 100%;
          }

          .whatsapp-btn-grid {
            width: 100%;
            font-size: 15px;
            padding: 14px 24px;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-btn-grid {
            font-size: 14px;
            padding: 12px 20px;
            gap: 10px;
          }
        }

        /* Icono de WhatsApp */
        .whatsapp-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }
      `}</style>

      {/* Modal de WhatsApp */}
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCity={ciudadSeleccionada}
      />
    </>
  );
};

export default FormularioSection;
