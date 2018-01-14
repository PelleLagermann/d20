function log(var1, var2) {
  console.log("[Service Worker] ", var1, var2);
}

self.addEventListener("install", function (event) {
  log("Install", event);  
  event.waitUntil(
    caches.open("static")
      .then(function(cache) {
        log("Pre caching", event);  
        cache.addAll([
          "/d20/",
          "/d20/index.html",
          "/d20/app.css",
          "/d20/app.js",
          "https://fonts.googleapis.com/css?family=Quicksand:300"
        ]);
      })
  );
  
});

self.addEventListener("activate", function (event) {
  log("activate", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  log("fetch", event);  
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              caches.open("dynamic")
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            });
        }
      })
    );
});