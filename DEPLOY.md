# Getting doodledriftgames live 🚀

Three steps: put the folder on a free host, point your domain at it, activate
the contact form. About 15 minutes total, no command line needed.

Wherever you see **`YOUR-DOMAIN.com`** below, substitute your actual domain.

---

## Step 1 — Host the site (pick one)

### Option A: Netlify (recommended — easiest)

1. Go to [app.netlify.com](https://app.netlify.com) and sign up (free tier is plenty).
2. On the **Sites** page, find the deploy drop-zone ("drag and drop your site folder here")
   and **drag this whole `doodle-drift-website` folder onto it**.
3. Done — the site is live in seconds at a random `something-1234.netlify.app` URL.
   Open it and check it looks right.

To update the site later, drag the folder onto the same drop-zone again
(Site → **Deploys** tab).

### Option B: GitHub Pages (free, no drag-and-drop)

1. Create a GitHub account, then a new **public** repository (e.g. `doodle-drift-website`).
2. Use **"uploading an existing file"** on the empty-repo page and upload everything
   in this folder (keep the `css/`, `js/`, `assets/` structure).
3. Repo **Settings → Pages** → Source: *Deploy from a branch* → `main` → Save.
4. Site goes live at `https://<your-username>.github.io/doodle-drift-website/`.

### Option C: Cloudflare Pages

Dashboard → Workers & Pages → Create → Pages → **Upload assets** → drag the folder in.

---

## Step 2 — Connect your domain

### If you chose Netlify

1. Site → **Domain management** → **Add a domain** → enter `YOUR-DOMAIN.com`.
2. Netlify offers two routes — **easiest is "Use Netlify DNS"**: it shows you
   4 nameservers; paste those into your domain registrar's nameserver settings
   (registrar dashboard → your domain → Nameservers → "use custom nameservers").
3. Alternatively, keep your registrar's DNS and add these records there:

   | Type  | Name | Value |
   |-------|------|-------|
   | A     | `@`  | `75.2.60.5` |
   | CNAME | `www`| `<your-site>.netlify.app` |

4. Wait for DNS to propagate (minutes to a few hours). Netlify auto-issues a
   free HTTPS certificate once it verifies the domain.

### If you chose GitHub Pages

1. Repo **Settings → Pages → Custom domain** → enter `YOUR-DOMAIN.com` → Save
   (this creates a `CNAME` file in the repo — keep it).
2. At your registrar, add:

   | Type  | Name | Value |
   |-------|------|-------|
   | A     | `@`  | `185.199.108.153` |
   | A     | `@`  | `185.199.109.153` |
   | A     | `@`  | `185.199.110.153` |
   | A     | `@`  | `185.199.111.153` |
   | CNAME | `www`| `<your-username>.github.io` |

3. Back on the Pages settings page, tick **Enforce HTTPS** once it stops
   showing a DNS warning (can take up to an hour).

---

## Step 3 — Activate the contact form (one time)

The form forwards to **bennettrhett@gmail.com** via FormSubmit.co. The first
submission triggers an activation handshake:

1. On the **live** site, fill out the form and send a test message.
2. Check the bennettrhett@gmail.com inbox (and spam folder) for an email from
   FormSubmit — click **Activate**.
3. Send one more test message; it should now arrive normally. ✅

**Optional hardening:** FormSubmit's activation email includes a random alias
(like `abc123def456@formsubmit.co`) you can use instead of the raw address.
Swap it into `CONTACT_EMAIL` at the top of `js/main.js` and redeploy — then
your real email never appears in the page source where scrapers can read it.

---

## After the domain is connected

- In `index.html` `<head>`, uncomment the `og:url` tag and put your real
  domain in it (helps links unfurl nicely on Discord/social media).
- Tell me the domain and I can do that for you, plus set up an `og:image`
  share card.
