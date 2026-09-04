# Kids Training Réunion — Site vitrine

Site statique HTML/CSS/JS vanilla pour l'association **Kids Training Réunion** (Saint-Denis, La Réunion) — sport ludique 3–17 ans, 5 lieux, inscription toute l'année.

## Stack
- HTML5 / CSS3 (design system Warm Editorial, Fraunces + Outfit)
- JavaScript vanilla (`app.js` — nav, theme, reveal, FAQ, form, Tawk.to)
- `blog.css` / `chat.css` — pages spécifiques
- Pas de build — déploiement direct (Netlify / Vercel / GitHub Pages)

## Pages
- `index.html` — hero, activités, à la une, confiance, lieux, tarifs, FAQ, contact
- `blog.html` — journal (grille 4 colonnes, filtres, modal, seed localStorage)
- `apropos.html` — éditorial (valeurs, timeline, équipe)
- `chat.html` — support / Tawk.to widget public
- `mentions-legales.html`, `politique-confidentialite.html` — RGPD / protection mineurs
- `image/` — logo, favicons, manifest
- `app.js`, `styles.css`, `blog.css`, `chat.css`

## Lancer en local
```bash
# serveur simple
python3 -m http.server 8000
# puis http://localhost:8000/
```

## Déploiement
- Hébergement statique (Netlify/Vercel/GitHub Pages). Renommer domaine dans :
  - `<link rel="canonical">` (tous les HTML)
  - `sitemap.xml` + `robots.txt`
  - `site.webmanifest`

## Config à vérifier avant prod
- **Tawk.to** : `app.js:64` `TAWK_PROPERTY_ID` / `TAWK_WIDGET_ID` — vérifier dans dashboard Tawk.to
- **Images** : remplacer Unsplash par photos réelles (avec `width`/`height` + `loading="lazy"`)
- **Formulaire** : actuellement simulation `setTimeout` + toast. Brancher Netlify Forms / Formspree / backend (ajouter `action`, anti-spam honeypot)
- **Blog vidéo** : remplacer `video: ""` par vrai lien YouTube (utilise `youtube-nocookie.com`)
- **Domaine** : adapter `https://kids-training-reunion.re` si différent

## SEO / Accessibilité
- OG / Twitter / canonical / theme-color / JSON-LD ajoutés
- `site.webmanifest` corrigé, favicons normalisés
- `robots.txt` + `sitemap.xml`
- `aria-expanded` sur burger, `autocomplete` sur form, `rel="noopener"` sur externes

## Licence
© 2026 Kids Training Réunion — RNA W9R1010112
