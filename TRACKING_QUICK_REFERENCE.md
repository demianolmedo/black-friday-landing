# Referencia Rápida - Sistema de Tracking

## Cheat Sheet de Endpoints

### `/api/track-event`
```javascript
// Event types válidos
✅ 'page_view'
✅ 'quote_click'
❌ 'whatsapp_click'  // NO VÁLIDO
❌ 'hq_contact'      // NO VÁLIDO

// Payload
{
  event_type: 'quote_click',  // Solo 'page_view' o 'quote_click'
  event_data: {
    conversion_type: 'whatsapp',  // Identificador personalizado va AQUÍ
    email: 'user@example.com',
    // ... otros datos
  }
}
```

### `/api/utm-tracking`
```javascript
// Campos REQUERIDOS (NO pueden ser null)
✅ email
✅ pickup_location

// Payload WhatsApp
{
  email: 'user@example.com',
  pickup_location: 'Miami Airport',  // Ubicación real
  // ...
}

// Payload HQ Contact
{
  email: 'user@example.com',
  phone: '+14445556666',
  pickup_location: 'HQ_CONTACT',  // ⚠️ Placeholder requerido
  // ...
}
```

---

## Checklist de Debugging

### Page View no funciona
- [ ] ¿Hiciste hard reload? (Ctrl+Shift+R)
- [ ] ¿Limpiaste sessionStorage?
- [ ] ¿Console muestra "Script iniciado (v2.5)"?
- [ ] ¿sessionStorage tiene 'pageViewTracked' = 'true'?

### Error 400 en track-event
- [ ] ¿event_type es 'page_view' o 'quote_click'?
- [ ] ¿No usaste nombres personalizados en event_type?

### Error 400 en utm-tracking
- [ ] ¿email no es null?
- [ ] ¿pickup_location no es null?
- [ ] Para HQ Contact: ¿pickup_location = 'HQ_CONTACT'?

### Conversión no se registra
- [ ] ¿Modal tiene el selector correcto?
- [ ] ¿Formulario es válido antes de enviar?
- [ ] ¿Console muestra logs de tracking?
- [ ] ¿Ambos endpoints respondieron 200?

---

## Comandos Rápidos

### Verificar versión del script
```javascript
window.TRACKING_VERSION  // Debe ser "2.5"
```

### Verificar visitor_id y session_id
```javascript
localStorage.getItem('rentsmartVisitorId')
sessionStorage.getItem('rentsmartSessionId')
```

### Verificar UTM params guardados
```javascript
JSON.parse(sessionStorage.getItem('utm_params'))
```

### Limpiar tracking
```javascript
sessionStorage.clear()
localStorage.removeItem('rentsmartVisitorId')
localStorage.removeItem('contactData')
```

### Testear manualmente HQ Contact
```javascript
window.trackHQContactCapture({
  email: 'test@example.com',
  phone: '+14445556666'
})
```

---

## Estructura de Datos

### WhatsApp Conversion
```javascript
{
  email: 'user@example.com',
  pickup_location: 'Miami Airport',
  return_location: 'Fort Lauderdale',
  pickup_date: '2024-12-01T10:00:00',
  return_date: '2024-12-05T10:00:00',
  conversion_type: 'whatsapp'
}
```

### HQ Contact Conversion
```javascript
{
  email: 'user@example.com',
  phone: '+14445556666',
  pickup_location: 'HQ_CONTACT',  // ⚠️ Placeholder
  pickup_date: null,
  return_location: null,
  return_date: null,
  conversion_type: 'hq_contact_capture'
}
```

---

## Archivos Clave

```
📁 black-friday-landing/
├── 📄 index.html (línea 94)
│   └── <script src="/tracking-black-friday.js?v=2.5">
│
├── 📁 public/
│   └── 📄 tracking-black-friday.js (v2.5)
│       ├── trackEvent() (línea 117)
│       ├── trackUTM() (línea 157)
│       ├── initializeWhatsAppTracking() (línea 224)
│       └── window.trackHQContactCapture() (línea 312)
│
└── 📁 src/components/
    ├── 📄 WhatsAppModal.jsx
    │   └── data-whatsapp-form="true" (atributo)
    │
    └── 📄 ContactCaptureModal.jsx (línea 118)
        └── window.trackHQContactCapture(contactData)
```

### Backend (Solo lectura)
```
📁 lovable/server/
└── 📄 index.js
    ├── POST /api/track-event (línea 3064)
    │   └── Validación: event_type = 'page_view' | 'quote_click'
    │
    └── POST /api/utm-tracking (línea 3171)
        └── Validación: email && pickup_location requeridos
```

---

## Logs Esperados (Modo Debug)

### Inicialización
```
🔥 [Tracking] Script iniciado (v2.5)
✅ [Tracking] Visitor ID: visitor_...
✅ [Tracking] Session ID: session_...
✅ [Tracking] Función window.trackHQContactCapture registrada
```

### Page View Exitoso
```
📊 [Tracking] Evento 'page_view' disparado
✅ [Tracking] Evento 'page_view' enviado a /api/track-event (status: 200)
```

### WhatsApp Exitoso
```
✅ [WhatsApp] Formulario detectado y tracking inicializado
📝 [WhatsApp] Datos capturados: { email: '...', ... }
✅ [Tracking] Evento 'quote_click' enviado a /api/track-event (status: 200)
✅ [Tracking] Datos enviados a /api/utm-tracking (status: 200)
```

### HQ Contact Exitoso
```
✅ [HQ Contact] Modal de contacto enviado
📞 [HQ Contact] Datos capturados: { email: '...', phone: '...', ... }
✅ [HQ Contact] Enviado exitosamente a track-event
✅ [HQ Contact] Enviado exitosamente a utm-tracking
```

---

## Soluciones Rápidas

| Problema | Solución |
|----------|----------|
| Script no carga | Hard reload: Ctrl+Shift+R |
| Error 400 track-event | Usar event_type: 'quote_click' |
| Error 400 utm-tracking | Verificar email y pickup_location no sean null |
| HQ Contact no guarda | pickup_location debe ser 'HQ_CONTACT', no null |
| Eventos duplicados | Ya implementado con flags y sessionStorage |
| UTM params se pierden | Ya implementado con sessionStorage |

---

## Cambiar Versión del Script

1. Modificar `tracking-black-friday.js`:
   ```javascript
   window.TRACKING_VERSION = '2.6';  // Nueva versión
   ```

2. Modificar `index.html`:
   ```html
   <script src="/tracking-black-friday.js?v=2.6" defer></script>
   ```

3. Instruir a usuarios: Hard reload (Ctrl+Shift+R)

---

## Agregar Nuevo Tipo de Conversión

```javascript
// ❌ NO hacer esto:
trackEvent('nuevo_tipo', { ... });  // Backend rechazará

// ✅ Hacer esto:
trackEvent('quote_click', {
  conversion_type: 'nuevo_tipo',  // Va en event_data
  // ... otros datos
});

// Si necesita guardar en utmPrincipal:
Promise.allSettled([
  trackEvent('quote_click', formData),
  trackUTM(formData)  // Solo si tiene email + pickup_location válidos
]);
```

---

## Variables de Entorno Tracking

```javascript
const CONFIG = {
  debug: true,  // ⚠️ false en producción
  trackEventUrl: 'https://rent-smart-car-rental.rentsmartrac.com/api/track-event',
  utmTrackingUrl: 'https://rent-smart-car-rental.rentsmartrac.com/api/utm-tracking',
  timeout: 10000  // 10 segundos
};
```

---

## Testing Manual

### Test Page View
1. Limpiar sessionStorage
2. Visitar: `http://localhost:5173/?utm_source=test`
3. Verificar Console: "Evento 'page_view' enviado... (status: 200)"
4. Verificar sessionStorage: 'pageViewTracked' = 'true'

### Test WhatsApp
1. Click en "Cotizar Ahora"
2. Completar formulario
3. Click en "Enviar"
4. Verificar Console: Dos mensajes "status: 200"

### Test HQ Contact
1. Abrir widget de HQ
2. Completar email + teléfono
3. Click en "Continuar"
4. Verificar Console: Dos mensajes "status: 200"

---

**Última actualización**: 2024-11-21
**Versión**: v2.5 ✅
