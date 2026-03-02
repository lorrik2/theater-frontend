import { NextRequest, NextResponse } from "next/server";

/** Хост из NEXT_PUBLIC_SITE_URL (канонический). Напр. https://teatr-krug-spb.ru → teatr-krug-spb.ru */
function getCanonicalHost(): string | null {
  const u = process.env.NEXT_PUBLIC_SITE_URL || "";
  const m = u.match(/^https?:\/\/([^/]+)/);
  return m ? m[1].toLowerCase() : null;
}

/**
 * Унификация URL — один канонический формат для SEO.
 * Редиректы 301 в production:
 * - http → https
 * - www / несовпадение с SITE_URL → canonical host из NEXT_PUBLIC_SITE_URL
 * localhost не затрагивается.
 */
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const host = req.headers.get("host") || req.nextUrl.host;
  const isLocalhost =
    host?.includes("localhost") || host?.startsWith("127.0.0.1");

  if (isLocalhost) {
    return NextResponse.next();
  }

  const proto = req.headers.get("x-forwarded-proto");
  const path = req.nextUrl.pathname + req.nextUrl.search;
  const canonicalHost = getCanonicalHost() ?? host?.replace(/^www\./i, "") ?? host;

  // Хост без www для сравнения
  const reqHostNorm = host?.toLowerCase().replace(/^www\./, "") ?? "";
  const canonNorm = canonicalHost.toLowerCase().replace(/^www\./, "");
  const hostMismatch = reqHostNorm !== canonNorm;

  if (proto !== "https" || hostMismatch) {
    const targetUrl = `https://${canonicalHost}${path}`;
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Пропускаем статику и _next — редирект только для страниц.
     * next.config images, api и т.д. тоже получат редирект при HTTP.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
