importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

workbox.setConfig({debug: false});

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    const options = {
      body: body,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.cacheFirst({
        cacheName: 'footballAPI'
    })
);

workbox.routing.registerRoute(
    new RegExp('(.*)\.(?:png|gif|jpg|jpeg|svg)$'),
    workbox.strategies.cacheFirst({
        cacheName: 'images'
    })
)

workbox.routing.registerRoute(
    new RegExp('manifest.webmanifest'),
    workbox.strategies.cacheFirst({
        cacheName: 'manifest'
    })
)

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts',
        plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 30,
        }),
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
        }),
        ],
    }),
);

workbox.precaching.precacheAndRoute([]);