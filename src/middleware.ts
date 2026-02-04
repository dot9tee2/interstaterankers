import { NextResponse, type NextRequest } from 'next/server'

// Enforce HTTPS always; optionally enforce a single host if enabled via env
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
  const siteUrlFromEnv = process.env.SITE_URL || 'https://interstaterankers.com'
  const primaryHost = (() => {
    try { return new URL(siteUrlFromEnv).host } catch { return 'interstaterankers.com' }
  })()
  const enableHostRedirect = String(process.env.ENABLE_HOST_REDIRECT || '').toLowerCase() === 'true'
  const isVercelPreview = process.env.VERCEL === '1' && (process.env.VERCEL_ENV === 'preview')

  let shouldRedirect = false

  // If enabled, redirect any non-primary host to the configured primary host
  if (!isVercelPreview && enableHostRedirect && host && primaryHost && host !== primaryHost) {
    url.host = primaryHost
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


