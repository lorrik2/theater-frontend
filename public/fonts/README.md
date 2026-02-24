# Шрифты

## Схема типографики

- **Posterama** — основные заголовки (h1–h6, секции, карточки)
- **Montserrat** — всё остальное (Google Fonts, подключается в layout.tsx)

## Posterama (локальный)

1. Скачайте или купите лицензию на Posterama (Monotype).
2. Конвертируйте в `.woff2` (например, через [transfonter.org](https://transfonter.org)).
3. Поместите файл `Posterama_1927.woff2` в эту папку.
4. Готово — @font-face уже настроен в `globals.css`.

Если Posterama отсутствует, используется fallback: Georgia, serif.
