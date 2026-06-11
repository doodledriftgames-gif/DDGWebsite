// Doodle Drift Games — site interactions

// ✏️ EDIT ME: where contact-form messages are delivered.
// After FormSubmit's one-time activation email (see DEPLOY.md), you can replace
// this with the random alias FormSubmit gives you to keep the raw address out
// of the page source, e.g. 'a1b2c3d4e5f6@formsubmit.co' style aliases.
const CONTACT_EMAIL = 'bennettrhett@gmail.com';
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + encodeURIComponent(CONTACT_EMAIL);

// ---------------------------------------------------------------- nav ----

const header = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// --------------------------------------------------------------- misc ----

document.getElementById('year').textContent = new Date().getFullYear();

// ----------------------------------------------------- reveal on scroll ----

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// ------------------------------------------------------- contact form ----
// Sends via FormSubmit's AJAX endpoint — no backend needed. The very first
// submission triggers a one-time activation email to CONTACT_EMAIL; messages
// flow normally once that link is clicked (details in DEPLOY.md).

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');

function setStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = 'form-status' + (kind ? ' ' + kind : '');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData(form);

  // Honeypot: humans never see this field; if it's filled, quietly drop it.
  if (data.get('_honey')) {
    form.reset();
    setStatus("Message sent! We'll get back to you soon.", 'ok');
    return;
  }

  const payload = {
    name: String(data.get('name') || '').trim(),
    email: String(data.get('email') || '').trim(),
    message: String(data.get('message') || '').trim(),
    _subject: 'New message via the Doodle Drift Games website',
    _template: 'table',
  };

  submitBtn.disabled = true;
  const originalLabel = submitBtn.textContent;
  submitBtn.textContent = 'Sending…';
  setStatus('', '');

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('FormSubmit responded ' + res.status);
    form.reset();
    setStatus("Message sent! We'll get back to you soon.", 'ok');
  } catch (err) {
    setStatus("Hmm, that didn't go through. Give it another try in a minute.", 'err');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});
