import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Reducir el tamaño del chunk inicial
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libraries grandes
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'helmet': ['react-helmet-async'],
          'icons': ['lucide-react'],
        },
      },
    },

    // Optimizaciones de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.logs en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Eliminar funciones específicas
      },
    },

    // Tamaño de chunk para advertencias
    chunkSizeWarningLimit: 1000,

    // Sourcemaps solo en desarrollo
    sourcemap: false,

    // Compresión CSS
    cssCodeSplit: true,

    // Optimizar assets
    assetsInlineLimit: 4096, // Inline assets < 4kb
  },

  // Optimizaciones de servidor de desarrollo
  server: {
    hmr: {
      overlay: false,
    },
  },

  // Optimizaciones de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-helmet-async',
      'lucide-react',
    ],
  },
})
