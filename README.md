# Doodle Drift Games — Studio Website

Single-page static site for **Doodle Drift Games LLC**. No build step, no framework,
no backend — three files of plain HTML/CSS/JS that any static host can serve.

```
DDGWebsite/
├── index.html        # all page content lives here
├── css/style.css     # theme (colors/fonts in :root vars at the top)
├── js/main.js        # nav, scroll reveals, contact form sender
├── assets/           # favicon.svg + logo.jpg
├── CNAME             # custom-domain marker for GitHub Pages — don't delete
├── README.md         # this file
└── DEPLOY.md         # GitHub Pages + Porkbun launch guide
```

## Previewing locally

Just double-click `index.html` — everything works from disk, including the
contact form. (If you prefer a local server: `python -m http.server` or
`npx serve` from this folder.)

## Editing content

Search the files for **`EDIT ME`** — every placeholder is marked:

| What | Where |
|---|---|
| Studio tagline | `index.html` hero section |
| Game #2 (title, blurb, art, tags) | `index.html` — second `.game-card` |
| Studio intro paragraph | `index.html` about section |
| Dev names, roles, bios | `index.html` — the two `.dev-card` blocks |
| Contact email destination | `js/main.js` — `CONTACT_EMAIL` at the top |
| Social-share tags (after domain hookup) | `index.html` `<head>` og: tags |

Game #1 (*Project Time Deck*) has a hand-drawn SVG placeholder where screenshots
go later — when you have real captures, replace the `<svg>` inside its
`.game-art` div with an `<img>` tag.

## Theming

All colors and fonts are CSS variables at the top of `css/style.css`
(`--coral`, `--teal`, `--gold`, `--bg`, …). Change them there and the whole
site follows. Fonts are Google Fonts: Fredoka (headings), Nunito (body),
Caveat (handwritten notes).

## Contact form

The form posts to [FormSubmit.co](https://formsubmit.co) — a free service that
forwards static-site form submissions to email. No account or backend needed,
but it requires a **one-time activation click** the first time it's used.
Full steps in [DEPLOY.md](DEPLOY.md).
