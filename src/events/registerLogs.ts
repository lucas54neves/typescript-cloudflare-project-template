const sourceKey = "1948aef9-da5e-48be-bd22-5d426a4889bc"
const apiKey = "LfyAMZaQk_y7"
const WORKER_ID = makeid(6)

function makeid(length: number) {
  let text = ""
  const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789"
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function buildMetadataFromHeaders(headers: Headers) {
  const responseMetadata: any = {}
  Array.from(headers).forEach(([key, value]) => {
    responseMetadata[key.replace(/-/g, "_")] = value
  })
  return responseMetadata
}

export function registerLogs(event: FetchEvent, response: Response) {
  const { request } = event
    
  const rMeth = request.method
  const rUrl = request.url
  const uAgent = request.headers.get("user-agent")
  const rHost = request.headers.get("host")
  const cfRay = request.headers.get("cf-ray")
  const cIP = request.headers.get("cf-connecting-ip")
  const rCf = request.cf

  const requestMetadata = buildMetadataFromHeaders(request.headers)

  const t1 = Date.now()

  const originTimeMs = Date.now() - t1

  const statusCode = response.status

  const responseMetadata = buildMetadataFromHeaders(response.headers)

  const logEntry = `${rMeth} | ${statusCode} | ${cIP} | ${cfRay} | ${rUrl} | ${uAgent}`

  const logflareEventBody = {
    source: sourceKey,
    log_entry: logEntry,
    metadata: {
      response: {
        headers: responseMetadata,
        origin_time: originTimeMs,
        status_code: response.status
      },
      request: {
        url: rUrl,
        method: rMeth,
        headers: requestMetadata,
        cf: rCf
      },
      logflare_worker: {
        worker_id: WORKER_ID
      }
    }
  }

  const init = {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
      "User-Agent": `Cloudflare Worker via ${rHost}`
    },
    body: JSON.stringify(logflareEventBody)
  }

  event.waitUntil(fetch("https://api.logflare.app/logs", init))
}