#!/bin/bash
# Полный чисти деплой: очистка кэша → пересборка → задеплой
# Запускать из корня проекта
set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "=== 1. Очистка кэша ==="
rm -rf .next strapi/.cache strapi/build
echo "OK: .next, strapi/.cache, strapi/build удалены"

echo ""
echo "=== 2. Установка зависимостей ==="
yarn install
cd strapi && yarn install && cd ..
echo "OK: зависимости установлены"

echo ""
echo "=== 3. Сборка Strapi ==="
cd strapi
NODE_OPTIONS="--max-old-space-size=1536" yarn build
cd ..
echo "OK: Strapi собран"

echo ""
echo "=== 4. Сборка Next.js ==="
yarn build
echo "OK: Next.js собран"

echo ""
echo "=== 5. Локальная сборка завершена ==="
echo "Дальше: git add -A && git status && git commit -m 'Clean rebuild' && git push"
echo "На VPS: cd /var/www/teatr-krug-frontend && ./scripts/deploy-vps.sh"
echo "   или выполнить команды из scripts/deploy-vps.sh вручную"
