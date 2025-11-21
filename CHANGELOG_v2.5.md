# CHANGELOG - Versión 2.5

**Fecha**: 2025-01-21
**Autor**: Actualización del sistema de tracking

---

## Resumen de Cambios

### 🔥 PROBLEMA CRÍTICO RESUELTO: Pérdida de UTM params en modales

**Problema**: Los parámetros `utm_source` y `utm_campaign` de la URL no se estaban enviando cuando los usuarios completaban los modales (WhatsApp y HQ Contact), causando pérdida de datos de atribución.

**Causa raíz**: La función `getUTMParams()` solo leía parámetros de la URL en cada llamada, pero los modales se ejecutan en la misma página y pueden no tener acceso a los parámetros originales.

**Solución implementada**: Sistema de persistencia de UTM params en `sessionStorage`

---

## Cambios Técnicos Detallados

### 1. Persistencia de UTM Parameters (`tracking-black-friday.js`)

**Archivo modificado**: `C:\RENTSMART\black\black-friday-landing\public\tracking-black-friday.js`
**Líneas modificadas**: 88-136

**Funcionalidad nueva**:

```javascript
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);

  // Capturar params de URL
  const utmParams = { ... };
  const metaParams = { ... };
  const allParams = { ...utmParams, ...metaParams };

  // 🔄 PERSISTENCIA: Si hay parámetros UTM en la URL, guardarlos en sessionStorage
  const hasUTMParams = Object.values(utmParams).some(v => v !== null);
  const hasMetaParams = Object.values(metaParams).some(v => v !== null);

  if (hasUTMParams || hasMetaParams) {
    sessionStorage.setItem('utm_params', JSON.stringify(allParams));
    console.log('💾 [UTM] Parámetros guardados en sessionStorage:', allParams);
  } else {
    // 📥 Si no hay params en URL, intentar recuperar de sessionStorage
    const storedParams = sessionStorage.getItem('utm_params');
    if (storedParams) {
      const parsed = JSON.parse(storedParams);
      console.log('📥 [UTM] Parámetros recuperados de sessionStorage:', parsed);
      return parsed;
    }
  }

  return allParams;
}
```

**Flujo de ejecución**:

1. **Primera carga de página con UTM**: `https://blackfriday.com/?utm_source=BlackWP&utm_campaign=blackfriday2025`
   - Se leen los params de la URL
   - Se guardan en `sessionStorage.utm_params`
   - Log: `💾 [UTM] Parámetros guardados en sessionStorage`

2. **Usuario abre modal y envía formulario**:
   - Modal llama a `window.trackHQContactCapture({email, phone})`
   - Internamente se llama a `getUTMParams()`
   - No hay params en URL actual, pero sí en sessionStorage
   - Se recuperan los params guardados
   - Log: `📥 [UTM] Parámetros recuperados de sessionStorage`

3. **Resultado**: Los datos se envían correctamente con `utm_source` y `utm_campaign`

---

### 2. Corrección automática de números argentinos (`ContactCaptureModal.jsx`)

**Archivo modificado**: `C:\RENTSMART\black\black-friday-landing\src\components\ContactCaptureModal.jsx`
**Líneas modificadas**: 103-106

**Problema**: Los usuarios argentinos de Buenos Aires (+54 11) no incluyen el "9" requerido en el formato internacional.

**Ejemplo de corrección**:
- Usuario escribe: `+54 11 6963 3308`
- Sistema corrige a: `+54 9 11 6963 3308`

**Código implementado**:

```javascript
// 🇦🇷 CORRECCIÓN SILENCIOSA ARGENTINA: Si es +54 y empieza con "11" sin el "9"
if (formData.countryCode === '+54' && cleanNumber.startsWith('11') && !cleanNumber.startsWith('9')) {
  cleanNumber = '9' + cleanNumber; // Agregar "9" automáticamente
}
```

**Características**:
- ✅ Corrección silenciosa (sin modal de confirmación)
- ✅ Solo aplica a código +54 (Argentina)
- ✅ Solo aplica a números que comienzan con "11" (Buenos Aires)
- ✅ Verifica que no tenga el "9" ya agregado

---

### 3. Validación universal de teléfono (`ContactCaptureModal.jsx`)

**Archivo modificado**: `C:\RENTSMART\black\black-friday-landing\src\components\ContactCaptureModal.jsx`
**Líneas modificadas**: 27-43

**Cambio**: Simplificación de validación por país → Validación universal de 7 dígitos mínimo

**Antes**: Validación específica por país con límites min/max
**Ahora**: Validación universal para todos los países

```javascript
// Validar teléfono - Mínimo 7 dígitos
const validatePhoneNumber = (number, dialCode) => {
  if (!number) {
    setPhoneError('');
    return false;
  }

  // Verificar que tenga al menos 7 dígitos
  const digitCount = number.replace(/\D/g, '').length;
  if (digitCount < 7) {
    setPhoneError('El número debe tener al menos 7 dígitos');
    return false;
  }

  setPhoneError('');
  return true;
};
```

**Razones del cambio**:
- ✅ Mayor compatibilidad internacional
- ✅ Menos errores de validación
- ✅ 7 dígitos es el mínimo universal aceptado

---

## Archivos Modificados

### Frontend
1. ✅ `public/tracking-black-friday.js`
   - Función `getUTMParams()` con persistencia en sessionStorage
   - Logs de debug para rastreo de UTM params

2. ✅ `src/components/ContactCaptureModal.jsx`
   - Validación universal de teléfono (7 dígitos mínimo)
   - Corrección silenciosa de números argentinos

### Documentación
1. ✅ `TRACKING_DOCUMENTATION.md`
   - Actualizada sección "Versiones del Script" (v2.5)
   - Añadidos nuevos logs de debug

2. ✅ `TRACKING_QUICK_REFERENCE.md`
   - Actualizada fecha de última modificación

3. ✅ `CHANGELOG_v2.5.md` (este archivo)
   - Documentación completa de cambios

---

## Testing Manual

### Test 1: Verificar persistencia de UTM params

1. Abrir con UTM params: `http://localhost:5173/?utm_source=BlackWP&utm_campaign=blackfriday2025`
2. Abrir consola del navegador
3. Buscar log: `💾 [UTM] Parámetros guardados en sessionStorage`
4. Verificar en consola:
   ```javascript
   JSON.parse(sessionStorage.getItem('utm_params'))
   // Output: { utm_source: 'BlackWP', utm_campaign: 'blackfriday2025', ... }
   ```

5. Abrir modal de HQ Contact (clic en "Cotizar a HQ")
6. Completar email + teléfono
7. Enviar formulario
8. Buscar en consola: `📥 [UTM] Parámetros recuperados de sessionStorage`
9. Verificar que los dos endpoints responden con status 200:
   ```
   ✅ [HQ Contact] Enviado exitosamente a track-event
   ✅ [HQ Contact] Enviado exitosamente a utm-tracking
   ```

### Test 2: Verificar corrección de números argentinos

1. Abrir modal de HQ Contact
2. Seleccionar código de país: **+54 (Argentina)**
3. Escribir número: `1169633308` (sin el "9")
4. Completar email
5. Enviar formulario
6. En consola, buscar log de captura:
   ```
   📞 [HQ Contact] Datos capturados: {
     email: "...",
     phone: "+5491169633308",  // ✅ "9" agregado automáticamente
     ...
   }
   ```

### Test 3: Validación universal de teléfono

1. Abrir modal de HQ Contact
2. Probar números con diferentes longitudes:
   - `123456` → ❌ Error: "El número debe tener al menos 7 dígitos"
   - `1234567` → ✅ Válido (7 dígitos)
   - `12345678901234` → ✅ Válido (14 dígitos)

---

## Impacto del Cambio

### ✅ Beneficios

1. **Atribución correcta**: Los parámetros `utm_source` y `utm_campaign` ahora se envían correctamente desde todos los modales
2. **Mejor UX para usuarios argentinos**: Corrección automática sin fricción
3. **Mayor compatibilidad**: Validación universal funciona para todos los países
4. **Debugging mejorado**: Nuevos logs facilitan identificación de problemas

### ⚠️ Consideraciones

1. **sessionStorage**: Los UTM params se mantienen solo durante la sesión (se borran al cerrar navegador)
2. **Corrección Argentina**: Solo aplica a Buenos Aires (código 11), otros códigos de área no se modifican
3. **Debug logs**: Recordar desactivar `CONFIG.debug = false` en producción

---

## Comandos de Verificación Rápida

### Ver versión del script
```javascript
// Buscar en console logs al cargar página:
// 🔍 [BlackFriday-Tracking V2.5] Script cargado - Persistencia UTM params
```

### Ver UTM params guardados
```javascript
JSON.parse(sessionStorage.getItem('utm_params'))
```

### Limpiar tracking para testing
```javascript
sessionStorage.clear()
localStorage.removeItem('rentsmartVisitorId')
localStorage.removeItem('contactData')
```

---

## Próximos Pasos Recomendados

1. ✅ **Testing en entorno de desarrollo**
   - Verificar logs en consola
   - Confirmar que ambos endpoints responden 200
   - Probar con diferentes países

2. ✅ **Hard refresh en navegador**
   - Presionar Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)
   - Para cargar script actualizado

3. ⏳ **Despliegue a producción**
   - Cambiar `CONFIG.debug = false` en `tracking-black-friday.js`
   - Verificar que cache del CDN se invalide
   - Monitorear logs de backend para confirmar recepción de datos

4. ⏳ **Validación en producción**
   - Verificar en base de datos que `utm_source` y `utm_campaign` se están guardando
   - Revisar panel de analíticas para confirmar atribución correcta

---

## Contacto y Soporte

Si encuentras problemas después de este cambio:

1. Revisar logs en consola del navegador (con `CONFIG.debug = true`)
2. Verificar que el script se cargue con `?v=2.5` en la URL
3. Limpiar sessionStorage y localStorage para testing limpio
4. Consultar `TRACKING_QUICK_REFERENCE.md` para comandos de debug

---

**Última actualización de este changelog**: 2025-01-21
