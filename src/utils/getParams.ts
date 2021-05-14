export function getParams(url: string) {
  const urlService = new URL(url)
  const params = new URLSearchParams(urlService.search)
  const returnObject: any = {}
  for (const pair of params.entries()) {
    returnObject[pair[0]] = pair[1]
  }
  return returnObject
}
