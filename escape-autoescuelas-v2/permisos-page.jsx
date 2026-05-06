/* global React, CNav, CFooter, ESCAPE_CONTACT */

function PermisosPage() {
  const heroRef = window.useReveal ? window.useReveal() : { current: null };
  const cardsRef = window.useReveal ? window.useReveal() : { current: null };
  const ctaRef = window.useReveal ? window.useReveal() : { current: null };

  const detalles = [
    {
      id: "B", tag: "COCHE", title: "Permiso B",
      sub: "El más solicitado · desde 18 años · automóviles hasta 3.500 kg",
      matricula: 230,
      practica: "33€ · 45 min",
      tasa: "Tasa DGT incluida (2 oportunidades)",
      incluye: ["Acceso a la plataforma online 24/7", "Clases teóricas dentro de la plataforma", "Tests ilimitados", "Posibilidad de hacer test en la autoescuela", "Seguimiento personal de tu profesor"],
      promo: "Promo amigo: 2 prácticas gratis para ti + 2 para quien venga contigo",
      featured: true,
    },
    {
      id: "A2", tag: "MOTO", title: "Permiso A2",
      sub: "Hasta 35 kW · desde 18 años",
      matricula: 180,
      practica: "Cerrado 30€ · 30 min   /   Abierto 45€ · 45 min",
      tasa: "Tasa DGT 100€ · 2 oportunidades",
      incluye: ["Plataforma online + libro", "Posibilidad de venir a hacer los tests", "Seguimiento personal", "Equipamiento incluido en circuito abierto"],
      promo: "Promo amigo 2+2 incluida",
    },
    {
      id: "A1", tag: "MOTO", title: "Permiso A1",
      sub: "Motos 125 cc · desde 16 años",
      matricula: 180,
      practica: "Cerrado 28€ · 30 min   /   Abierto 42€ · 45 min",
      tasa: "Tasa DGT 100€ · 2 oportunidades",
      incluye: ["Mismo material que el A2", "Plataforma online + libro", "Equipamiento incluido", "Seguimiento personal"],
      promo: "Promo amigo 2+2 incluida",
    },
    {
      id: "AM", tag: "CICLOMOTOR", title: "Permiso AM",
      sub: "Desde 15 años · ciclomotor",
      matricula: 220,
      practica: "Cerrado 28€ · 30 min",
      tasa: "Tasa DGT 100€ · 2 oportunidades",
      incluye: ["Acceso a plataforma online", "Equipamiento de la casa incluido", "Para empezar antes que nadie"],
      promo: "Equipamiento de la casa siempre",
    },
  ];

  return (
    <div className="escape-root" style={{ background: "var(--escape-paper)", color: "var(--escape-ink)", width: "100%", overflow: "hidden" }}>
      <CNav />

      <section
        ref={heroRef}
        className="escape-reveal"
        data-c="permisosHero"
        style={{ padding: "80px 56px 56px", background: "var(--escape-red)", color: "#fff", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="escape-blob-anim" aria-hidden="true" style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(0,0,0,0.18)", top: -180, right: -80, filter: "blur(20px)" }} />
        <div style={{ position: "relative", maxWidth: 1100 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 16 }}>● PERMISOS Y PRECIOS · DETALLE</div>
          <h1 data-c="permisosHeroTitle" style={{ fontFamily: "var(--font-display)", fontSize: 132, lineHeight: 0.92, letterSpacing: "-0.045em" }}>
            Todos los <span className="escape-italic">precios</span>,<br/>
            sin letra pequeña.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.5, marginTop: 24, maxWidth: 720, opacity: 0.92 }}>
            Matrícula clara, tasas explicadas y prácticas sueltas. Sin bonos cerrados ni sorpresas en la factura.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 56px" }} data-c="section">
        <div ref={cardsRef} className="escape-reveal-stagger" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {detalles.map((p) => (
            <article
              key={p.id}
              className="escape-perm-card"
              data-c="permisosCard"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 360px",
                gap: 48,
                padding: "40px 48px",
                borderRadius: 28,
                background: p.featured ? "var(--escape-ink)" : "#fff",
                color: p.featured ? "#fff" : "var(--escape-ink)",
                border: p.featured ? "none" : "1px solid var(--escape-line)",
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", color: "var(--escape-red)" }}>{p.tag}</div>
                <h2 data-c="permisosCardTitle" style={{ fontFamily: "var(--font-display)", fontSize: 64, letterSpacing: "-0.03em", marginTop: 8 }}>{p.title}</h2>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, opacity: 0.8, marginTop: 8 }}>{p.sub}</p>

                <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${p.featured ? "rgba(255,255,255,0.15)" : "var(--escape-line)"}` }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", opacity: 0.6, marginBottom: 12 }}>QUÉ INCLUYE LA MATRÍCULA</div>
                  <ul data-c="permisosIncluyeList" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", listStyle: "none", padding: 0, margin: 0 }}>
                    {p.incluye.map((i, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.4 }}>
                        <span aria-hidden="true" style={{ color: "var(--escape-red)", fontWeight: 700 }}>→</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 24, padding: 16, background: p.featured ? "rgba(255,255,255,0.06)" : "var(--escape-paper-2)", borderRadius: 12, fontSize: 14, display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ background: "var(--escape-red)", color: "#fff", padding: "4px 10px", borderRadius: 6, fontFamily: "var(--font-display)", fontSize: 13 }}>2+2</span>
                  <span>{p.promo}</span>
                </div>
              </div>

              <aside
                data-c={p.featured ? "permisosCardAside-dark" : "permisosCardAside"}
                style={{ borderLeft: `1px solid ${p.featured ? "rgba(255,255,255,0.15)" : "var(--escape-line)"}`, paddingLeft: 32, display: "flex", flexDirection: "column" }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", opacity: 0.6 }}>MATRÍCULA</div>
                <div data-c="permisosCardPrice" style={{ fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 0.9, letterSpacing: "-0.04em", marginTop: 8 }}>{p.matricula}€</div>

                <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px dashed ${p.featured ? "rgba(255,255,255,0.15)" : "var(--escape-line)"}` }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", opacity: 0.6 }}>PRÁCTICAS</div>
                  <div style={{ fontSize: 16, marginTop: 6, lineHeight: 1.4 }}>{p.practica}</div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", opacity: 0.6 }}>TASAS</div>
                  <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.4 }}>{p.tasa}</div>
                </div>

                <a
                  href="Contacto.html"
                  className="escape-btn"
                  style={{ marginTop: "auto", background: "var(--escape-red)", color: "#fff", border: 0, padding: "16px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  aria-label={`Matricularme en el ${p.title}`}
                >
                  Matricularme en {p.id} <span className="escape-perm-arrow">→</span>
                </a>
              </aside>
            </article>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="escape-reveal"
          data-c="permisosBottomCta"
          style={{ marginTop: 56, padding: "32px 40px", borderRadius: 24, background: "var(--escape-paper-2)", border: "1px solid var(--escape-line)", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 32 }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "-0.02em" }}>¿Dudas con tu permiso?</div>
            <p style={{ fontSize: 16, color: "var(--escape-ink-2)", marginTop: 8 }}>Te lo aclaramos por WhatsApp en 2 minutos. Sin compromiso, sin venderte nada raro.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a
              href={ESCAPE_CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="escape-btn"
              style={{ background: "var(--escape-ink)", color: "#fff", padding: "16px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none" }}
            >
              WhatsApp {ESCAPE_CONTACT.PHONE_DISPLAY}
            </a>
            <a
              href={ESCAPE_CONTACT.PHONE_TEL}
              className="escape-btn"
              style={{ background: "transparent", color: "var(--escape-ink)", border: "1.5px solid var(--escape-ink)", padding: "16px 24px", borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: "none" }}
              aria-label={`Llamar al ${ESCAPE_CONTACT.PHONE_DISPLAY}`}
            >
              Llamar
            </a>
          </div>
        </div>
      </section>

      <CFooter />
    </div>
  );
}

window.PermisosPage = PermisosPage;
