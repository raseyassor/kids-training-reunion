// ========================================
// KIDS TRAINING RÉUNION — INTERACTIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // NAVIGATION SCROLL EFFECT
  // ========================================
  const nav = document.getElementById("nav");

  window.addEventListener(
    "scroll",
    () => {
      if (window.pageYOffset > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    },
    { passive: true },
  );

  // ========================================
  // MOBILE MENU
  // ========================================
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // ========================================
  // ACTIVE NAV LINK
  // ========================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener(
    "scroll",
    () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    },
    { passive: true },
  );

  // ========================================
  // ANIMATED COUNTERS
  // ========================================
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000;
          const start = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(easeOut * target);
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // ========================================
  // SCROLL REVEAL
  // ========================================
  const revealElements = document.querySelectorAll(
    ".section-header, .activity-row, .location-card, .pricing-card, .contact-item, .partner-item, .trust-item",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    revealObserver.observe(el);
  });

  // ========================================
  // FAQ ACCORDION
  // ========================================
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", (e) => {
      e.preventDefault();
      const isActive = item.classList.contains("active");

      faqItems.forEach((i) => {
        i.classList.remove("active");
        const answer = i.querySelector(".faq-answer");
        if (answer) {
          answer.style.maxHeight = "0";
          answer.style.opacity = "0";
        }
      });

      if (!isActive) {
        item.classList.add("active");
        const answer = item.querySelector(".faq-answer");
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.style.opacity = "1";
        }
      }
    });
  });

  // ========================================
  // FORM HANDLING
  // ========================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      if (!btn) return;
      const originalText = btn.innerHTML;

      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite">
          <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="40" stroke-dashoffset="20" stroke-linecap="round"/>
        </svg>
        <span>Envoi en cours...</span>
      `;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Message envoyé !</span>
        `;
        btn.style.background = "var(--teal)";

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // ========================================
  // PROMO BANNER
  // ========================================
  const promoBanner = document.getElementById("promo");

  window.addEventListener(
    "scroll",
    () => {
      if (window.pageYOffset > 400) {
        promoBanner.style.transform = "translateY(-100%)";
        promoBanner.style.opacity = "0";
        promoBanner.style.pointerEvents = "none";
      } else {
        promoBanner.style.transform = "translateY(0)";
        promoBanner.style.opacity = "1";
        promoBanner.style.pointerEvents = "auto";
      }
    },
    { passive: true },
  );

  // ========================================
  // PRELOADER
  // ========================================
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `
    <div class="preloader-content">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="var(--coral)" stroke-width="2.5" opacity="0.25"/>
        <circle cx="24" cy="24" r="22" stroke="var(--coral)" stroke-width="2.5" stroke-dasharray="140" stroke-dashoffset="140" class="preloader-circle"/>
      </svg>
    </div>
  `;
  preloader.style.cssText = `
    position: fixed; inset: 0; background: var(--cream); z-index: 10000;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.6s, visibility 0.6s;
  `;
  document.body.appendChild(preloader);

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      setTimeout(() => preloader.remove(), 600);
    }, 400);
  });

  // ========================================
  // CHAT FAB (Tawk.to placeholder)
  // ========================================
  const chatFab = document.getElementById("chatFab");
  const chatTooltip = document.getElementById("chatTooltip");

  if (chatFab && chatTooltip) {
    chatFab.addEventListener("click", () => {
      chatTooltip.classList.toggle("visible");
    });

    document.addEventListener("click", (e) => {
      if (!chatFab.contains(e.target) && !chatTooltip.contains(e.target)) {
        chatTooltip.classList.remove("visible");
      }
    });
  }
});
