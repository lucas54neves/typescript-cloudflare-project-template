const LOGFLARE_SOURCE_KEY = '1948aef9-da5e-48be-bd22-5d426a4889bc'
const LOGFLARE_APIKEY = 'LfyAMZaQk_y7'

export function registerLog(event: FetchEvent, request: any, response: any) {
  event.passThroughOnException()

  logRecorder(event, request, response)
}

function makeid(length: number) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function buildMetadataFromHeaders(headers: Headers) {
  const responseMetadata: any = {}
  Array.from(headers).forEach(([key, value]) => {
    responseMetadata[key.replace(/-/g, '_')] = value
  })
  return responseMetadata
}

async function logRecorder(event: FetchEvent, request: any, response: any) {
  const { requestMethod, requestURL, requestHeaders, requestCf, requestBody } =
    request

  const { responseBody, responseTime, responseStatus, responseHeaders } =
    response

  const userAgent = requestHeaders.get('user-agent')
  const requestHost = requestHeaders.get('host')
  const requestCfRay = requestHeaders.get('cf-ray')
  const requestConnectingIP = requestHeaders.get('cf-connecting-ip')

  const requestMetadata = buildMetadataFromHeaders(requestHeaders)

  const responseMetadata = buildMetadataFromHeaders(responseHeaders)

  const logEntry = `${requestMethod} | ${responseStatus} | ${requestConnectingIP} | ${requestCfRay} | ${requestURL} | ${userAgent}`

  const logflareEventBody = {
    source: LOGFLARE_SOURCE_KEY,
    log_entry: logEntry,
    metadata: {
      response: {
        headers: responseMetadata,
        origin_time: responseTime,
        status_code: responseStatus,
        body: responseBody
      },
      request: {
        url: requestURL,
        method: requestMethod,
        headers: requestMetadata,
        cf: requestCf,
        body: requestBody
      },
      logflare_worker: {
        worker_id: makeid(6)
      }
    }
  }

  const init = {
    method: 'POST',
    headers: {
      'X-API-KEY': LOGFLARE_APIKEY,
      'Content-Type': 'application/json',
      'User-Agent': `Cloudflare Worker via ${requestHost}`
    },
    body: JSON.stringify(logflareEventBody)
  }

  event.waitUntil(fetch('https://api.logflare.app/logs', init))
}
