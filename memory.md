# Kids Training Réunion — Memory / Progression

> Sauvegarde de contexte pour reprise rapide au prochain démarrage. Projet : site vitrine Kids Training Réunion (Saint-Denis, 3–17 ans, 5 lieux). Stack : HTML/CSS/JS vanilla + Firebase optionnel (localStorage fallback). Design : Warm Editorial / Behance sport, Fraunces + Outfit, eggshape conservé.

## 1. Point de départ (deepseek_html_20260901_76a53d.html)
- Apprécié : footer deepseek (4 colonnes, sites-grid) et typo Fraunces/Outfit → conservés.
- Volonté : theming Behance sport mais piloté (pas compliqué), eggshape simple gardé.
- Problème : navigation non synchro entre `index.html` et `blog.html`/`chat.html`.

## 2. Navigation & Footer (Étape 1)
- **index.html:55** nav unifiée : `Accueil` `index.html` → `À la une` `index.html#nouveautes` → `Infos/Pratique` `index.html#lieux` → `FAQ` `index.html#faq` → `Blog` `blog.html` → `À propos` `index.html#apropos` → `Se connecter` `btn-primary` (remplissage coloré) + `theme-toggle`.
- **Mobile** `mobile-menu:97` identique, `Se connecter →` `id="mobileLoginBtn"` géré `app.js:123`.
- **Footer** `footer-grid 1.6fr 1fr 1fr 1fr` `styles.css:1730` : Brand + Explorer (2 colonnes `footer-nav-compact` `styles.css:2838`) + Nos activités (sites-grid 2x2) + Légal. Liens courts `Discuter` au lieu de `Discuter avec nous`.
- **Fichiers touchés** : `index.html`, `blog.html`, `chat.html`, `mentions-legales.html`, `politique-confidentialite.html`.
- **Active nav** `app.js:189` `updateActiveNav()` page-aware : `pathname` → `isIndex/isBlog/isChat`, `map` hero→Accueil, nouveautes/concours/activites→À la une, confiance/lieux/tarifs/contact→Infos, faq→FAQ, apropos→À propos. Smooth scroll `app.js:160` gère `index.html#id`.

**Bug fixé** : `first-screen` sans `id` (`div id="activites"` ignoré par `section[id]`) → `À la une` jamais active. Corrigé `index.html:183` `<section id="activites">`.

## 3. Design System & Sport Layer
- **styles.css** base = deepseek v2 (variables --ink/cream/coral/teal/sun, --ease-spring, shadows, radius). 
- **Dark mode** `styles.css:1972` amélioré : `--cream #0E0D1A`, `--paper #1E1D30`, `--coral #FF7A5C`, `--teal #2EC4B6`, `--sun #FFD166`, shadows plus profonds.
- **Sport pilot** `styles.css:2838` : `nav-link--pilot` dot, `mobile-link-pill`, `first-screen` etc.
- **Hamburger** `styles.css:333` 44×44, border, hover coral, active fond ink.
- **Mobile menu** `styles.css:372` full-screen flex column, safe-area padding, scroll, cibles 48px, `max-width:420px`.

## 4. Écran 1 — Activité + À la une même écran
- **Structure** `index.html:179` `<section class="first-screen" id="activites">` avec `first-screen-grid 1.55fr 0.85fr` `styles.css:2813`.
- Gauche : `first-screen-main` 2 `activity-row--compact` (Kids Training / Boxe Ludique) eggshape `42% 58%` conservé `styles.css:2745`, `age-groups--compact`.
- Droite : `first-screen-side sticky top:92px` `ads-stack` 2 `ad-card` (`#nouveautes` Dès 12 mois, `#concours` 5 gagnants) `ad-badge` skew -6deg, `ad-prize`.
- **Modal À la une** `index.html:786` `adModal` cliquable avec textes sourcés (Bellepierre, Trinité, tirage 5 sept, Instagram).
- **Hero hint** `index.html:135` pilule `💬 Discutez sans quitter le site — Se connecter`.

## 5. Blog — Behance éditorial, public / admin
- **CSS séparé** : `styles.css` base 2840l, `blog.css` 499l (Behance), `chat.css` 43l. `blog.html:18` charge `blog.css` après `styles.css`.
- **Hero Behance** `blog.html:96` `blog-hero-behance` `grid 1.2fr 0.8fr`, titre `Journal` `Fraunces 2.8-4.8rem`, cover `border 1.5px + shadow 8px`, strip sans Behance.
- **Filtres** `blog.html:127` `blog-filter-bar` sticky `top:66px` `Tout/Nouveauté/Conseil/Vidéo/Événement` `data-filter`, `applyFilter()` `blog.html:713` filtre `blogGrid` ou `carouselTrack` (si grille supprimée), `updateCounts()` `blog.html:784` alimente `#countAll` + `#countNouveaute/Conseil/Video` dynamique `padStart(2,"0")`.
- **Grille** `blog.css:317` `repeat(4,1fr)` `gap18px` `max-width:300px max-height:360px` (aplatie 16/9) `320px→300px`, `hero/horizontal` tous `span1` (pas de grande carte), `@1080:2col` `@640:1col`.
- **Carrousel** supprimé visuellement pour éviter répétition (gardé en JS si présent, `if(carouselTrack)`), `blog.html:665` `data-tag` ajouté.
- **Squelettes 6** `blog.html:176` `classic/horizontal/horizontal-reverse/hero/video/minimal` chooser `blog.css:54`.
- **Éditeur** `blog.html:153` `editor-layout 1.1fr 0.9fr →1fr @960` `blog.css:431` gauche paramètres, droite `live-preview` `updateLivePreview()` `blog.html:547` temps réel via `renderCard`.
- **CRUD** `blog.html:580` `localStorage ktr_blog_posts` + Firebase optionnel (`USE_FIREBASE`), `seed` `blog.html:427` version `v4_small4col` 3 petites cartes, `renderCard` `data-tag`, `card-delete` `blog.css:472` `✕` + `✎` `blog.html:619` `isAdmin` check, `postForm` reset filtre `Tout` après publish.
- **Login admin** `app.js:56` `ADMIN_ID=admin / ADMIN_PASS=test` `prompt` + `blog.html:395` `ADMIN_ID/PASS`, `isAdmin()` gère `id/email/isAdmin`, `renderAuth()` `body.is-admin` toggle `adminEditor/adminBanner/card-delete`. `Se connecter` `btn-primary` `title="Discutez sans quitter..."`, `mobileLoginBtn` géré, redirect `chat.html?welcome=1` `app.js:101`, `chat.html:93` `#chatWelcome` + script `URLSearchParams`.
- **Texte supprimé** `Lecture publique • Se connecter...` retiré `blog.html:114` + JS `renderAuth` guard, `Pensé comme magazine Behance` retiré `blog.html:103`, `BEHANCE` purgé `grep 0`.
- **Cartes aplaties** `blog.css:335` `max-height 420→360`, `aspect 16/10→16/9`, `padding 18→14`.
- **Modal blog** `blog.html:249` `blogModal` avec `img/video/tag/title/date/content` `openModal()` `blog.html:750` bind sur `blogGrid` + `carousel`.

## 6. Chat
- **chat.html:93** `#chatWelcome` verte bienvenue, `blog-admin-only` Tawk.to admin, `chat.css` minimal placeholder. `app.js` gère `chatAdminBanner`.

## 7. Légal — sécurité enfants
- **mentions-legales.html** / **politique-confidentialite.html** créés (W9R1010112, 35 chemin Père Raimbault 97417, BPJEPS L212-9, groupes 10-12, droit image mineur art.9 + RGPD, durées 13 mois, CNIL). Footer liens `href="#"` → `mentions-legales.html` / `politique-confidentialite.html`. Vérifié `grep` 0 vide.

## 8. Images & Divers
- **Image cassée** `photo-1587654780291` 404 → remplacée `photo-1503454537195...` + `onerror` fallback `1516627145497` `index.html:194`.
- **VendorPrefix** `blog.css:404` ajouté `line-clamp:3` standard à côté de `-webkit-line-clamp`.
- **Horizontal** `.blog-card--horizontal .blog-card-img {aspect-ratio:5/3}` image haut / texte bas `flex column` `blog.css:91`.
- **À propos** `index.html:598` `id="apropos"` section 2 colonnes `about-grid` `1.15fr 0.85fr →1fr @1080` avec données net (5 lieux, 3-17 ans, 15+ ans, 500+, BPJEPS, Sésame).
- **Sections** `app.js` `sections = section[id], aside[id]` + `hero`, `apropos` mappés.

## 9. Fichiers clés
- `index.html` (799l) — hero, first-screen, trust, lieux, tarifs, faq, apropos, contact, footer, modals
- `blog.html` (850l+) — hero, filtres, carousel (supprimé visuel), editor live, grid 4, modal, Firebase/local
- `chat.html` (272l) — welcome, placeholder, Tawk.to comment
- `styles.css` (2840l) — base + first-screen + dark + nav/mobile
- `blog.css` (499l) — blog spécifique
- `chat.css` (43l) — chat placeholder
- `app.js` (376l) — preloader, dark, nav auth, scroll, reveal, FAQ, form, promo, chat fab, ESC
- `mentions-legales.html`, `politique-confidentialite.html`
- `image/logo.png`, `image kids/` (concours, nouveau)

## 10. Comptes & Accès
- Firebase Auth Google : `signInWithPopup` dans `blog.html:348` / `chat.html:242` / `index.html:796` + `onAuthStateChanged` → `ktr_user` `{email, name, photo, isAdmin, id}`. `ADMIN_EMAILS=["ryassor6@gmail.com","admin@kids-training-reunion.re","admin"]` client allowlist + `firestore.rules:3` serveur.
- `localStorage` clés : `theme`, `ktr_user`, `ktr_blog_posts`, `blog_version=v4_small4col`.

## 11. Étape UI/UX + Sécurité (2026-09-03)
- **Dark mode** `styles.css:2053` fix promo-banner contraste : `[data-theme=dark] .promo-banner` reste `#0D0C17` (au lieu de `var(--ink)` clair), `promo-content` `#FBF5EC`, `promo-link` sun sur ink foncé. Ajouts dark `first-screen/trust/blog-grid/ad-step/pricing/faq` contrastes `styles.css:2168`.
- **Se connecter avec Google** `app.js:55` : injection `authModal:3000` (`ensureAuthModal`) avec `auth-google-btn` (SVG Google 4 couleurs), `openAuthModal()` au clic `navLoginBtn/mobileLoginBtn`. `ktrFirebaseLogin` retourne Promise `throw` pour gestion erreur. Titre `Se connecter avec Google — accès chat + blog admin si autorisé`.
- **Avatar/name** `app.js:112` `renderNavAuth()` construit `nav-user-pill` avec `<img>` `photoURL` + fallback initiale, `name` (`displayName`/`email`), rôle `Admin`/`Connecté`, `admin-badge` + `Déconnexion` dynamique. `après login` `ktr-auth` ferme modal.
- **Tawk.to public** `app.js:178` `injectTawk()` immédiat pour tous (plus `isTawkAdmin` hide). `chat.html:120` bannière mise à jour `Mode Admin — édition blog` / `chat public`, `tawkStatus` message public, `app.js:184` `updateTawkVisibility` no-op. Seul blog reste protégé.
- **Éditeur blog redesign** `blog.html:131` Behance + WordPress : `editor-header` (titre + `editorStatus` + `admin-badge`), `editor-manage` liste rapide (`editorManageList`) `blog.html:865` `updateManageList()` avec `Modifier/Supprimer` + dates, `editor-section` numérotée `01 Contenu`/`02 Média`/`03 Réglages`, `input-title` grand, `toggle-ui` switches, `editor-actions` sticky, `live-preview` Behance fidèle, `preview-tips`. `blog.css:423` nouveaux blocs `blog-editor:20px` + dark variants.
- **Templates** `blog.css:54` améliorés : `flex column`, `hover translateY`, `active shadow`, `strong`/`span` structure (`blog.html:157`).
- **Sécurité** `blog.html:591` `postForm` guard `if(!adminCheck) alert`, `blog.html:738` delete guards, `firestore.rules` créé (public read, write admin email allowlist). `postForm` reset/status gère `Créer`/`Modifier` + `editorStatus` texte.
- **Fichiers** : `styles.css` ~2897l + auth modal CSS `styles.css:2890`, `blog.css` ~560l, `app.js` ~458l, `firestore.rules` nouveau.

## 12. TODO / Dettes restantes
- Déployer `firestore.rules` via `firebase deploy --only firestore` et vérifier `Firebase Console > Firestore > Rules`.
- Vérifier `Authorized domains` (Firebase Auth) incluent prod + vercel/netlify.
- Tester dark mode complet sur mobile (promo, editor, blog grid) + avatar Google sur compte non-admin (lecture seule).
- Si besoin upload image : ajouter Firebase Storage + `storage.rules` (actuellement URL only).

## 12b. Passage public pur (2026-09-03 — demande utilisateur)
- **Hero hint** `index.html:128` modifié : `Discutez sans quitter le site — utilisez le widget en bas à droite pour nous parler instantanément.` (suppression référence `Se connecter`).
- **Bouton Se connecter supprimé** public : `nav-auth`/`navLoginBtn`/`navUser`/`mobileLoginBtn` retirés de `index.html:63`/`blog.html:45`/`chat.html:45`/`apropos.html`/`mentions-legales.html`/`politique-confidentialite.html` + Firebase `type="module"` scripts supprimés. Seul `app.js:55` Tawk public reste (`injectTawk()` immédiat, `6a98456eef935f3443550c36/1k1hcuese` sans auth).
- **Blog admin retiré** : `adminEditor` entier supprimé `blog.html:131` + module Firebase/CRUD/editor remplacé par version lecture seule `blog.html:142` (seed + `loadLocalPosts`/`renderCard` public sans `✕`/`Modifier`, filtres + `blogModal` conservés). Ancienne version sauvegardée `/_admin_backup_KTR/blog.admin.html:60k`.
- **Chat** `chat.html:95` `chatWelcome` + `chatAdminBanner` + Firebase `onAuthStateChanged` supprimés, placeholder simplifié `sans connexion`, Tawk info public seule.
- **Backup hors root** `/media/yassor/(Others)/Code/Dorian/_admin_backup_KTR/` : `blog.admin.html` + `app.admin.js` + `blog.admin.css` + `firestore.rules` + `memory.md` + `README.md` (firebaseConfig + TAWK IDs + ADMIN_EMAILS + restore instructions). `firestore.rules` supprimé du public (`rm`).

## 13. Commandes utiles
- `grep -n "nav-link" index.html` / `grep -n 'section.*id=' index.html`
- `node --check app.js` / `python -m json.tool` pour localStorage
- `grep -r Behance` doit être 0
- `cat _admin_backup_KTR/firestore.rules` / `firebase deploy --only firestore` (depuis backup si besoin admin)
