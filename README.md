# ◮ NEBULA — Analytics Terminal

**Футуристическая платформа аналитики для маркетплейсов Ozon и Wildberries**

Тёмный неоновый дизайн в стиле трейдинг-терминала: стеклянные панели, градиентные CTA, живые метрики и моноширинные цифры. Внутри — рабочие инструменты для продавцов маркетплейсов: юнит-экономика, анализ продаж и кластерный анализ.

![stack](https://img.shields.io/badge/Next.js-16-black) ![react](https://img.shields.io/badge/React-19-61dafb) ![ts](https://img.shields.io/badge/TypeScript-5-3178c6) ![tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

---

## 🚀 Быстрый старт

### Требования

- **Node.js** 20.9.0+ (проверить: `node -v`)
- **npm** (ставится вместе с Node.js)

### Установка и запуск

```bash
# 1. Клонируйте репозиторий
git clone <ссылка на репозиторий>
cd asu_nir_3

# 2. Установите зависимости
npm install

# 3. Запустите сервер разработки
npm run dev
```

Откройте **http://localhost:3000** — при попадании на главную без сессии вы будете перенаправлены на экран входа. Зарегистрируйтесь и войдите в терминал.

## 📦 Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Dev-сервер с горячей перезагрузкой (Turbopack) |
| `npm run build` | Продакшен-сборка |
| `npm run start` | Запуск собранного проекта (после `build`) |
| `npm run lint` | Проверка кода ESLint |

## 🛠 Стек технологий

- **Next.js 16** — App Router, серверные компоненты, middleware (`proxy.ts`) для защиты маршрутов
- **React 19** — интерфейс
- **TypeScript 5** — типизация
- **Tailwind CSS 4** — стилизация через `@theme`-токены дизайн-системы
- **better-sqlite3** — локальная база пользователей (`users.db`)
- **bcryptjs + jsonwebtoken** — хеширование паролей и JWT-сессии (httpOnly-куки, 7 дней)
- **XLSX 0.18.5** — импорт/экспорт Excel-файлов
- **ESLint 9** — линтинг

## 🎨 Дизайн-система

Весь UI построен на токенах из `app/globals.css`:

- **Шрифты** (`next/font/google`): **Unbounded** — заголовки, **Manrope** — интерфейс, **JetBrains Mono** — цифры и метрики
- **Палитра**: почти-чёрный фон `#05070d` с радиальным неоновым свечением и сеткой-терминалом; акценты — бирюза `#00e5ff`, фиолет `#7c5cff`, маджента `#ff3d81`
- **Компоненты**: `.glass-panel` / `.glass-card` (стекло), `.btn-primary` (градиентная CTA), `.btn-secondary`, `.btn-danger`, `.badge-*` (статусы), `.input-neo`, `.metric-tile`, `.table-neo`, `.gradient-text`, `.laser-line`, `.rise-in`
- Переопределены легаси-классы светлой вёрстки (`bg-white`, `text-gray-*` и т.д.), поэтому старые страницы автоматически выглядят тёмными

## 🗂 Структура проекта

```
asu_nir_3/
├── app/
│   ├── layout.tsx              # Корневой layout: шрифты, тёмная оболочка
│   ├── globals.css             # Дизайн-система NEBULA (токены + утилиты)
│   ├── page.tsx                # Главный хаб выбора маркетплейса
│   ├── login/                  # Авторизация
│   ├── register/               # Регистрация
│   ├── ozon/                   # Дашборд Ozon
│   │   ├── unit-economics/     # Калькулятор юнит-экономики
│   │   ├── sales/              # Анализ продаж (CSV / API отчёты)
│   │   │   └── compare/        # Сравнение FBO vs FBS
│   │   └── cluster-analysis/   # Кластерный анализ (XLSX)
│   ├── wildberries/            # Дашборд Wildberries (+ unit-economics, sales, clusters)
│   └── api/
│       ├── auth/               # login / register / logout (JWT)
│       └── ozon/report/        # Прокси к Ozon Seller API
├── components/                 # TopNav, LogoutButton и др.
├── lib/                        # db.ts (SQLite), auth.ts (JWT-сессия)
├── proxy.ts                    # Middleware: редирект неавторизованных
└── scripts/dev-inproc.cjs      # Запуск dev-сервера внутри процесса
```

## 🔑 API-ключи маркетплейсов

- **Ozon**: в дашборде Ozon нажмите «⚙ Настроить API ключи» и укажите `Client ID` и `API Key`. Ключи хранятся только в `localStorage` вашего браузера.
- **Wildberries / кластерный анализ**: работают на импорте файлов (CSV/XLSX), ключи не нужны.

## ⚙️ Переменные окружения

Создайте `.env.local` в корне проекта при необходимости:

```env
JWT_SECRET=ваш-секрет-для-подписи-токенов
```

Без этого файла используется ключ по умолчанию — **для продакшена обязательно задайте свой**.

## ⚠️ Важные замечания

**Перемещение проекта:** если копируете проект в другую папку — удалите `node_modules` и `package-lock.json`, затем выполните `npm install` заново (из-за абсолютных путей в зависимостях).

**База данных:** файл `users.db` создаётся автоматически при первом запуске рядом с `package.json`.

## 🤝 Как внести вклад

1. Сделайте fork репозитория
2. Создайте ветку: `git checkout -b feature/amazing-feature`
3. Зафиксируйте изменения: `git commit -m 'Add some amazing feature'`
4. Отправьте: `git push origin feature/amazing-feature`
5. Откройте Pull Request

## 📄 Лицензия

Проект является приватным и предназначен для внутреннего использования.

Автор: [Ваше имя]