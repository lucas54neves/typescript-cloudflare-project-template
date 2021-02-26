export function jsonResponse(data: any): Response {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=31536000',
    'Access-Control-Allow-Origin': '*',
  }

  return new Response(JSON.stringify(data), { headers })
}
