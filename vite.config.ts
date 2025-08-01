import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React rendering
      jsxRuntime: 'automatic'
    })
  ],
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lucide-react'], // Keep this excluded for tree-shaking
  },
  
  // Build optimizations
  build: {
    // Disable source maps in production for smaller bundle
    sourcemap: false,
    
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
        // Optimize asset naming for better caching
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
    
    // Performance optimizations
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 800,
    
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  
  // Development server optimizations
  server: {
    cors: true,
    hmr: {
      overlay: false // Disable error overlay for better performance
    }
  },
  
  // Enable compression and caching
  preview: {
    port: 3000,
    cors: true
  }
});
