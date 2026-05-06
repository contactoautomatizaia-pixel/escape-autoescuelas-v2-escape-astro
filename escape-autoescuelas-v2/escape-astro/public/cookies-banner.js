/**
 * Escape Autoescuelas — Cookie Consent Banner
 * RGPD / LSSI-CE compliant | Vanilla JS | No dependencies
 * Incluye: banner principal, panel de preferencias, gestión de localStorage.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "escape_cookie_consent";
  const VERSION = "1";
  const GA_ID = "G-EP9BHPJB4X";

  /* ── Design tokens (sync con styles.css) ─────────────── */
  const T = {
    red: "#C8102E",
    redDeep: "#9A0C24",
    ink: "#0A0A0A",
    paper: "#F5F2EC",
    paper2: "#ECE7DD",
    mute: "#6B6B6B",
    line: "rgba(10,10,10,0.12)",
    font: '"Inter",system-ui,sans-serif',
    display: '"Archivo Black","Anton",system-ui,sans-serif',
    mono: '"JetBrains Mono",ui-monospace,monospace',
    ease: "cubic-bezier(0.22,1,0.36,1)",
  };

  /* ── Helpers ───────────────────────────────────────────── */
  function getConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.v !== VERSION) return null;
      return parsed;
    } catch { return null; }
  }

  function saveConsent(prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      v: VERSION,
      ts: Date.now(),
      ...prefs,
    }));
  }

  function consentAlreadyGiven() {
    return getConsent() !== null;
  }

  /* ── Inject Google Fonts si no están (páginas legales) ── */
  function ensureFonts() {
    if (document.querySelector('link[href*="Archivo+Black"]')) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
  }

  /* ── CSS ─────────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById("escape-cookie-css")) return;
    const css = `
      #escape-cookie-overlay {
        position: fixed; inset: 0; z-index: 99998;
        background: rgba(10,10,10,0.55);
        backdrop-filter: blur(4px);
        display: flex; align-items: flex-end; justify-content: center;
        padding: 24px;
        opacity: 0;
        transition: opacity 0.4s ${T.ease};
        pointer-events: none;
      }
      #escape-cookie-overlay.ec-show {
        opacity: 1; pointer-events: auto;
      }
      #escape-cookie-banner {
        background: ${T.ink};
        color: #fff;
        border-radius: 20px;
        padding: 28px 32px;
        max-width: 820px;
        width: 100%;
        font-family: ${T.font};
        box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        transform: translateY(30px);
        transition: transform 0.45s ${T.ease};
        position: relative;
        border-top: 3px solid ${T.red};
      }
      #escape-cookie-overlay.ec-show #escape-cookie-banner {
        transform: translateY(0);
      }
      .ec-top { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 16px; }
      .ec-icon { font-size: 28px; flex-shrink: 0; margin-top: 2px; }
      .ec-brand {
        font-family: ${T.display};
        font-size: 13px;
        letter-spacing: 0.12em;
        color: ${T.red};
        margin-bottom: 6px;
        font-style: italic;
      }
      .ec-title {
        font-family: ${T.display};
        font-size: 22px;
        line-height: 1.1;
        letter-spacing: -0.02em;
        color: #fff;
      }
      .ec-body { font-size: 14px; line-height: 1.55; color: rgba(255,255,255,0.75); margin-bottom: 20px; }
      .ec-body a { color: ${T.red}; text-underline-offset: 3px; }
      .ec-cats {
        display: grid; grid-template-columns: repeat(3,1fr); gap: 10px;
        margin-bottom: 24px;
      }
      .ec-cat {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.10);
        border-radius: 12px;
        padding: 12px 14px;
        display: flex; flex-direction: column; gap: 6px;
      }
      .ec-cat-head { display: flex; justify-content: space-between; align-items: center; }
      .ec-cat-name { font-size: 13px; font-weight: 700; }
      .ec-cat-desc { font-size: 11px; color: rgba(255,255,255,0.55); line-height: 1.4; font-family: ${T.mono}; }
      /* Toggle switch */
      .ec-toggle { position: relative; width: 36px; height: 20px; flex-shrink: 0; }
      .ec-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
      .ec-toggle-track {
        position: absolute; inset: 0; border-radius: 999px;
        background: rgba(255,255,255,0.15); cursor: pointer;
        transition: background 0.2s;
      }
      .ec-toggle input:checked + .ec-toggle-track { background: ${T.red}; }
      .ec-toggle input:disabled + .ec-toggle-track { opacity: 0.5; cursor: not-allowed; }
      .ec-toggle-track::after {
        content: "";
        position: absolute; top: 3px; left: 3px;
        width: 14px; height: 14px;
        border-radius: 50%; background: #fff;
        transition: transform 0.2s ${T.ease};
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      }
      .ec-toggle input:checked + .ec-toggle-track::after { transform: translateX(16px); }
      /* Botones */
      .ec-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      .ec-btn {
        font-family: ${T.font}; font-weight: 700; font-size: 14px;
        padding: 13px 22px; border-radius: 999px; border: none;
        cursor: pointer; transition: transform 0.18s ${T.ease}, filter 0.2s;
        display: inline-flex; align-items: center; gap: 6px;
      }
      .ec-btn:hover { transform: translateY(-2px); filter: brightness(1.08); }
      .ec-btn-accept { background: ${T.red}; color: #fff; }
      .ec-btn-save   { background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.18); }
      .ec-btn-reject { background: transparent; color: rgba(255,255,255,0.6); font-weight: 500; font-size: 13px;
                       padding: 13px 16px; border: 1px solid rgba(255,255,255,0.12); }

      /* Panel flotante de preferencias (reabierto desde footer) */
      #escape-pref-panel {
        position: fixed; inset: 0; z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        padding: 24px;
        background: rgba(10,10,10,0.65);
        backdrop-filter: blur(6px);
        opacity: 0; pointer-events: none;
        transition: opacity 0.3s ${T.ease};
      }
      #escape-pref-panel.ec-show { opacity: 1; pointer-events: auto; }
      #escape-pref-inner {
        background: ${T.ink}; color: #fff;
        border-radius: 20px; padding: 36px;
        max-width: 560px; width: 100%;
        font-family: ${T.font};
        box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        border-top: 3px solid ${T.red};
        max-height: 90vh; overflow-y: auto;
        transform: scale(0.96);
        transition: transform 0.35s ${T.ease};
      }
      #escape-pref-panel.ec-show #escape-pref-inner { transform: scale(1); }
      .ec-pref-title {
        font-family: ${T.display}; font-size: 28px;
        letter-spacing: -0.02em; margin-bottom: 8px;
      }
      .ec-pref-sub { font-size: 14px; color: rgba(255,255,255,0.65); margin-bottom: 24px; }
      .ec-pref-row {
        display: flex; justify-content: space-between; align-items: flex-start;
        padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08); gap: 16px;
      }
      .ec-pref-row:last-of-type { border-bottom: 0; margin-bottom: 16px; }
      .ec-pref-row-label { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
      .ec-pref-row-desc  { font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.45; }
      .ec-pref-badge {
        font-family: ${T.mono}; font-size: 9px; letter-spacing: 0.1em;
        background: rgba(255,255,255,0.08); border-radius: 999px;
        padding: 2px 8px; color: rgba(255,255,255,0.5); display: inline-block; margin-top: 4px;
      }

      /* Botón flotante para reabrir preferencias */
      #escape-cookie-settings-btn {
        position: fixed; bottom: 24px; left: 24px; z-index: 9997;
        background: ${T.ink}; color: #fff;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 999px; padding: 8px 16px 8px 12px;
        font-family: ${T.font}; font-size: 12px; font-weight: 600;
        cursor: pointer; display: none; align-items: center; gap: 6px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: transform 0.2s ${T.ease}, box-shadow 0.2s;
      }
      #escape-cookie-settings-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.4);
      }

      /* Responsive */
      @media (max-width: 640px) {
        #escape-cookie-banner { padding: 20px; border-radius: 16px; }
        .ec-cats { grid-template-columns: 1fr; }
        .ec-actions { flex-direction: column; }
        .ec-btn { text-align: center; justify-content: center; }
        #escape-pref-inner { padding: 24px; }
      }
    `;
    const style = document.createElement("style");
    style.id = "escape-cookie-css";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ── Datos de categorías ────────────────────────────── */
  const CATEGORIES = [
    {
      key: "necessary",
      name: "Necesarias",
      desc: "Imprescindibles para el funcionamiento básico. Cookie propia: escape_cookie_consent (guarda tus preferencias, 1 año). No pueden desactivarse.",
      required: true,
    },
    {
      key: "analytics",
      name: "Analíticas",
      desc: "Google Analytics 4 (_ga, _gid, _ga_*). Miden visitas y comportamiento de forma anónima. Duración: hasta 2 años. Proveedor: Google Ireland Ltd.",
      required: false,
    },
    {
      key: "marketing",
      name: "Marketing / Social",
      desc: "Widget de reseñas Google (Elfsight). Puede registrar interacciones con el widget. Proveedor: Elfsight / Google. También habilita anuncios personalizados.",
      required: false,
    },
  ];

  /* ── Banner HTML ────────────────────────────────────── */
  function buildBanner() {
    const cats = CATEGORIES.map(c => `
      <div class="ec-cat">
        <div class="ec-cat-head">
          <span class="ec-cat-name">${c.name}</span>
          <label class="ec-toggle" aria-label="Activar cookies ${c.name}">
            <input type="checkbox" id="ec-chk-${c.key}" ${c.required ? "checked disabled" : ""}/>
            <span class="ec-toggle-track"></span>
          </label>
        </div>
        <span class="ec-cat-desc">${c.desc}</span>
      </div>
    `).join("");

    const legalBase = _legalBase();

    const html = `
      <div id="escape-cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="ec-title">
        <div id="escape-cookie-banner">
          <div class="ec-top">
            <div class="ec-icon" aria-hidden="true">🍪</div>
            <div>
              <div class="ec-brand">ESCAPE AUTOESCUELAS</div>
              <div class="ec-title" id="ec-title">Usamos cookies para mejorar<br/>tu experiencia.</div>
            </div>
          </div>
          <p class="ec-body">
            Utilizamos cookies propias y de terceros para el funcionamiento de la web, analizar el tráfico y
            personalizar contenidos. Puedes aceptarlas todas, configurarlas a tu medida o rechazar las opcionales.
            Más info en nuestra <a href="${legalBase}politica-cookies.html">Política de cookies</a>.
          </p>
          <div class="ec-cats">${cats}</div>
          <div class="ec-actions">
            <button class="ec-btn ec-btn-accept" id="ec-accept-all">✓ Aceptar todas</button>
            <button class="ec-btn ec-btn-save"   id="ec-save-prefs">Guardar preferencias</button>
            <button class="ec-btn ec-btn-reject"  id="ec-reject-all">Solo necesarias</button>
          </div>
        </div>
      </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);
  }

  /* ── Panel de preferencias (accesible desde footer) ─── */
  function buildPrefPanel() {
    const legalBase = _legalBase();
    const rows = CATEGORIES.map(c => `
      <div class="ec-pref-row">
        <div>
          <div class="ec-pref-row-label">${c.name}</div>
          <div class="ec-pref-row-desc">${c.desc}</div>
          ${c.required ? '<span class="ec-pref-badge">SIEMPRE ACTIVA</span>' : ""}
        </div>
        <label class="ec-toggle" style="margin-top:4px" aria-label="Activar cookies ${c.name}">
          <input type="checkbox" id="ec-pref-chk-${c.key}" ${c.required ? "checked disabled" : ""}/>
          <span class="ec-toggle-track"></span>
        </label>
      </div>
    `).join("");

    const html = `
      <div id="escape-pref-panel" role="dialog" aria-modal="true" aria-label="Preferencias de cookies">
        <div id="escape-pref-inner">
          <div class="ec-pref-title">Preferencias de cookies</div>
          <p class="ec-pref-sub">
            Personaliza qué cookies aceptas. Las necesarias siempre están activas.
            Consulta nuestra <a href="${legalBase}politica-cookies.html" style="color:${T.red}">Política de cookies</a>.
          </p>
          ${rows}
          <div class="ec-actions">
            <button class="ec-btn ec-btn-accept" id="ec-pref-accept-all">✓ Aceptar todas</button>
            <button class="ec-btn ec-btn-save"   id="ec-pref-save">Guardar</button>
            <button class="ec-btn ec-btn-reject"  id="ec-pref-close">Cancelar</button>
          </div>
        </div>
      </div>
    `;
    const w = document.createElement("div");
    w.innerHTML = html;
    document.body.appendChild(w.firstElementChild);
  }

  /* ── Botón flotante ─────────────────────────────────── */
  function buildSettingsBtn() {
    const btn = document.createElement("button");
    btn.id = "escape-cookie-settings-btn";
    btn.setAttribute("aria-label", "Gestionar preferencias de cookies");
    btn.innerHTML = `🍪 <span>Cookies</span>`;
    document.body.appendChild(btn);
    btn.addEventListener("click", openPrefPanel);
  }

  /* ── Helpers de ruta ─────────────────────────────────── */
  function _legalBase() {
    // Si estamos dentro de /legal/, apuntamos arriba; si no, a legal/
    return location.pathname.includes("/legal/") ? "" : "legal/";
  }

  /* ── Lógica ──────────────────────────────────────────── */
  function showBanner() {
    const overlay = document.getElementById("escape-cookie-overlay");
    if (!overlay) return;
    requestAnimationFrame(() => overlay.classList.add("ec-show"));
    overlay.querySelector("#ec-accept-all").addEventListener("click", acceptAll);
    overlay.querySelector("#ec-save-prefs").addEventListener("click", saveFromBanner);
    overlay.querySelector("#ec-reject-all").addEventListener("click", rejectAll);
  }

  function hideBanner() {
    const overlay = document.getElementById("escape-cookie-overlay");
    if (!overlay) return;
    overlay.classList.remove("ec-show");
    setTimeout(() => overlay.remove(), 500);
    // Mostrar botón flotante
    const btn = document.getElementById("escape-cookie-settings-btn");
    if (btn) btn.style.display = "flex";
  }

  function openPrefPanel() {
    const panel = document.getElementById("escape-pref-panel");
    if (!panel) return;
    // Sync toggles con consentimiento guardado
    const saved = getConsent();
    CATEGORIES.forEach(c => {
      if (c.required) return;
      const chk = document.getElementById(`ec-pref-chk-${c.key}`);
      if (chk && saved) chk.checked = !!saved[c.key];
    });
    requestAnimationFrame(() => panel.classList.add("ec-show"));

    document.getElementById("ec-pref-accept-all").onclick = () => { acceptAll(); closePrefPanel(); };
    document.getElementById("ec-pref-save").onclick = saveFromPanel;
    document.getElementById("ec-pref-close").onclick = closePrefPanel;
  }

  function closePrefPanel() {
    const panel = document.getElementById("escape-pref-panel");
    if (panel) panel.classList.remove("ec-show");
  }

  function getToggles(prefix) {
    const prefs = { necessary: true };
    CATEGORIES.forEach(c => {
      if (c.required) return;
      const chk = document.getElementById(`${prefix}${c.key}`);
      prefs[c.key] = chk ? chk.checked : false;
    });
    return prefs;
  }

  function acceptAll() {
    const prefs = { necessary: true };
    CATEGORIES.forEach(c => { prefs[c.key] = true; });
    saveConsent(prefs);
    applyConsent(prefs);
    hideBanner();
  }

  function rejectAll() {
    const prefs = { necessary: true };
    CATEGORIES.forEach(c => { if (!c.required) prefs[c.key] = false; });
    saveConsent(prefs);
    applyConsent(prefs);
    hideBanner();
  }

  function saveFromBanner() {
    const prefs = getToggles("ec-chk-");
    saveConsent(prefs);
    applyConsent(prefs);
    hideBanner();
  }

  function saveFromPanel() {
    const prefs = getToggles("ec-pref-chk-");
    saveConsent(prefs);
    applyConsent(prefs);
    closePrefPanel();
  }

  function loadGoogleAnalytics() {
    if (window._escapeGaLoaded) return;
    window._escapeGaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function loadElfsight() {
    if (window._escapeElfsightLoaded) return;
    window._escapeElfsightLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://elfsightcdn.com/platform.js';
    document.head.appendChild(s);
  }

  function applyConsent(prefs) {
    if (typeof window.onEscapeCookieConsent === "function") {
      window.onEscapeCookieConsent(prefs);
    }
    if (prefs.analytics) { loadGoogleAnalytics(); }
    if (prefs.marketing) { loadElfsight(); }
    document.dispatchEvent(new CustomEvent("escape:cookie-consent", { detail: prefs }));
  }

  /* ── Expose API pública ─────────────────────────────── */
  window.EscapeCookies = {
    getConsent,
    openPreferences: openPrefPanel,
  };

  /* ── Arranque ────────────────────────────────────────── */
  function init() {
    ensureFonts();
    injectStyles();
    buildPrefPanel();
    buildSettingsBtn();

    const saved = getConsent();
    if (saved) {
      applyConsent(saved);
      const btn = document.getElementById("escape-cookie-settings-btn");
      if (btn) btn.style.display = "flex";
    } else {
      buildBanner();
      setTimeout(showBanner, 350);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
