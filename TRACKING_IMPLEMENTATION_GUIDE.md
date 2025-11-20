# Guía de Implementación - Tracking UTM & Meta Ads para Black Friday Landing

## Análisis de la Estructura Actual

### 1. Arquitectura de la Landing Page

La landing page de Black Friday es una **Single Page Application (SPA)** construida con:
- **React + Vite** como framework principal
- **React Router** para navegación
- **Framer Motion** para animaciones
- **Tailwind CSS** para estilos

### 2. Componentes y Flujos Identificados

#### A. Widget HQ (Formulario Principal)
- **Ubicación**: `FormularioSection.jsx`
- **Funcionamiento**:
  - Se carga dinámicamente mediante script externo desde `rent-smart-car-rental.rentsmartrac.com`
  - Crea un **iframe** o formulario directo en el DOM
  - Se activa cuando el usuario selecciona Miami o Orlando
  - El formulario se renderiza dentro de un div con clase `hq-rental-software-integration`

#### B. Modal de WhatsApp
- **Ubicación**: `WhatsAppModal.jsx`
- **Funcionamiento**:
  - Modal nativo de React (no iframe)
  - Formulario con campos: lugar entrega, devolución, fechas, email
  - Al enviar, abre WhatsApp Web con mensaje predefinido
  - Se activa con el botón "Cotizar con un agente"

#### C. Modal de Captura de Contacto
- **Ubicación**: `ContactCaptureModal.jsx`
- **Funcionamiento**:
  - Se muestra al entrar a `/reservations-miami` o `/reservations-orlando`
  - Captura teléfono (con selector de país) y email
  - Guarda datos en localStorage
  - Bloquea acceso al formulario HQ hasta completar

#### D. Páginas de Reservations
- **Ubicación**: `ReservationsPage.jsx`
- **Rutas**: `/reservations-miami` y `/reservations-orlando`
- **Funcionamiento**:
  - Muestra el modal de captura primero
  - Luego carga el widget HQ completo para completar reserva

### 3. Flujos de Usuario Identificados

```
FLUJO 1: Cotización Directa
HomePage → Selecciona Ciudad → Formulario HQ (iframe) → Submit

FLUJO 2: WhatsApp
HomePage → Click "Cotizar con agente" → Modal WhatsApp → Completa form → Abre WhatsApp

FLUJO 3: Reserva Completa
HomePage → Formulario HQ → Redirect a /reservations-{city} → Modal Contacto → Widget HQ Completo
```

## Script de Tracking Adaptado

### Características del Script (`tracking-script.js`)

#### Eventos Capturados:

1. **page_view**: Primera visita con parámetros UTM
2. **form_start**: Inicio de interacción con cualquier formulario
3. **hq_form_interaction**: Interacción específica con widget HQ
4. **whatsapp_modal_open**: Apertura del modal de WhatsApp
5. **whatsapp_form_submit**: Envío del formulario WhatsApp
6. **contact_modal_open**: Apertura del modal de captura
7. **contact_capture_complete**: Completado de captura de contacto
8. **quote_submit**: Envío de cotización (HQ o WhatsApp)
9. **location_selected**: Selección de ubicación
10. **date_selected**: Selección de fechas
11. **cta_click**: Clicks en CTAs importantes
12. **scroll_milestone**: Hitos de scroll (25%, 50%, 75%, 90%, 100%)
13. **engagement_update**: Actualización de tiempo en página
14. **page_navigation**: Navegación entre páginas (SPA)
15. **page_exit**: Salida de la página

#### Datos Capturados:

- **UTM Parameters**: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- **Meta Ads**: fbclid, fb_campaign_id, fb_adset_id, fb_ad_id, cpc, spend
- **Session Data**: sessionId, userId (persistente)
- **Device Info**: userAgent, screenResolution, viewport, deviceType, browser
- **Engagement**: timeOnPage, scrollDepth, formDuration
- **Location**: ciudad seleccionada (Miami/Orlando)

## Instrucciones de Implementación

### Paso 1: Agregar el Script al HTML

Editar `index.html` y agregar antes del cierre de `</body>`:

```html
<!-- UTM & Meta Ads Tracking Script -->
<script src="/tracking-script.js" defer></script>
```

**Ubicación exacta en `index.html`:**
```html
  <body>
    <div id="root"></div>

    <!-- Main script con defer para mejor performance -->
    <script type="module" src="/src/main.jsx" defer></script>

    <!-- UTM & Meta Ads Tracking Script -->
    <script src="/tracking-script.js" defer></script>
  </body>
```

### Paso 2: Configurar los Endpoints

En el archivo `tracking-script.js`, actualizar los endpoints según tu backend:

```javascript
const CONFIG = {
  apiEndpoints: {
    trackEvent: 'https://api.rentsmartrac.com/api/track-event',    // Actualizar con tu endpoint
    utmTracking: 'https://api.rentsmartrac.com/api/utm-tracking'   // Actualizar con tu endpoint
  },
  domain: 'blackfriday.rentsmartrac.com',
  debug: true, // Cambiar a false en producción
  // ...
};
```

### Paso 3: Configuración de Producción

Antes de desplegar a producción:

1. **Desactivar modo debug:**
   ```javascript
   debug: false
   ```

2. **Verificar endpoints:**
   - Asegurarse que los endpoints están apuntando a producción
   - Verificar CORS está configurado para permitir el dominio

3. **Minificar el script** (opcional):
   ```bash
   npx terser tracking-script.js -o tracking-script.min.js --compress --mangle
   ```

### Paso 4: Verificación de Implementación

#### A. Verificación en Consola (modo debug)

Con `debug: true`, abrir la consola del navegador y verificar:

1. **Carga inicial:**
   ```
   [RentSmart Tracking] Initializing RentSmart Black Friday Tracking
   [RentSmart Tracking] Sending event: page_view
   ```

2. **Al interactuar con formulario HQ:**
   ```
   [RentSmart Tracking] HQ iframe detected
   [RentSmart Tracking] Sending event: form_start
   ```

3. **Al abrir modal WhatsApp:**
   ```
   [RentSmart Tracking] Sending event: whatsapp_modal_open
   ```

#### B. Verificación en Network

1. Abrir DevTools → Network
2. Filtrar por "track" o "utm"
3. Verificar que se envían peticiones POST a los endpoints
4. Revisar el payload de las peticiones

#### C. Testing de Flujos

**Test 1: Flujo de Cotización HQ**
1. Navegar a la landing
2. Seleccionar "Cotizar Miami"
3. Completar formulario HQ
4. Verificar eventos: `page_view` → `form_start` → `quote_submit`

**Test 2: Flujo WhatsApp**
1. Click en "Cotizar con un agente"
2. Completar formulario en modal
3. Enviar
4. Verificar eventos: `whatsapp_modal_open` → `whatsapp_form_submit`

**Test 3: Flujo de Reserva Completa**
1. Completar formulario inicial
2. Ser redirigido a `/reservations-miami`
3. Completar modal de contacto
4. Verificar eventos: `contact_modal_open` → `contact_capture_complete`

### Paso 5: Monitoreo y Analytics

#### Eventos Clave para Dashboard

1. **Conversión Principal:**
   - `quote_submit` - Cotizaciones completadas
   - `whatsapp_form_submit` - Leads por WhatsApp
   - `contact_capture_complete` - Contactos capturados

2. **Engagement:**
   - `scroll_milestone` - Profundidad de scroll
   - `engagement_update` - Tiempo en página
   - `form_start` vs `quote_submit` - Tasa de abandono

3. **Atribución:**
   - UTM parameters por evento
   - Meta Ads parameters (fb_campaign_id, etc.)

#### SQL Queries de Ejemplo

```sql
-- Conversiones por fuente UTM
SELECT
  utm_source,
  utm_campaign,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(CASE WHEN event_name = 'quote_submit' THEN 1 END) as quotes,
  COUNT(CASE WHEN event_name = 'whatsapp_form_submit' THEN 1 END) as whatsapp_leads
FROM tracking_events
WHERE domain = 'blackfriday.rentsmartrac.com'
GROUP BY utm_source, utm_campaign;

-- Tasa de conversión por ciudad
SELECT
  city,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(DISTINCT CASE WHEN event_name = 'quote_submit' THEN session_id END) as converted_sessions,
  ROUND(COUNT(DISTINCT CASE WHEN event_name = 'quote_submit' THEN session_id END) * 100.0 /
        COUNT(DISTINCT session_id), 2) as conversion_rate
FROM tracking_events
WHERE domain = 'blackfriday.rentsmartrac.com'
GROUP BY city;
```

## Troubleshooting

### Problema 1: No se capturan eventos del iframe HQ

**Causa**: El iframe es cross-origin y no se puede acceder a su contenido.

**Solución**: El script ya maneja esto detectando interacciones con el iframe (mouseenter, focus).

### Problema 2: Eventos duplicados

**Causa**: El script se carga múltiples veces o se re-inicializa.

**Solución**: El script usa `Set()` para trackear eventos ya enviados y evitar duplicados.

### Problema 3: No se capturan parámetros UTM

**Causa**: Los parámetros se pierden en navegación SPA.

**Solución**: El script guarda UTMs en `sessionStorage` para persistencia durante la sesión.

### Problema 4: Modal de WhatsApp no se detecta

**Causa**: El modal se renderiza dinámicamente.

**Solución**: El script usa `MutationObserver` para detectar cambios en el DOM.

## Mejoras Futuras Recomendadas

1. **Integración con Google Analytics 4:**
   - Enviar eventos también a GA4 usando gtag
   - Configurar conversiones en GA4

2. **Integración con Meta Pixel:**
   - Agregar eventos de Meta Pixel para remarketing
   - Track de ViewContent, InitiateCheckout, Lead

3. **A/B Testing:**
   - Agregar soporte para variantes de test
   - Track de qué variante ve cada usuario

4. **Heatmaps:**
   - Integrar con Hotjar o Clarity
   - Correlacionar con datos de conversión

5. **Server-Side Tracking:**
   - Implementar Conversion API de Meta
   - Mayor precisión en atribución

## Contacto y Soporte

Para dudas sobre la implementación o personalización del tracking:

- **Documentación**: Este archivo
- **Debug**: Activar `debug: true` en CONFIG
- **Logs**: Revisar consola del navegador
- **Network**: Verificar peticiones en DevTools

## Checklist de Implementación

- [ ] Script agregado a index.html
- [ ] Endpoints configurados correctamente
- [ ] CORS habilitado en backend
- [ ] Modo debug desactivado para producción
- [ ] Verificado tracking de page_view
- [ ] Verificado tracking de formularios HQ
- [ ] Verificado tracking de modal WhatsApp
- [ ] Verificado tracking de modal de contacto
- [ ] Verificado envío de UTM parameters
- [ ] Verificado envío de Meta Ads parameters
- [ ] Dashboard configurado para visualizar datos
- [ ] Alertas configuradas para errores de tracking