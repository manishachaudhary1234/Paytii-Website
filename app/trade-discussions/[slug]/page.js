import { fetchSanity } from '../../lib/fetchSanity'
import { urlFor } from '../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60
export const dynamicParams = true

async function getPost(slug) {
  return fetchSanity(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      mainImage,
      body,
      "author": author->name,
      seo
    }`,
    { slug }
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { robots: { index: false, follow: false } }

  const seo = post.seo || {}
  const title = seo.metaTitle || `${post.title} — PAYTII Insights`
  const description = seo.metaDescription || ''
  const ogImage = seo.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).url()
    : post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    alternates: {
      canonical: seo.canonicalUrl || `https://www.paytii.com/trade-discussions/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await fetchSanity(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`)
  return (slugs || [])
    .filter((s) => typeof s?.slug === 'string' && s.slug.trim().length > 0)
    .map((s) => ({ slug: s.slug }))
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.paytii.com' },
      { '@type': 'ListItem', position: 2, name: 'Trade Discussions', item: 'https://www.paytii.com/trade-discussions' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.paytii.com/trade-discussions/${slug}` },
    ],
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.875rem', color: 'var(--muted)' }}>
          <li>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
          </li>
          <li aria-hidden="true" style={{ userSelect: 'none' }}>›</li>
          <li>
            <Link href="/trade-discussions" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Trade Discussions</Link>
          </li>
          <li aria-hidden="true" style={{ userSelect: 'none' }}>›</li>
          <li aria-current="page" style={{ fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>{post.title}</li>
        </ol>
      </nav>

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
        <a href="/trade-discussions" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to Trade Discussions
        </a>
      </div>
    </main>
  )
}
