/*import { routes } from "./routes"

function notFoundRoute(event: FetchEvent) {
  return new Response(`${event.request.url} do not found!`, {
    status: 404
  })
}

function handlerRouter(event: FetchEvent) {
  const url = new URL(event.request.url)
  const route = routes[url.pathname] || notFoundRoute
  return route(event)
}*/

import { registerLogs } from './registerLogs'

async function resonseTest() {
  return new Response('This is a typescript Cloudflare project template', { status: 200 })
}

async function handleRequest(event: FetchEvent) {
  // const response = await handlerRouter(event)
  const response = await resonseTest()

  registerLogs(event, response)

  return response
}

export function eventListener(event: FetchEvent) {
  event.passThroughOnException()

  event.respondWith(handleRequest(event))
}
