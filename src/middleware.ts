import { NextResponse, type NextRequest } from 'next/server'

// Enforce canonical host (apex) and HTTPS
export function middleware(request: NextRequest) {
  const url = new URL(request.url)

  const isAsset = url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.startsWith('/robots.txt') ||
    url.pathname.startsWith('/sitemap') ||
    url.pathname.startsWith('/site.webmanifest') ||
    url.pathname.startsWith('/images') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/studio')

  if (isAsset) return NextResponse.next()

  const host = request.headers.get('host') || ''

  // Determine canonical hostname (apex)
  const apexHost = 'interstaterankers.com'

  // If on Vercel preview environments, skip host redirect to avoid 404s
  const isVercelPreview = process.env.VERCEL === '1' && (process.env.VERCEL_ENV === 'preview')

  let shouldRedirect = false

  // Redirect www to apex (unless preview)
  if (!isVercelPreview && (host === `www.${apexHost}`)) {
    url.host = apexHost
    shouldRedirect = true
  }

  // Force https in production (when behind proxies scheme may be http)
  const isHttps = request.headers.get('x-forwarded-proto') === 'https' || url.protocol === 'https:'
  const shouldForceHttps = process.env.NODE_ENV === 'production' && !isHttps
  if (shouldForceHttps) {
    url.protocol = 'https:'
    shouldRedirect = true
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  // Run on all paths except internal assets; explicit negative lookalikes handled in code too
  matcher: ['/((?!_next|static|assets|favicon|robots\\.txt|sitemap|site\\.webmanifest|images|api|studio).*)']
}


