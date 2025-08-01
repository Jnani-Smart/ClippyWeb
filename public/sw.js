// High-performance Service Worker
const CACHE_NAME = 'clippy-web-v3'; // Updated version for new build
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo.png',
  '/Assets/1.png',
  '/Assets/2.png',
  '/Assets/3.png',
  '/Assets/4.png'
];

// Fast install with parallel caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Use addAll for parallel caching
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        // Silent error handling in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Cache install failed:', error);
        }
      })
  );
  // Skip waiting for immediate activation
  self.skipWaiting();
});

// Aggressive cache cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      // Take control immediately
      self.clients.claim()
    ])
  );
});

// Ultra-fast fetch with cache-first strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests and external URLs
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Cache-first strategy for maximum speed
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Network fallback with optimized error handling
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              
              // Cache images and static assets immediately
              if (request.destination === 'image' || 
                  request.url.includes('.png') || 
                  request.url.includes('.jpg') || 
                  request.url.includes('.svg') ||
                  request.url.includes('.css') ||
                  request.url.includes('.js')) {
                
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(request, responseClone))
                  .catch(() => {}); // Silent fail
              }
            }
            
            return response;
          })
          .catch(() => {
            // Fast offline fallback
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});
