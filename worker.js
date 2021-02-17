// fetch.shim.js
var originalFetch = globalThis.fetch;
globalThis.fetch = function(resource, init) {
  if (init) {
    delete init.mode;
  }
  return originalFetch(resource, init);
};

// src/listeners/corsListener.ts
function corsListener(event) {
  const response = corsHandler(event.request);
  if (response) {
    event.respondWith(response);
  }
}
function corsHandler(request) {
  if (request.method.toUpperCase() === "OPTIONS") {
    return respondWithCors();
  }
}
function respondWithCors() {
  return new Response(null, {
    status: 200,
    headers: {
      ...CORS,
      "Content-Length": "0"
    }
  });
}
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD, CONNECT, TRACE",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400"
};

// src/listeners/favIconListener.ts
function favIconHandler(event) {
  if (new URL(event.request.url).pathname === "/favicon.ico") {
    return new Response(null, {
      status: 301,
      headers: {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=15552000"
      }
    });
  }
}
function favIconListener(event) {
  const response = favIconHandler(event);
  if (response) {
    event.respondWith(response);
  }
}

// src/listeners/eventListener.ts
function routerHandler(event) {
  return new Response("Hello World", {status: 200});
}
function handle(event) {
  return routerHandler(event);
}
function eventListener(event) {
  event.respondWith(handle(event));
}

// src/index.ts
addEventListener("fetch", corsListener);
addEventListener("fetch", favIconListener);
addEventListener("fetch", eventListener);
