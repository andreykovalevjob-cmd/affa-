# another fashion — site

D2C-агентство для fashion- и beauty-брендов. Многостраничный сайт со сквозной шапкой и футером.

**Стек:** статика + React + Babel-standalone из CDN. Нет билда, нет node_modules. Любой статический хостинг (Vercel / Netlify / GitHub Pages / S3).

---

## Структура

```
.
├── index.html              # /          — главная (D2C-лендинг + портфолио)
├── audit.html              # /audit     — бесплатный аудит
├── company.html            # /company   — о нас + основатель + клиенты
├── worldwide.html          # /worldwide — вывод за рубеж
├── marketing.html          # /marketing — маркетинг (воронка, бюджет, отчёт, прогноз)
├── web.html                # /web       — запуск магазина (мокапы LAVARICE)
├── hrr.html                # /hrr       — построение команды (орг-структуры)
├── content-creation.html   # /content-creation — создание контента
├── school.html             # /school    — статьи и кейсы (с табами)
├── vercel.json             # cleanUrls: true
│
├── components/             # сквозные компоненты
│   ├── header.jsx          # шапка на всех страницах
│   └── footer.jsx          # футер на всех страницах
│
├── pages/                  # контент страниц (page + data разделены)
│   ├── home.jsx + home-desktop.jsx + home-mobile.jsx
│   ├── audit.jsx + audit-data.js
│   ├── company.jsx + company-data.js
│   ├── worldwide.jsx + worldwide-data.js
│   ├── marketing.jsx + marketing-data.js
│   ├── web.jsx + web-data.js
│   ├── hrr.jsx + hrr-data.js
│   ├── content.jsx + content-data.js
│   └── school.jsx + school-data.js
│
├── css/
│   └── base.css            # шрифты (Google Fonts) + CSS-переменные
│
└── assets/
    ├── logos/              # 22 webp — клиенты для портфолио
    └── mockups/            # LAVARICE desktop + mobile (png)
```

---

## Что где менять

| Хочу поменять                  | Файл                                  |
|--------------------------------|---------------------------------------|
| Пункты меню в шапке            | `components/header.jsx` (массив `NAV`) |
| Email, копирайт, ссылки футера | `components/footer.jsx`               |
| Контент страницы               | `pages/<page>-data.js`                |
| Активный пункт меню на странице | проп `active="…"` в `pages/*.jsx`     |
| Цвета (paper / ink / muted)    | `css/base.css` (CSS-переменные)       |
| Логотипы клиентов              | `assets/logos/*.webp`                 |
| Мокапы LAVARICE                | `assets/mockups/*.png`                |

Меняем `header.jsx` или `footer.jsx` — обновляется на всех страницах разом.

---

## Локальный просмотр

Открыть `.html` двойным кликом из Finder **не получится** — Babel не загружает модули через `file://`. Нужен любой статический сервер.

```bash
# Python (встроен на Mac/Linux)
python3 -m http.server 8000
# http://localhost:8000/

# или Node
npx serve .

# или Vercel CLI (повторит прод-конфиг включая cleanUrls)
npx vercel dev
```

---

## Деплой на Vercel

**Вариант А — через git (рекомендую):**

1. `git init && git add . && git commit -m "init"`
2. Залить на GitHub:
   ```bash
   git remote add origin git@github.com:USER/REPO.git
   git push -u origin main
   ```
3. На [vercel.com/new](https://vercel.com/new) → *Import Git Repository* → выбрать репо.
4. Framework Preset: **Other**. Build Command — пустой. Output Directory — пустой.
5. Deploy. Автодеплой на каждый push.

**Вариант Б — drag-and-drop:**

1. Заархивировать содержимое папки.
2. На [vercel.com/new](https://vercel.com/new) → *Add New* → *Project*.
3. Перетащить архив в окно.

С `vercel.json` (`cleanUrls: true`) пути будут без `.html`: `/audit`, `/worldwide`, `/marketing`, `/web`, `/hrr`, `/content-creation`, `/school`, `/company`.

---

## Деплой на GitHub Pages

1. Push в репозиторий.
2. Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, Folder: `/` (root).
3. Готово. URL: `https://USER.github.io/REPO/`.
4. GitHub Pages не поддерживает `cleanUrls` — ссылки в шапке менять на `.html`.

---

## Деплой на Netlify

1. На [app.netlify.com/start](https://app.netlify.com/start) → выбрать репо.
2. Build command: пустой. Publish directory: `.`.
3. Для `cleanUrls` создать `_redirects`:
   ```
   /audit          /audit.html          200
   /worldwide      /worldwide.html      200
   /marketing      /marketing.html      200
   /web            /web.html            200
   /hrr            /hrr.html            200
   /content-creation /content-creation.html 200
   /school         /school.html         200
   /company        /company.html        200
   ```

---

## Что лежит в `outputs/` (вне репозитория)

Рядом с папкой site/ собираются standalone-версии страниц с инлайн-React — самодостаточные HTML без зависимостей, удобно слать на согласование в чате:

- `worldwide-standalone.html`
- `marketing-standalone.html`
- `web-standalone.html` (с заинлайнеными мокапами LAVARICE)
- `hrr-standalone.html`
- `content-creation-standalone.html`
- `company-standalone.html`
- `school-standalone.html`

Эти файлы в git не нужны.

---

## Производственный тюнинг (когда устаканится)

Babel-standalone собирает JSX в браузере на лету — удобно для прототипа, но добавляет ~700KB JS и ~50–100 мс CPU. Когда дизайн зафиксируется, проект можно за пол-дня перенести на **Astro** или **Vite** — те же `.jsx`, ноль JS-оверхеда в проде. Структура `components/` + `pages/` останется один-в-один.

---

## Лицензия

Контент и дизайн — © ANOTHER FASHION AGENCY. Код выложен для собственного использования и деплоя.
