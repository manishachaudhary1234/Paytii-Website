const PROJECT_ID = '4tlm8bbe'
const DATASET = 'production'
const API_VERSION = '2026-05-20'

async function getPosts() {
  const query = encodeURIComponent(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
  )
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`
  const res = await fetch(url)
  if (!res.ok) return []
  const json = await res.json()
  return json.result || []
}

module.exports = {
  siteUrl: 'https://www.paytii.com',
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const posts = await getPosts()
    return posts.map((post) => ({
      loc: `/trade-discussions/${post.slug}`,
      lastmod: post.publishedAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }))
  },
}