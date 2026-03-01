/**
 * Генерация slug из заголовка (транслитерация кириллицы).
 * Используется при create/update спектакля — slug всегда берётся из title.
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
