import { fetchSanity } from '../lib/fetchSanity'
import { urlFor } from '../../sanity/lib/image'
import Link from 'next/link'

export const metadata = {
  title: 'Insights — PAYTII',
  description: 'Read the latest articles and insights from PAYTII on trade, retail, and brand growth.',
}

async function getPosts() {
  return fetchSanity(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      mainImage
    }`
  )
}

export default async function InsightsPage() {
  const posts = await getPosts()

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Insights</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '56px', fontSize: '1.125rem' }}>
        Trade insights, brand strategies, and retail trends from PAYTII.
      </p>

      {posts.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>No posts published yet.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
        {posts.map((post) => (
          <Link
            key={post.slug.current}
            href={`/insights/${post.slug.current}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--line)',
              transition: 'box-shadow 0.2s',
            }}>
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(640).height(360).url()}
                  alt={post.mainImage.alt || post.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                />
              )}
              <div style={{ padding: '24px' }}>
                {post.publishedAt && (
                  <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '8px' }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.4 }}>
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
