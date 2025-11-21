# Documentación del Sistema de Tracking - Black Friday Landing Page

## Índice
1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Endpoints del Backend](#endpoints-del-backend)
4. [Eventos Trackeados](#eventos-trackeados)
5. [Modales y Captura de Datos](#modales-y-captura-de-datos)
6. [Variables UTM y Meta Ads](#variables-utm-y-meta-ads)
7. [Flujo de Datos](#flujo-de-datos)
8. [Solución de Problemas](#solución-de-problemas)
9. [Versiones del Script](#versiones-del-script)

---

## Descripción General

Sistema completo de tracking para la landing page de Black Friday que captura:
- **Visitas a la página (page_view)** con parámetros UTM y Meta Ads
- **Conversiones de WhatsApp** (email + datos de alquiler)
- **Conversiones de HQ Contact** (email + teléfono)

### Archivos Principales

```
black-friday-landing/
├── public/
│   └── tracking-black-friday.js    # Script principal de tracking (v2.5)
├── src/
│   └── components/
│       ├── WhatsAppModal.jsx       # Modal de WhatsApp (detectado por MutationObserver)
│       └── ContactCaptureModal.jsx # Modal de contacto HQ (tracking manual)
└── index.html                      # Carga del script con versión ?v=2.5
```

---

## Arquitectura del Sistema

### Componentes Clave

1. **tracking-black-friday.js**: Script principal que maneja todo el tracking
2. **Backend API**: Dos endpoints en `C:\RENTSMART\lovable\server\index.js`
3. **Storage del Navegador**:
   - `localStorage`: Almacena `visitor_id` (persistente entre sesiones)
   - `sessionStorage`: Almacena `session_id` y parámetros UTM (temporal)

### Identificadores

```javascript
// visitor_id: Único por usuario, persiste entre sesiones
visitor_id = 'visitor_1234567890_abc123def'

// session_id: Único por sesión, se regenera al cerrar navegador
session_id = 'session_1234567890_xyz789ghi'
```

---

## Endpoints del Backend

### 1. `/api/track-event` (Tabla: tracking_events)

**URL**: `https://rent-smart-car-rental.rentsmartrac.com/api/track-event`

**Propósito**: Registrar eventos individuales (visitas, clicks, conversiones)

**Validación del Backend** (`server\index.js:3064-3069`):
```javascript
const validEventTypes = ['page_view', 'quote_click'];
if (!validEventTypes.includes(event_type)) {
  return res.status(400).json({
    success: false,
    error: 'event_type debe ser: page_view o quote_click'
  });
}
```

**Payload Ejemplo**:
```json
{
  "visitor_id": "visitor_1234567890_abc123def",
  "session_id": "session_1234567890_xyz789ghi",
  "event_type": "page_view",  // Solo acepta: 'page_view' o 'quote_click'
  "url": "https://www.blackfriday.rentsmartrac.com/",
  "referrer": "https://www.google.com/",
  "user_agent": "Mozilla/5.0...",
  "utm_source": "facebook",
  "utm_campaign": "black-friday-2024",
  "fbclid": "IwAR...",
  "campaign_id": "12345678",
  "adset_id": "98765432",
  "ad_id": "11223344",
  "event_data": {
    "conversion_type": "whatsapp",
    "pickup_location": "Miami Airport",
    "email": "user@example.com"
  }
}
```

**Campos Importantes**:
- `event_type`: SIEMPRE debe ser `'page_view'` o `'quote_click'`
- `event_data`: Objeto JSON con datos adicionales del evento

---

### 2. `/api/utm-tracking` (Tabla: utmPrincipal)

**URL**: `https://rent-smart-car-rental.rentsmartrac.com/api/utm-tracking`

**Propósito**: Registrar conversiones completas con datos de formulario

**Validación del Backend** (`server\index.js:3171-3175`):
```javascript
// ⚠️ IMPORTANTE: Ambos campos son REQUERIDOS
if (!email || !pickup_location) {
  return res.status(400).json({
    success: false,
    error: 'Email y pickup_location son requeridos'
  });
}
```

**Payload Ejemplo (WhatsApp)**:
```json
{
  "visitor_id": "visitor_1234567890_abc123def",
  "session_id": "session_1234567890_xyz789ghi",
  "email": "user@example.com",
  "pickup_location": "Miami Airport",
  "return_location": "Fort Lauderdale",
  "pickup_date": "2024-12-01T10:00:00",
  "return_date": "2024-12-05T10:00:00",
  "conversion_type": "whatsapp",
  "utm_source": "facebook",
  "utm_campaign": "black-friday-2024",
  "campaign_id": "12345678",
  "referrer_url": "https://www.google.com/",
  "landing_page": "https://www.blackfriday.rentsmartrac.com/",
  "user_agent": "Mozilla/5.0..."
}
```

**Payload Ejemplo (HQ Contact)**:
```json
{
  "visitor_id": "visitor_1234567890_abc123def",
  "session_id": "session_1234567890_xyz789ghi",
  "email": "user@example.com",
  "phone": "+14445556666",
  "pickup_location": "HQ_CONTACT",  // ⚠️ Placeholder requerido para validación
  "pickup_date": null,
  "return_location": null,
  "return_date": null,
  "conversion_type": "hq_contact_capture",
  "utm_source": "facebook",
  "utm_campaign": "black-friday-2024",
  "campaign_id": "12345678",
  "referrer_url": "https://www.google.com/",
  "landing_page": "https://www.blackfriday.rentsmartrac.com/",
  "user_agent": "Mozilla/5.0..."
}
```

**⚠️ Nota Crítica sobre pickup_location**:
- Para **conversiones de WhatsApp**: Se envía la ubicación real seleccionada
- Para **conversiones de HQ Contact**: Se envía `"HQ_CONTACT"` como placeholder
- **NO se puede enviar `null`** - el backend lo rechaza con error 400

---

## Eventos Trackeados

### 1. Page View (Vista de Página)

**Cuándo se dispara**: Al cargar la página por primera vez en la sesión

**event_type**: `'page_view'`

**Código** (`tracking-black-friday.js:432-436`):
```javascript
window.addEventListener('load', function() {
  if (!sessionStorage.getItem('pageViewTracked')) {
    trackEvent('page_view');
    sessionStorage.setItem('pageViewTracked', 'true');
  }
});
```

**Prevención de duplicados**: Usa `sessionStorage` para evitar múltiples registros

---

### 2. Conversión WhatsApp

**Cuándo se dispara**: Al hacer click en "Enviar" del modal de WhatsApp

**event_type**: `'quote_click'`

**Detección**: MutationObserver detecta cuando el modal se agrega al DOM

**Código** (`tracking-black-friday.js:224-299`):
```javascript
function initializeWhatsAppTracking(form) {
  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.addEventListener('click', async function(e) {
    if (!form.checkValidity()) return;

    const formData = {
      pickup_location: form.querySelector('[name="lugarEntrega"]')?.value || null,
      return_location: form.querySelector('[name="lugarDevolucion"]')?.value || null,
      pickup_date: form.querySelector('[name="fechaHoraRecogida"]')?.value || null,
      return_date: form.querySelector('[name="fechaHoraEntrega"]')?.value || null,
      email: form.querySelector('[name="email"]')?.value || null,
      conversion_type: 'whatsapp'
    };

    // Enviar a AMBOS endpoints
    Promise.allSettled([
      trackEvent('quote_click', formData),
      trackUTM(formData)
    ]);
  }, { passive: true });
}
```

**Datos Capturados**:
- Email
- Lugar de entrega
- Lugar de devolución
- Fecha/hora de recogida
- Fecha/hora de entrega

---

### 3. Conversión HQ Contact

**Cuándo se dispara**: Al completar el modal de contacto HQ (email + teléfono)

**event_type**: `'quote_click'`

**Detección**: Función global `window.trackHQContactCapture()` llamada desde React

**Código** (`tracking-black-friday.js:312-361`):
```javascript
window.trackHQContactCapture = async function(contactData) {
  if (hqContactCaptureSent) return; // Prevenir duplicados

  hqContactCaptureSent = true;

  const formData = {
    email: contactData.email,
    phone: contactData.phone,
    pickup_location: 'HQ_CONTACT',  // ⚠️ Placeholder para validación
    pickup_date: null,
    return_location: null,
    return_date: null,
    conversion_type: 'hq_contact_capture'
  };

  // Enviar a AMBOS endpoints
  Promise.allSettled([
    trackEvent('quote_click', formData),
    trackUTM(formData)
  ]);

  // Reset después de 5 segundos
  setTimeout(() => { hqContactCaptureSent = false; }, 5000);
};
```

**Integración React** (`ContactCaptureModal.jsx:106-124`):
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (isFormValid) {
    const contactData = {
      phone: `${formData.countryCode}${formData.phoneNumber.replace(/\s/g, '')}`,
      email: formData.email
    };

    localStorage.setItem('contactData', JSON.stringify(contactData));

    // 🔥 TRACKING: Enviar datos al backend
    if (window.trackHQContactCapture) {
      window.trackHQContactCapture(contactData);
    }

    onComplete();
  }
};
```

**Datos Capturados**:
- Email
- Teléfono (con código de país, ej: `+14445556666`)

---

## Modales y Captura de Datos

### Modal de WhatsApp

**Archivo**: `src/components/WhatsAppModal.jsx`

**Detección**: MutationObserver monitorea el DOM

**Selector del formulario**: `form[data-whatsapp-form="true"]`

**Campos del formulario**:
```html
<input name="lugarEntrega" />     <!-- Lugar de entrega -->
<input name="lugarDevolucion" />  <!-- Lugar de devolución -->
<input name="fechaHoraRecogida" /> <!-- Fecha/hora recogida -->
<input name="fechaHoraEntrega" />  <!-- Fecha/hora entrega -->
<input name="email" />             <!-- Email -->
```

**Flujo**:
1. Usuario completa formulario
2. Click en botón "Enviar"
3. Si formulario es válido → Tracking se dispara
4. Datos se envían a ambos endpoints

---

### Modal de Contacto HQ

**Archivo**: `src/components/ContactCaptureModal.jsx`

**Trigger**: Se abre después de interactuar con el widget de HQ

**Campos del formulario**:
- Código de país (dropdown con 250+ países)
- Número telefónico (validado según país)
- Email (validado con regex)

**Validaciones**:
```javascript
// Validación de teléfono según país
const validatePhoneNumber = (number, dialCode) => {
  const country = countries.find(c => c.dialCode === dialCode);
  const digitCount = number.replace(/\D/g, '').length;
  const minDigits = country.minDigits || 7;
  const maxDigits = country.maxDigits || 15;

  if (digitCount < minDigits || digitCount > maxDigits) {
    setPhoneError(`Debe tener entre ${minDigits} y ${maxDigits} dígitos`);
    return false;
  }
  return true;
};

// Validación de email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

**Flujo**:
1. Usuario completa email + teléfono
2. Validación en tiempo real
3. Click en "Continuar con Cotización"
4. Datos se guardan en localStorage
5. Función `window.trackHQContactCapture()` se ejecuta
6. Datos se envían a ambos endpoints
7. Modal se cierra

---

## Variables UTM y Meta Ads

### Parámetros UTM Estándar

```javascript
const utmParams = {
  utm_source: null,      // Origen del tráfico (facebook, google, email)
  utm_medium: null,      // Medio (cpc, banner, social)
  utm_campaign: null,    // Nombre de la campaña
  utm_term: null,        // Palabras clave (para búsqueda pagada)
  utm_content: null      // Variante del anuncio (para A/B testing)
};
```

**Ejemplo de URL con UTM**:
```
https://www.blackfriday.rentsmartrac.com/
  ?utm_source=facebook
  &utm_medium=cpc
  &utm_campaign=black-friday-2024
  &utm_content=variant-a
```

---

### Parámetros de Meta Ads (Facebook)

```javascript
const metaAdsParams = {
  fbclid: null,        // Facebook Click ID (identificador único)
  campaign_id: null,   // ID de la campaña en Meta Ads
  adset_id: null,      // ID del conjunto de anuncios
  ad_id: null          // ID del anuncio específico
};
```

**Ejemplo de URL con Meta Ads**:
```
https://www.blackfriday.rentsmartrac.com/
  ?fbclid=IwAR1AbCdEfGhIjKlMnOpQrStUvWxYz
  &campaign_id=12345678
  &adset_id=98765432
  &ad_id=11223344
```

---

### Persistencia en sessionStorage

**Código** (`tracking-black-friday.js:69-110`):
```javascript
function getUTMParams() {
  const params = new URLSearchParams(window.location.search);

  // Capturar UTM params
  const utmParams = {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content')
  };

  // Capturar Meta Ads params
  const metaAdsParams = {
    fbclid: params.get('fbclid'),
    campaign_id: params.get('campaign_id'),
    adset_id: params.get('adset_id'),
    ad_id: params.get('ad_id')
  };

  const combined = { ...utmParams, ...metaAdsParams };

  // Si hay parámetros en la URL, guardarlos en sessionStorage
  if (Object.values(combined).some(v => v !== null)) {
    sessionStorage.setItem('utm_params', JSON.stringify(combined));
    return combined;
  }

  // Si no hay en URL, intentar recuperar de sessionStorage
  const stored = sessionStorage.getItem('utm_params');
  if (stored) {
    return JSON.parse(stored);
  }

  // Si no hay nada, retornar objeto con nulls
  return combined;
}
```

**Persistencia**: Los parámetros se guardan en `sessionStorage` para mantenerlos durante toda la sesión, incluso si el usuario navega sin parámetros UTM en la URL.

---

## Flujo de Datos

### Flujo Completo: Page View

```
1. Usuario visita: https://www.blackfriday.rentsmartrac.com/?utm_source=facebook
   ↓
2. Script tracking-black-friday.js se carga (defer)
   ↓
3. Evento 'load' se dispara
   ↓
4. Se verifica sessionStorage['pageViewTracked']
   ↓
5. Si no existe → trackEvent('page_view') se ejecuta
   ↓
6. Se capturan UTM params de URL
   ↓
7. Se guardan en sessionStorage['utm_params']
   ↓
8. Se genera/recupera visitor_id de localStorage
   ↓
9. Se genera/recupera session_id de sessionStorage
   ↓
10. POST a /api/track-event con:
    - event_type: 'page_view'
    - visitor_id, session_id
    - UTM params
    - URL, referrer, user_agent
   ↓
11. Backend responde 200 OK
   ↓
12. Se marca sessionStorage['pageViewTracked'] = 'true'
```

---

### Flujo Completo: Conversión WhatsApp

```
1. Usuario hace click en botón "Cotizar Ahora"
   ↓
2. Modal de WhatsApp se abre
   ↓
3. MutationObserver detecta el formulario en el DOM
   ↓
4. initializeWhatsAppTracking(form) se ejecuta
   ↓
5. EventListener se agrega al botón "Enviar"
   ↓
6. Usuario completa formulario (email, fechas, ubicaciones)
   ↓
7. Usuario hace click en "Enviar"
   ↓
8. Se valida formulario (form.checkValidity())
   ↓
9. Si es válido → Se capturan datos del formulario
   ↓
10. Promise.allSettled ejecuta en paralelo:

    A) trackEvent('quote_click', formData)
       → POST a /api/track-event
       → event_type: 'quote_click'
       → event_data: { email, pickup_location, dates, conversion_type: 'whatsapp' }

    B) trackUTM(formData)
       → POST a /api/utm-tracking
       → Payload completo con email, pickup_location, dates, UTM params
   ↓
11. Ambos endpoints responden 200 OK
   ↓
12. Usuario es redirigido a WhatsApp
```

---

### Flujo Completo: Conversión HQ Contact

```
1. Usuario interactúa con widget de HQ
   ↓
2. Widget solicita email + teléfono
   ↓
3. ContactCaptureModal se abre
   ↓
4. Usuario completa email + teléfono
   ↓
5. Validación en tiempo real (email regex, teléfono según país)
   ↓
6. Usuario hace click en "Continuar con Cotización"
   ↓
7. handleSubmit() se ejecuta en ContactCaptureModal.jsx
   ↓
8. Datos se guardan en localStorage['contactData']
   ↓
9. window.trackHQContactCapture(contactData) se ejecuta
   ↓
10. Se verifica flag hqContactCaptureSent para evitar duplicados
   ↓
11. Se prepara formData con:
    - email: contactData.email
    - phone: contactData.phone
    - pickup_location: 'HQ_CONTACT' (placeholder)
    - otros campos: null
    - conversion_type: 'hq_contact_capture'
   ↓
12. Promise.allSettled ejecuta en paralelo:

    A) trackEvent('quote_click', formData)
       → POST a /api/track-event
       → event_type: 'quote_click'
       → event_data: { email, phone, conversion_type: 'hq_contact_capture' }

    B) trackUTM(formData)
       → POST a /api/utm-tracking
       → Payload con email, phone, pickup_location: 'HQ_CONTACT', UTM params
   ↓
13. Ambos endpoints responden 200 OK
   ↓
14. Flag hqContactCaptureSent = true
   ↓
15. Modal se cierra
   ↓
16. Widget de HQ continúa con su flujo normal
   ↓
17. Después de 5 segundos: hqContactCaptureSent = false (reset)
```

---

## Solución de Problemas

### Problema 1: Script no registra page_view

**Síntomas**:
- Console no muestra logs de tracking
- Backend no recibe eventos de page_view

**Causa**: Navegador cargó versión antigua del script desde cache

**Solución**:
```bash
1. Limpiar sessionStorage y localStorage:
   - Abrir DevTools (F12)
   - Application → Storage → Clear site data

2. Hard reload:
   - Ctrl + Shift + R (Windows/Linux)
   - Cmd + Shift + R (Mac)

3. Verificar versión cargada:
   - Console → window.TRACKING_VERSION
   - Debe mostrar: "2.5"
```

---

### Problema 2: Error 400 en /api/track-event

**Síntomas**:
```
❌ [Tracking] Error enviando evento 'whatsapp_click': Bad Request
```

**Causa**: Backend solo acepta event_type: `'page_view'` o `'quote_click'`

**Solución**: Usar siempre `'quote_click'` para conversiones, nunca nombres personalizados como `'whatsapp_click'` o `'hq_contact_capture'`

**Código correcto**:
```javascript
trackEvent('quote_click', {
  conversion_type: 'whatsapp'  // Diferenciador va en event_data
});
```

---

### Problema 3: Error 400 en /api/utm-tracking

**Síntomas**:
```
✅ [Tracking] Evento 'quote_click' enviado a /api/track-event (status: 200)
❌ [Tracking] Datos enviados a /api/utm-tracking (status: 400)
```

**Causa**: Backend requiere que `email` Y `pickup_location` sean no-nulos

**Solución para HQ Contact**: Usar placeholder en pickup_location

**Código correcto**:
```javascript
const formData = {
  email: contactData.email,
  phone: contactData.phone,
  pickup_location: 'HQ_CONTACT',  // ✅ NO enviar null
  // ...
};
```

---

### Problema 4: Eventos duplicados

**Síntomas**:
- Mismo evento se registra múltiples veces
- Console muestra "⏭️ Ya registrado, evitando duplicado"

**Prevención implementada**:

**Page View**:
```javascript
if (!sessionStorage.getItem('pageViewTracked')) {
  trackEvent('page_view');
  sessionStorage.setItem('pageViewTracked', 'true');
}
```

**HQ Contact**:
```javascript
let hqContactCaptureSent = false;

window.trackHQContactCapture = async function(contactData) {
  if (hqContactCaptureSent) return;
  hqContactCaptureSent = true;

  // ... tracking logic

  setTimeout(() => { hqContactCaptureSent = false; }, 5000);
};
```

---

### Problema 5: Modal de WhatsApp no detectado

**Síntomas**:
- Console muestra "❌ [WhatsApp] No se encontró formulario válido"
- Click en "Enviar" no registra conversión

**Causa**: Selector del formulario no coincide

**Verificación**:
```javascript
// DevTools Console:
document.querySelector('form[data-whatsapp-form="true"]')
// Debe retornar: <form data-whatsapp-form="true">...</form>
```

**Solución**: Verificar que WhatsAppModal.jsx tiene el atributo correcto:
```jsx
<form data-whatsapp-form="true" onSubmit={handleSubmit}>
```

---

### Problema 6: UTM params no persisten

**Síntomas**:
- Usuario visita con UTM params
- Al navegar dentro del sitio, UTM params se pierden

**Solución implementada**: sessionStorage

```javascript
// Al detectar UTM params en URL:
sessionStorage.setItem('utm_params', JSON.stringify(params));

// Al enviar tracking:
const stored = sessionStorage.getItem('utm_params');
const params = stored ? JSON.parse(stored) : defaultParams;
```

**Duración**: Persiste durante toda la sesión (hasta cerrar navegador)

---

## Versiones del Script

### v1.0 (Inicial)
- Tracking básico de page_view
- Sin prevención de duplicados
- Sin Meta Ads tracking

### v2.0 (Primera iteración completa)
- Tracking de page_view con UTM params
- Tracking de WhatsApp modal
- Meta Ads variables (fbclid, campaign_id, etc.)
- Prevención de duplicados para page_view

### v2.1 (Fix validación backend)
- Cambio de event_type de 'whatsapp_click' a 'quote_click'
- Uso de conversion_type en event_data

### v2.2 (HQ Contact inicial)
- Tracking del modal de contacto HQ
- Solo enviado a /api/track-event

### v2.3 (HQ Contact completo)
- HQ Contact enviado a ambos endpoints
- Phone temporalmente en pickup_location

### v2.4 (Campo phone correcto)
- Phone en campo 'phone'
- pickup_location enviado como null
- ❌ Error 400 en /api/utm-tracking

### v2.5 (Actual - FUNCIONAL) ✅
**Fecha**: 2025-01-21

**Cambios principales**:
- ✅ **Persistencia de UTM params en sessionStorage**
  - UTM params se guardan en sessionStorage al cargar la página
  - Se recuperan automáticamente cuando no están en la URL
  - Fix: utm_source y utm_campaign ahora se envían correctamente desde modales
- ✅ pickup_location: 'HQ_CONTACT' para HQ Contact
- ✅ Phone en campo 'phone'
- ✅ Ambos endpoints responden 200 OK
- ✅ Corrección automática de números de Argentina (+54) para Buenos Aires (agrega "9" al inicio de números que comienzan con "11")
- ✅ Validación de teléfono universal: mínimo 7 dígitos

**Archivos modificados**:
- `public/tracking-black-friday.js`: Líneas 88-136 (función `getUTMParams()`)
- `src/components/ContactCaptureModal.jsx`: Líneas 27-43 (validación), líneas 98-124 (corrección Argentina)

**Verificar versión actual**:
```javascript
// Console del navegador (revisar logs iniciales):
// 🔍 [BlackFriday-Tracking V2.5] Script cargado - Persistencia UTM params
```

**Logs nuevos para depuración**:
```
💾 [UTM] Parámetros guardados en sessionStorage: { utm_source: '...', utm_campaign: '...' }
📥 [UTM] Parámetros recuperados de sessionStorage: { utm_source: '...', utm_campaign: '...' }
```

---

## Debugging

### Modo Debug

El script tiene modo debug activado por defecto en desarrollo:

```javascript
const CONFIG = {
  debug: true,  // Cambiar a false en producción
  // ...
};
```

### Logs Importantes

**Inicialización**:
```
🔥 [Tracking] Script iniciado (v2.5)
✅ [Tracking] Visitor ID: visitor_1234567890_abc123def
✅ [Tracking] Session ID: session_1234567890_xyz789ghi
✅ [Tracking] UTM Params capturados: { utm_source: 'facebook', ... }
✅ [Tracking] Función window.trackHQContactCapture registrada
```

**Page View**:
```
📊 [Tracking] Evento 'page_view' disparado
✅ [Tracking] Evento 'page_view' enviado a /api/track-event (status: 200)
```

**Conversión WhatsApp**:
```
✅ [WhatsApp] Formulario detectado y tracking inicializado
📝 [WhatsApp] Datos capturados: { email: '...', pickup_location: '...', ... }
✅ [Tracking] Evento 'quote_click' enviado a /api/track-event (status: 200)
✅ [Tracking] Datos enviados a /api/utm-tracking (status: 200)
```

**Conversión HQ Contact**:
```
✅ [HQ Contact] Modal de contacto enviado
📞 [HQ Contact] Datos capturados: { email: '...', phone: '...', ... }
✅ [HQ Contact] Enviado exitosamente a track-event
✅ [HQ Contact] Enviado exitosamente a utm-tracking
```

---

## Consideraciones de Producción

### 1. Desactivar Debug Mode

```javascript
const CONFIG = {
  debug: false,  // ⚠️ IMPORTANTE: false en producción
  // ...
};
```

### 2. CORS y Seguridad

El backend debe permitir requests desde el dominio de producción:

```javascript
// server/index.js
app.use(cors({
  origin: ['https://www.blackfriday.rentsmartrac.com'],
  credentials: true
}));
```

### 3. Rate Limiting

Considerar implementar rate limiting en el backend para prevenir abuso:

```javascript
// Ejemplo con express-rate-limit
const rateLimit = require('express-rate-limit');

const trackingLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10 // máximo 10 requests por minuto por IP
});

app.post('/api/track-event', trackingLimiter, async (req, res) => {
  // ...
});
```

### 4. Monitoreo

Implementar alertas para:
- Tasa de errores > 5%
- Falta de eventos de page_view
- Picos anormales de tráfico

---

## Mantenimiento Futuro

### Agregar Nuevo Evento de Tracking

**Paso 1**: Decidir si es un evento simple o conversión

- **Evento simple**: Solo usar `/api/track-event`
- **Conversión completa**: Usar ambos endpoints

**Paso 2**: Usar event_type correcto

```javascript
// ✅ CORRECTO
trackEvent('quote_click', {
  conversion_type: 'nuevo_tipo',  // Identificador personalizado
  // ... datos adicionales
});

// ❌ INCORRECTO
trackEvent('nuevo_tipo', { ... });  // Backend rechazará
```

**Paso 3**: Si requiere datos de formulario, enviar a trackUTM también

```javascript
Promise.allSettled([
  trackEvent('quote_click', formData),
  trackUTM(formData)
]);
```

---

### Agregar Nuevo Campo al Backend

**Ejemplo**: Agregar campo 'driver_age'

**Backend** (`server/index.js`):
```javascript
// 1. Agregar a destructuring
const { email, pickup_location, driver_age, ... } = req.body;

// 2. Agregar a INSERT
const sql = `
  INSERT INTO utmPrincipal
  (visitor_id, email, pickup_location, driver_age, ...)
  VALUES (?, ?, ?, ?, ...)
`;
```

**Frontend** (`tracking-black-friday.js`):
```javascript
// En la función que captura datos del formulario:
const formData = {
  email: form.querySelector('[name="email"]')?.value,
  pickup_location: form.querySelector('[name="pickup"]')?.value,
  driver_age: form.querySelector('[name="age"]')?.value,  // Nuevo campo
  // ...
};

trackUTM(formData);
```

---

## Contacto y Soporte

Para preguntas o problemas con el sistema de tracking:

1. Revisar esta documentación primero
2. Verificar logs en Console del navegador (F12)
3. Verificar logs del backend
4. Verificar validaciones en `server/index.js:3064-3175`

**Archivos clave para debugging**:
- `tracking-black-friday.js` (Frontend tracking)
- `server/index.js` (Backend endpoints)
- `ContactCaptureModal.jsx` (Modal HQ)
- `WhatsAppModal.jsx` (Modal WhatsApp)

---

**Última actualización**: 2024-11-21
**Versión del script**: v2.5
**Estado**: ✅ Funcional y en producción
