/**
 * Генерация slug из заголовка (транслитерация кириллицы).
 * Используется когда Strapi возвращает невалидный slug (например "performance").
 */

const RU_TO_LAT: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "j",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

/** Транслитерирует кириллицу в латиницу */
function transliterate(char: string): string {
  const lower = char.toLowerCase();
  if (RU_TO_LAT[lower]) return RU_TO_LAT[lower];
  if (/[a-z0-9]/.test(char)) return lower;
  if (char === " " || char === "-" || char === "_") return "-";
  return "";
}

/**
 * Преобразует заголовок в URL-slug.
 * "Вишнёвый сад" → "vishnevyj-sad"
 */
export function slugify(title: string): string {
  if (!title || typeof title !== "string") return "";
  let result = "";
  for (const char of title) {
    result += transliterate(char);
  }
  const slug = result
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return slug || "spectacle";
}

/** Невалидные slug из Strapi для спектаклей */
const INVALID_PERFORMANCE_SLUGS = new Set([
  "performance",
  "repertuar",
  "afisha",
  "spectacle",
  "spectacles",
  "",
]);

/** Невалидные slug из Strapi для актёров */
const INVALID_ACTOR_SLUGS = new Set([
  "actor",
  "actors",
  "team",
  "truppa",
  "",
]);

/** Невалидные slug из Strapi для новостей/событий */
const INVALID_NEWS_SLUGS = new Set([
  "news-item",
  "news-items",
  "sobytiya",
  "event",
  "events",
  "novost",
  "",
]);

/**
 * Возвращает slug для спектакля: если из Strapi невалидный — генерируем из title.
 */
export function getPerformanceSlug(play: {
  title: string;
  slug?: string | null;
}): string {
  const s = typeof play.slug === "string" ? play.slug.trim() : "";
  if (s && !INVALID_PERFORMANCE_SLUGS.has(s.toLowerCase())) return s;
  return slugify(play.title || "");
}

/**
 * Возвращает slug для актёра: если из Strapi невалидный — генерируем из name.
 */
export function getActorSlug(actor: {
  name: string;
  slug?: string | null;
}): string {
  const s = typeof actor.slug === "string" ? actor.slug.trim() : "";
  if (s && !INVALID_ACTOR_SLUGS.has(s.toLowerCase())) return s;
  return slugify(actor.name || "");
}

/**
 * Возвращает slug для новости/события: если из Strapi невалидный — генерируем из title.
 */
export function getNewsSlug(item: {
  title: string;
  slug?: string | null;
}): string {
  const s = typeof item.slug === "string" ? item.slug.trim() : "";
  if (s && !INVALID_NEWS_SLUGS.has(s.toLowerCase())) return s;
  return slugify(item.title || "");
}
