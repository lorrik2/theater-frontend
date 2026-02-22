# Сайт-визитка камерного театра

Фронтенд на **Next.js 15** (App Router), **React 19**, **TypeScript**, **Tailwind CSS** и **Framer Motion**. Контент управляется через **Strapi CMS** (headless), с fallback на мок-данные, если Strapi недоступен.

## Запуск

Проект использует **Yarn**. Требуется **Node.js 20+** (рекомендуется 22, см. `.nvmrc`).

```bash
nvm use 22          # или: nvm use (если есть .nvmrc)
yarn install
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000).

### Strapi CMS

Next.js подключается к Strapi на `localhost:1337`. **Strapi нужно запускать отдельно** — иначе будет `ECONNREFUSED`.

**Вариант 1 — всё одной командой:**
```bash
yarn dev:all        # запускает Next.js и Strapi одновременно
```

**Вариант 2 — два терминала:**
```bash
# Терминал 1
yarn strapi

# Терминал 2
yarn dev
```

Админка Strapi: [http://localhost:1337/admin](http://localhost:1337/admin). При первом запуске создайте учётную запись. Подробнее — см. [strapi/README.md](strapi/README.md).

## Сборка и продакшен

```bash
yarn build
yarn start
```

## Структура

- **`src/app/`** — страницы (SSR, SEO): главная, Афиша, О театре, Команда, События, Контакты, а также динамические маршруты для спектакля/артиста/события.
- **`src/components/`** — переиспользуемые блоки: Header, Footer, Hero, Repertoire, Premiere, TicketsBlock, About, Team, News, Contacts, Subscribe. Стили в отдельных `.module.css` (Tailwind + кастомные классы).
- **`src/lib/mock-data.ts`** — моковые данные (fallback, если Strapi недоступен).
- **`src/lib/cms-data.ts`** — слой данных: запросы к Strapi API с fallback на mock.
- **`strapi/`** — Strapi CMS (content types: спектакли, актёры, новости, слайды, контакты, отзывы).

## Дизайн

- Цвета: серый/графитовый фон, контрастные чёрные блоки и кнопки.
- Единая кнопка «Купить билет» (класс `btn-ticket`) повторяется в шапке, Hero, карточках и блоке онлайн-продажи.
- Адаптивная вёрстка: бургер-меню на мобильных, сетки под разные экраны.
- Анимации: Framer Motion (Hero-слайдер, появление блоков при скролле).

## Дальнейшие шаги

1. ~~Подключить Strapi~~ — сделано: контент тянется из Strapi или mock-данных.
2. Наполнить Strapi контентом: импорт из `mock-data`, загрузка изображений в Media Library.
3. Встроить карту (Яндекс.Карты/Google Maps) на странице контактов.
4. Реализовать отправку формы подписки на бэкенд или сервис рассылки.
