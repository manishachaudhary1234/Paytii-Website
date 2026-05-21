const { createClient } = require('next-sanity')

const client = createClient({
  projectId: '4tlm8bbe',
  dataset: 'production',
  apiVersion: '2026-05-20',
  useCdn: true,
})

module.exports = {
  siteUrl: 'https://www.paytii.com',
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current, publishedAt }`)
    return posts.map((post) => ({
      loc: `/trade-discussions/${post.slug}`,
      lastmod: post.publishedAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }))
  },
}