# CodeWaveTech website

Production site for **codewavetech.in**: Next.js 15 (App Router), TypeScript (strict), Tailwind CSS 3.4, React Hook Form + Zod, ntfy push notifications for new leads.

The design and copy are a 1:1 port of `reference/codewavetech-reference.html` (the single-file hash-routed preview), turned into real multipage routes with a working contact backend, SEO and accessibility.

## Quick start

```bash
pnpm i
cp .env.example .env.local   # fill in the values below
pnpm dev                     # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm format`.

## Environment variables

| Variable               | Required    | Purpose                                                                          |
| ---------------------- | ----------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for metadata, sitemap, JSON-LD (default `https://codewavetech.in`) |
| `NTFY_TOPIC`           | **yes**     | ntfy topic the team subscribes to. Use a long random name.                       |
| `NTFY_SERVER_URL`      | optional    | ntfy server (default `https://ntfy.sh`)                                          |
| `NTFY_TOKEN`           | optional    | Access token for a protected topic or self-hosted server (sent as Bearer)        |
| `NTFY_EMAIL`           | optional    | Also forward each brief to this address via ntfy                                 |
| `RECAPTCHA_SITE_KEY`   | optional    | reCAPTCHA v3 site key; the script loads on `/contact` only when set              |
| `RECAPTCHA_SECRET`     | optional    | When set, the API verifies the token (score ≥ 0.5, action `contact`)             |
| `ZOHO_WEBHOOK_URL`     | optional    | Receives each brief as JSON                                                      |
| `WHATSAPP_WEBHOOK_URL` | optional    | Receives each brief as JSON (e.g. a WhatsApp alert flow)                         |

The ntfy variables are validated with Zod when the server starts (`instrumentation.ts` → `lib/env.ts`). In development a missing or invalid `NTFY_TOPIC` stops `pnpm dev` with a clear message; in production the problem is logged and the contact API answers 502 (with the brief written to the server log) until it's fixed.

## Lead notifications (ntfy)

Every project brief is sent as a push notification to the team's phones through [ntfy](https://ntfy.sh). There is no email to the visitor; the success screen tells them which channel the team will use to reach them.

1. **Install the ntfy app** on [Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy) or [iOS](https://apps.apple.com/app/ntfy/id1625396347) for everyone who should get leads.
2. **Subscribe to the topic** in the app (+ → topic name). Use the same server as `NTFY_SERVER_URL`; if the topic is protected or self-hosted, add the server and log in with the same user/token as `NTFY_TOKEN`.
3. **Set the env vars on Vercel** (Project → Settings → Environment Variables): `NTFY_TOPIC`, and `NTFY_SERVER_URL` / `NTFY_TOKEN` / `NTFY_EMAIL` if used. Redeploy.
4. **Send a test:**
   ```bash
   curl -d "test" https://ntfy.sh/your-topic-name     # i.e. {NTFY_SERVER_URL}/{NTFY_TOPIC}
   ```
   (Add `-H "Authorization: Bearer $NTFY_TOKEN"` for a protected topic.)

What a lead looks like: title `New brief CWT-YYMMDD-1234 · {name}`, a markdown body with every answer (description truncated with "… (truncated)" to stay under 3,500 bytes), tapping opens an email to the visitor, and buttons for **WhatsApp**, **Call** and **Email**. Briefs that include "Government portal" are sent at max priority with an extra 🏛️ tag. Topics on the public ntfy.sh server are readable by anyone who knows the name, so keep it long and random (or use a token-protected topic).

Code: `lib/ntfy.ts` (publishing, 5s timeout, typed `NtfyError`), `lib/ntfy-message.ts` (payload and markdown builder), tests in `tests/`.

## Contact API (`POST /api/contact`)

1. Rate limit: 5 requests per IP per 10 minutes (in-memory, per instance; see "Scaling" below).
2. Honeypot: a non-empty `website` field → 400.
3. Re-validates with the same Zod schema as the form (`lib/validation.ts`) → 422 on failure.
4. reCAPTCHA v3 check when `RECAPTCHA_SECRET` is set.
5. Generates a reference `CWT-YYMMDD-1234` (date in IST).
6. Sends an ntfy push notification with the full brief. If ntfy fails, the brief and reference are logged with `console.error` (so the lead isn't lost) and the API returns 502; the form keeps the visitor's answers and shows the email fallback.
7. POSTs JSON to the Zoho / WhatsApp webhooks when configured. These are non-fatal and time out after 5s.

**Scaling:** the rate limiter is in-memory. On Vercel, each serverless instance keeps its own counter. For a strict global limit, swap `lib/rate-limit.ts` for Upstash Redis (`@upstash/ratelimit`).

## Editing content

All copy is typed data in `content/`. Edit the file and redeploy.

| File                      | What it holds                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `content/site.ts`         | Email, phone, hours, tagline, badges, "Now booking" pill, tech marquee, team areas   |
| `content/services.ts`     | The 14 service areas (12 detail pages + Government + Industries cards), slugs, icons |
| `content/industries.ts`   | 9 industries, examples and linked services                                           |
| `content/government.ts`   | Government groups, compliance chips, stats                                           |
| `content/process.ts`      | 4 process steps and 3 engagement models                                              |
| `content/faq.ts`          | General, process and contact FAQs (also emitted as FAQPage JSON-LD)                  |
| `content/testimonials.ts` | Testimonials                                                                         |
| `content/contact.ts`      | Form options (budgets, timelines, channels, call times), "what happens next"         |

Adding a service: append to `detailServices` with a unique `key` and `slug`. The page, sitemap, mega menu, footer and form chip update automatically. Icons are 24×24 stroke SVG path markup.

## Logo and icons

The source logo files live in `pics/`. `python scripts/brand_assets.py` (needs Pillow) regenerates everything from them:

| Output                                                           | Used for                                                               |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `app/favicon.ico`, `app/icon.png`                                | Browser tab icon                                                       |
| `app/apple-icon.png`                                             | iOS home-screen icon                                                   |
| `public/brand/logo-nav.webp` / `logo-nav-light.webp`             | Nav logo (switches with the theme) / footer logo                       |
| `public/brand/logo-horizontal.png` / `logo-horizontal-light.png` | Full-size versions of the same logo                                    |
| `public/brand/og-image.png`                                      | Open Graph + Twitter share image on every page                         |
| `public/brand/logo-square.png`                                   | Organization JSON-LD logo, web manifest                                |
| `public/brand/cw-mark.png`, `logo-full.png`                      | Square mark and full lockup (incl. "Digital Solutions") for other uses |

## Placeholders to replace before launch

- [ ] **Office address**: `content/site.ts` → `address` (also feeds Organization JSON-LD)
- [ ] **Social profiles**: `content/site.ts` → `sameAs`
- [ ] **Testimonials**: `content/testimonials.ts`. All 4 are samples. Replace each quote and set `sample: false` to remove the dashed "Sample" tag.
- [ ] **"Now booking" pill**: `content/site.ts` → `bookingBadge` (currently "New projects for Q1 2027")
- [ ] **Privacy policy / Terms**: `app/privacy/page.tsx`, `app/terms/page.tsx` contain placeholder summaries; replace with reviewed legal text
- [ ] **Open Graph image**: none yet. Add `app/opengraph-image.png` (1200×630) and Next.js will wire it up.

## Deploying to Vercel

1. Push the repo to GitHub/GitLab and import it in Vercel (framework preset: Next.js; install command `pnpm i`).
2. Add the environment variables above for Production (use a separate ntfy topic for Preview so test briefs don't ping the team).
3. Add `codewavetech.in` and `www.codewavetech.in` under Domains, pick one as primary (Vercel redirects the other), and update DNS as instructed.
4. Deploy and send a test brief (see "Lead notifications"). Afterwards, submit `https://codewavetech.in/sitemap.xml` in Google Search Console.

## Architecture notes

- **Styling:** design tokens are CSS variables in `app/globals.css` (light on `:root`, dark under `[data-theme="dark"]` and the `prefers-color-scheme` block), mapped into Tailwind in `tailwind.config.ts`. Component classes are ported 1:1 from the reference so the rendering matches it pixel for pixel. Tailwind's preflight is disabled because the reference relies on browser defaults.
- **Theme:** light by default. The toggle in the top-right of the nav switches to dark and remembers the choice (`localStorage`, key `cwt-theme`). A tiny inline script applies it before first paint.
- **Palette:** navy (`#0A1B3C`) and gold (`#E4A82A`) sampled from the logo, replacing the teal in the reference. Navy carries text and links because gold fails contrast on light backgrounds; gold is used on dark bands, the CTA band button and the active-nav underline. Supporting tokens: `--gold`, `--gold-2`, `--on-gold`, `--accent-warm` (deeper gold for large text), `--deep-glow`, `--glow-text`, `--on-accent`, `--whatsapp`, `--shadow-rgb` and the `--consult-*` band colours.
- **Motion:** page fade, chart bars, marquee and typing dots are pure CSS. The CTA waves are a canvas that pauses offscreen and when the tab is hidden. `prefers-reduced-motion` disables all of it.
- **SEO:** per-page `metadata` (title, description, canonical, Open Graph, Twitter), `sitemap.ts`, `robots.ts`. JSON-LD: Organization (every page), BreadcrumbList (inner pages), Service (service pages), FAQPage (Home, How we work, Contact).
- **Static output:** every page is statically generated; service pages via `generateStaticParams`. Only `/api/contact` is dynamic.

## Deliberate differences from the reference

| Area                                  | Reference                                    | This build                                                     | Why                                                     |
| ------------------------------------- | -------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- |
| Preview toggle / Build plan           | present                                      | removed                                                        | per brief                                               |
| Theme                                 | follows system                               | light default + toggle (top right)                             | owner request                                           |
| Footer bottom padding                 | 110px (room for preview toggle)              | 48px                                                           | toggle removed                                          |
| Section header < 680px                | squeezed into 2 narrow columns               | stacks                                                         | readability (2 columns kept on tablet, as in reference) |
| About "promises" grid                 | forced 4 columns at every width              | 4 → 2 (≤1100px) → 1 (≤680px)                                   | brief §9 responsive rules                               |
| Dark mode: text on accent             | white (≈1.9:1)                               | dark ink                                                       | WCAG AA                                                 |
| Dark mode: glow-coloured text on dark | ≈2.4:1                                       | `--glow-text` (brand gold)                                     | WCAG AA                                                 |
| "The usual problem" labels            | 4.27:1                                       | 10% ink mixed in (≈4.9:1)                                      | WCAG AA, visually identical                             |
| Consent line on the form              | "will not share my details with anyone else" | "will only use my details to respond and will never sell them" | accurate now that leads pass through service providers  |
| Colour palette                        | teal                                         | navy and gold from the logo                                    | owner request                                           |
| About team section                    | names and photos                             | generic team areas, no individuals                             | owner request                                           |
| Office hours                          | no copy button                               | copy button                                                    | brief §6                                                |
| Industry tiles / footer industries    | link to `/industries`                        | link to `/industries#<id>`                                     | deep links to the card                                  |

## QA checklist (verified)

Compared against `reference/codewavetech-reference.html` with headless Chrome full-page screenshots and pixel diffs, light and dark, at each width. Heights match the reference exactly (−62px footer padding) at 768, 1024 and 1440px on every page; differences at 375px are the stacked section headers listed above. Layout was compared before the navy and gold palette replaced the teal, so colours intentionally differ from the reference now.

| Page                                                                            | 1440 | 1024 | 768 | 375 | Light | Dark |
| ------------------------------------------------------------------------------- | ---- | ---- | --- | --- | ----- | ---- |
| Home `/`                                                                        | ✅   | ✅   | ✅  | ✅  | ✅    | ✅   |
| Services `/services`                                                            | ✅   | ✅   | ✅  | ✅  | ✅    | ✅   |
| Service detail (`/services/web-development`, `/services/emerging-technologies`) | ✅   | ✅   | ✅  | ✅  | ✅    | ✅   |
| Industries `/industries`                                                        | ✅   | ✅   | ✅  | ✅  | ✅    | ✅   |
| Government `/government-solutions`                                              | ✅   | ✅   | ✅  | ✅  | ✅    | ✅   |
| How we work `/how-we-work`                                                      | ✅   | ✅   | ✅  | ✅  | ✅    | ✅   |
| About `/about`                                                                  | ✅   | ✅*  | ✅* | ✅* | ✅    | ✅   |
| Contact `/contact`                                                              | ✅   | ✅   | ✅  | ✅  | ✅    | ✅   |

\* responsive promises grid (see differences table).

Also verified:

- No horizontal scroll at 360, 375, 768, 1024 and 1440px on any page, either theme.
- axe-core (WCAG 2 A/AA + best practice): 0 violations on all pages, both themes, desktop and mobile.
- Lighthouse mobile: Accessibility 100, Best Practices 100, SEO 100 on all pages tested; Performance 94–97 (measured locally; Home scored 94–95).
- Keyboard: skip link, mega menu (Enter/Esc, focus return, closes on focus-out/outside click/navigation), mobile menu, stepper tabs (arrow keys, Home/End), testimonial track (arrow keys), FAQ `<details>`.
- Contact form: per-step validation with inline errors and focus on the first invalid field, `?service=` preselect, 400ms draft autosave/restore, phone auto-format, success summary with reference, server error keeps the data. API: honeypot 400, validation 422, rate limit 429.
