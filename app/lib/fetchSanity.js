const PROJECT_ID = '4tlm8bbe'
const DATASET = 'production'
const API_VERSION = '2026-05-20'

export async function fetchSanity(query, params = {}) {
  const encodedQuery = encodeURIComponent(query)
  const paramsParts = Object.entries(params).map(
    ([k, v]) => `$${k}=${encodeURIComponent(JSON.stringify(v))}`
  )
  const qs = [encodedQuery ? `query=${encodedQuery}` : '', ...paramsParts]
    .filter(Boolean)
    .join('&')

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?${qs}`

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`)
  const json = await res.json()
  return json.result
}
