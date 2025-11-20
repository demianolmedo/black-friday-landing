# ✅ Verificación de Datos en Base de Datos

## 📊 Cambios Aplicados

### ✅ Estructura de Envío Corregida

**ANTES (Incorrecto):**
```javascript
// Los datos iban dentro de event_data
trackUTM({
  event_data: { email: "...", phone: "..." }
})
```

**AHORA (Correcto):**
```javascript
// Los datos van DIRECTAMENTE en el payload
trackUTM({
  email: "...",
  phone: "...",
  pickup_location: "...",
  conversion_type: "whatsapp"
})
```

---

## 🔍 Nombres de Campos Actualizados

### Modal WhatsApp:
```javascript
{
  pickup_location: "Miami International Airport",  // ✅ Antes: lugar_entrega
  return_location: "Miami International Airport",  // ✅ Antes: lugar_devolucion
  pickup_date: "2025-01-25T10:00",                 // ✅ Antes: fecha_hora_recogida
  return_date: "2025-01-28T10:00",                 // ✅ Antes: fecha_hora_entrega
  email: "test@example.com",                       // ✅ Capturado
  phone: "+1234567890",                            // ✅ NUEVO - Capturado
  conversion_type: "whatsapp"                      // ✅ Identificador
}
```

### Widget HQ:
```javascript
{
  city: "miami",                                   // ✅ Miami u Orlando
  conversion_type: "hq_widget",                    // ✅ Identificador
  pickup_location: "Miami International Airport",  // ✅ Capturado
  return_location: "Miami International Airport",  // ✅ Capturado
  pickup_date: "2025-01-25",                       // ✅ Capturado
  return_date: "2025-01-28",                       // ✅ Capturado
  email: "test@example.com",                       // ✅ Capturado
  phone: "+1234567890",                            // ✅ NUEVO - Capturado
  name: "John Doe",                                // ✅ Si está disponible
  country: "United States"                         // ✅ Si está disponible
}
```

---

## 📋 Query SQL para Verificar

### 1. Ver últimos registros en utmPrincipal:
```sql
SELECT
  id,
  visitor_id,
  utm_source,
  utm_campaign,
  email,
  phone,
  pickup_location,
  conversion_type,
  created_at
FROM utmPrincipal
ORDER BY created_at DESC
LIMIT 10;
```

### 2. Ver registros de WhatsApp:
```sql
SELECT
  *
FROM utmPrincipal
WHERE conversion_type = 'whatsapp'
ORDER BY created_at DESC
LIMIT 5;
```

### 3. Ver registros de HQ Widget:
```sql
SELECT
  *
FROM utmPrincipal
WHERE conversion_type = 'hq_widget'
ORDER BY created_at DESC
LIMIT 5;
```

### 4. Verificar que email y phone NO sean NULL:
```sql
SELECT
  id,
  email,
  phone,
  pickup_location,
  conversion_type,
  created_at
FROM utmPrincipal
WHERE email IS NOT NULL
  AND phone IS NOT NULL
ORDER BY created_at DESC;
```

### 5. Contar registros por tipo de conversión:
```sql
SELECT
  conversion_type,
  COUNT(*) as total,
  COUNT(DISTINCT email) as emails_unicos,
  COUNT(phone) as con_telefono
FROM utmPrincipal
WHERE created_at >= NOW() - INTERVAL 24 HOUR
GROUP BY conversion_type;
```

---

## 🧪 Pasos de Prueba

### Prueba 1: Modal WhatsApp

1. Abre: `http://localhost:5173/`
2. Click en "Cotizar con un agente"
3. Completa el formulario:
   - Lugar de entrega: Miami International Airport
   - Lugar de devolución: Miami International Airport
   - Fecha recogida: (cualquier fecha futura)
   - Fecha entrega: (24h después)
   - Email: test-whatsapp@example.com
   - Teléfono: (si el campo existe)
4. Click "Hablar con un agente"
5. **Abre la consola (F12)** y busca:
   ```
   📱 [WhatsApp] Formulario enviado: { pickup_location: ..., email: ..., phone: ... }
   📡 [utm-tracking] Enviando a utmPrincipal: {...}
   ✅ [utm-tracking] Datos enviados a utmPrincipal
   ```
6. **Verifica en tu BD:**
   ```sql
   SELECT * FROM utmPrincipal
   WHERE email = 'test-whatsapp@example.com'
   ORDER BY created_at DESC LIMIT 1;
   ```

### Prueba 2: Widget HQ

1. Abre: `http://localhost:5173/`
2. Click en "Cotizar Miami" (o Orlando)
3. Espera a que cargue el widget HQ
4. Completa el formulario del widget
5. Envía el formulario
6. **Abre la consola (F12)** y busca:
   ```
   🏢 [HQ Widget] Formulario enviado con datos completos: { city: "miami", email: ..., phone: ... }
   📡 [utm-tracking] Enviando a utmPrincipal: {...}
   ✅ [utm-tracking] Datos enviados a utmPrincipal
   ```
7. **Verifica en tu BD:**
   ```sql
   SELECT * FROM utmPrincipal
   WHERE conversion_type = 'hq_widget'
   AND city = 'miami'
   ORDER BY created_at DESC LIMIT 1;
   ```

---

## 🔍 Checklist de Verificación

### En la Consola del Navegador (F12):

- [ ] ✅ Ver mensaje: `📱 [WhatsApp] Formulario enviado: {...}`
- [ ] ✅ Ver en el log el campo `email` con valor
- [ ] ✅ Ver en el log el campo `phone` con valor
- [ ] ✅ Ver mensaje: `📡 [utm-tracking] Enviando a utmPrincipal`
- [ ] ✅ Ver en el payload los datos SIN estar dentro de `event_data`
- [ ] ✅ Ver mensaje: `✅ [utm-tracking] Datos enviados a utmPrincipal`

### En la Base de Datos:

- [ ] ✅ Nuevo registro en tabla `utmPrincipal`
- [ ] ✅ Campo `email` tiene valor (no es NULL)
- [ ] ✅ Campo `phone` tiene valor (no es NULL)
- [ ] ✅ Campo `pickup_location` tiene valor
- [ ] ✅ Campo `return_location` tiene valor
- [ ] ✅ Campo `conversion_type` = "whatsapp" o "hq_widget"
- [ ] ✅ Campos `utm_source`, `utm_campaign` si vinieron en la URL

---

## ⚠️ Si NO Aparecen los Datos

### Problema 1: Email y Phone son NULL

**Causa:** El selector no encuentra el campo

**Solución:** Inspecciona el formulario en DevTools y verifica el `name` exacto del campo:

1. Click derecho en el campo → Inspeccionar
2. Mira el atributo `name` del input
3. Si el name es diferente (ej: `correo` en lugar de `email`), agrégalo al selector

**Agregar selector personalizado:**

En `tracking-black-friday.js` busca:
```javascript
email: form.querySelector(
  '[name="email"], [name="Email"], [type="email"]'
)
```

Y agrega el nombre que encontraste:
```javascript
email: form.querySelector(
  '[name="email"], [name="Email"], [name="TU_NOMBRE_AQUI"], [type="email"]'
)
```

### Problema 2: Datos NO llegan a utmPrincipal

**Causa 1:** Error de CORS
- **Solución:** Configura CORS en el backend para permitir `localhost:5173`

**Causa 2:** El endpoint responde con error 500
- **Solución:** Revisa los logs del backend para ver qué campo falta en la BD

**Causa 3:** La tabla no tiene la columna `phone`
- **Solución:** Agrega la columna:
  ```sql
  ALTER TABLE utmPrincipal ADD COLUMN phone VARCHAR(50) NULL;
  ```

---

## 📊 Ejemplo de Registro Correcto

Así debería verse un registro en `utmPrincipal`:

```
id: 123
visitor_id: bf_visitor_1705785600_abc123
session_id: bf_sess_1705785600_def456

utm_source: whatsapp
utm_medium: NULL
utm_campaign: blackfriday2025
utm_term: NULL
utm_content: NULL

fbclid: NULL
fb_campaign_id: NULL
fb_adset_id: NULL
fb_ad_id: NULL
cpc: NULL
spend: NULL

conversion_type: whatsapp
email: test@example.com
phone: +1234567890
pickup_location: Miami International Airport
return_location: Miami International Airport
pickup_date: 2025-01-25T10:00
return_date: 2025-01-28T10:00

city: NULL (solo para hq_widget)
name: NULL
country: NULL

referrer_url: https://google.com
landing_page: https://blackfriday.rentsmartrac.com/?utm_source=whatsapp&utm_campaign=blackfriday2025
user_agent: Mozilla/5.0...

created_at: 2025-01-20 10:30:00
```

---

## ✅ Resultado Esperado

Después de enviar un formulario deberías ver:

**En la consola:**
```
📱 [WhatsApp] Formulario enviado: {
  pickup_location: "Miami International Airport",
  return_location: "Miami International Airport",
  pickup_date: "2025-01-25T10:00",
  return_date: "2025-01-28T10:00",
  email: "test@example.com",
  phone: "+1234567890",
  conversion_type: "whatsapp"
}
📡 [utm-tracking] Enviando a utmPrincipal: {
  visitor_id: "bf_visitor_...",
  session_id: "bf_sess_...",
  utm_source: "whatsapp",
  utm_campaign: "blackfriday2025",
  pickup_location: "Miami International Airport",
  return_location: "Miami International Airport",
  pickup_date: "2025-01-25T10:00",
  return_date: "2025-01-28T10:00",
  email: "test@example.com",
  phone: "+1234567890",
  conversion_type: "whatsapp",
  referrer_url: null,
  landing_page: "http://localhost:5173/",
  user_agent: "Mozilla/5.0..."
}
✅ [utm-tracking] Datos enviados a utmPrincipal
```

**En la base de datos:**
- 1 nuevo registro en `utmPrincipal` con todos los campos llenos

---

## 📞 Si Necesitas Ayuda

Envíame:
1. Screenshot de la consola con los logs
2. Screenshot del registro en la BD (o copia el resultado del SELECT)
3. El nombre exacto de la tabla (utmPrincipal o utm_tracking?)
4. Si el campo `phone` ya existe en la tabla

Y te ayudo a resolver el problema específico.
