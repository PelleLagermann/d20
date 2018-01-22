var cacheKeys = {
  static: "static-v1",
  dynamic: "dynamic-v1"
};

self.addEventListener("install", function (event) {  
  event.waitUntil(
    caches.open(cacheKeys.static)
      .then(function(cache) {        
        cache.addAll([
          "/",
          "/index.html",
          "/app.css",
          "/app.js",
          "https://fonts.googleapis.com/css?family=Quicksand:300"
        ]);
      })
  );
  
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== cacheKeys.static && key !== cacheKeys.dynamic) {
            return caches.delete(key);
          }          
        }));
      })
  );

  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              caches.open(cacheKeys.dynamic)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res; 
                  
                })
            })
            .catch(function(err) {

            });
        }
      })
    );
});