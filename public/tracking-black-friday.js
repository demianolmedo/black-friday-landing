/**
 * =====================================================
 * SCRIPT DE TRACKING - RENTSMART BLACK FRIDAY
 * Versión: 2.0 - Con captura de eventos de BOTÓN
 * Última actualización: 2025-01-20
 * =====================================================
 *
 * EVENTOS CAPTURADOS:
 * - page_view: Primera visita con UTMs + Meta Ads
 * - whatsapp_click: Click en botón "Hablar con un agente" (WhatsApp Modal)
 * - hq_quote_click: Click en botón submit (HQ Widget)
 *
 * IMPORTANTE: Este script captura:
 * - page_view: Solo la PRIMERA vez que se carga la página en una sesión
 * - whatsapp_click/hq_quote_click: Solo cuando el BOTÓN es clickeado Y el formulario es VÁLIDO
 * - Variables de Meta Ads: cpc, spend, campaign_id, adset_id, ad_id
 * - conversion_type: Se agrega automáticamente ("whatsapp" o "hq_widget")
 *
 * El script envía los eventos a DOS endpoints:
 * 1. /api/track-event → tracking_events (con event_data)
 * 2. /api/utm-tracking → utmPrincipal (datos directos en payload)
 *
 * =====================================================
 */

(function() {
  'use strict';

  console.log('🔍 [BlackFriday-Tracking V2.0] Script de tracking cargado - Captura eventos de BOTÓN');
  console.log('📍 [Tracking] URL actual:', window.location.href);
  console.log('📍 [Tracking] readyState:', document.readyState);

  // =====================
  // CONFIGURACIÓN
  // =====================
  const CONFIG = {
    // Endpoints
    trackEventUrl: 'https://pizarra-backend.alfmia.easypanel.host/api/track-event',
    utmTrackingUrl: 'https://pizarra-backend.alfmia.easypanel.host/api/utm-tracking',

    // Configuración
    timeout: 5000,
    debug: true // Cambiar a false en producción
  };

  console.log('✅ [BlackFriday-Tracking] Script activado para:', window.location.href);

  // =====================
  // GESTIÓN DE IDENTIDAD
  // =====================

  function getVisitorId() {
    let visitorId = localStorage.getItem('rentsmartVisitorId');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('rentsmartVisitorId', visitorId);
      if (CONFIG.debug) console.log('🆕 [Tracking] Nuevo visitor_id creado:', visitorId);
    }
    return visitorId;
  }

  function getSessionId() {
    let sessionId = sessionStorage.getItem('rentsmartSessionId');
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('rentsmartSessionId', sessionId);
      if (CONFIG.debug) console.log('🆕 [Tracking] Nuevo session_id creado:', sessionId);
    }
    return sessionId;
  }

  // =====================
  // UTILIDADES DE TRACKING
  // =====================

  function parseNumericValue(value, decimals = 2) {
    if (!value) return null;
    const cleanValue = String(value).replace(/[^0-9.,]/g, '');
    const numValue = parseFloat(cleanValue.replace(',', '.'));
    if (isNaN(numValue) || numValue < 0) return null;
    return Math.round(numValue * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  // Capturar parámetros UTM + Meta Ads (IGUAL que script original)
  function getUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);

    const utmParams = {
      utm_source: urlParams.get('utm_source') || null,
      utm_medium: urlParams.get('utm_medium') || null,
      utm_campaign: urlParams.get('utm_campaign') || null,
      utm_term: urlParams.get('utm_term') || null,
      utm_content: urlParams.get('utm_content') || null
    };

    const metaParams = {
      cpc: parseNumericValue(urlParams.get('cpc'), 4),
      spend: parseNumericValue(urlParams.get('spend'), 2),
      campaign_id: urlParams.get('campaign_id') || null,
      adset_id: urlParams.get('adset_id') || null,
      ad_id: urlParams.get('ad_id') || null
    };

    const allParams = { ...utmParams, ...metaParams };

    if (metaParams.campaign_id && CONFIG.debug) {
      console.log('📊 [Meta Ads] Variables capturadas:', metaParams);
    }

    return allParams;
  }

  // =====================
  // FUNCIONES DE ENVÍO (IGUAL que script original)
  // =====================

  async function trackEvent(eventName, eventData = {}) {
    try {
      const utmAndMetaParams = getUTMParams();

      const payload = {
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        event_type: eventName,
        url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        ...utmAndMetaParams,
        event_data: eventData
      };

      if (CONFIG.debug) {
        console.log(`📡 [Tracking] Enviando evento '${eventName}' a /api/track-event:`, payload);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

      const response = await fetch(CONFIG.trackEventUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (CONFIG.debug) {
        console.log(`✅ [Tracking] Evento '${eventName}' enviado a /api/track-event (status: ${response.status})`);
      }
    } catch (error) {
      console.error(`❌ [Tracking] Error enviando evento '${eventName}':`, error.message);
      console.error('Stack trace:', error);
    }
  }

  async function trackUTM(formData) {
    try {
      const utmAndMetaParams = getUTMParams();

      const payload = {
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        ...utmAndMetaParams,
        ...formData,
        referrer_url: document.referrer || null,
        landing_page: window.location.href,
        user_agent: navigator.userAgent
      };

      if (CONFIG.debug) {
        console.log('📡 [Tracking] Enviando datos a /api/utm-tracking:', payload);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

      const response = await fetch(CONFIG.utmTrackingUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (CONFIG.debug) {
        console.log(`✅ [Tracking] Datos enviados a /api/utm-tracking (status: ${response.status})`);
      }
    } catch (error) {
      console.error('❌ [Tracking] Error enviando a /api/utm-tracking:', error.message);
      console.error('Stack trace:', error);
    }
  }

  // =====================
  // TRACKING DE PAGE VIEW
  // =====================

  function trackPageView() {
    const pageViewKey = 'rentsmart_pv_' + window.location.pathname;
    const pageViewSent = sessionStorage.getItem(pageViewKey);

    if (CONFIG.debug) {
      console.log('📄 [Tracking] trackPageView() ejecutado');
      console.log('📄 [Tracking] pageViewKey:', pageViewKey);
      console.log('📄 [Tracking] pageViewSent:', pageViewSent);
    }

    if (!pageViewSent) {
      if (CONFIG.debug) console.log('📄 [Tracking] Primera visita detectada, enviando page_view...');
      trackEvent('page_view');
      sessionStorage.setItem(pageViewKey, Date.now().toString());
      if (CONFIG.debug) console.log('✅ [Tracking] Evento page_view enviado y guardado en sessionStorage');
    } else {
      if (CONFIG.debug) console.log('⏭️ [Tracking] Page view ya registrado en esta sesión');
    }
  }

  // =====================
  // TRACKING MODAL WHATSAPP
  // =====================

  let whatsappClickSent = false;

  function initializeWhatsAppTracking(form) {
    if (form.dataset.whatsappTracking === 'configured') {
      return;
    }

    if (CONFIG.debug) console.log('✅ [WhatsApp] Formulario encontrado. Configurando tracking...');

    form.dataset.whatsappTracking = 'configured';

    // Buscar el botón submit dentro del formulario
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      if (CONFIG.debug) console.log('✅ [WhatsApp] Botón "Hablar con un agente" encontrado');

      // Listener para CLICK en el botón (evento principal)
      submitButton.addEventListener('click', async function(e) {
        if (whatsappClickSent) {
          if (CONFIG.debug) console.log('⏭️ [WhatsApp] Click ya registrado, evitando duplicado');
          return;
        }

        // Verificar si el formulario es válido antes de enviar tracking
        if (!form.checkValidity()) {
          if (CONFIG.debug) console.log('⚠️ [WhatsApp] Formulario inválido, no se envía tracking');
          return;
        }

        whatsappClickSent = true;

        // Capturar datos del formulario
        const formData = {
          pickup_location: form.querySelector('[name="lugarEntrega"]')?.value || null,
          return_location: form.querySelector('[name="lugarDevolucion"]')?.value || null,
          pickup_date: form.querySelector('[name="fechaHoraRecogida"]')?.value || null,
          return_date: form.querySelector('[name="fechaHoraEntrega"]')?.value || null,
          email: form.querySelector('[name="email"]')?.value || null,
          conversion_type: 'whatsapp'
        };

        if (CONFIG.debug) {
          console.log('✅ [WhatsApp] Botón clickeado con formulario VÁLIDO');
          console.log('📱 [WhatsApp] Datos capturados:', formData);
        }

        // Enviar a AMBOS endpoints en paralelo
        Promise.allSettled([
          trackEvent('whatsapp_click', formData),
          trackUTM(formData)
        ]).then(results => {
          if (CONFIG.debug) {
            results.forEach((result, index) => {
              const endpoint = index === 0 ? 'track-event' : 'utm-tracking';
              if (result.status === 'fulfilled') {
                console.log(`✅ [WhatsApp] Enviado exitosamente a ${endpoint}`);
              } else {
                console.error(`❌ [WhatsApp] Error en ${endpoint}:`, result.reason);
              }
            });
          }
        });

        // Reset después de enviar
        setTimeout(() => {
          whatsappClickSent = false;
        }, 2000);

      }, { passive: true });

      if (CONFIG.debug) console.log('👍 [WhatsApp] Tracking del botón configurado correctamente');
    } else {
      if (CONFIG.debug) console.error('❌ [WhatsApp] No se encontró el botón submit');
    }
  }

  // =====================
  // TRACKING WIDGET HQ
  // =====================

  let hqQuoteClickSent = false;

  function initializeHQTracking(form) {
    if (form.dataset.hqTracking === 'configured') {
      return;
    }

    if (CONFIG.debug) console.log('✅ [HQ Widget] Formulario encontrado. Configurando tracking...');

    form.dataset.hqTracking = 'configured';

    // Buscar el botón submit dentro del formulario HQ
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button:not([type="button"])');

    if (submitButton) {
      if (CONFIG.debug) console.log('✅ [HQ Widget] Botón de envío encontrado');

      // Listener para CLICK en el botón (evento principal)
      submitButton.addEventListener('click', async function(e) {
        if (hqQuoteClickSent) {
          if (CONFIG.debug) console.log('⏭️ [HQ Widget] Click ya registrado, evitando duplicado');
          return;
        }

        // Verificar si el formulario es válido antes de enviar tracking
        if (!form.checkValidity()) {
          if (CONFIG.debug) console.log('⚠️ [HQ Widget] Formulario inválido, no se envía tracking');
          return;
        }

        hqQuoteClickSent = true;

        // Capturar datos del formulario HQ
        const formData = {
          pickup_location: form.querySelector('[name*="pickup"], [name*="entrega"], [id*="Entrega"]')?.value || null,
          return_location: form.querySelector('[name*="return"], [name*="devolucion"], [id*="Devolucion"]')?.value || null,
          pickup_date: form.querySelector('[name*="pickup"], [name*="entrega"], [id*="FechaDeEntrega"]')?.value || null,
          return_date: form.querySelector('[name*="return"], [name*="devolucion"], [id*="FechaDeDevolucion"]')?.value || null,
          email: form.querySelector('[name*="email"], [name*="Email"], [type="email"]')?.value || null,
          phone: form.querySelector('[name*="phone"], [name*="telefono"], [type="tel"]')?.value || null,
          country: form.querySelector('[name*="country"], [name*="Country"]')?.value || null,
          conversion_type: 'hq_widget'
        };

        if (CONFIG.debug) {
          console.log('✅ [HQ Widget] Botón clickeado con formulario VÁLIDO');
          console.log('🏢 [HQ Widget] Datos capturados:', formData);
        }

        // Enviar a AMBOS endpoints en paralelo
        Promise.allSettled([
          trackEvent('hq_quote_click', formData),
          trackUTM(formData)
        ]).then(results => {
          if (CONFIG.debug) {
            results.forEach((result, index) => {
              const endpoint = index === 0 ? 'track-event' : 'utm-tracking';
              if (result.status === 'fulfilled') {
                console.log(`✅ [HQ Widget] Enviado exitosamente a ${endpoint}`);
              } else {
                console.error(`❌ [HQ Widget] Error en ${endpoint}:`, result.reason);
              }
            });
          }
        });

        // Reset después de enviar
        setTimeout(() => {
          hqQuoteClickSent = false;
        }, 2000);

      }, { passive: true });

      if (CONFIG.debug) console.log('👍 [HQ Widget] Tracking del botón configurado correctamente');
    } else {
      if (CONFIG.debug) console.error('❌ [HQ Widget] No se encontró el botón submit');
    }
  }

  // =====================
  // INICIALIZACIÓN
  // =====================

  // Función de inicialización principal
  function initialize() {
    if (CONFIG.debug) console.log('🚀 [Tracking] Inicializando script...');

    // Disparar page_view al cargar
    trackPageView();

    // Log inicial de variables de Meta (si existen)
    const initialParams = getUTMParams();
    if (initialParams.campaign_id && CONFIG.debug) {
      console.log('🎯 [Meta Ads] Página cargada con tráfico de Meta Ads:', {
        utm_source: initialParams.utm_source,
        utm_campaign: initialParams.utm_campaign,
        campaign_id: initialParams.campaign_id,
        cpc: initialParams.cpc,
        spend: initialParams.spend
      });
    }

    if (CONFIG.debug) console.log('✅ [Tracking] Inicialización completada');
  }

  // Ejecutar inmediatamente si el DOM ya está listo, o esperar al DOMContentLoaded
  if (document.readyState === 'loading') {
    // DOM aún cargando, esperar al evento
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
    if (CONFIG.debug) console.log('⏳ [Tracking] Esperando DOMContentLoaded...');
  } else {
    // DOM ya está listo, ejecutar inmediatamente
    initialize();
  }

  // Observador para detectar modales dinámicamente
  const modalObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          // Buscar formulario de WhatsApp
          const whatsappForm = node.querySelector ? node.querySelector('form') : (node.tagName === 'FORM' ? node : null);
          if (whatsappForm) {
            // Verificar si es el modal de WhatsApp (tiene campos específicos)
            const hasWhatsappFields = whatsappForm.querySelector('[name="lugarEntrega"]') &&
                                      whatsappForm.querySelector('[name="email"]');
            if (hasWhatsappFields) {
              initializeWhatsAppTracking(whatsappForm);
            }
          }

          // Buscar formulario HQ
          const hqWidget = node.querySelector ? node.querySelector('.hq-rental-software-integration') :
                          (node.classList?.contains('hq-rental-software-integration') ? node : null);
          if (hqWidget) {
            // Esperar a que el formulario se renderice dentro del widget
            setTimeout(() => {
              const hqForm = hqWidget.querySelector('form');
              if (hqForm) {
                initializeHQTracking(hqForm);
              }
            }, 1500);
          }
        }
      }
    }
  });

  // Iniciar observador
  if (document.body) {
    modalObserver.observe(document.body, { childList: true, subtree: true });
    if (CONFIG.debug) console.log('👀 [Tracking] Observador del DOM iniciado. Esperando modales...');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      modalObserver.observe(document.body, { childList: true, subtree: true });
      if (CONFIG.debug) console.log('👀 [Tracking] Observador iniciado después de DOMContentLoaded');
    }, { once: true });
  }

  // Intentar configurar inmediatamente si ya existen formularios
  setTimeout(() => {
    // Buscar modal WhatsApp
    const existingWhatsappForm = document.querySelector('form[name="lugarEntrega"], form input[name="lugarEntrega"]')?.closest('form');
    if (existingWhatsappForm) {
      initializeWhatsAppTracking(existingWhatsappForm);
    }

    // Buscar widget HQ
    const existingHQWidget = document.querySelector('.hq-rental-software-integration');
    if (existingHQWidget) {
      const existingHQForm = existingHQWidget.querySelector('form');
      if (existingHQForm) {
        initializeHQTracking(existingHQForm);
      }
    }
  }, 2000);

})();
