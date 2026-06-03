import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request) {
  // Do not log the secret value itself — only whether it's defined
  console.log('SANITY_REVALIDATE_SECRET defined?', !!process.env.SANITY_REVALIDATE_SECRET)
  try {
    const body = await request.json()
    const secret = body?.secret
    if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const paths = body.paths || ['/sitemap.xml']
    await Promise.all(paths.map((p) => revalidatePath(p)))

    return NextResponse.json({ revalidated: true })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 })
  }
}
