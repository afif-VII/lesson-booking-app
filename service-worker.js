var cacheName = "lessonsapp-v1";
var cacheFiles = [
  "index.html",
  "lessons.js",
  "images/icon-32.png",
  "images/icon-512.png",
  "images/art.png",
  "images/computing.png",
  "images/economics.png",
  "images/geography.png",
  "images/history.png",
  "images/languages.png",
  "images/maths.png",
  "images/photography.png",
  "images/reading.png",
  "images/science.png",
];

self.addEventListener("install", function(e) {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[Service Worker] Caching all the files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cachedFile) {
      if (cachedFile) {
        console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);

        return cachedFile;

      } else {
        return fetch(e.request).then(function(response) {

          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, response.clone());

            console.log("[Service Worker] Resource fetched and saved in the cache for: " + e.request.url);

            return response;
          });
        });
      }
    })
  );
});
