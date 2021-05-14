import { registerLogs } from '@lucas54neves/logflare'

import { jsonResponse } from '../utils'

export async function pageHomeRouter(event: FetchEvent) {
  const logflareCredentials = {
    apiKey: 'LfyAMZaQk_y7',
    sourceKey: '1948aef9-da5e-48be-bd22-5d426a4889bc'
  }

  const message = 'This is a typescript Cloudflare project template'

  const response = jsonResponse(
    'This is a typescript Cloudflare project template'
  )

  await registerLogs({
    credentials: logflareCredentials,
    message
  })

  return response
}
