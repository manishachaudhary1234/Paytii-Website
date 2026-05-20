import { client } from './client'

// Live preview is disabled - content updates via revalidation (60s)
export async function sanityFetch({ query, params = {} }: { query: string; params?: Record<string, unknown> }) {
  const data = await client.fetch(query, params)
  return { data }
}

export function SanityLive() {
  return null
}
