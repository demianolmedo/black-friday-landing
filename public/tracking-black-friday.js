/**
 * =====================================================
 * SCRIPT DE TRACKING RENTSMART BLACK FRIDAY
 * Versión: 1.0 - Adaptado para blackfriday.rentsmartrac.com
 * Última actualización: 2025-01-20
 * =====================================================
 *
 * EVENTOS CAPTURADOS:
 * - page_view: Primera visita con UTMs + Meta Ads
 * - whatsapp_modal_open: Apertura modal WhatsApp
 * - whatsapp_form_submit: Envío formulario WhatsApp
 * - hq_widget_load: Carga del widget HQ
 * - hq_widget_interaction: Interacción con widget HQ
 * - city_selection: Cambio de ciudad (Miami/Orlando)
 * - cta_click: Clicks en botones importantes
 * - scroll_milestone: Progreso de scroll
 * - time_on_page: Tiempo en página cada 30s
 *
 * INSTALACIÓN:
 * 1. Agregar en index.html antes de </body>:
 *    <script src="/tracking-black-friday.js" defer></script>
 *
 * 2. Configurar endpoints en CONFIG
 *
 * 3. Activar debug para desarrollo
 */

(function() {
  'use strict';

  console.log('🔍 [BlackFriday-Tracking V1.0] Script cargado');

  // =====================
  // CONFIGURACIÓN
  // =====================
  const CONFIG = {
    // Endpoints del backend
    trackEventUrl: 'https://pizarra-backend.alfmia.easypanel.host/api/track-event',
    utmTrackingUrl: 'https://pizarra-backend.alfmia.easypanel.host/api/utm-tracking',

    // Configuración general
    timeout: 5000,
    debug: true, // Cambiar a false en producción

    // Intervalos
    timeTrackingInterval: 30000, // 30 segundos
    scrollMilestones: [25, 50, 75, 90, 100]
  };

  // =====================
  // GESTIÓN DE IDENTIDAD
  // =====================

  function getVisitorId() {
    let visitorId = localStorage.getItem('rentsmart_bf_visitor_id');
    if (!visitorId) {
      visitorId = 'bf_visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('rentsmart_bf_visitor_id', visitorId);
      if (CONFIG.debug) console.log('🆕 [Tracking] Nuevo visitor_id:', visitorId);
    }
    return visitorId;
  }

  function getSessionId() {
    let sessionId = sessionStorage.getItem('rentsmart_bf_session_id');
    if (!sessionId) {
      sessionId = 'bf_sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('rentsmart_bf_session_id', sessionId);
      if (CONFIG.debug) console.log('🆕 [Tracking] Nuevo session_id:', sessionId);
    }
    return sessionId;
  }

  // =====================
  // CAPTURA DE UTMS + META ADS
  // =====================

  function parseNumericValue(value, decimals = 2) {
    if (!value) return null;
    const cleanValue = String(value).replace(/[^0-9.,]/g, '');
    const numValue = parseFloat(cleanValue.replace(',', '.'));
    if (isNaN(numValue) || numValue < 0) return null;
    return Math.round(numValue * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  function getUTMandMetaParams() {
    const urlParams = new URLSearchParams(window.location.search);

    const params = {
      // UTM estándar
      utm_source: urlParams.get('utm_source') || null,
      utm_medium: urlParams.get('utm_medium') || null,
      utm_campaign: urlParams.get('utm_campaign') || null,
      utm_term: urlParams.get('utm_term') || null,
      utm_content: urlParams.get('utm_content') || null,

      // Meta Ads
      fbclid: urlParams.get('fbclid') || null,
      fb_campaign_id: urlParams.get('campaign_id') || null,
      fb_adset_id: urlParams.get('adset_id') || null,
      fb_ad_id: urlParams.get('ad_id') || null,
      cpc: parseNumericValue(urlParams.get('cpc'), 4),
      spend: parseNumericValue(urlParams.get('spend'), 2)
    };

    // Guardar en sessionStorage para mantener durante toda la sesión SPA
    if (Object.values(params).some(v => v !== null)) {
      sessionStorage.setItem('rentsmart_bf_utm_params', JSON.stringify(params));
      if (CONFIG.debug && params.fbclid) {
        console.log('📊 [Meta Ads] Parámetros capturados:', params);
      }
    }

    return params;
  }

  function getStoredUTMParams() {
    const stored = sessionStorage.getItem('rentsmart_bf_utm_params');
    return stored ? JSON.parse(stored) : getUTMandMetaParams();
  }

  // =====================
  // ENVÍO DE EVENTOS
  // =====================

  async function trackEvent(eventType, eventData = {}) {
    const utmParams = getStoredUTMParams();

    const payload = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      event_type: eventType,
      url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      ...utmParams,
      event_data: eventData
    };

    try {
      if (CONFIG.debug) {
        console.log(`📡 [Tracking] Enviando evento '${eventType}':`, payload);
      }

      await fetch(CONFIG.trackEventUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(CONFIG.timeout)
      });

      if (CONFIG.debug) console.log(`✅ [Tracking] Evento '${eventType}' enviado`);
    } catch (error) {
      console.error(`❌ [Tracking] Error enviando '${eventType}':`, error.message);
    }
  }

  // Enviar a endpoint UTM (solo para conversiones importantes)
  // IMPORTANTE: Los datos van DIRECTAMENTE en el payload, no dentro de event_data
  async function trackUTM(formData) {
    const utmParams = getStoredUTMParams();

    // Estructura EXACTA como el script original
    const payload = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),

      // UTMs y Meta Ads en el nivel principal
      ...utmParams,

      // Datos del formulario DIRECTAMENTE (no dentro de event_data)
      ...formData,

      // Campos adicionales requeridos
      referrer_url: document.referrer || null,
      landing_page: window.location.href,
      user_agent: navigator.userAgent
    };

    try {
      if (CONFIG.debug) {
        console.log('📡 [utm-tracking] Enviando a utmPrincipal:', payload);
      }

      await fetch(CONFIG.utmTrackingUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(CONFIG.timeout)
      });

      if (CONFIG.debug) console.log('✅ [utm-tracking] Datos enviados a utmPrincipal');
    } catch (error) {
      console.error('❌ [utm-tracking] Error:', error.message);
    }
  }

  // =====================
  // TRACKING DE PAGE VIEW
  // =====================

  function trackPageView() {
    const pageViewKey = 'rentsmart_bf_pv_sent';
    const pageViewSent = sessionStorage.getItem(pageViewKey);

    if (!pageViewSent) {
      trackEvent('page_view', {
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        screen_width: screen.width,
        screen_height: screen.height,
        device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      });
      sessionStorage.setItem(pageViewKey, Date.now().toString());
      if (CONFIG.debug) console.log('📄 [Tracking] page_view enviado');
    } else {
      if (CONFIG.debug) console.log('⏭️ [Tracking] page_view ya registrado');
    }
  }

  // =====================
  // TRACKING DE MODAL WHATSAPP
  // =====================

  function setupWhatsAppModalTracking() {
    let modalTracked = false;
    let formSubmitTracked = false;

    // Detectar apertura del modal usando MutationObserver
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            // Buscar el backdrop del modal (detecta cuando se abre)
            const backdrop = node.querySelector ? node.querySelector('.fixed.inset-0.bg-black\\/70') : null;
            if (backdrop && !modalTracked) {
              modalTracked = true;
              trackEvent('whatsapp_modal_open', {
                timestamp: Date.now()
              });
              if (CONFIG.debug) console.log('📱 [WhatsApp] Modal abierto');
            }

            // Detectar el formulario dentro del modal
            const whatsappForm = node.querySelector ? node.querySelector('form') : (node.tagName === 'FORM' ? node : null);
            if (whatsappForm && !formSubmitTracked) {
              // Agregar listener al formulario
              whatsappForm.addEventListener('submit', function(e) {
                if (formSubmitTracked) return; // Evitar duplicados
                formSubmitTracked = true;

                // Capturar datos del formulario (nombres compatibles con tu BD)
                const formData = {
                  // Ubicaciones (nombres como en script original)
                  pickup_location: whatsappForm.querySelector('[name="lugarEntrega"]')?.value || null,
                  return_location: whatsappForm.querySelector('[name="lugarDevolucion"]')?.value || null,

                  // Fechas (nombres como en script original)
                  pickup_date: whatsappForm.querySelector('[name="fechaHoraRecogida"]')?.value || null,
                  return_date: whatsappForm.querySelector('[name="fechaHoraEntrega"]')?.value || null,

                  // Email - múltiples selectores para asegurar captura
                  email: whatsappForm.querySelector(
                    '[name="email"], [name="Email"], [type="email"], ' +
                    'input[placeholder*="email" i], input[placeholder*="correo" i]'
                  )?.value || null,

                  // Teléfono - NUEVO CAMPO
                  phone: whatsappForm.querySelector(
                    '[name="phone"], [name="telefono"], [name="Phone"], ' +
                    '[type="tel"], input[placeholder*="tel" i], input[placeholder*="phone" i]'
                  )?.value || null,

                  // Tipo de conversión
                  conversion_type: 'whatsapp'
                };

                if (CONFIG.debug) {
                  console.log('📱 [WhatsApp] Formulario enviado:', formData);
                }

                // Enviar a AMBOS endpoints
                // track-event: con event_data
                // utm-tracking: datos directos (como script original)
                Promise.allSettled([
                  trackEvent('whatsapp_form_submit', formData),
                  trackUTM(formData)
                ]);

                // Reset del flag cuando se cierra el modal
                setTimeout(() => {
                  modalTracked = false;
                  formSubmitTracked = false;
                }, 2000);
              }, { once: false });
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    if (CONFIG.debug) console.log('👀 [WhatsApp] Observer activado');
  }

  // =====================
  // TRACKING DE WIDGET HQ
  // =====================

  function setupHQWidgetTracking() {
    let widgetLoadTracked = false;
    let currentCity = null;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            // Detectar carga del widget HQ
            const hqWidget = node.querySelector ? node.querySelector('.hq-rental-software-integration') :
                             (node.classList?.contains('hq-rental-software-integration') ? node : null);

            if (hqWidget && !widgetLoadTracked) {
              widgetLoadTracked = true;

              // Detectar ciudad del wrapper
              const wrapperId = hqWidget.closest('[id]')?.id;
              const city = wrapperId?.includes('miami') ? 'miami' :
                          wrapperId?.includes('orlando') ? 'orlando' :
                          'unknown';
              currentCity = city;

              trackEvent('hq_widget_load', {
                city: city,
                brand: hqWidget.dataset.brand || null,
                timestamp: Date.now()
              });

              if (CONFIG.debug) console.log('🏢 [HQ Widget] Cargado para:', city);

              // Detectar iframe dentro del widget (método antiguo)
              setTimeout(() => {
                const iframe = hqWidget.querySelector('iframe');
                if (iframe) {
                  iframe.addEventListener('load', function() {
                    trackEvent('hq_widget_interaction', {
                      city: currentCity,
                      interaction_type: 'iframe_loaded'
                    });
                    if (CONFIG.debug) console.log('🏢 [HQ Widget] Iframe cargado');
                  });
                }

                // Detectar formulario directo (método nuevo)
                const form = hqWidget.querySelector('form');
                if (form) {
                  // Trackear interacción con campos del formulario
                  const inputs = form.querySelectorAll('input, select');
                  inputs.forEach(input => {
                    input.addEventListener('focus', function() {
                      trackEvent('hq_widget_interaction', {
                        city: currentCity,
                        interaction_type: 'form_field_focus',
                        field: input.name || input.id || 'unknown'
                      });
                    }, { once: true }); // Solo una vez por campo
                  });

                  // Trackear submit del formulario HQ
                  form.addEventListener('submit', function() {
                    // Capturar todos los datos posibles del formulario HQ
                    const formData = {
                      city: currentCity,
                      conversion_type: 'hq_widget',

                      // Ubicaciones
                      pickup_location: form.querySelector('[name*="pickup"], [name*="entrega"], [id*="pickup"], [id*="entrega"]')?.value || null,
                      return_location: form.querySelector('[name*="return"], [name*="devolucion"], [id*="return"], [id*="devolucion"]')?.value || null,

                      // Fechas
                      pickup_date: form.querySelector('[name*="pickup_date"], [name*="fecha_entrega"], [type="date"][name*="pickup"]')?.value || null,
                      return_date: form.querySelector('[name*="return_date"], [name*="fecha_devolucion"], [type="date"][name*="return"]')?.value || null,

                      // Email - MÚLTIPLES SELECTORES para asegurar captura
                      email: form.querySelector(
                        '[name="email"], [name="Email"], [name="EMAIL"], ' +
                        '[id="email"], [id="Email"], ' +
                        '[type="email"], ' +
                        'input[placeholder*="email" i], input[placeholder*="correo" i]'
                      )?.value || null,

                      // Nombre si está disponible
                      name: form.querySelector('[name*="name"], [name*="nombre"], [id*="name"], [id*="nombre"]')?.value || null,

                      // Teléfono si está disponible
                      phone: form.querySelector('[name*="phone"], [name*="telefono"], [type="tel"]')?.value || null,

                      // País si está disponible
                      country: form.querySelector('[name*="country"], [name*="pais"], [id*="country"]')?.value || null
                    };

                    Promise.allSettled([
                      trackEvent('hq_form_submit', formData),
                      trackUTM(formData)
                    ]);

                    if (CONFIG.debug) {
                      console.log('🏢 [HQ Widget] Formulario enviado con datos completos:', formData);
                    }
                  });
                }
              }, 1000); // Esperar a que el widget se renderice completamente

              // Reset cuando se limpia el widget
              widgetLoadTracked = false;
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    if (CONFIG.debug) console.log('👀 [HQ Widget] Observer activado');
  }

  // =====================
  // TRACKING DE SELECCIÓN DE CIUDAD
  // =====================

  function setupCitySelectionTracking() {
    // Detectar clicks en botones de ciudad usando delegación de eventos
    document.body.addEventListener('click', function(e) {
      const cityButton = e.target.closest('.city-selector-btn');
      if (cityButton) {
        const cityText = cityButton.textContent.trim().toLowerCase();
        const city = cityText.includes('miami') ? 'miami' :
                    cityText.includes('orlando') ? 'orlando' :
                    'unknown';

        trackEvent('city_selection', {
          city: city,
          timestamp: Date.now()
        });

        if (CONFIG.debug) console.log('🏙️ [City] Seleccionada:', city);
      }
    });

    if (CONFIG.debug) console.log('👀 [City] Tracking activado');
  }

  // =====================
  // TRACKING DE CTAs
  // =====================

  function setupCTATracking() {
    document.body.addEventListener('click', function(e) {
      const cta = e.target.closest('a[href*="contact-form"], button');
      if (cta) {
        const text = cta.textContent.trim();
        const href = cta.getAttribute('href');

        // Solo trackear CTAs importantes (no todos los botones)
        if (text.toLowerCase().includes('off') ||
            text.toLowerCase().includes('cotiz') ||
            text.toLowerCase().includes('reserv') ||
            text.toLowerCase().includes('agente') ||
            href === '#contact-form') {

          trackEvent('cta_click', {
            cta_text: text,
            cta_href: href || null,
            timestamp: Date.now()
          });

          if (CONFIG.debug) console.log('🎯 [CTA] Click:', text);
        }
      }
    });

    if (CONFIG.debug) console.log('👀 [CTA] Tracking activado');
  }

  // =====================
  // TRACKING DE SCROLL
  // =====================

  function setupScrollTracking() {
    const milestones = new Set();
    let maxScroll = 0;

    function trackScroll() {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        CONFIG.scrollMilestones.forEach(milestone => {
          if (scrollPercent >= milestone && !milestones.has(milestone)) {
            milestones.add(milestone);
            trackEvent('scroll_milestone', {
              milestone: milestone,
              max_scroll: maxScroll
            });
            if (CONFIG.debug) console.log(`📜 [Scroll] Milestone: ${milestone}%`);
          }
        });
      }
    }

    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScroll, 200);
    }, { passive: true });

    if (CONFIG.debug) console.log('👀 [Scroll] Tracking activado');
  }

  // =====================
  // TRACKING DE TIEMPO EN PÁGINA
  // =====================

  function setupTimeTracking() {
    let timeOnPage = 0;
    let isActive = true;

    // Detectar cuando el usuario está activo/inactivo
    document.addEventListener('visibilitychange', function() {
      isActive = !document.hidden;
    });

    setInterval(function() {
      if (isActive) {
        timeOnPage += CONFIG.timeTrackingInterval / 1000; // Convertir a segundos
        trackEvent('time_on_page', {
          seconds: timeOnPage,
          minutes: Math.round(timeOnPage / 60 * 10) / 10
        });
        if (CONFIG.debug) console.log(`⏱️ [Time] ${timeOnPage}s en página`);
      }
    }, CONFIG.timeTrackingInterval);

    if (CONFIG.debug) console.log('👀 [Time] Tracking activado');
  }

  // =====================
  // INICIALIZACIÓN
  // =====================

  // Capturar UTMs inmediatamente
  getUTMandMetaParams();

  // Log inicial si hay tráfico de Meta
  const initialParams = getStoredUTMParams();
  if (initialParams.fbclid && CONFIG.debug) {
    console.log('🎯 [Meta Ads] Tráfico de Facebook detectado:', initialParams);
  }

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🚀 [Tracking] Inicializando...');

    // Trackear page view
    trackPageView();

    // Activar todos los observers y trackers
    setupWhatsAppModalTracking();
    setupHQWidgetTracking();
    setupCitySelectionTracking();
    setupCTATracking();
    setupScrollTracking();
    setupTimeTracking();

    console.log('✅ [Tracking] Sistema completamente activado');
  }

})();
