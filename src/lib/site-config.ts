/**
 * Базовый URL сайта для SEO (metadataBase, sitemap, canonical).
 * В production задайте NEXT_PUBLIC_SITE_URL в .env (например https://teatrkrug.ru)
 * Всегда https и без завершающей косой черты.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://teatr-krug-spb.ru";

export const SITE_URL = (() => {
  let u = rawUrl.replace(/\/+$/, "");
  // Для production-доменов — принудительно https (localhost оставляем как есть)
  if (
    u.startsWith("http://") &&
    !u.includes("localhost") &&
    !u.includes("127.0.0.1")
  ) {
    u = u.replace(/^http:\/\//, "https://");
  }
  return u;
})();

/**
 * Единая точка формирования canonical URL. Используется во всех страницах
 * для консистентности и исключения дубликатов.
 * Формат: без завершающей косой черты (кроме корня, где слеш не нужен).
 * @param path — путь страницы (например "/afisha", "/" или "/team/slug")
 */
export function canonicalUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  const p = path.startsWith("/") ? path : `/${path}`;
  const normalized = p.replace(/\/+$/, ""); // убираем trailing slash
  return `${SITE_URL}${normalized}`;
}
