// ========================================
// KIDS TRAINING RÉUNION — INTERACTIONS v2
// Deepseek base + Pilote sport tweaks + guards for blog/chat
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- PRELOADER (static in index, fallback dynamic) ---
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => preloader.classList.add("hidden"), 500);
        });
        // fallback if load already fired
        if (document.readyState === "complete") {
            setTimeout(() => preloader.classList.add("hidden"), 500);
        }
    } else {
        // legacy dynamic preloader for pages without static one
        const legacy = document.createElement("div");
        legacy.className = "preloader";
        legacy.innerHTML = `
    <div class="preloader-content">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="var(--coral)" stroke-width="2.5" opacity="0.25"/>
        <circle cx="24" cy="24" r="22" stroke="var(--coral)" stroke-width="2.5" stroke-dasharray="140" stroke-dashoffset="140" class="preloader-circle"/>
      </svg>
    </div>
  `;
        legacy.style.cssText = `position:fixed; inset:0; background:var(--cream); z-index:10000; display:flex; align-items:center; justify-content:center; transition:opacity 0.6s, visibility 0.6s;`;
        document.body.appendChild(legacy);
        window.addEventListener("load", () => {
            setTimeout(() => {
                legacy.style.opacity = "0";
                legacy.style.visibility = "hidden";
                setTimeout(() => legacy.remove(), 600);
            }, 400);
        });
    }

    // --- DARK MODE + FAVICON (dark always, light deleted) ---
    function updateFavicon(){
        const fav = document.getElementById("favicon");
        if(fav) fav.href = "image/favicon.ico?v=7";
    }
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        const currentTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", currentTheme);
        updateFavicon();
        themeToggle.addEventListener("click", () => {
            const html = document.documentElement;
            const isDark = html.getAttribute("data-theme") === "dark";
            const newTheme = isDark ? "light" : "dark";
            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateFavicon();
        });
    } else {
        updateFavicon();
    }

    // --- TAWK.TO — public (all visitors, no login required)
    const TAWK_PROPERTY_ID = "6a98456eef935f3443550c36";
    const TAWK_WIDGET_ID = "1k1hcuese";
    (function injectTawk(){
        if(TAWK_PROPERTY_ID==="VOTRE_PROPERTY_ID") return;
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/'+TAWK_PROPERTY_ID+'/'+TAWK_WIDGET_ID;
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    })();
    // also listen to Firebase auth events via ktr-auth dispatched by blog/chat modules

    // --- NAV SCROLL ---
    const nav = document.getElementById("nav");
    if (nav) {
        window.addEventListener("scroll", () => {
            nav.classList.toggle("scrolled", window.pageYOffset > 50);
        }, { passive: true });
    }

    // --- MOBILE MENU ---
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    if (navToggle && mobileMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.style.overflow = isOpen ? "hidden" : "";
            navToggle.setAttribute("aria-expanded", isOpen);
        });
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = "";
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // --- SMOOTH SCROLL — gère #id et index.html#id sur même page
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href") || "";
            if (!href.includes("#")) return;
            const [page, hash] = href.split("#");
            const targetId = hash;
            if (!targetId) return;
            const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
            const targetPage = page ? page.split("/").pop().toLowerCase() : currentPage;
            if (targetPage && targetPage !== "" && targetPage !== currentPage) return;
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: "smooth" });
                if (mobileMenu && mobileMenu.classList.contains("active")) {
                    mobileMenu.classList.remove("active");
                    navToggle.classList.remove("active");
                    document.body.style.overflow = "";
                    navToggle.setAttribute("aria-expanded", "false");
                }
            }
        });
    });

    // --- ACTIVE NAV LINK — vérifié et corrigé pour nouvelle nav Accueil/À la une/Infos/Blog
    const sections = document.querySelectorAll("section[id], aside[id]");
    const navLinksAll = document.querySelectorAll(".nav-link, .mobile-link");
    function updateActiveNav() {
        const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
        const isIndex = path === "" || path === "index.html" || path === "/";
        const isBlog = path === "blog.html";
        const isChat = path === "chat.html";
        const isApropos = path === "apropos.html";
        navLinksAll.forEach(l => l.classList.remove("active"));
        if (isBlog) {
            document.querySelectorAll('.nav-links a[href="blog.html"], .mobile-menu a[href="blog.html"]').forEach(el=> el.classList.add("active"));
            return;
        }
        if (isChat) {
            document.querySelectorAll('.nav-links a[href="chat.html"], .mobile-menu a[href="chat.html"], .mobile-menu a[href="chat.html"].mobile-link--secondary').forEach(el=> el.classList.add("active"));
            return;
        }
        if (isApropos) {
            document.querySelectorAll('.nav-links a[href="apropos.html"], .mobile-menu a[href="apropos.html"]').forEach(el=> el.classList.add("active"));
            return;
        }
        if (!isIndex) return;
        let current = "";
        const scrollPos = window.pageYOffset + 120;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) current = section.getAttribute("id");
        });
        if (window.pageYOffset < 80) current = "hero";
        const map = {
            "hero": 'a[href="index.html"]',
            "nouveautes": 'a[href="index.html#nouveautes"]',
            "concours": 'a[href="index.html#nouveautes"]',
            "activites": 'a[href="index.html#nouveautes"]',
            "confiance": 'a[href="index.html#lieux"]',
            "lieux": 'a[href="index.html#lieux"]',
            "tarifs": 'a[href="index.html#lieux"]',
            "faq": 'a[href="index.html#faq"]',
            "contact": 'a[href="index.html#lieux"]'
        };
        let selector = map[current];
        if (selector) {
            document.querySelectorAll(`.nav-links ${selector}, .mobile-menu ${selector}`).forEach(el=> el.classList.add("active"));
        } else if (current) {
            document.querySelectorAll(`.nav-links a[href$="#${current}"], .mobile-menu a[href$="#${current}"]`).forEach(el=> el.classList.add("active"));
        } else {
            document.querySelectorAll('.nav-links a[href="index.html"], .mobile-menu a[href="index.html"]').forEach(el=> el.classList.add("active"));
        }
    }
    if (sections.length) {
        window.addEventListener("scroll", updateActiveNav, { passive: true });
        window.addEventListener("load", updateActiveNav);
        updateActiveNav();
    } else {
        updateActiveNav();
    }

    // --- COUNTERS ---
    const counters = document.querySelectorAll(".stat-number");
    if (counters.length) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute("data-target"));
                    const duration = 2000;
                    const start = performance.now();
                    function update(t) {
                        const progress = Math.min((t - start) / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(ease * target);
                        if (progress < 1) requestAnimationFrame(update);
                        else el.textContent = target;
                    }
                    requestAnimationFrame(update);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    // --- SCROLL REVEAL (new .reveal system + legacy fallback) ---
    const revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        revealEls.forEach(el => revealObserver.observe(el));
    }
    // legacy reveal for old selectors if no .reveal present
    const legacyReveal = document.querySelectorAll(".section-header, .activity-row, .location-card, .pricing-card, .contact-item, .partner-item, .trust-item");
    const hasReveal = revealEls.length > 0;
    if (!hasReveal && legacyReveal.length) {
        const legacyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 60);
                    legacyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        legacyReveal.forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(28px)";
            el.style.transition = "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
            legacyObserver.observe(el);
        });
    }

    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const btn = item.querySelector(".faq-question");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            faqItems.forEach(i => {
                i.classList.remove("active");
                const ans = i.querySelector(".faq-answer");
                if (ans) { ans.style.maxHeight = "0"; ans.style.opacity = "0"; }
                const q = i.querySelector(".faq-question");
                if (q) q.setAttribute("aria-expanded", "false");
            });
            if (!isActive) {
                item.classList.add("active");
                const ans = item.querySelector(".faq-answer");
                if (ans) { ans.style.maxHeight = ans.scrollHeight + "px"; ans.style.opacity = "1"; }
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    // --- FORM HANDLING (with toast + validation) ---
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    function showToast(msg, success = true) {
        if (!toast || !toastMsg || !toastIcon) return;
        toastMsg.textContent = msg;
        toastIcon.textContent = success ? "✓" : "✕";
        toast.className = "toast visible" + (success ? " toast--success" : " toast--error");
        setTimeout(() => toast.classList.remove("visible"), 3500);
    }

    // --- FORM HANDLING — branchable (Formspree / Netlify / WP Forminator) ---
    // Config: choisis UNE option. Par défaut: simulation (aucun backend).
    // Option A (recommandé statique): Formspree → crée un form sur formspree.io, remplace FORMSPREE_ID.
    // Option B: Netlify Forms → ajoute netlify + honeypot, deploy sur Netlify détecte auto.
    // Option C: Garder WordPress Forminator → POST vers https://kids-training-reunion.re/wp-admin/admin-ajax.php (nécessite CORS)
    const FORM_ENDPOINT = ""; // ex: "https://formspree.io/f/xqakqgqy" ou "" pour simulation
    const FORM_ENDPOINT_METHOD = "POST"; // POST
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            let valid = true;
            const required = form.querySelectorAll("[required]");
            required.forEach(field => {
                const group = field.closest(".form-group");
                if (!field.value.trim()) {
                    if (group) group.classList.add("has-error");
                    valid = false;
                } else {
                    if (group) group.classList.remove("has-error");
                }
            });
            const email = document.getElementById("email");
            if (email && email.value) {
                const emailGroup = email.closest(".form-group");
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    if (emailGroup) emailGroup.classList.add("has-error");
                    valid = false;
                } else {
                    if (emailGroup) emailGroup.classList.remove("has-error");
                }
            }
            // honeypot anti-spam (champ caché)
            const honeypot = form.querySelector('[name="_gotcha"]');
            if (honeypot && honeypot.value) { showToast("Envoi bloqué.", false); return; }
            if (!valid) {
                showToast("Veuillez remplir tous les champs requis correctement.", false);
                return;
            }
            const btn = document.getElementById("submitBtn") || form.querySelector('button[type="submit"]');
            if (!btn) return;
            const orig = btn.innerHTML;
            btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation:spin 1s linear infinite"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="40" stroke-dashoffset="20" stroke-linecap="round"/></svg><span>Envoi...</span>`;
            btn.disabled = true;
            // Si aucun endpoint configuré → simulation (dev)
            if (!FORM_ENDPOINT) {
                setTimeout(() => {
                    showToast("Message envoyé avec succès ! (simulation — configure FORM_ENDPOINT dans app.js)", true);
                    btn.innerHTML = orig;
                    btn.disabled = false;
                    form.reset();
                }, 900);
                return;
            }
            try {
                const data = new FormData(form);
                // enrichissement pour Formspree
                data.append("_subject", "Nouveau message — Kids Training Réunion");
                const res = await fetch(FORM_ENDPOINT, {
                    method: FORM_ENDPOINT_METHOD,
                    body: data,
                    headers: { "Accept": "application/json" }
                });
                if (res.ok) {
                    showToast("Message envoyé avec succès ! Nous vous répondrons rapidement.", true);
                    form.reset();
                } else {
                    const j = await res.json().catch(()=>null);
                    throw new Error(j?.error || "Erreur serveur");
                }
            } catch (err) {
                console.error(err);
                showToast("Erreur d'envoi. Réessayez ou écrivez à contact@kids-training-reunion.re", false);
            } finally {
                btn.innerHTML = orig;
                btn.disabled = false;
            }
        });
        form.querySelectorAll("input, select, textarea").forEach(field => {
            field.addEventListener("input", () => {
                const group = field.closest(".form-group");
                if (group) group.classList.remove("has-error");
            });
        });
    }

    // --- PROMO BANNER ---
    const promo = document.getElementById("promo");
    if (promo) {
        window.addEventListener("scroll", () => {
            promo.classList.toggle("hidden", window.pageYOffset > 400);
        }, { passive: true });
    }

    // --- KEYBOARD: close mobile menu on Escape ---
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
            if (navToggle) navToggle.click();
        }
    });
});
