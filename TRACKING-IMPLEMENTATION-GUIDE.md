# 📊 Guía de Implementación - Tracking Black Friday RentSmart

## ✅ Estado Actual: IMPLEMENTADO

El script de tracking ya está instalado y listo para funcionar. Solo necesitas configurar los endpoints del backend.

---

## 📋 Resumen de la Implementación

### Archivos Modificados/Creados:
1. ✅ **`public/tracking-black-friday.js`** - Script de tracking (CREADO)
2. ✅ **`index.html`** - Agregado script tag (MODIFICADO)
3. ✅ **Este archivo** - Guía de implementación (CREADO)

### Eventos que Se Capturan:

| Evento | Descripción | Datos Capturados |
|--------|-------------|------------------|
| **page_view** | Primera visita en la sesión | UTMs, Meta Ads, viewport, device_type |
| **whatsapp_modal_open** | Apertura modal WhatsApp | timestamp |
| **whatsapp_form_submit** | Envío formulario WhatsApp | lugar_entrega, lugar_devolucion, fechas, email |
| **hq_widget_load** | Carga del widget HQ | city (miami/orlando), brand |
| **hq_widget_interaction** | Interacción con widget HQ | interaction_type, field |
| **hq_form_submit** | Envío formulario HQ | city, pickup_location, return_location |
| **city_selection** | Cambio de ciudad | city |
| **cta_click** | Click en botones importantes | cta_text, cta_href |
| **scroll_milestone** | Hitos de scroll (25%, 50%, 75%, 90%, 100%) | milestone, max_scroll |
| **time_on_page** | Tiempo en página (cada 30s) | seconds, minutes |

### Parámetros UTM + Meta Ads Capturados:

**UTM Estándar:**
- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content

**Meta Ads:**
- fbclid
- fb_campaign_id (campaign_id)
- fb_adset_id (adset_id)
- fb_ad_id (ad_id)
- cpc (costo por click, 4 decimales)
- spend (gasto campaña, 2 decimales)

---

## 🚀 Pasos de Configuración

### 1. Verificar que el Script Está Cargado

Abre la consola del navegador (F12) y busca:
```
🔍 [BlackFriday-Tracking V1.0] Script cargado
```

Si ves este mensaje, el script se cargó correctamente.

### 2. Activar Modo Debug (Desarrollo)

El script ya está en modo debug por defecto. Para ver todos los eventos en consola:

```javascript
// En tracking-black-friday.js línea 33:
debug: true  // ✅ Ya está activado
```

Verás mensajes como:
```
🆕 [Tracking] Nuevo visitor_id: bf_visitor_1234567890_abc123
🆕 [Tracking] Nuevo session_id: bf_sess_1234567890_def456
📄 [Tracking] page_view enviado
📊 [Meta Ads] Parámetros capturados: { fbclid: ..., cpc: 0.45, ... }
```

### 3. Configurar Endpoints del Backend

**Edita el archivo `public/tracking-black-friday.js` líneas 28-29:**

```javascript
const CONFIG = {
  // Endpoints del backend
  trackEventUrl: 'https://pizarra-backend.alfmia.easypanel.host/api/track-event',
  utmTrackingUrl: 'https://pizarra-backend.alfmia.easypanel.host/api/utm-tracking',

  // ... resto de configuración
};
```

**IMPORTANTE:** Los endpoints ya están configurados con tus URLs actuales. Solo cambia si necesitas usar diferentes endpoints.

### 4. Desactivar Debug para Producción

Cuando despliegues a producción, cambia:

```javascript
debug: false  // Desactiva logs en consola
```

---

## 🧪 Testing y Verificación

### Test 1: Page View con UTMs

1. Abre la landing con UTMs: `http://localhost:5173/?utm_source=facebook&utm_campaign=blackfriday&fbclid=test123&cpc=0.45`
2. Abre la consola (F12)
3. Deberías ver:
   ```
   🎯 [Meta Ads] Tráfico de Facebook detectado: { fbclid: "test123", cpc: 0.45, ... }
   📄 [Tracking] page_view enviado
   📡 [Tracking] Enviando evento 'page_view': {...}
   ```

### Test 2: Modal WhatsApp

1. Haz click en el botón **"Cotizar con un agente"**
2. En consola verás:
   ```
   📱 [WhatsApp] Modal abierto
   📡 [Tracking] Enviando evento 'whatsapp_modal_open'
   ```
3. Completa el formulario y envía
4. Verás:
   ```
   📱 [WhatsApp] Formulario enviado: { lugar_entrega: "Miami International Airport", ... }
   📡 [Tracking] Enviando evento 'whatsapp_form_submit'
   📡 [Tracking] Enviando a utm-tracking
   ```

### Test 3: Widget HQ

1. Haz click en "Cotizar Miami" o "Cotizar Orlando"
2. En consola verás:
   ```
   🏙️ [City] Seleccionada: miami
   📡 [Tracking] Enviando evento 'city_selection'
   ```
3. Espera a que cargue el widget HQ:
   ```
   🏢 [HQ Widget] Cargado para: miami
   📡 [Tracking] Enviando evento 'hq_widget_load'
   ```
4. Haz focus en un campo del formulario:
   ```
   🏢 [HQ Widget] Interacción con campo
   📡 [Tracking] Enviando evento 'hq_widget_interaction'
   ```

### Test 4: Scroll Tracking

1. Haz scroll por la página
2. Al llegar al 25%, 50%, 75%, 90% y 100% verás:
   ```
   📜 [Scroll] Milestone: 25%
   📡 [Tracking] Enviando evento 'scroll_milestone'
   ```

### Test 5: Time on Page

1. Deja la página abierta 30 segundos
2. Verás:
   ```
   ⏱️ [Time] 30s en página
   📡 [Tracking] Enviando evento 'time_on_page'
   ```

---

## 📱 Estructura de URLs para Campañas

### Facebook/Instagram Ads:

```
https://blackfriday.rentsmartrac.com/?utm_source=facebook&utm_medium={{campaign.name}}&utm_campaign={{adset.name}}&utm_content={{ad.name}}&fbclid={{fbclid}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}&cpc={{cost_per_unique_click}}&spend={{campaign.spend}}
```

### WhatsApp:

```
https://blackfriday.rentsmartrac.com/?utm_source=whatsapp&utm_medium=message&utm_campaign=blackfriday2025
```

### Email:

```
https://blackfriday.rentsmartrac.com/?utm_source=email&utm_medium=newsletter&utm_campaign=blackfriday2025&utm_content=link1
```

---

## 🔍 Verificación en Backend

### Endpoint: `/api/track-event`

Ejemplo de payload que recibirás:

```json
{
  "visitor_id": "bf_visitor_1705785600_abc123",
  "session_id": "bf_sess_1705785600_def456",
  "event_type": "whatsapp_form_submit",
  "url": "https://blackfriday.rentsmartrac.com/",
  "referrer": "https://google.com",
  "user_agent": "Mozilla/5.0...",
  "timestamp": "2025-01-20T10:30:00.000Z",

  "utm_source": "facebook",
  "utm_medium": "paid_social",
  "utm_campaign": "blackfriday2025",
  "utm_term": null,
  "utm_content": "ad1",

  "fbclid": "IwAR123...",
  "fb_campaign_id": "123456789",
  "fb_adset_id": "987654321",
  "fb_ad_id": "456789123",
  "cpc": 0.4500,
  "spend": 125.50,

  "event_data": {
    "lugar_entrega": "Miami International Airport",
    "lugar_devolucion": "Miami International Airport",
    "fecha_hora_recogida": "2025-01-25T10:00",
    "fecha_hora_entrega": "2025-01-28T10:00",
    "email": "customer@example.com"
  }
}
```

### Endpoint: `/api/utm-tracking`

Se envía SOLO para conversiones importantes (whatsapp_form_submit, hq_form_submit):

```json
{
  "visitor_id": "bf_visitor_1705785600_abc123",
  "session_id": "bf_sess_1705785600_def456",

  "utm_source": "facebook",
  "utm_medium": "paid_social",
  "utm_campaign": "blackfriday2025",
  "utm_term": null,
  "utm_content": "ad1",

  "fbclid": "IwAR123...",
  "fb_campaign_id": "123456789",
  "fb_adset_id": "987654321",
  "fb_ad_id": "456789123",
  "cpc": 0.4500,
  "spend": 125.50,

  "lugar_entrega": "Miami International Airport",
  "lugar_devolucion": "Miami International Airport",
  "fecha_hora_recogida": "2025-01-25T10:00",
  "fecha_hora_entrega": "2025-01-28T10:00",
  "email": "customer@example.com",
  "conversion_type": "whatsapp",

  "referrer_url": "https://google.com",
  "landing_page": "https://blackfriday.rentsmartrac.com/",
  "user_agent": "Mozilla/5.0...",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

---

## 📊 Queries SQL de Ejemplo (para tu Backend)

### Top Campaigns por Conversiones:

```sql
SELECT
  utm_campaign,
  utm_source,
  COUNT(*) as conversions,
  COUNT(DISTINCT visitor_id) as unique_visitors
FROM track_events
WHERE event_type IN ('whatsapp_form_submit', 'hq_form_submit')
  AND timestamp >= NOW() - INTERVAL 30 DAY
GROUP BY utm_campaign, utm_source
ORDER BY conversions DESC
LIMIT 10;
```

### ROI de Meta Ads:

```sql
SELECT
  fb_campaign_id,
  utm_campaign,
  SUM(spend) as total_spend,
  AVG(cpc) as avg_cpc,
  COUNT(*) as conversions,
  ROUND(SUM(spend) / COUNT(*), 2) as cost_per_conversion
FROM track_events
WHERE event_type IN ('whatsapp_form_submit', 'hq_form_submit')
  AND fb_campaign_id IS NOT NULL
  AND timestamp >= NOW() - INTERVAL 30 DAY
GROUP BY fb_campaign_id, utm_campaign
ORDER BY conversions DESC;
```

### Funnel de Conversión:

```sql
SELECT
  event_type,
  COUNT(*) as count,
  COUNT(DISTINCT session_id) as unique_sessions
FROM track_events
WHERE timestamp >= NOW() - INTERVAL 7 DAY
GROUP BY event_type
ORDER BY count DESC;
```

### Ciudades Más Populares:

```sql
SELECT
  JSON_EXTRACT(event_data, '$.city') as city,
  COUNT(*) as selections
FROM track_events
WHERE event_type = 'city_selection'
  AND timestamp >= NOW() - INTERVAL 30 DAY
GROUP BY city
ORDER BY selections DESC;
```

---

## ⚠️ Troubleshooting

### Problema 1: No se envían eventos

**Síntomas:**
- No ves mensajes `📡 [Tracking] Enviando evento...` en consola

**Solución:**
1. Verifica que `debug: true` en CONFIG
2. Abre la pestaña Network en DevTools
3. Filtra por "track-event" o "utm-tracking"
4. Verifica que las requests se están haciendo

### Problema 2: CORS errors

**Síntomas:**
```
Access to fetch at 'https://...' from origin 'http://localhost:5173' has been blocked by CORS
```

**Solución:**
Configura CORS en tu backend para permitir:
- `http://localhost:5173` (desarrollo)
- `https://blackfriday.rentsmartrac.com` (producción)

### Problema 3: Modal WhatsApp no se trackea

**Síntomas:**
- Abres el modal pero no ves `📱 [WhatsApp] Modal abierto`

**Solución:**
1. El modal usa Framer Motion con AnimatePresence
2. El observer tarda un momento en detectarlo
3. Si persiste, verifica que el modal tiene la clase `.fixed.inset-0.bg-black\/70` en su backdrop

### Problema 4: Widget HQ no se trackea

**Síntomas:**
- Cambias de ciudad pero no ves `🏢 [HQ Widget] Cargado`

**Solución:**
1. El widget tarda en cargar (hasta 15 segundos)
2. Verifica que el widget tiene la clase `.hq-rental-software-integration`
3. Revisa la consola por errores de HQ

### Problema 5: UTMs no persisten al navegar

**Síntomas:**
- Los UTMs se pierden después del primer page_view

**Solución:**
- El script ya guarda los UTMs en `sessionStorage`
- Se mantienen durante toda la sesión SPA
- Si cambias de página con Router, los UTMs persisten

---

## 🎯 Próximos Pasos

### 1. Deploy a Producción

```bash
npm run build
# Subir carpeta dist/ a tu servidor
```

### 2. Verificar en Producción

1. Visita `https://blackfriday.rentsmartrac.com/`
2. Abre consola (si debug está activo)
3. Realiza acciones de prueba
4. Verifica en tu backend que los eventos llegan

### 3. Desactivar Debug

En `public/tracking-black-friday.js`:
```javascript
debug: false
```

### 4. Monitorear Métricas

- Crea dashboard en tu backend
- Configura alertas para errores
- Revisa conversiones diarias
- Analiza ROI de campañas

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa la consola** en modo debug
2. **Verifica Network tab** en DevTools
3. **Chequea que los endpoints** estén respondiendo
4. **Valida CORS** en el backend
5. **Prueba con diferentes navegadores**

---

## ✅ Checklist Final

- [ ] Script cargado en index.html
- [ ] Modo debug activado para pruebas
- [ ] Endpoints del backend configurados
- [ ] Test de page_view con UTMs ✓
- [ ] Test de modal WhatsApp ✓
- [ ] Test de widget HQ ✓
- [ ] Test de selección de ciudad ✓
- [ ] Test de scroll tracking ✓
- [ ] Verificado en backend que llegan los eventos
- [ ] Modo debug desactivado para producción
- [ ] Deploy a producción realizado
- [ ] Verificación en producción completa

---

## 📄 Documentación del Script Original

El script está basado en tu tracking original pero **completamente adaptado** para la landing de Black Friday con:

- ✅ Detección específica del modal WhatsApp de React
- ✅ Detección del widget HQ dinámico
- ✅ Tracking de selección de ciudad (Miami/Orlando)
- ✅ Persistencia de UTMs en SPA
- ✅ Sin dependencia de formularios específicos de WordPress
- ✅ Compatible con React + Vite

**Diferencias vs script original:**
- ✅ No requiere `form[name="rent-smart-reservation-form"]`
- ✅ No está limitado a URLs específicas
- ✅ Usa MutationObserver para modales dinámicos
- ✅ Detecta tanto iframes como formularios directos de HQ
- ✅ Captura datos de ambos modales (WhatsApp + HQ)

---

**¡Implementación Completada! 🎉**

Tu landing de Black Friday ahora tiene tracking completo de todos los eventos importantes y captura todos los parámetros UTM + Meta Ads.
