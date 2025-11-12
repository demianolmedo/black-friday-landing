# Guía de Deployment - Black Friday Landing

Esta guía te ayudará a desplegar la landing page en tu VPS usando Docker.

## Requisitos Previos

- VPS con Ubuntu 20.04+ (o similar)
- Acceso SSH al servidor
- Dominio configurado (opcional)
- Git instalado en el VPS

## Paso 1: Preparar el Repositorio

### En tu máquina local:

```bash
cd black-friday-landing

# Inicializar repositorio git
git init

# Agregar archivos
git add .

# Crear commit inicial
git commit -m "Initial commit: Black Friday Landing"

# Agregar remote (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/black-friday-landing.git

# Push al repositorio
git push -u origin main
```

## Paso 2: Conectar al VPS

```bash
# Conectar via SSH
ssh usuario@tu-servidor-ip

# Actualizar el sistema
sudo apt update && sudo apt upgrade -y
```

## Paso 3: Instalar Docker y Docker Compose

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Cerrar sesión y volver a conectar para aplicar cambios
exit
ssh usuario@tu-servidor-ip

# Verificar instalación
docker --version

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Dar permisos de ejecución
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalación
docker-compose --version
```

## Paso 4: Clonar el Repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/tu-usuario/black-friday-landing.git

# Entrar al directorio
cd black-friday-landing
```

## Paso 5: Configurar Variables de Entorno (Opcional)

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar variables si es necesario
nano .env
```

## Paso 6: Desplegar con Docker

### Opción A: Usando el script de deployment

```bash
# Hacer el script ejecutable
chmod +x deploy.sh

# Ejecutar deployment
./deploy.sh
```

### Opción B: Manual con Docker Compose

```bash
# Build y ejecutar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Verificar estado
docker-compose ps
```

La aplicación ahora estará disponible en `http://tu-servidor-ip:3000`

## Paso 7: Configurar Nginx como Reverse Proxy (Recomendado)

### Instalar Nginx

```bash
sudo apt install nginx -y
```

### Crear configuración del sitio

```bash
sudo nano /etc/nginx/sites-available/black-friday
```

Agrega el siguiente contenido (reemplaza `tudominio.com` con tu dominio):

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;
}
```

### Activar el sitio

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/black-friday /etc/nginx/sites-enabled/

# Probar configuración
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx
```

## Paso 8: Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# Seguir las instrucciones en pantalla
```

El certificado se renovará automáticamente.

## Paso 9: Configurar Firewall (Opcional pero Recomendado)

```bash
# Habilitar UFW
sudo ufw enable

# Permitir SSH
sudo ufw allow ssh

# Permitir HTTP y HTTPS
sudo ufw allow 'Nginx Full'

# Verificar estado
sudo ufw status
```

## Actualizar la Aplicación

Cuando necesites actualizar:

```bash
# Entrar al directorio
cd black-friday-landing

# Obtener últimos cambios
git pull origin main

# Reconstruir y reiniciar
docker-compose down
docker-compose up -d --build

# Limpiar imágenes antiguas (opcional)
docker image prune -f
```

## Comandos Útiles

### Docker Compose

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f black-friday-landing

# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reiniciar servicios
docker-compose restart

# Ver estado de contenedores
docker-compose ps
```

### Docker

```bash
# Ver contenedores corriendo
docker ps

# Ver todas las imágenes
docker images

# Limpiar contenedores detenidos
docker container prune

# Limpiar imágenes sin usar
docker image prune -a

# Ver uso de recursos
docker stats
```

### Nginx

```bash
# Reiniciar Nginx
sudo systemctl restart nginx

# Recargar configuración
sudo systemctl reload nginx

# Ver estado
sudo systemctl status nginx

# Ver logs de error
sudo tail -f /var/log/nginx/error.log

# Ver logs de acceso
sudo tail -f /var/log/nginx/access.log
```

## Monitoreo y Mantenimiento

### Verificar que la aplicación está corriendo

```bash
# Probar localmente
curl http://localhost:3000

# Probar desde fuera
curl http://tudominio.com
```

### Backup (si tienes datos importantes)

```bash
# Backup de la aplicación
tar -czf backup-$(date +%Y%m%d).tar.gz black-friday-landing/

# Mover a ubicación segura
mv backup-*.tar.gz /ruta/a/backups/
```

### Logs

```bash
# Ver logs de Docker
docker-compose logs --tail=100

# Ver logs de Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

### La aplicación no carga

1. Verificar que Docker está corriendo:
```bash
docker ps
```

2. Ver logs:
```bash
docker-compose logs
```

3. Verificar que el puerto 3000 está abierto:
```bash
netstat -tulpn | grep 3000
```

### Error de permisos

```bash
sudo chown -R $USER:$USER black-friday-landing/
```

### Nginx muestra 502 Bad Gateway

1. Verificar que el contenedor está corriendo
2. Verificar logs de Nginx
3. Reiniciar Nginx y Docker

```bash
sudo systemctl restart nginx
docker-compose restart
```

## Optimizaciones de Producción

### 1. Configurar limpieza automática de logs

```bash
# Editar docker-compose.yml y agregar:
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

### 2. Configurar auto-restart

Los contenedores ya tienen `restart: unless-stopped` configurado.

### 3. Monitoreo de recursos

```bash
# Instalar htop
sudo apt install htop

# Ver recursos
htop
```

## Seguridad Adicional

### 1. Cambiar puerto SSH

```bash
sudo nano /etc/ssh/sshd_config
# Cambiar Port 22 a otro puerto
sudo systemctl restart sshd
```

### 2. Fail2ban

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Actualizar regularmente

```bash
sudo apt update && sudo apt upgrade -y
```

## Soporte

Para problemas o preguntas:
- GitHub Issues: https://github.com/tu-usuario/black-friday-landing/issues
- Email: soporte@tudominio.com

## Licencia

MIT
