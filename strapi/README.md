# Strapi CMS для театра «Круг»

Headless CMS для управления контентом сайта театра.

## Требования

- Node.js 20+ (Strapi 5 не поддерживает Node 19 и ниже)
- Yarn

## Запуск

Strapi требует **Node.js 20**. Если используете nvm:

```bash
cd strapi && nvm use && yarn develop
```

Или из корня проекта:

```bash
yarn strapi
```

Если появится ошибка `better-sqlite3 was compiled against a different Node.js version` — переустановите зависимости под текущую Node:

```bash
cd strapi && rm -rf node_modules && yarn install
```

Админ-панель: http://localhost:1337/admin

При первом запуске создайте учётную запись администратора.

## Content Types

| Тип | API | Описание |
|-----|-----|----------|
| Спектакль | `/api/performances` | Спектакли с афишей, составом, расписанием |
| Актёр | `/api/actors` | Актеры и сотрудники театра |
| Новость / Событие | `/api/news-items` | Анонсы, рецензии, события |
| Слайд героя | `/api/hero-slides` | Слайды главного баннера |
| Контакты | `/api/contact` | Единая запись контактной информации |
| Отзыв о театре | `/api/theater-reviews` | Отзывы зрителей |

## Настройка прав доступа

1. Зайдите в **Settings → Users & Permissions → Roles**
2. Выберите **Public**
3. Для каждого content type включите **find** и **findOne**
4. Сохраните

## Загрузка медиа

Медиафайлы хранятся в `strapi/public/uploads`. При использовании изображений из Strapi в Next.js они отдаются по URL `http://localhost:1337/uploads/...`. В `next.config.js` добавлен домен `localhost` для `next/image`.

## Подключение к Next.js

Next.js автоматически подключается к Strapi, когда он доступен на `http://localhost:1337`. Если Strapi не запущен или недоступен, сайт использует локальные mock-данные из `src/lib/mock-data.ts`.

Переменные окружения (опционально):

- `STRAPI_URL` / `NEXT_PUBLIC_STRAPI_URL` — URL Strapi (по умолчанию `http://localhost:1337`)
- `STRAPI_API_TOKEN` — токен для защищённых API
