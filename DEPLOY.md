# Launching doodledriftgames.com 🚀

This folder is a clone of **github.com/doodledriftgames-gif/DDGWebsite**, and the
site is wired for GitHub Pages with the custom domain **doodledriftgames.com**
(that's what the `CNAME` file is — don't delete it). Four steps remain, all
point-and-click.

---

## Step 1 — Push the site to GitHub

The files are already committed locally. In **GitHub Desktop**, select the
DDGWebsite repository — if it shows a "Push origin" button, click it.
(Command-line equivalent: `git push -u origin main` from this folder.)

Afterwards, refresh github.com/doodledriftgames-gif/DDGWebsite — you should
see `index.html`, `css/`, `js/`, `assets/`, and `CNAME` in the file list.

## Step 2 — Turn on GitHub Pages

1. On the repo page: **Settings → Pages** (left sidebar).
2. Under *Build and deployment* → Source: **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. The *Custom domain* box should pick up `doodledriftgames.com` from the CNAME
   file — if it's empty, type `doodledriftgames.com` and Save.

Within a minute or two the site is live at
`https://doodledriftgames-gif.github.io/DDGWebsite/` (it will redirect to the
domain once DNS is connected).

## Step 3 — Point Porkbun at GitHub

1. Log in at [porkbun.com](https://porkbun.com) → **Domain Management** →
   `doodledriftgames.com` → **DNS** (the DNS Records link).
2. ⚠️ **Delete Porkbun's default parking records first** — new domains come
   with an `ALIAS` record on the bare domain and a `CNAME` (often on `*`)
   pointing at `pixie.porkbun.com`. GitHub's records conflict with these, so
   remove both.
3. Add these six records (leave TTL at the default):

   | Type  | Host  | Answer |
   |-------|-------|--------|
   | A     | *(leave blank)* | `185.199.108.153` |
   | A     | *(leave blank)* | `185.199.109.153` |
   | A     | *(leave blank)* | `185.199.110.153` |
   | A     | *(leave blank)* | `185.199.111.153` |
   | CNAME | `www` | `doodledriftgames-gif.github.io` |

   (Blank host = the bare domain. Porkbun fills in `doodledriftgames.com` for you.)

4. DNS usually propagates in minutes, occasionally a few hours.

## Step 4 — HTTPS + final checks

1. Back on the repo's **Settings → Pages**: once the custom-domain DNS check
   shows a green tick, enable **Enforce HTTPS** (the checkbox unlocks when
   GitHub finishes issuing the certificate — up to an hour).
2. Visit **https://doodledriftgames.com** — you're live. 🎉
   `www.doodledriftgames.com` will redirect to the bare domain automatically.

---

## One-time: activate the contact form

The form forwards to **Doodledriftgames@gmail.com** via FormSubmit.co, which
requires a single activation handshake **from the live site**:

1. On https://doodledriftgames.com, send yourself a test message.
2. Check the inbox (and spam) for FormSubmit's email → click **Activate**.
3. Send a second test — it should arrive normally. ✅

Note: activation is tied to the destination address — if you ever change
`CONTACT_EMAIL` in `js/main.js`, the new address needs its own activation.

**Optional hardening:** the activation email includes a random alias (like
`abc123def@formsubmit.co`). Swap it into `CONTACT_EMAIL` at the top of
`js/main.js`, commit, push — then your real address never appears in the page
source where scrapers can read it.

---

## Updating the site later

Edit the files → in GitHub Desktop write a short summary → **Commit to main**
→ **Push origin**. GitHub Pages redeploys automatically within a minute or so.
