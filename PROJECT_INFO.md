# Black Friday Landing - Información del Proyecto

## Descripción

Landing page profesional para promoción de Black Friday con descuento del 50%. Diseñada pixel-perfect siguiendo el mockup proporcionado, con React, Tailwind CSS y Lucide Icons.

## Características Implementadas

### ✅ Funcionalidades Core
- **Header Fixed** con logo y animaciones
- **Hero Section** con oferta destacada del 50% OFF
- **Countdown Timer** funcional que cuenta regresivo hasta el Black Friday
- **CTA Buttons** animados con efectos hover y microinteracciones
- **Content Section** con features destacadas (Rápida, Alertas, Manejo)
- **Formulario de Contacto** con validación completa usando React Hook Form
- **Footer** completo con información de contacto y redes sociales

### 🎨 Diseño UI/UX
- **Pixel Perfect** - Diseño fiel al mockup original
- **Responsive Design** - Mobile-first, adaptable a todos los dispositivos
- **Animaciones** suaves y profesionales
- **Efectos visuales** modernos (glow, blur, gradientes)
- **Tipografía** personalizada (Outfit e Inter)
- **Color Scheme** consistente con verde neón (#00FF94) y azul navy (#0A1628)

### 🚀 Performance
- **Fast Loading** - Optimizado para carga rápida
- **Code Splitting** - Componentes modulares
- **Asset Optimization** - Imágenes y fuentes optimizadas
- **Production Ready** - Build optimizado para producción

### 🐳 Docker
- **Dockerfile** multi-stage para producción
- **Docker Compose** para deployment fácil
- **Nginx** configurado con optimizaciones
- **Health Checks** implementados

### 📱 Funcionalidades
- **Countdown Timer** que actualiza cada segundo
- **Scroll Smooth** al hacer clic en CTAs
- **Form Validation** en tiempo real
- **Error Handling** completo en formularios
- **Success Messages** después de enviar formulario

## Estructura del Proyecto

```
black-friday-landing/
├── public/                     # Assets públicos estáticos
├── src/
│   ├── assets/                # Imágenes y recursos
│   │   ├── Fonts/            # Fuentes Outfit e Inter
│   │   └── Fondos e imagenes/ # Imágenes del diseño
│   ├── components/           # Componentes React
│   │   ├── Header.jsx       # Header con logo
│   │   ├── Hero.jsx         # Sección hero con 50% OFF
│   │   ├── CountdownTimer.jsx # Timer funcional
│   │   ├── CTAButton.jsx    # Botón call-to-action
│   │   ├── ContentSection.jsx # Sección de contenido
│   │   ├── ContactForm.jsx  # Formulario con validación
│   │   └── Footer.jsx       # Footer completo
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globales + Tailwind
├── Dockerfile               # Configuración Docker
├── docker-compose.yml       # Docker Compose config
├── nginx.conf              # Configuración Nginx
├── tailwind.config.js      # Configuración Tailwind
├── deploy.sh               # Script de deployment
├── .env.example            # Variables de entorno ejemplo
├── README.md               # Documentación principal
├── DEPLOYMENT.md           # Guía de deployment
└── PROJECT_INFO.md         # Este archivo

```

## Tecnologías Utilizadas

### Frontend
- **React 18** - Framework principal
- **Vite 7** - Build tool y dev server
- **Tailwind CSS 3** - Framework de estilos utility-first
- **Lucide React** - Iconos modernos
- **React Hook Form** - Manejo de formularios

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores
- **Nginx** - Web server y reverse proxy

### Herramientas
- **Git** - Control de versiones
- **npm** - Package manager
- **ESLint** - Linting de código

## Componentes Detallados

### 1. Header (`Header.jsx`)
- Logo en la izquierda
- Indicador verde animado
- Fixed en la parte superior
- Responsive con tamaños adaptativos

### 2. Hero (`Hero.jsx`)
- Título principal "50% OFF DESCUENTOS"
- Imagen de persona con efectos de glow
- Card de oferta con badge
- Gradientes y efectos visuales

### 3. CountdownTimer (`CountdownTimer.jsx`)
- Cuenta regresiva en tiempo real
- Formato: Días / Horas / Minutos / Segundos
- Actualización cada segundo
- Barra de progreso visual
- Efectos de glow en los números

### 4. CTAButton (`CTAButton.jsx`)
- Tres variantes: primary, secondary, outline
- Efectos hover animados
- Iconos con Lucide React
- Sparkles y efectos de brillo
- Totalmente reutilizable

### 5. ContentSection (`ContentSection.jsx`)
- Mensaje principal destacado
- Grid de 3 features con iconos
- Anuncio de Black Friday
- CTA integrado
- Efectos hover en cards

### 6. ContactForm (`ContactForm.jsx`)
- 5 campos: Nombre, Email, Teléfono, Empresa, Mensaje
- Validación en tiempo real
- Iconos por campo
- Mensajes de error claros
- Estado de envío con loading
- Mensaje de éxito después del submit
- Checkbox de términos y condiciones

### 7. Footer (`Footer.jsx`)
- 4 columnas de información
- Links a secciones importantes
- Información de contacto
- Redes sociales con iconos
- Badge de Black Friday
- Fully responsive

## Colores del Diseño

```css
Navy Dark:    #0A1628  /* Background principal */
Navy Blue:    #0F1F3D  /* Background secundario */
Neon Green:   #00FF94  /* Color de acento principal */
Neon Light:   #00FFA3  /* Color de acento hover */
White:        #FFFFFF  /* Texto principal */
White/70:     rgba(255, 255, 255, 0.7) /* Texto secundario */
```

## Tipografía

- **Outfit** - Títulos y headings (100-900)
- **Inter** - Texto de cuerpo (100-900)

## Breakpoints Responsive

```css
sm:  640px   /* Tablets pequeñas */
md:  768px   /* Tablets */
lg:  1024px  /* Desktop pequeño */
xl:  1280px  /* Desktop */
2xl: 1536px  /* Desktop grande */
```

## Animaciones

- **fadeIn** - Entrada suave desde abajo
- **pulse-slow** - Pulsación lenta para elementos destacados
- **slideInFromLeft** - Entrada desde la izquierda
- **slideInFromRight** - Entrada desde la derecha
- **hover effects** - Escalado, brillo, translación

## Configuración del Countdown

Por defecto configurado para: **29 de Noviembre, 2025, 23:59:59**

Para cambiar la fecha, editar en `App.jsx`:
```javascript
const blackFridayEndDate = '2025-11-29T23:59:59';
```

## URLs y Contacto

Actualizar en los componentes correspondientes:
- Footer: Información de contacto y redes sociales
- Header: Logo y branding
- ContactForm: Endpoint de envío de formulario

## Performance Metrics (Estimado)

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+
- **Bundle Size**: ~200KB (gzipped)

## Compatibilidad de Navegadores

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Próximas Mejoras Posibles

1. **Analytics** - Integrar Google Analytics o similar
2. **A/B Testing** - Probar diferentes variantes de CTAs
3. **Chat Widget** - Agregar chat en vivo
4. **Email Integration** - Conectar con servicio de email marketing
5. **Multi-idioma** - Soporte para varios idiomas
6. **PWA** - Convertir en Progressive Web App
7. **SEO** - Optimización avanzada para motores de búsqueda
8. **Testimonios** - Sección de reseñas de clientes

## Notas Técnicas

### Optimizaciones Implementadas
- Lazy loading de imágenes
- Code splitting automático con Vite
- Compression gzip en Nginx
- Cache headers configurados
- Minificación de CSS y JS

### Seguridad
- Headers de seguridad en Nginx
- Validación de formularios client-side
- Sanitización de inputs
- HTTPS ready

### SEO Basics
- Semantic HTML
- Meta tags (agregar en index.html)
- Alt text en imágenes
- Estructura clara de headings

## Comandos Útiles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

### Docker
```bash
./deploy.sh          # Deployment automatizado
docker-compose up -d # Iniciar contenedores
docker-compose logs  # Ver logs
docker-compose down  # Detener contenedores
```

## Troubleshooting Común

### Fonts no cargan
- Verificar que las rutas en index.css sean correctas
- Comprobar que los archivos .ttf existan en src/assets/Fonts/

### Imágenes no cargan
- Verificar rutas en componentes
- Asegurarse que assets estén copiados correctamente

### Countdown no funciona
- Verificar formato de fecha en App.jsx
- Comprobar zona horaria del servidor

### Build falla
- Ejecutar `npm install` nuevamente
- Limpiar cache: `rm -rf node_modules package-lock.json && npm install`

## Créditos

- **Diseño UI/UX**: Basado en mockup proporcionado
- **Desarrollo**: Claude Code con React + Tailwind
- **Iconos**: Lucide Icons
- **Fonts**: Google Fonts (Outfit, Inter)

## Licencia

MIT License - Ver archivo LICENSE para más detalles

## Soporte

Para soporte o preguntas:
- Issues: GitHub Issues
- Email: soporte@tudominio.com
- Docs: README.md y DEPLOYMENT.md

---

**Versión**: 1.0.0
**Última actualización**: Noviembre 2025
**Estado**: Production Ready ✅
