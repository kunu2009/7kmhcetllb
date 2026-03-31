import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: [
            '7kmhcetlogo.jpg',
            'apple-touch-icon.png',
            'favicon-32x32.png',
            'favicon-16x16.png',
            'pwa-192.png',
            'pwa-512.png'
          ],
          manifest: {
            name: 'MHCET Prep Hub',
            short_name: 'MHCET Prep',
            description: 'Multi-track MHCET preparation app with practice, analytics, and revision.',
            start_url: '/#/',
            scope: '/',
            display: 'standalone',
            orientation: 'portrait',
            theme_color: '#4f46e5',
            background_color: '#0f172a',
            icons: [
              {
                src: '/pwa-192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/pwa-512.png',
                sizes: '512x512',
                type: 'image/png'
              },
              {
                src: '/pwa-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
              }
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,woff2}'],
            navigateFallback: '/index.html',
            runtimeCaching: [
              {
                urlPattern: ({ request }) => request.destination === 'document',
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'pages-cache',
                  networkTimeoutSeconds: 4,
                  expiration: {
                    maxEntries: 20,
                    maxAgeSeconds: 60 * 60 * 24 * 7
                  }
                }
              },
              {
                urlPattern: ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'assets-cache',
                  expiration: {
                    maxEntries: 60,
                    maxAgeSeconds: 60 * 60 * 24 * 30
                  }
                }
              },
              {
                urlPattern: ({ request }) => request.destination === 'image',
                handler: 'CacheFirst',
                options: {
                  cacheName: 'images-cache',
                  expiration: {
                    maxEntries: 80,
                    maxAgeSeconds: 60 * 60 * 24 * 60
                  }
                }
              },
              {
                urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
