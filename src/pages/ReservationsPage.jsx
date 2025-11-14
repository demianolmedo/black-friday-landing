import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactCaptureModal from '../components/ContactCaptureModal';

const ReservationsPage = ({ brand, city }) => {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(true);
  const [contactDataCaptured, setContactDataCaptured] = useState(false);
  const snippetRef = useRef(null);

  // Verificar si ya se capturaron los datos
  // NOTA: Comentado temporalmente para testing - descomentar en producción
  // useEffect(() => {
  //   const savedData = localStorage.getItem('contactData');
  //   if (savedData) {
  //     setContactDataCaptured(true);
  //     setShowContactModal(false);
  //   }
  // }, []);

  // Inicializar HQ cuando el componente se monta
  useEffect(() => {
    const initHQ = () => {
      // Esperar a que el script de HQ esté cargado
      const checkAndInit = () => {
        if (snippetRef.current) {
          // Método 1: Disparar evento DOMContentLoaded
          const event = new Event('DOMContentLoaded', { bubbles: true });
          document.dispatchEvent(event);

          // Método 2: Si HQ expone una API global, usarla
          if (window.HQRentalSoftware && typeof window.HQRentalSoftware.init === 'function') {
            window.HQRentalSoftware.init();
          }

          // Método 3: Forzar mutation observer
          const observer = new MutationObserver(() => {
            // HQ está cargando
          });

          observer.observe(snippetRef.current, {
            childList: true,
            subtree: true
          });
        }
      };

      // Intentar inicializar inmediatamente
      checkAndInit();

      // También intentar después de un delay por si el script aún se está cargando
      const timeoutId = setTimeout(checkAndInit, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    };

    initHQ();
  }, [brand]);

  const handleContactComplete = () => {
    setContactDataCaptured(true);
    setShowContactModal(false);
  };

  return (
    <div className="reservations-page min-h-screen bg-gradient-to-b from-azul-principal via-azul-principal to-azul-principal">
      {/* Header con logo y botón de volver - Sticky fijo al hacer scroll */}
      <div className="sticky top-0 z-50 bg-azul-principal/80 backdrop-blur-xl border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src="/assets/Fondos e imagenes/Logo.png"
                alt="RentSmart Car Rental"
                className="h-7 md:h-8 w-auto"
                loading="eager"
                fetchpriority="high"
                width="150"
                height="40"
              />
              <div className="hidden sm:block h-8 w-px bg-white/20" />
              <h1 className="text-blanco font-bold text-base sm:text-lg md:text-xl font-outfit">
                Completar Reserva
                <span className="hidden md:inline"> - {city === 'miami' ? 'Miami' : 'Orlando'}</span>
              </h1>
            </div>

            {/* Botón Volver */}
            <button
              onClick={() => navigate('/')}
              className="px-4 md:px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-blanco text-sm md:text-base border border-white/20 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 flex-shrink-0 font-outfit"
            >
              <span className="hidden sm:inline">←</span>
              <span>Volver</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor del snippet - Siempre visible para que HQ se cargue en segundo plano */}
      <div className="w-full py-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl">

            {/*
              Snippet de HQ - EXACTAMENTE igual que WordPress
              El script ya está cargado globalmente en index.html
              El div se expandirá automáticamente con el contenido
              IMPORTANTE: Este div está siempre visible para que HQ pueda cargar,
              el modal lo cubre con su backdrop mientras el usuario completa sus datos
            */}
            <div
              ref={snippetRef}
              className="hq-rental-software-integration"
              data-integrator_link="https://rent-smart-car-rental.rentsmartrac.com/public/car-rental/integrations"
              data-brand={brand}
              data-snippet="reservations"
              data-skip_language=""
              data-skip_redirect="1"
              data-rate_type_uuid=""
              data-referral="hq-form"
              data-forced_locale="es"
            />

          </div>
        </div>
      </div>

      {/* Modal de captura de contacto */}
      <ContactCaptureModal
        isOpen={showContactModal}
        onComplete={handleContactComplete}
      />

      {/* Estilos adicionales para el iframe de HQ */}
      <style jsx>{`
        /* El contenedor de HQ se expande automáticamente */
        .hq-rental-software-integration {
          width: 100%;
          min-height: 800px; /* Altura mínima inicial */
        }

        /* El iframe de HQ debe crecer con su contenido */
        .hq-rental-software-integration iframe {
          width: 100% !important;
          border: none !important;
          /* NO establecer altura fija - dejar que HQ controle la altura */
        }
      `}</style>
    </div>
  );
};

export default ReservationsPage;
