# Alternativas de Tracking - Page View

## Implementación Actual: Session-based ✅ RECOMENDADO

**Código Actual** (`tracking-black-friday.js`):
```javascript
if (!sessionStorage.getItem('pageViewTracked')) {
  trackEvent('page_view');
  sessionStorage.setItem('pageViewTracked', 'true');
}
```

**Comportamiento**:
- 1 page_view por sesión de navegador
- Expira al cerrar navegador
- ✅ **Mejor para**: Landing pages de conversión, análisis de sesiones únicas

**Pros**:
- ✅ Métrica precisa de sesiones únicas
- ✅ Evita inflación de datos
- ✅ Tasa de conversión realista

**Contras**:
- ❌ No detecta re-engagement en la misma sesión
- ❌ Si usuario deja pestaña abierta 3 días = 1 sesión

---

## Alternativa 1: Time-based (Tracking por Tiempo)

**Uso**: Registra page_view cada X minutos/horas

**Código**:
```javascript
function shouldTrackPageView() {
  const lastTracked = sessionStorage.getItem('lastPageViewTime');
  const now = Date.now();
  const INTERVAL = 30 * 60 * 1000; // 30 minutos

  if (!lastTracked || (now - parseInt(lastTracked)) > INTERVAL) {
    sessionStorage.setItem('lastPageViewTime', now.toString());
    return true;
  }
  return false;
}

window.addEventListener('load', function() {
  if (shouldTrackPageView()) {
    trackEvent('page_view');
  }
});
```

**Comportamiento**:
- Primera visita: ✅ Registra
- Refresh a los 10 min: ❌ No registra
- Refresh a los 40 min: ✅ Registra (nueva sesión lógica)

**Pros**:
- ✅ Detecta re-engagement del usuario
- ✅ Mejor para análisis de actividad prolongada

**Contras**:
- ❌ Puede inflar métricas si usuario deja pestaña abierta
- ❌ Complica análisis de "sesiones únicas"

**✅ Usar si**: Tu objetivo es medir tiempo de engagement

---

## Alternativa 2: Daily-based (Tracking Diario)

**Uso**: 1 page_view por día (no por sesión)

**Código**:
```javascript
function shouldTrackPageView() {
  const today = new Date().toDateString();
  const lastTracked = localStorage.getItem('lastPageViewDate');

  if (lastTracked !== today) {
    localStorage.setItem('lastPageViewDate', today);
    return true;
  }
  return false;
}

window.addEventListener('load', function() {
  if (shouldTrackPageView()) {
    trackEvent('page_view');
  }
});
```

**Comportamiento**:
- Visita el lunes: ✅ Registra
- Cierra navegador, vuelve el lunes: ❌ No registra
- Vuelve el martes: ✅ Registra

**Pros**:
- ✅ Métrica de "usuarios activos diarios" (DAU)
- ✅ Persiste entre sesiones del mismo día

**Contras**:
- ❌ No captura múltiples sesiones en el mismo día
- ❌ Usa localStorage (persiste indefinidamente)

**✅ Usar si**: Necesitas métricas de DAU (Daily Active Users)

---

## Alternativa 3: Unrestricted (Sin Restricciones)

**Uso**: Registra CADA page_view

**Código**:
```javascript
window.addEventListener('load', function() {
  trackEvent('page_view'); // Sin verificación
});
```

**Comportamiento**:
- Cada carga de página: ✅ Registra
- Refresh: ✅ Registra
- Nueva pestaña: ✅ Registra

**Pros**:
- ✅ Datos completos de navegación
- ✅ Útil para análisis de patrones de uso

**Contras**:
- ❌ Infla métricas dramáticamente
- ❌ Tasa de conversión artificialmente baja
- ❌ Dificulta análisis de sesiones únicas

**✅ Usar si**: Necesitas analytics granular de cada interacción

**⚠️ NO recomendado** para landing pages de conversión

---

## Alternativa 4: Hybrid (Sesión + Tiempo)

**Uso**: Combina sesión con timeout de inactividad

**Código**:
```javascript
function shouldTrackPageView() {
  const lastActivity = sessionStorage.getItem('lastActivityTime');
  const pageViewTracked = sessionStorage.getItem('pageViewTracked');
  const now = Date.now();
  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos de inactividad

  // Si nunca se ha trackeado, trackear
  if (!pageViewTracked) {
    sessionStorage.setItem('pageViewTracked', 'true');
    sessionStorage.setItem('lastActivityTime', now.toString());
    return true;
  }

  // Si pasó el timeout de inactividad, considerar nueva sesión
  if (lastActivity && (now - parseInt(lastActivity)) > INACTIVITY_TIMEOUT) {
    sessionStorage.setItem('lastActivityTime', now.toString());
    return true;
  }

  // Actualizar último tiempo de actividad
  sessionStorage.setItem('lastActivityTime', now.toString());
  return false;
}

// Actualizar actividad en interacciones
document.addEventListener('click', function() {
  sessionStorage.setItem('lastActivityTime', Date.now().toString());
});

window.addEventListener('load', function() {
  if (shouldTrackPageView()) {
    trackEvent('page_view');
  }
});
```

**Comportamiento**:
- Primera visita: ✅ Registra
- Usuario activo 1 hora: ❌ No registra nuevos page_views
- Usuario inactivo 30 min, vuelve: ✅ Registra (nueva sesión)

**Pros**:
- ✅ Detecta abandono y retorno
- ✅ Sesiones más realistas
- ✅ Mejor para SaaS/aplicaciones

**Contras**:
- ❌ Más complejo de implementar
- ❌ Puede registrar múltiples sesiones en misma pestaña

**✅ Usar si**: Tienes aplicación web con sesiones prolongadas

---

## Comparación de Métricas

### Escenario: Usuario visita landing 3 veces en un día

| Hora | Acción | Session-based | Time-based (30min) | Daily-based | Unrestricted |
|------|--------|---------------|-------------------|-------------|--------------|
| 10:00 AM | Primera visita | ✅ 1 | ✅ 1 | ✅ 1 | ✅ 1 |
| 10:05 AM | Refresh 5 veces | ❌ 0 | ❌ 0 | ❌ 0 | ✅ 5 |
| 10:45 AM | Vuelve (nueva tab) | ❌ 0 | ✅ 1 | ❌ 0 | ✅ 1 |
| 3:00 PM | Cierra, vuelve | ✅ 1 | ✅ 1 | ❌ 0 | ✅ 1 |
| **Total** | | **2** | **3** | **1** | **8** |

**Tasa de conversión** (asumiendo 1 conversión):
- Session-based: 1/2 = **50%** ✅
- Time-based: 1/3 = **33%**
- Daily-based: 1/1 = **100%** (engañoso)
- Unrestricted: 1/8 = **12.5%** ❌

---

## Recomendación por Caso de Uso

### 🎯 Landing Page de Marketing (TU CASO)
**Usar**: **Session-based** (implementación actual) ✅

**Razones**:
- Métricas limpias de sesiones únicas
- Tasa de conversión realista
- Fácil análisis ROI de campañas
- Evita inflación por refreshes

### 📊 Blog / Sitio de Contenido
**Usar**: **Unrestricted** o **Time-based**

**Razones**:
- Medir pageviews reales de contenido
- Análisis de engagement por artículo
- Métricas de tiempo en sitio

### 💼 SaaS / Aplicación Web
**Usar**: **Hybrid** (sesión + inactividad)

**Razones**:
- Sesiones realistas con timeouts
- Detecta abandono y retorno
- Mejor para análisis de uso

### 📱 E-commerce
**Usar**: **Session-based** o **Hybrid**

**Razones**:
- Tracking de funnel de conversión
- Análisis de abandono de carrito
- ROI de campañas

---

## Implementar Cambio (si lo necesitas)

### Paso 1: Decidir estrategia
Ver tabla de comparación arriba

### Paso 2: Modificar código
Reemplazar bloque en `tracking-black-friday.js:432-437`

### Paso 3: Actualizar versión
```javascript
window.TRACKING_VERSION = '2.6';
```

```html
<!-- index.html -->
<script src="/tracking-black-friday.js?v=2.6" defer></script>
```

### Paso 4: Documentar cambio
Actualizar TRACKING_DOCUMENTATION.md con nueva estrategia

---

## Conclusión

**Para tu landing page de Black Friday**:
✅ **Mantén la implementación actual (Session-based)**

Es la mejor práctica para:
- Landing pages de conversión
- Campañas de marketing
- Análisis de ROI
- Métricas limpias

**Solo considera cambiar si**:
- Necesitas DAU (Daily Active Users) → Daily-based
- Necesitas medir re-engagement → Time-based
- Tienes aplicación web compleja → Hybrid

---

**Última actualización**: 2024-11-21
