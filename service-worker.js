importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log('Workbox berhasil dimuat');
else
  console.log('Workbox gagal dimuat');

const CACHE_NAME = "firstpwa-v3";

workbox.precaching.precacheAndRoute([
  { url:"/", revision: '1' },
  { url:"/nav.html", revision: '1' },
  { url:"/index.html", revision: '1' },
  { url:"/pages/saved.html", revision: '1' },
  { url:"/competitions.html", revision: '1' },
  { url:"/pages/home.html", revision: '1' },
  { url:"/pages/home2.html", revision: '1' },
  { url:"/pages/contact.html", revision: '1' },
  { url:"/css/materialize.min.css", revision: '1' },
  { url:"/js/materialize.min.js", revision: '1' },
  { url:"/manifest.json", revision: '1' },
  { url:"/package.json", revision: '1' },
  { url:"/js/nav.js", revision: '1' },
  { url:"/js/api.js", revision: '1' },
  { url:"/js/idb.js", revision: '1' },
  { url:"/js/db.js", revision: '1' },
  { url:"/js/script.js", revision: '1' },
  { url:"/push.js", revision: '1' },
  { url:"/service-worker.js", revision: '1' },
  { url:"/icon.png", revision: '1' },
  //{ url: '/kisspng-spain-national-football-team-fifa-world-cup-spain-spain-football-team-5b14fff75eaf03.5747164315281029033878.png', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' }
], {
//ignoreURLParametersMatching: [/.*/]  untuk workbox versi 4 keatas
ignoreUrlParametersMatching: [/.*/]
});

// menyimpan cache untuk folder pages
workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: CACHE_NAME
    })
);

// Menyimpan cache untuk fetch data api football
workbox.routing.registerRoute(
  /^https:\/\/(api|crest)\.football-data\.org/ ,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data-api',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Menyimpan cache dari CSS Materialize
workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com/icon?family=Material+Icons',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'materialize-icons',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'materialize-icons-dynamic',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener('push', (event) => {
  let body;
 
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload.';
  };
 
  const title = 'Push Notification Footbal.org';
  const options = {
    body: body,
    icon: 'icon.png',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
 
  event.waitUntil(
      self.registration.showNotification(title, options)
  );
});