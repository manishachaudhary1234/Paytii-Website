import { fetchSanity } from './lib/fetchSanity'

export const revalidate = 300

export default async function sitemap() {
  const baseUrl = 'https://www.paytii.com'
  const posts = await fetchSanity(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }`
  )

  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'daily',
      priority: 0.7,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/trade-discussions`,
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: new Date(),
    },
  ]

  const postRoutes = (posts || []).map((post) => ({
    url: `${baseUrl}/trade-discussions/${post.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified: post._updatedAt || post.publishedAt || new Date(),
  }))

  return [...staticRoutes, ...postRoutes]
}
