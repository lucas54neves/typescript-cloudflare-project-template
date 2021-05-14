import { routes } from '../routes'

function notFoundRoute(event: FetchEvent) {
  return new Response(`${event.request.url} do not found!`, {
    status: 404
  })
}

function handleRequest(event: FetchEvent) {
  const url = new URL(event.request.url)
  const route = routes[url.pathname] || notFoundRoute
  return route(event)
}

export function eventListener(event: FetchEvent) {
  event.respondWith(handleRequest(event))
}
