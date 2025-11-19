# Sistema de Diseño - Black Friday Landing Page
## RentSmart Car Rental

Documentación completa de estilos, componentes y patrones de diseño utilizados en la landing page de Black Friday.

---

## 📋 Tabla de Contenidos

1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Componentes Principales](#componentes-principales)
4. [Efectos Especiales](#efectos-especiales)
5. [Espaciado y Layout](#espaciado-y-layout)
6. [Animaciones](#animaciones)
7. [Responsive Design](#responsive-design)

---

## 🎨 Paleta de Colores

### Colores Principales (definidos en tailwind.config.js)

```javascript
colors: {
  'azul-principal': '#021938',     // Fondo principal oscuro
  'verde-neon': '#00FF7F',          // Color de acento (CTA, highlights)
  'blanco': '#FFFFFF',              // Textos principales
}
```

### Uso de Opacidades

```css
/* Fondos semitransparentes */
bg-azul-principal/50    /* 50% opacidad - Navbar, tarjetas glass */
bg-azul-principal/60    /* 60% opacidad - Énfasis medio */
bg-azul-principal/80    /* 80% opacidad - Fondos con más contraste */
bg-azul-principal/95    /* 95% opacidad - Casi opaco */

/* Textos */
text-white/60           /* 60% opacidad - Texto secundario */
text-white/70           /* 70% opacidad - Texto terciario */
text-white/80           /* 80% opacidad - Texto normal */
text-white/90           /* 90% opacidad - Texto principal */
text-white              /* 100% opacidad - Títulos, énfasis */

/* Bordes */
border-white/10         /* 10% opacidad - Bordes sutiles */
border-white/30         /* 30% opacidad - Bordes visibles (liquid glass) */
```

---

## ✍️ Tipografía

### Familias de Fuentes

```css
/* Definidas en index.css */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

font-outfit  /* Títulos, headings, CTAs */
font-inter   /* Textos de cuerpo, párrafos */
```

### Jerarquía de Tamaños

#### Hero Section (50% OFF)
```jsx
/* Móvil → Desktop */
text-[8rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem]  // "50%"
text-[4rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem]     // "off"
text-3xl sm:text-3xl md:text-[33px] lg:text-[42px] xl:text-[54px]            // "cachetadas de"
text-[33px] sm:text-[33px] md:text-[36px] lg:text-[45px] xl:text-[57px]      // "DESCUENTOS%"
```

#### Ribbons (Banners metálicos)
```jsx
text-xl                                    // Línea 1 y 3 (texto pequeño)
text-xl sm:text-2xl md:text-3xl font-bold // Línea 2 (texto grande central)
```

#### Tarjetas de Descuentos
```jsx
text-xl           // "Hasta", "solo para las primeras"
text-5xl          // "50% OFF", "100 reservas"
text-xl           // "las filas no esperan..."
```

#### Sección Solución
```jsx
text-lg sm:text-xl md:text-2xl  // Textos principales
```

### Efectos de Texto

#### Neon Glow (Verde Neón)
```jsx
className="neon-text"
/* Definido en index.css */
text-verde-neon drop-shadow-[0_0_40px_rgba(0,255,127,0.6)]
```

#### Leading (Interlineado)
```jsx
leading-none      // Sin espacio adicional (títulos grandes)
leading-tight     // Espacio reducido
leading-relaxed   // Espacio normal/cómodo
```

---

## 🧩 Componentes Principales

### 1. Navbar Pill (Forma de píldora)

**Archivo:** `src/components/Navbar.jsx`

#### Estructura Base
```jsx
<header className="fixed top-0 left-0 right-0 z-50 w-full">
  <div className="flex justify-center px-4 md:px-6 lg:px-8 py-2 md:py-3 relative">
    <nav className="
      bg-azul-principal/50
      backdrop-blur-lg
      border border-white/30
      rounded-full
      px-6 md:px-8
      py-1.5 md:py-2
      shadow-lg shadow-black/10
      max-w-6xl
      w-full
      flex items-center justify-between
      gap-4 md:gap-8
      relative
    ">
      {/* Contenido */}
    </nav>
  </div>
</header>
```

#### Características Clave
- **Forma:** `rounded-full` (completamente redondeado)
- **Glassmorphism:** `bg-azul-principal/50` + `backdrop-blur-lg`
- **Borde:** `border border-white/30` (sutil)
- **Sombra:** `shadow-lg shadow-black/10`
- **Centrado:** `flex justify-center` en contenedor padre
- **Max width:** `max-w-6xl`

#### Menú Móvil Desplegable
```jsx
{/* IMPORTANTE: FUERA del <nav> para que backdrop-blur funcione */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="
        absolute top-full left-0 right-0 mt-2
        mx-4 md:mx-6 lg:mx-8
        bg-azul-principal/50
        backdrop-blur-lg
        border border-white/30
        rounded-2xl
        py-4 px-2
        shadow-lg shadow-black/10
        md:hidden
      "
    >
      {/* Contenido */}
    </motion.div>
  )}
</AnimatePresence>
```

**⚠️ IMPORTANTE:** El menú móvil debe estar FUERA del `<nav>` para que el `backdrop-blur` funcione correctamente.

### 2. Ribbons Metálicos (Banners)

**Archivos:** `ProblemaSection.jsx`, `SolucionSection.jsx`

```jsx
<div
  className="relative animate-fade-in mb-8 sm:mb-10"
  style={{
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    width: '100vw',
    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)',
    backgroundColor: '#01132a'
  }}
>
  <div
    className="relative py-3 px-4 sm:px-6 lg:px-8 backdrop-blur-md"
    style={{
      background: 'linear-gradient(90deg, #021938 0%, #0f2847 15%, #2a5580 35%, #6B95BF 50%, #2a5580 65%, #0f2847 85%, #021938 100%)'
    }}
  >
    <div className="text-center space-y-2">
      <p className="text-xl text-white font-inter">
        Línea 1 - Texto pequeño
      </p>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit">
        Línea 2 - Texto grande central
      </h3>
      <p className="text-xl text-white font-inter">
        Línea 3 - Texto pequeño
      </p>
    </div>
  </div>
</div>
```

#### Características
- **Ancho completo:** Técnica de `100vw` con márgenes negativos
- **Gradiente metálico:** Azules de oscuro → claro → oscuro
- **Patrón de textura:** `repeating-linear-gradient` sutil
- **Blur de fondo:** `backdrop-blur-md`

### 3. Tarjetas Glass (Liquid Glass Cards)

**Archivo:** `DescuentosSection.jsx`

```jsx
<div className="
  bg-white/[0.03]
  backdrop-blur-2xl
  border border-white/[0.08]
  rounded-3xl
  text-center
  shadow-lg
  hover:bg-white/[0.05]
  hover:border-[#00FF7F]/20
  hover:-translate-y-0.5
  transition-all duration-300
  w-full md:w-auto
  min-w-[320px]
  px-6 sm:px-8 md:px-12
  py-6
">
  {/* Contenido */}
</div>
```

#### Características
- **Fondo ultra transparente:** `bg-white/[0.03]`
- **Blur fuerte:** `backdrop-blur-2xl`
- **Borde sutil:** `border-white/[0.08]`
- **Hover effect:** Cambio de fondo y borde + elevación
- **Bordes redondeados:** `rounded-3xl`

### 4. Contador con Badge Diagonal

```jsx
{/* Tarjeta del countdown */}
<div className="relative ... overflow-hidden">

  {/* Badge diagonal VIP */}
  {phase === 'before' && (
    <div className="absolute top-0 right-0 z-20">
      <div className="
        bg-gradient-to-br from-verde-neon to-emerald-400
        w-[200px]
        py-2
        transform rotate-45 translate-x-[50px] translate-y-[30px]
        shadow-xl
      ">
        <p className="
          text-xs sm:text-sm
          font-black uppercase tracking-wide
          whitespace-nowrap
          flex items-center justify-center gap-1.5
          text-azul-principal
        ">
          <Lock size={14} strokeWidth={3} />
          <span>ACCESO VIP</span>
        </p>
      </div>
    </div>
  )}

  {/* Contenido del contador */}
</div>
```

### 5. Líneas Conectoras (Desktop y Móvil)

#### Desktop (Horizontal)
```jsx
<div className="hidden md:flex items-center justify-center mx-6">
  <svg width="160" height="8" viewBox="0 0 160 8" className="connection-line">
    <circle cx="4" cy="4" r="4" fill="#00FF7F" />
    <line
      x1="8" y1="4"
      x2="152" y2="4"
      stroke="#00FF7F"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      strokeLinecap="round"
    />
    <circle cx="156" cy="4" r="4" fill="#00FF7F" />
  </svg>
</div>
```

#### Móvil (Vertical)
```jsx
<div className="flex md:hidden items-center justify-center">
  <svg width="8" height="60" viewBox="0 0 8 60">
    <circle cx="4" cy="4" r="4" fill="#00FF7F" />
    <line
      x1="4" y1="8"
      x2="4" y2="52"
      stroke="#00FF7F"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      strokeLinecap="round"
    />
    <circle cx="4" cy="56" r="4" fill="#00FF7F" />
  </svg>
</div>
```

### 6. Burbujas de Diálogo (Speech Bubbles)

```jsx
<div className="
  relative
  glass-card
  glass-card-hover
  px-6 py-4
  text-white/80
  text-lg sm:text-xl md:text-2xl
  font-inter
  speech-bubble
">
  ¿Por que tanta fila?
</div>
```

**Clases CSS en index.css:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

.glass-card-hover {
  transition: all 0.3s ease;
}

.glass-card-hover:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.speech-bubble {
  position: relative;
}
```

---

## ✨ Efectos Especiales

### 1. Liquid Glass (Vidrio Esmerilado)

**Fórmula base:**
```jsx
className="
  bg-[color]/[opacidad]     /* Fondo semitransparente */
  backdrop-blur-[tamaño]    /* Blur del contenido detrás */
  border border-white/30    /* Borde sutil */
"
```

**Niveles de Blur:**
- `backdrop-blur-sm` → `blur(4px)` - Muy sutil
- `backdrop-blur` → `blur(8px)` - Suave
- `backdrop-blur-md` → `blur(12px)` - Medio
- `backdrop-blur-lg` → `blur(16px)` - **Usado en navbar**
- `backdrop-blur-xl` → `blur(24px)` - Fuerte
- `backdrop-blur-2xl` → `blur(40px)` - Muy fuerte
- `backdrop-blur-3xl` → `blur(64px)` - Extremo

**⚠️ Importante para backdrop-blur:**
- El elemento con `backdrop-blur` debe estar sobre contenido real (no dentro de su padre)
- Funciona mejor con fondos semitransparentes
- Agregar prefijos si es necesario:
  ```jsx
  style={{
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)'
  }}
  ```

### 2. Neon Glow Effect

**En Tailwind:**
```jsx
className="
  text-verde-neon
  drop-shadow-[0_0_40px_rgba(0,255,127,0.6)]
  neon-text
"
```

**Clase personalizada en index.css:**
```css
.neon-text {
  text-shadow:
    0 0 10px rgba(0, 255, 127, 0.8),
    0 0 20px rgba(0, 255, 127, 0.6),
    0 0 30px rgba(0, 255, 127, 0.4),
    0 0 40px rgba(0, 255, 127, 0.2);
}
```

**Para botones:**
```jsx
className="
  shadow-lg shadow-verde-neon/30
  hover:shadow-xl hover:shadow-verde-neon/50
"
```

### 3. Gradientes

#### Fondo Principal
```jsx
className="bg-gradient-to-b from-azul-principal via-azul-principal to-azul-principal"
```

#### Gradiente con Transparencia
```jsx
className="bg-gradient-to-b from-azul-principal via-azul-principal/50 to-azul-principal"
```

#### Botón CTA
```jsx
className="bg-gradient-to-r from-verde-neon to-emerald-400"
```

#### Línea Separadora
```jsx
className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-verde-neon/50 to-transparent"
```

### 4. Orbs Decorativos (Esferas de Luz)

```jsx
{/* Decorative gradient orbs */}
<div className="absolute top-1/4 -left-32 w-64 h-64 bg-verde-neon/10 rounded-full blur-3xl"></div>
<div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-verde-neon/5 rounded-full blur-3xl"></div>
```

---

## 📐 Espaciado y Layout

### Márgenes y Padding Uniformes

**Horizontal (todas las secciones):**
```jsx
px-4 sm:px-6 lg:px-8

/* Valores reales: */
/* Móvil (< 640px): 16px */
/* Tablet (640px+): 24px */
/* Desktop (1024px+): 32px */
```

**Vertical entre secciones:**
```jsx
py-6  /* Todas las secciones (24px) */
```

### Separación de Elementos

**Entre tarjetas conectadas (móvil):**
```jsx
gap-1  /* 4px - Muy cerca (con línea conectora) */
```

**Entre tarjetas y countdown:**
```jsx
space-y-10 sm:space-y-8  /* Móvil: 40px, Desktop: 32px */
```

### Max Width Containers

```jsx
max-w-4xl   /* Contenido medio */
max-w-5xl   /* Sección descuentos */
max-w-6xl   /* Navbar, contenido ancho */
max-w-7xl   /* Hero section */
```

### Altura de Secciones

```jsx
h-[50vh]    /* Hero e ImageAnimation (50% viewport) */
```

---

## 🎬 Animaciones

### Framer Motion - Fade In

```jsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

### Clases de Animación Personalizadas

**Definidas en index.css:**

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 1s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.6s ease-out forwards;
}
```

### Hover Effects

**Elevación con escala:**
```jsx
hover:scale-105
hover:-translate-y-0.5
transition-all duration-300
```

**Brillo de borde:**
```jsx
hover:border-[#00FF7F]/20
```

**Subrayado animado:**
```jsx
relative
after:absolute after:bottom-0 after:left-0
after:w-0 after:h-0.5
after:bg-verde-neon
after:transition-all after:duration-300
hover:after:w-full
```

---

## 📱 Responsive Design

### Breakpoints de Tailwind

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Patrones Comunes

#### Ocultar/Mostrar en Móvil vs Desktop
```jsx
className="hidden md:block"    /* Solo desktop */
className="md:hidden"          /* Solo móvil */
className="hidden md:flex"     /* Flex en desktop, oculto en móvil */
```

#### Cambio de Dirección de Flex
```jsx
className="flex flex-col md:flex-row"  /* Vertical móvil, horizontal desktop */
```

#### Responsive Typography
```jsx
text-xl sm:text-2xl md:text-3xl lg:text-4xl
```

#### Responsive Spacing
```jsx
px-4 sm:px-6 lg:px-8       /* Padding horizontal progresivo */
py-2 md:py-3               /* Padding vertical */
gap-4 md:gap-8             /* Gap entre elementos */
space-y-6 sm:space-y-8     /* Espacio vertical entre hijos */
```

#### Ancho Responsivo
```jsx
w-full md:w-auto           /* Ancho completo móvil, auto desktop */
min-w-[320px]              /* Ancho mínimo */
max-w-6xl                  /* Ancho máximo */
```

---

## 🎯 Componentes Específicos de Black Friday

### Skewed Text Effect (Black Friday badge)

```jsx
<span
  className="px-2 rounded-full backdrop-blur-xl"
  style={{
    paddingTop: '0',
    paddingBottom: '0',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)',
    color: '#000000',
    transform: 'skewX(-15deg)',
    transformOrigin: 'center',
    display: 'inline-block'
  }}
>
  Black Friday
</span>
```

### TimeUnit (Contador)

```jsx
const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center space-y-1.5">
    <div className="glass-card rounded-lg p-2.5 sm:p-3 min-w-[50px] sm:min-w-[60px]">
      <div className="
        text-4xl sm:text-5xl md:text-6xl
        font-black text-verde-neon
        text-center font-mono
        leading-none neon-text
      ">
        {String(value).padStart(2, '0')}
      </div>
    </div>
    <span className="
      text-white/60
      text-[10px] sm:text-xs
      font-medium uppercase tracking-wide
      font-inter
    ">
      {label}
    </span>
  </div>
);
```

---

## 🔧 Trucos y Tips

### 1. Full Width dentro de Container con Padding

Para hacer que un elemento ocupe todo el ancho de la ventana cuando está dentro de un contenedor con padding:

```jsx
style={{
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  width: '100vw'
}}
```

### 2. Alinear Verticalmente con Padding Top

Para centrar contenido con padding top variable:

```jsx
/* Móvil normal, Desktop más separado, XL vuelve a normal */
pt-12 sm:pt-20 2xl:pt-12
```

### 3. Margen Negativo para Acercar Secciones

```jsx
-mb-12 sm:mb-0  /* Margen negativo en móvil, 0 en desktop */
```

### 4. Separación de Líneas sin Line-Height

```jsx
leading-none m-0 mb-1  /* Eliminar line-height, controlar con margin */
```

### 5. Override con !important en Tailwind

```jsx
className="!mt-12 sm:!mt-16"  /* Fuerza el margin-top */
```

---

## 📦 Stack Tecnológico

- **React** 19.2.0
- **Tailwind CSS** v4
- **Framer Motion** 11.18.0
- **Lucide React** (iconos)
- **Vite** (build tool)

---

## 🚀 Cómo Replicar en Otra App

### 1. Instalar Dependencias

```bash
npm install framer-motion lucide-react
```

### 2. Configurar Tailwind CSS v4

**tailwind.config.js:**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-principal': '#021938',
        'verde-neon': '#00FF7F',
        'blanco': '#FFFFFF',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 3. Importar Fuentes en index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
```

### 4. Copiar Clases Personalizadas

Copiar las clases `.neon-text`, `.glass-card`, etc. del archivo `src/index.css` de esta landing.

### 5. Copiar Componentes

Los componentes están en `src/components/`:
- **Navbar.jsx** - Navbar pill con liquid glass
- **HeroSection.jsx** - Hero con tipografía responsive
- **DescuentosSection.jsx** - Tarjetas glass con contador
- Etc.

---

## 📞 Soporte y Mantenimiento

**Última actualización:** 2025-01-19

**Versión del diseño:** 1.0

**Autor:** Claude Code (Anthropic)

Para modificaciones futuras, referirse a este documento para mantener consistencia visual y de código.

---

## ✅ Checklist para Nuevas Implementaciones

- [ ] Colores: ¿Usa la paleta definida?
- [ ] Tipografía: ¿Usa Outfit para títulos e Inter para cuerpo?
- [ ] Espaciado: ¿Usa `px-4 sm:px-6 lg:px-8` en secciones?
- [ ] Glassmorphism: ¿Elemento fuera del padre para backdrop-blur?
- [ ] Responsive: ¿Funciona en móvil, tablet y desktop?
- [ ] Animaciones: ¿Usa Framer Motion o clases personalizadas?
- [ ] Accesibilidad: ¿Tiene aria-labels y alt text?
- [ ] Hover states: ¿Todos los elementos interactivos tienen feedback visual?

---

*Este documento es una referencia viva. Actualizar cuando se agreguen nuevos patrones o componentes.*
