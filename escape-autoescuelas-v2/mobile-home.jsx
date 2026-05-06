/* global React, ESCAPE_CONTACT */
const { useState: useStateMobile } = React;

/* ============================================================
   ESCAPE — Mobile (iPhone frame)
   Links tel/wa funcionales, animaciones, accesibilidad
   ============================================================ */

function MobileFrame({ children }) {
  return (
    <div style={{ width: 390, height: 844, borderRadius: 48, background: "#000", padding: 12, boxShadow: "0 30px 80px rgba(0,0,0,0.4)", margin: "40px auto" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 38, overflow: "hidden", background: "#fff", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, background: "var(--escape-ink)", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", fontSize: 14, fontWeight: 600, zIndex: 100 }}>
          <span>9:41</span>
          <span aria-hidden="true">·····</span>
          <span>100%</span>
        </div>
        <div style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", paddingTop: 44 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function MobileHome() {
  const [menuOpen, setMenuOpen] = useStateMobile(false);
  const permisos = [
    { id: "B", tag: "COCHE", price: 230, sub: "Práctica 33€ · 45 min" },
    { id: "A2", tag: "MOTO", price: 180, sub: "Cerrado 30€ / Abierto 45€" },
    { id: "A1", tag: "MOTO", price: 180, sub: "Cerrado 28€ / Abierto 42€" },
    { id: "AM", tag: "CICLO.", price: 220, sub: "Cerrado 28€ · 30 min" },
  ];

  return (
    <div className="escape-root" style={{ background: "var(--escape-paper)", minHeight: "100%", color: "var(--escape-ink)" }}>
      {/* nav */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", background: "var(--escape-ink)", color: "#fff", position: "relative" }}>
        <a href="index.html" style={{ display: "flex", alignItems: "baseline", textDecoration: "none", color: "#fff" }} aria-label="Inicio">
          <span className="escape-italic" style={{ color: "#fff", fontSize: 16 }}>ESCAPE</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, marginLeft: 4 }}>AUTO.</span>
        </a>
        <button
          onClick={() => setMenuOpen((m) => !m)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="escape-btn"
          style={{ background: "var(--escape-red)", color: "#fff", border: 0, padding: "8px 14px", borderRadius: 999, fontWeight: 700, fontSize: 12 }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--escape-ink)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              padding: "12px 20px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              zIndex: 50,
              animation: "escape-fade-up 0.25s var(--ease-out) both",
            }}
          >
            <a onClick={() => setMenuOpen(false)} href="Permisos.html" style={mobMenuLink}>Permisos</a>
            <a onClick={() => setMenuOpen(false)} href="Permisos.html" style={mobMenuLink}>Precios</a>
            <a onClick={() => setMenuOpen(false)} href="index.html#equipo" style={mobMenuLink}>Equipo</a>
            <a onClick={() => setMenuOpen(false)} href="Contacto.html" style={mobMenuLink}>Contacto</a>
            <a
              onClick={() => setMenuOpen(false)}
              href={ESCAPE_CONTACT.PHONE_TEL}
              style={{ ...mobMenuLink, background: "var(--escape-red)", textAlign: "center", marginTop: 8, borderRadius: 999, fontWeight: 700 }}
            >
              Llamar {ESCAPE_CONTACT.PHONE_DISPLAY}
            </a>
          </div>
        )}
      </header>

      {/* hero */}
      <section className="escape-hero-anim" style={{ background: "var(--escape-red)", color: "#fff", padding: "32px 20px 28px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="escape-blob-anim" aria-hidden="true" style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "rgba(0,0,0,0.18)", top: -80, right: -60, filter: "blur(20px)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: 8 }}>
            <span className="escape-dot-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} aria-hidden="true" />
            ELX · ALICANTE
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 0.9, letterSpacing: "-0.04em", marginTop: 12 }}>
            Tu carnet,<br/>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>en modo</span><br/>
            <span className="escape-italic" style={{ fontSize: 64 }}>ESCAPE.</span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.5, marginTop: 16, opacity: 0.92 }}>
            Coche, moto y ciclomotor en Elx. <strong>89%* a la primera</strong>. Sin chorradas.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
            <a
              href="Contacto.html"
              className="escape-btn escape-btn-pulse"
              style={{ background: "#fff", color: "var(--escape-red)", border: 0, padding: "14px 20px", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center" }}
            >
              Matricularme · 230€
            </a>
            <a
              href={ESCAPE_CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="escape-btn"
              style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "14px 20px", borderRadius: 999, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center" }}
            >
              WhatsApp <span className="escape-btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* big stat */}
      <section style={{ background: "var(--escape-ink)", color: "#fff", padding: "24px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--escape-red)" }}>89%*</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>aprobados<br/>a la 1ª</div>
      </section>

      {/* foto */}
      <section style={{ padding: 20 }}>
        <div className="escape-photo-wrap" style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
          <img src="assets/local.jpg" alt="Local Escape Autoescuelas Elx" loading="lazy" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", left: 12, bottom: 12, background: "rgba(0,0,0,0.85)", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9 }}>03202 ELX</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 13 }}>Jaime Gómez Orts, 18</div>
          </div>
        </div>
      </section>

      {/* permisos */}
      <section style={{ padding: "20px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--escape-red)", marginBottom: 8 }}>● PERMISOS Y PRECIOS</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
          Elige <span className="escape-italic" style={{ color: "var(--escape-red)" }}>tu camino.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          {permisos.map((p, i) => (
            <a
              key={p.id}
              href="Permisos.html"
              className="escape-card"
              style={{
                textDecoration: "none",
                background: i === 0 ? "var(--escape-ink)" : "#fff",
                color: i === 0 ? "#fff" : "var(--escape-ink)",
                border: i === 0 ? "none" : "1px solid var(--escape-line)",
                borderRadius: 16,
                padding: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--escape-red)" }}>{p.tag}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 2 }}>Permiso {p.id}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{p.sub}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1, letterSpacing: "-0.03em" }}>{p.price}€</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", opacity: 0.6, marginTop: 2 }}>MATRÍCULA</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* promo banner */}
      <section style={{ padding: "0 20px 20px" }}>
        <div className="escape-card" style={{ background: "var(--escape-red)", color: "#fff", borderRadius: 20, padding: 20 }}>
          <span style={{ background: "#fff", color: "var(--escape-red)", padding: "4px 10px", borderRadius: 6, fontFamily: "var(--font-display)", fontSize: 12 }}>2+2</span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1, marginTop: 12 }}>Promo amigo</div>
          <p style={{ fontSize: 13, marginTop: 8, opacity: 0.92, lineHeight: 1.4 }}>2 prácticas gratis para ti y otras 2 para quien venga contigo.</p>
        </div>
      </section>

      {/* mapa */}
      <section style={{ padding: "0 20px 20px" }}>
        <a
          href={ESCAPE_CONTACT.MAPS_URL}
          target="_blank"
          rel="noopener"
          className="escape-map-wrap"
          style={{ display: "block", position: "relative", borderRadius: 20, overflow: "hidden", height: 200, textDecoration: "none", background: "#000" }}
          aria-label="Abrir Escape Autoescuelas en Google Maps"
        >
          <iframe
            title="Ubicación Escape Autoescuelas"
            src={ESCAPE_CONTACT.MAPS_EMBED}
            style={{ width: "100%", height: "100%", border: 0, position: "absolute", inset: 0, pointerEvents: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ position: "absolute", left: 12, bottom: 12, right: 12, background: "rgba(10,10,10,0.92)", padding: "10px 12px", borderRadius: 10, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.7)" }}>VER EN GOOGLE MAPS</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, marginTop: 2 }}>Cómo llegar</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--escape-red)" }}>→</div>
          </div>
        </a>
      </section>

      {/* contacto cta */}
      <section style={{ background: "var(--escape-ink)", color: "#fff", padding: "32px 20px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--escape-red)" }}>● HABLEMOS</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 0.95, marginTop: 8 }}>
          Ven a vernos. <span className="escape-italic" style={{ color: "var(--escape-red)" }}>Hoy.</span>
        </h2>
        <div style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6 }}>
          <a href={ESCAPE_CONTACT.MAPS_URL} target="_blank" rel="noopener" style={{ color: "#fff", textDecoration: "none" }}>
            <div><strong>Carrer Jaime Gómez Orts, 18</strong></div>
            <div style={{ opacity: 0.7 }}>03202 Elx · Alicante</div>
          </a>
          <a href={ESCAPE_CONTACT.PHONE_TEL} style={{ color: "#fff", textDecoration: "none", display: "block", marginTop: 12 }}>
            <strong>{ESCAPE_CONTACT.PHONE_DISPLAY}</strong>
          </a>
          <div style={{ opacity: 0.7 }}>L–V · 09:00–13:00 / 16:00–20:30</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
          <a
            href={ESCAPE_CONTACT.WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="escape-btn escape-btn-pulse"
            style={{ background: "var(--escape-red)", color: "#fff", border: 0, padding: "14px 20px", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center" }}
          >
            WhatsApp {ESCAPE_CONTACT.PHONE_DISPLAY}
          </a>
          <a
            href={ESCAPE_CONTACT.PHONE_TEL}
            className="escape-btn"
            style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "14px 20px", borderRadius: 999, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center" }}
          >
            Llamar
          </a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: "var(--escape-red)", color: "#fff", padding: "32px 20px 24px" }}>
        <div className="escape-italic" style={{ fontFamily: "var(--font-display)", fontSize: 72, lineHeight: 0.85 }}>ESCAPE</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: -4 }}>AUTOESCUELAS</div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.2)" }}>© 2026 · Elx · escapeautoescuelas.com</div>
      </footer>
    </div>
  );
}

const mobMenuLink = {
  color: "rgba(255,255,255,0.9)",
  fontSize: 14,
  fontWeight: 500,
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 8,
  display: "block",
};

window.MobileFrame = MobileFrame;
window.MobileHome = MobileHome;
