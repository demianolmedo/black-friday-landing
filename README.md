# Black Friday Landing Page

Landing page diseñada para promociones de Black Friday con React, Tailwind CSS y Lucide Icons.

## Características

- ⚛️ React 18 con Vite
- 🎨 Tailwind CSS para estilos
- ⏰ Countdown timer funcional
- 📱 Diseño responsive (mobile-first)
- 📝 Formulario con validación
- 🐳 Docker para producción
- 🚀 Optimizado para deployment

## Desarrollo Local

### Requisitos
- Node.js 20+
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Deployment con Docker

### Opción 1: Docker Compose (Recomendado)

```bash
# Build y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

La aplicación estará disponible en `http://localhost:3000`

### Opción 2: Docker Manual

```bash
# Build de la imagen
docker build -t black-friday-landing .

# Ejecutar contenedor
docker run -d -p 3000:80 --name black-friday-landing black-friday-landing

# Ver logs
docker logs -f black-friday-landing

# Detener y eliminar
docker stop black-friday-landing
docker rm black-friday-landing
```

## Deployment en VPS

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/black-friday-landing.git
git push -u origin main
```

### 2. En tu VPS

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/black-friday-landing.git
cd black-friday-landing

# Instalar Docker (si no está instalado)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Ejecutar la aplicación
sudo docker-compose up -d

# Verificar que está corriendo
sudo docker-compose ps
```

### 3. Configurar Nginx Reverse Proxy (Opcional)

Si quieres usar un dominio con SSL:

```bash
# Instalar Nginx
sudo apt update
sudo apt install nginx

# Crear configuración
sudo nano /etc/nginx/sites-available/black-friday
```

Agregar:

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
sudo ln -s /etc/nginx/sites-available/black-friday /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Instalar SSL con Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com
```

## Actualizar en VPS

```bash
# Entrar al directorio
cd black-friday-landing

# Obtener últimos cambios
git pull origin main

# Reconstruir y reiniciar
sudo docker-compose down
sudo docker-compose up -d --build
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter

## Estructura del Proyecto

```
black-friday-landing/
├── public/              # Assets estáticos
├── src/
│   ├── assets/         # Imágenes y recursos
│   ├── components/     # Componentes React
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Entry point
├── Dockerfile          # Configuración Docker
├── docker-compose.yml  # Docker Compose
├── nginx.conf          # Configuración Nginx
└── tailwind.config.js  # Configuración Tailwind
```

## Personalización

### Colores
Los colores principales están definidos en `tailwind.config.js`:
- navy-dark: #0A1628
- navy-blue: #0F1F3D
- neon-green: #00FF94

### Fuentes
El proyecto usa las fuentes Outfit e Inter. Los archivos están en `src/assets/fonts/`

## Soporte

Para problemas o preguntas, crear un issue en el repositorio.

## Licencia

MIT
