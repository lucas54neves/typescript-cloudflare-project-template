import { jsonResponse, registerLog } from '../utils'

export function pageHomeRouter(event: FetchEvent) {
  const { request } = event
  const message = 'This is a typescript Cloudflare project template'

  const requestBody = message

  const begin = Date.now()

  const response = jsonResponse(
    'This is a typescript Cloudflare project template',
  )

  const responseTime = Date.now() - begin

  const responseBody = message

  const requestData = {
    requestMethod: request.method,
    requestURL: request.url,
    requestHeaders: request.headers,
    requestCf: request.cf,
    requestBody,
  }

  const responseData = {
    responseBody,
    responseTime,
    responseStatus: response.status,
    responseHeaders: response.headers,
  }

  registerLog(event, requestData, responseData)

  return response
}
