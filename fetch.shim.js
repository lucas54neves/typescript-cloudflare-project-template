/**
 * O Cloudflare Worker não implementa o atributo mode do fetch:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 * Este código remove esse atributo antes de chamar o fetch
 *
 * Uma segunda alternativa, seria remover 'mode: "cors"' do código gerado em worker.js
 * Uma terceira alternativa seria não utilizar o package cep-promise
 */
const originalFetch = globalThis.fetch

globalThis.fetch = function(resource, init) {
  if (init) {
    delete init.mode
  }
  return originalFetch(resource, init)
}
