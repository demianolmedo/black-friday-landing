#!/bin/bash

# Black Friday Landing - Deployment Script
# Este script automatiza el proceso de deployment con Docker

set -e

echo "🚀 Iniciando deployment de Black Friday Landing..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

print_success "Docker está instalado"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

print_success "Docker Compose está instalado"

# Stop existing containers
print_status "Deteniendo contenedores existentes..."
docker-compose down 2>/dev/null || true
print_success "Contenedores detenidos"

# Build and start containers
print_status "Construyendo la imagen Docker..."
docker-compose build --no-cache

print_success "Imagen construida exitosamente"

print_status "Iniciando contenedores..."
docker-compose up -d

print_success "Contenedores iniciados"

# Wait for the application to be ready
print_status "Esperando a que la aplicación esté lista..."
sleep 5

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    print_success "✨ Deployment completado exitosamente!"
    echo ""
    print_success "La aplicación está corriendo en:"
    echo -e "${GREEN}http://localhost:3000${NC}"
    echo ""
    print_status "Para ver los logs:"
    echo "docker-compose logs -f"
    echo ""
    print_status "Para detener la aplicación:"
    echo "docker-compose down"
else
    print_error "Algo salió mal. Revisa los logs con:"
    echo "docker-compose logs"
    exit 1
fi
