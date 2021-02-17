/*import { routes } from "./routes"

function notFoundRoute(event: FetchEvent) {
  return new Response(`${event.request.url} do not found!`, {
    status: 404
  })
}

function routerHandler(event: FetchEvent) {
  const url = new URL(event.request.url)
  const route = routes[url.pathname] || notFoundRoute
  return route(event)
}*/

function routerHandler(event: FetchEvent) {
  return new Response('Hello World', {status: 200})
}

function handle(event: FetchEvent) {
  return routerHandler(event)
}

export function eventListener (event: FetchEvent) {
  event.respondWith(handle(event))
}