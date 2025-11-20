/**
 * RentSmart Black Friday - UTM & Meta Ads Tracking Script
 * Version: 2.0.0
 *
 * Este script captura eventos y métricas para la landing page de Black Friday:
 * - page_view: Primera visita con UTM params
 * - form_start: Cuando usuario interactúa con formulario HQ o abre modal WhatsApp
 * - quote_submit: Cuando se envía formulario HQ o modal WhatsApp
 * - contact_capture: Cuando se captura información en ContactCaptureModal
 *
 * Adaptado específicamente para:
 * - Widget HQ (formularios en iframe)
 * - Modal WhatsApp con formulario nativo
 * - Modal de captura de contacto en ReservationsPage
 */

(function() {
  'use strict';

  // Configuración
  const CONFIG = {
    apiEndpoints: {
      trackEvent: 'https://api.rentsmartrac.com/api/track-event',
      utmTracking: 'https://api.rentsmartrac.com/api/utm-tracking'
    },
    domain: 'blackfriday.rentsmartrac.com',
    debug: true, // Cambiar a false en producción
    sessionTimeout: 30 * 60 * 1000, // 30 minutos
    maxRetries: 3,
    retryDelay: 1000
  };

  // Estado global del tracker
  const TrackerState = {
    sessionId: null,
    userId: null,
    utmParams: {},
    metaAdsParams: {},
    landingPage: '',
    referrer: '',
    eventsTracked: new Set(),
    formInteractions: new Map(),
    lastActivity: Date.now()
  };

  // ============================================================================
  // UTILIDADES
  // ============================================================================

  /**
   * Log de debug condicional
   */
  function debugLog(message, data = {}) {
    if (CONFIG.debug) {
      console.log(`[RentSmart Tracking] ${message}`, data);
    }
  }

  /**
   * Genera un ID único para la sesión
   */
  function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Genera un ID único para el usuario (persistente)
   */
  function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Obtiene o crea el ID del usuario
   */
  function getUserId() {
    let userId = localStorage.getItem('rs_user_id');
    if (!userId) {
      userId = generateUserId();
      localStorage.setItem('rs_user_id', userId);
    }
    return userId;
  }

  /**
   * Obtiene o crea el ID de sesión
   */
  function getSessionId() {
    const now = Date.now();
    const lastActivity = sessionStorage.getItem('rs_last_activity');

    if (lastActivity && (now - parseInt(lastActivity)) > CONFIG.sessionTimeout) {
      // Sesión expirada, crear nueva
      sessionStorage.removeItem('rs_session_id');
    }

    let sessionId = sessionStorage.getItem('rs_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem('rs_session_id', sessionId);
    }

    sessionStorage.setItem('rs_last_activity', now.toString());
    return sessionId;
  }

  /**
   * Parsea parámetros de la URL
   */
  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const utmParams = {};
    const metaAdsParams = {};

    // UTM estándar
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      if (params.has(param)) {
        utmParams[param] = params.get(param);
      }
    });

    // Meta Ads específicos
    ['fbclid', 'fb_campaign_id', 'fb_adset_id', 'fb_ad_id', 'cpc', 'spend'].forEach(param => {
      if (params.has(param)) {
        metaAdsParams[param] = params.get(param);
      }
    });

    // Guardar en sessionStorage para persistencia durante la sesión
    if (Object.keys(utmParams).length > 0) {
      sessionStorage.setItem('rs_utm_params', JSON.stringify(utmParams));
    }
    if (Object.keys(metaAdsParams).length > 0) {
      sessionStorage.setItem('rs_meta_params', JSON.stringify(metaAdsParams));
    }

    return { utmParams, metaAdsParams };
  }

  /**
   * Obtiene información del dispositivo y navegador
   */
  function getDeviceInfo() {
    const ua = navigator.userAgent;
    const mobile = /Mobile|Android|iPhone|iPad/i.test(ua);
    const browser = (() => {
      if (ua.indexOf('Chrome') > -1) return 'Chrome';
      if (ua.indexOf('Safari') > -1) return 'Safari';
      if (ua.indexOf('Firefox') > -1) return 'Firefox';
      if (ua.indexOf('Edge') > -1) return 'Edge';
      return 'Other';
    })();

    return {
      userAgent: ua,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      deviceType: mobile ? 'mobile' : 'desktop',
      browser,
      language: navigator.language,
      platform: navigator.platform
    };
  }

  // ============================================================================
  // ENVÍO DE EVENTOS
  // ============================================================================

  /**
   * Envía evento a los endpoints con reintentos
   */
  async function sendEvent(eventName, eventData = {}, retryCount = 0) {
    const timestamp = new Date().toISOString();

    const payload = {
      eventName,
      timestamp,
      sessionId: TrackerState.sessionId,
      userId: TrackerState.userId,
      pageUrl: window.location.href,
      pagePath: window.location.pathname,
      ...TrackerState.utmParams,
      ...TrackerState.metaAdsParams,
      referrer: TrackerState.referrer,
      landingPage: TrackerState.landingPage,
      ...getDeviceInfo(),
      ...eventData,
      domain: CONFIG.domain
    };

    debugLog(`Sending event: ${eventName}`, payload);

    // Enviar a ambos endpoints
    const promises = [
      fetch(CONFIG.apiEndpoints.trackEvent, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => {
        console.error('Error sending to track-event:', err);
        return null;
      }),

      fetch(CONFIG.apiEndpoints.utmTracking, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => {
        console.error('Error sending to utm-tracking:', err);
        return null;
      })
    ];

    try {
      const results = await Promise.all(promises);
      const allSuccessful = results.every(r => r && r.ok);

      if (!allSuccessful && retryCount < CONFIG.maxRetries) {
        debugLog(`Retrying event ${eventName} (attempt ${retryCount + 1})`);
        setTimeout(() => {
          sendEvent(eventName, eventData, retryCount + 1);
        }, CONFIG.retryDelay * Math.pow(2, retryCount));
      } else if (allSuccessful) {
        debugLog(`Event ${eventName} sent successfully`);
        TrackerState.eventsTracked.add(eventName);
      }
    } catch (error) {
      console.error('Error sending event:', error);
      if (retryCount < CONFIG.maxRetries) {
        setTimeout(() => {
          sendEvent(eventName, eventData, retryCount + 1);
        }, CONFIG.retryDelay * Math.pow(2, retryCount));
      }
    }
  }

  // ============================================================================
  // TRACKING DE FORMULARIOS HQ
  // ============================================================================

  /**
   * Detecta y trackea interacciones con el widget HQ
   */
  function trackHQWidget() {
    debugLog('Setting up HQ widget tracking');

    // Observador para detectar cuando se carga el iframe o formulario de HQ
    const hqObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          // Detectar iframe de HQ
          if (node.tagName === 'IFRAME' && node.src && node.src.includes('rentsmartrac.com')) {
            debugLog('HQ iframe detected', { src: node.src });
            trackHQIframe(node);
          }

          // Detectar formulario directo de HQ
          if (node.tagName === 'FORM' || (node.querySelector && node.querySelector('form'))) {
            const form = node.tagName === 'FORM' ? node : node.querySelector('form');
            if (form && form.className && form.className.includes('hq')) {
              debugLog('HQ form detected', { form });
              trackHQForm(form);
            }
          }
        });
      });
    });

    // Observar todos los contenedores HQ
    const hqContainers = document.querySelectorAll('.hq-rental-software-integration');
    hqContainers.forEach(container => {
      hqObserver.observe(container, {
        childList: true,
        subtree: true
      });
    });

    // También observar el documento completo para detectar nuevos contenedores
    hqObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Trackea interacciones dentro del iframe de HQ
   */
  function trackHQIframe(iframe) {
    // Detectar cuando el iframe se carga completamente
    iframe.addEventListener('load', () => {
      debugLog('HQ iframe loaded');

      // Intentar acceder al contenido del iframe (solo funcionará si es mismo dominio)
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Buscar formularios dentro del iframe
        const forms = iframeDoc.querySelectorAll('form');
        forms.forEach(form => trackHQForm(form, true));

      } catch (e) {
        // Cross-origin, usar postMessage o detectar navegación
        debugLog('Cannot access iframe content (cross-origin), using alternative tracking');

        // Trackear cuando el usuario hace click en el iframe (inicio de interacción)
        let interactionTracked = false;
        iframe.addEventListener('mouseenter', () => {
          if (!interactionTracked) {
            sendEvent('hq_form_interaction', {
              formType: 'iframe',
              action: 'focus',
              location: window.location.pathname
            });
            interactionTracked = true;
          }
        });
      }
    });
  }

  /**
   * Trackea un formulario HQ específico
   */
  function trackHQForm(form, insideIframe = false) {
    const formId = 'hq_form_' + Date.now();
    let fieldsInteracted = new Set();
    let startTime = null;

    // Trackear inicio de interacción con el formulario
    const trackFormStart = () => {
      if (!startTime) {
        startTime = Date.now();
        sendEvent('form_start', {
          formId,
          formType: insideIframe ? 'hq_iframe' : 'hq_direct',
          location: window.location.pathname,
          city: detectCity()
        });
      }
    };

    // Detectar interacción con campos
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('focus', () => {
        trackFormStart();
        fieldsInteracted.add(field.name || field.id);
      });

      field.addEventListener('change', () => {
        if (field.type === 'date' || field.type === 'datetime-local') {
          sendEvent('date_selected', {
            formId,
            fieldName: field.name || field.id,
            hasValue: !!field.value
          });
        }
      });
    });

    // Trackear envío del formulario
    form.addEventListener('submit', (e) => {
      const endTime = Date.now();
      const duration = startTime ? (endTime - startTime) / 1000 : 0;

      sendEvent('quote_submit', {
        formId,
        formType: insideIframe ? 'hq_iframe' : 'hq_direct',
        location: window.location.pathname,
        city: detectCity(),
        fieldsCompleted: fieldsInteracted.size,
        formDuration: duration,
        timestamp: new Date().toISOString()
      });

      debugLog('HQ form submitted', {
        formId,
        duration,
        fieldsCompleted: fieldsInteracted.size
      });
    });
  }

  // ============================================================================
  // TRACKING DE MODAL WHATSAPP
  // ============================================================================

  /**
   * Trackea el modal de WhatsApp
   */
  function trackWhatsAppModal() {
    debugLog('Setting up WhatsApp modal tracking');

    // Observador para detectar cuando se abre el modal
    const modalObserver = new MutationObserver(() => {
      // Buscar el modal de WhatsApp por sus clases características
      const modalBackdrop = document.querySelector('.fixed.inset-0.bg-black');
      const modalContent = document.querySelector('[class*="whatsapp"]');

      if (modalBackdrop && modalContent && modalContent.offsetParent !== null) {
        // Modal está visible
        if (!TrackerState.formInteractions.has('whatsapp_modal')) {
          TrackerState.formInteractions.set('whatsapp_modal', {
            opened: Date.now(),
            tracked: false
          });

          sendEvent('whatsapp_modal_open', {
            location: window.location.pathname,
            city: detectCity()
          });

          // Trackear el formulario dentro del modal
          trackWhatsAppForm();
        }
      }
    });

    modalObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // También detectar clicks en botones de WhatsApp
    document.addEventListener('click', (e) => {
      const target = e.target;
      const whatsappButton = target.closest('[class*="whatsapp"]') ||
                            target.closest('button[onClick*="setIsModalOpen"]');

      if (whatsappButton) {
        sendEvent('whatsapp_button_click', {
          buttonText: whatsappButton.textContent,
          location: window.location.pathname
        });
      }
    });
  }

  /**
   * Trackea el formulario dentro del modal de WhatsApp
   */
  function trackWhatsAppForm() {
    setTimeout(() => {
      const form = document.querySelector('form');
      if (!form) return;

      const formId = 'whatsapp_form_' + Date.now();
      let startTime = Date.now();
      let fieldsData = {};

      // Trackear campos del formulario
      form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('change', () => {
          const fieldName = field.name || field.id;
          fieldsData[fieldName] = field.value ? 'filled' : 'empty';

          // Eventos especiales para campos importantes
          if (fieldName.includes('lugar') || fieldName.includes('location')) {
            sendEvent('location_selected', {
              formId,
              fieldName,
              value: field.value,
              formType: 'whatsapp'
            });
          }

          if (field.type === 'datetime-local' || fieldName.includes('fecha')) {
            sendEvent('date_selected', {
              formId,
              fieldName,
              hasValue: !!field.value,
              formType: 'whatsapp'
            });
          }
        });
      });

      // Trackear envío del formulario
      form.addEventListener('submit', (e) => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;

        // Obtener datos del formulario
        const formData = new FormData(form);
        const email = formData.get('email');
        const lugarEntrega = formData.get('lugarEntrega');
        const lugarDevolucion = formData.get('lugarDevolucion');

        sendEvent('whatsapp_form_submit', {
          formId,
          formType: 'whatsapp_modal',
          location: window.location.pathname,
          city: detectCityFromLocation(lugarEntrega),
          pickupLocation: lugarEntrega,
          returnLocation: lugarDevolucion,
          hasEmail: !!email,
          formDuration: duration,
          fieldsCompleted: Object.keys(fieldsData).length,
          timestamp: new Date().toISOString()
        });

        debugLog('WhatsApp form submitted', {
          formId,
          duration,
          fieldsData
        });
      });
    }, 500);
  }

  // ============================================================================
  // TRACKING DE MODAL DE CAPTURA DE CONTACTO
  // ============================================================================

  /**
   * Trackea el ContactCaptureModal en ReservationsPage
   */
  function trackContactCaptureModal() {
    debugLog('Setting up contact capture modal tracking');

    // Observador para detectar el modal de captura
    const contactModalObserver = new MutationObserver(() => {
      const modal = document.querySelector('[class*="ContactCaptureModal"]') ||
                   document.querySelector('.fixed.inset-0.z-\\[200\\]');

      if (modal && modal.offsetParent !== null) {
        if (!TrackerState.formInteractions.has('contact_modal')) {
          TrackerState.formInteractions.set('contact_modal', {
            opened: Date.now(),
            tracked: false
          });

          sendEvent('contact_modal_open', {
            location: window.location.pathname,
            isReservationPage: window.location.pathname.includes('reservation')
          });

          trackContactForm();
        }
      }
    });

    contactModalObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Trackea el formulario de captura de contacto
   */
  function trackContactForm() {
    setTimeout(() => {
      const form = document.querySelector('form');
      if (!form || TrackerState.formInteractions.get('contact_modal')?.tracked) return;

      const formId = 'contact_form_' + Date.now();
      let startTime = Date.now();

      // Trackear cambios en los campos
      form.querySelectorAll('input').forEach(field => {
        field.addEventListener('change', () => {
          if (field.type === 'tel') {
            sendEvent('phone_entered', {
              formId,
              hasValue: !!field.value,
              formType: 'contact_capture'
            });
          }
          if (field.type === 'email') {
            sendEvent('email_entered', {
              formId,
              hasValue: !!field.value,
              formType: 'contact_capture'
            });
          }
        });
      });

      // Trackear envío del formulario
      form.addEventListener('submit', (e) => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;

        const formData = new FormData(form);
        const phone = formData.get('phoneNumber');
        const email = formData.get('email');
        const countryCode = formData.get('countryCode');

        sendEvent('contact_capture_complete', {
          formId,
          formType: 'contact_modal',
          location: window.location.pathname,
          hasPhone: !!phone,
          hasEmail: !!email,
          countryCode,
          formDuration: duration,
          timestamp: new Date().toISOString()
        });

        // Marcar como tracked
        const modalData = TrackerState.formInteractions.get('contact_modal');
        if (modalData) {
          modalData.tracked = true;
        }

        debugLog('Contact form submitted', {
          formId,
          duration
        });
      });
    }, 500);
  }

  // ============================================================================
  // UTILIDADES DE DETECCIÓN
  // ============================================================================

  /**
   * Detecta la ciudad basándose en la URL o contenido
   */
  function detectCity() {
    const path = window.location.pathname;
    const cityFromPath = path.includes('miami') ? 'miami' :
                        path.includes('orlando') ? 'orlando' : null;

    if (cityFromPath) return cityFromPath;

    // Buscar en los botones activos
    const activeButton = document.querySelector('.city-selector-btn.active');
    if (activeButton) {
      const buttonText = activeButton.textContent.toLowerCase();
      if (buttonText.includes('miami')) return 'miami';
      if (buttonText.includes('orlando')) return 'orlando';
    }

    return 'unknown';
  }

  /**
   * Detecta la ciudad desde una cadena de ubicación
   */
  function detectCityFromLocation(location) {
    if (!location) return 'unknown';

    const locationLower = location.toLowerCase();
    if (locationLower.includes('miami') || locationLower.includes('lauderdale')) {
      return 'miami';
    }
    if (locationLower.includes('orlando')) {
      return 'orlando';
    }
    return 'unknown';
  }

  // ============================================================================
  // TRACKING DE NAVEGACIÓN
  // ============================================================================

  /**
   * Trackea cambios de página en SPA
   */
  function trackNavigation() {
    let lastPath = window.location.pathname;

    // Observar cambios en la URL
    const checkNavigation = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        lastPath = currentPath;

        sendEvent('page_navigation', {
          from: lastPath,
          to: currentPath,
          city: detectCity()
        });

        // Re-inicializar tracking para la nueva página
        if (currentPath.includes('reservation')) {
          trackContactCaptureModal();
        }
      }
    };

    // Escuchar eventos de navegación
    window.addEventListener('popstate', checkNavigation);

    // Interceptar clicks en links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        setTimeout(checkNavigation, 100);
      }
    });

    // Observar cambios en el DOM que podrían indicar navegación
    const navigationObserver = new MutationObserver(() => {
      checkNavigation();
    });

    navigationObserver.observe(document.querySelector('#root') || document.body, {
      childList: true,
      subtree: true
    });
  }

  // ============================================================================
  // TRACKING DE INTERACCIONES GENERALES
  // ============================================================================

  /**
   * Trackea clicks en CTAs importantes
   */
  function trackCTAClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      // Detectar clicks en botones con texto importante
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonText = button.textContent.trim();

        // Lista de textos de CTA importantes
        const importantCTAs = [
          'cotizar', 'reservar', 'quote', 'reserve',
          '50% off', 'descuento', 'continuar'
        ];

        const isImportantCTA = importantCTAs.some(cta =>
          buttonText.toLowerCase().includes(cta)
        );

        if (isImportantCTA) {
          sendEvent('cta_click', {
            buttonText,
            location: window.location.pathname,
            city: detectCity(),
            elementClass: button.className
          });
        }
      }
    });
  }

  /**
   * Trackea el tiempo de permanencia en la página
   */
  function trackEngagement() {
    let startTime = Date.now();
    let isVisible = true;
    let totalVisibleTime = 0;

    // Detectar cuando la página está visible/oculta
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (isVisible) {
          totalVisibleTime += Date.now() - startTime;
          isVisible = false;
        }
      } else {
        if (!isVisible) {
          startTime = Date.now();
          isVisible = true;
        }
      }
    });

    // Enviar tiempo de engagement cada 30 segundos
    setInterval(() => {
      if (isVisible) {
        const currentSessionTime = totalVisibleTime + (Date.now() - startTime);
        sendEvent('engagement_update', {
          timeOnPage: Math.round(currentSessionTime / 1000),
          scrollDepth: calculateScrollDepth(),
          city: detectCity()
        });
      }
    }, 30000);

    // Enviar al salir de la página
    window.addEventListener('beforeunload', () => {
      if (isVisible) {
        totalVisibleTime += Date.now() - startTime;
      }

      sendEvent('page_exit', {
        totalTimeOnPage: Math.round(totalVisibleTime / 1000),
        exitPage: window.location.pathname,
        maxScrollDepth: calculateScrollDepth()
      });
    });
  }

  /**
   * Calcula la profundidad del scroll
   */
  function calculateScrollDepth() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercentage = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    return Math.min(scrollPercentage, 100);
  }

  /**
   * Trackea el scroll en la página
   */
  function trackScroll() {
    let maxScrollDepth = 0;
    let scrollMilestones = [25, 50, 75, 90, 100];
    let reachedMilestones = new Set();

    const handleScroll = () => {
      const scrollDepth = calculateScrollDepth();
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);

      // Verificar milestones
      scrollMilestones.forEach(milestone => {
        if (scrollDepth >= milestone && !reachedMilestones.has(milestone)) {
          reachedMilestones.add(milestone);
          sendEvent('scroll_milestone', {
            milestone,
            location: window.location.pathname,
            city: detectCity()
          });
        }
      });
    };

    // Debounce del scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    });
  }

  // ============================================================================
  // INICIALIZACIÓN
  // ============================================================================

  /**
   * Inicializa el sistema de tracking
   */
  function initialize() {
    debugLog('Initializing RentSmart Black Friday Tracking');

    // Inicializar estado
    TrackerState.sessionId = getSessionId();
    TrackerState.userId = getUserId();
    TrackerState.referrer = document.referrer;
    TrackerState.landingPage = window.location.href;

    // Parsear parámetros de URL
    const { utmParams, metaAdsParams } = parseUrlParams();

    // Si no hay parámetros nuevos, intentar recuperar de la sesión
    if (Object.keys(utmParams).length === 0) {
      const savedUtm = sessionStorage.getItem('rs_utm_params');
      if (savedUtm) {
        Object.assign(TrackerState.utmParams, JSON.parse(savedUtm));
      }
    } else {
      TrackerState.utmParams = utmParams;
    }

    if (Object.keys(metaAdsParams).length === 0) {
      const savedMeta = sessionStorage.getItem('rs_meta_params');
      if (savedMeta) {
        Object.assign(TrackerState.metaAdsParams, JSON.parse(savedMeta));
      }
    } else {
      TrackerState.metaAdsParams = metaAdsParams;
    }

    // Enviar evento inicial de page_view
    if (!TrackerState.eventsTracked.has('page_view')) {
      sendEvent('page_view', {
        isFirstVisit: !localStorage.getItem('rs_returning_user'),
        city: detectCity()
      });

      // Marcar como usuario que regresa
      localStorage.setItem('rs_returning_user', 'true');
    }

    // Inicializar todos los sistemas de tracking
    trackHQWidget();
    trackWhatsAppModal();
    trackContactCaptureModal();
    trackNavigation();
    trackCTAClicks();
    trackEngagement();
    trackScroll();

    debugLog('Tracking initialized', {
      sessionId: TrackerState.sessionId,
      userId: TrackerState.userId,
      utmParams: TrackerState.utmParams,
      metaAdsParams: TrackerState.metaAdsParams
    });
  }

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM ya está listo
    initialize();
  }

  // Re-inicializar si se detectan cambios importantes en el DOM (para SPA)
  let reinitTimeout;
  const rootObserver = new MutationObserver(() => {
    clearTimeout(reinitTimeout);
    reinitTimeout = setTimeout(() => {
      // Re-inicializar tracking de widgets si es necesario
      if (document.querySelectorAll('.hq-rental-software-integration').length > 0) {
        trackHQWidget();
      }
    }, 1000);
  });

  // Observar cambios en el root de la aplicación
  setTimeout(() => {
    const root = document.getElementById('root') || document.body;
    rootObserver.observe(root, {
      childList: true,
      subtree: true
    });
  }, 2000);

})();