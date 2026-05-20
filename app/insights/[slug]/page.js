import { fetchSanity } from '../../lib/fetchSanity'
import { urlFor } from '../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'

async function getPost(slug) {
  return fetchSanity(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      mainImage,
      body,
      "author": author->name
    }`,
    { slug }
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — PAYTII Insights`,
    openGraph: {
      title: post.title,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await fetchSanity(`*[_type == "post"]{ "slug": slug.current }`)
  return (slugs || []).map((s) => ({ slug: s.slug }))
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px' }}>
        <h1>Post not found</h1>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px' }}>
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(1200).height(630).url()}
          alt={post.mainImage.alt || post.title}
          style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '40px', display: 'block' }}
        />
      )}

      <div style={{ marginBottom: '16px', color: 'var(--muted)', fontSize: '0.875rem' }}>
        {post.author && <span>{post.author} · </span>}
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        )}
      </div>

      <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '32px' }}>
        {post.title}
      </h1>

      <div style={{ lineHeight: 1.8, fontSize: '1.0625rem', color: 'var(--text)' }}>
        {post.body && <PortableText value={post.body} />}
      </div>

      <div style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid var(--line)' }}>
        <a href="/insights" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to Insights
        </a>
      </div>
    </main>
  )
}
