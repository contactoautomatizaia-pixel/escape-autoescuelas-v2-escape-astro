/* global React */
const { useState, useEffect, useRef } = React;

/* ============================================================
   ESCAPE — Variant C (Vibrante Rojo)
   Reveal-on-scroll · responsive · tel/wa links · accesibilidad
   ============================================================ */

/* Hook reusable: añade .is-visible al cruzar el viewport */
function useReveal(once = true) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            if (once) io.unobserve(e.target);
          } else if (!once) {
            e.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return ref;
}

/* Constantes de contacto reusables */
const PHONE_DISPLAY = "601 30 23 09";
const PHONE_TEL = "tel:+34601302309";
const WHATSAPP_URL = "https://wa.me/34601302309?text=Hola%2C%20quiero%20info%20de%20Escape%20Autoescuelas";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Carrer+Jaime+G%C3%B3mez+Orts+18+03202+Elx+Alicante";
const MAPS_EMBED = "https://www.google.com/maps?q=Carrer+Jaime+G%C3%B3mez+Orts+18+03202+Elx+Alicante&output=embed";

function VariantC({ tweak = {}, setTweak }) {
  const t = {
    primary: tweak.primary || "#C8102E",
    ink: tweak.ink || "#0A0A0A",
    paper: tweak.paper || "#F5F2EC",
    fontDisplay: tweak.fontDisplay || "Archivo Black",
    radius: tweak.radius ?? 28,
    heroLayout: tweak.heroLayout || "split",
  };

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--escape-red", t.primary);
    r.setProperty("--escape-ink", t.ink);
    r.setProperty("--escape-paper", t.paper);
    r.setProperty("--font-display", `"${t.fontDisplay}", "Anton", system-ui, sans-serif`);
  }, [t.primary, t.ink, t.paper, t.fontDisplay]);

  return (
    <div className="escape-root" style={{ ...cStyles.shell, background: t.paper }}>
      <CNav />
      <CHero layout={t.heroLayout} radius={t.radius} />
      <CStrip />
      <CPermisos radius={t.radius} />
      <CStats />
      <CProceso radius={t.radius} />
      <CTestimonios radius={t.radius} />
      <CEquipo radius={t.radius} />
      <CContacto radius={t.radius} />
      <CFooter />
    </div>
  );
}

function CNav() {
  return (
    <header style={cStyles.nav} data-c="nav">
      <a style={cStyles.brand} data-c="brand" href="index.html" aria-label="Inicio Escape Autoescuelas">
        <span className="escape-italic" style={{ color: "#fff", fontSize: 26 }}>ESCAPE</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 26, marginLeft: 6, color: "#fff" }}>AUTOESCUELAS</span>
      </a>
      <nav style={cStyles.navLinks} data-c="navLinks" aria-label="Principal">
        <a className="escape-nav-link" style={cStyles.navLink} href="Permisos.html">Permisos</a>
        <a className="escape-nav-link" style={cStyles.navLink} href="Permisos.html">Precios</a>
        <a className="escape-nav-link" style={cStyles.navLink} href="index.html#equipo">Equipo</a>
        <a className="escape-nav-link" style={cStyles.navLink} href="Contacto.html">Contacto</a>
      </nav>
      <a href="Contacto.html" className="escape-btn" style={{ ...cStyles.navCta, textDecoration: "none", display: "inline-block" }}>
        Matrícula <span className="escape-btn-arrow">→</span>
      </a>
    </header>
  );
}

function CHero({ layout, radius }) {
  const isFull = layout === "full";
  return (
    <section style={{ ...cStyles.hero, gridTemplateColumns: isFull ? "1fr" : "1.4fr 1fr" }} data-c="hero" aria-labelledby="hero-title">
      <div style={cStyles.heroBg} aria-hidden="true">
        <div className="escape-blob-anim" style={cStyles.heroBlob1} />
        <div className="escape-blob-anim-delay" style={cStyles.heroBlob2} />
        <div style={cStyles.heroGrid} />
      </div>

      <div className="escape-hero-anim" style={cStyles.heroContent}>
        <div style={cStyles.heroEyebrow}>
          <span className="escape-dot-pulse" style={cStyles.dot} aria-hidden="true" /> AUTOESCUELA · ELX · ALICANTE
        </div>

        <h1 id="hero-title" data-c="hero-title" style={cStyles.heroTitle}>
          <span style={cStyles.heroTL1}>Tu carnet,</span>
          <span style={cStyles.heroTL2}>en modo</span>
          <span style={cStyles.heroTL3} data-c="hero-tl3" className="escape-italic">ESCAPE.</span>
        </h1>

        <p style={cStyles.heroLead} data-c="hero-lead">
          Coche, moto y ciclomotor en Elx. Plataforma online, profes que se enteran de tu nombre y un <strong>89%* a la primera</strong>. Sin chorradas, sin bonos cerrados.
        </p>

        <div style={cStyles.heroCtas} data-c="hero-ctas">
          <a href="Contacto.html" className="escape-btn escape-btn-pulse" style={{ ...cStyles.btnWhite, textDecoration: "none", display: "inline-block" }}>
            Matricularme · 230€
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="escape-btn" style={{ ...cStyles.btnOutline, textDecoration: "none", display: "inline-block" }} aria-label="Escríbenos por WhatsApp">
            WhatsApp <span className="escape-btn-arrow">→</span>
          </a>
        </div>

        <div style={cStyles.heroChips}>
          <span className="escape-chip" style={cStyles.chip}>✓ Coche B · 230€</span>
          <span className="escape-chip" style={cStyles.chip}>✓ Moto A1/A2 · 180€</span>
          <span className="escape-chip" style={cStyles.chip}>✓ Ciclomotor AM · 220€</span>
          <span className="escape-chip" style={cStyles.chipAccent}>★ Promo amigo 2+2</span>
        </div>
      </div>

      {!isFull && (
        <div className="escape-hero-anim" style={cStyles.heroSide}>
          <div data-c="hero-bignum" style={{ ...cStyles.heroBigNum, borderRadius: radius - 4 }}>
            <span data-c="hero-bignum-val" style={cStyles.heroBigNumValue}>89<span style={{ fontSize: "0.5em" }}>%</span></span>
            <span style={cStyles.heroBigNumLabel}>aprobados<br/>a la 1ª*</span>
          </div>

          <div className="escape-photo-wrap" style={{ ...cStyles.heroPhotoWrap, borderRadius: radius - 4 }}>
            <img src="assets/local.jpg" alt="Local de Escape Autoescuelas en Elx" style={cStyles.heroPhoto} loading="lazy" />
            <div style={cStyles.heroPhotoTag}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}>ELX · 03202</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>Jaime Gómez Orts, 18</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CStrip() {
  const items = ["89%* APROBADOS", "★", "PRÁCTICA SUELTA 33€", "★", "PROMO AMIGO 2+2", "★", "PLATAFORMA 24/7", "★", "ELX · ALICANTE", "★"];
  const row = [...items, ...items, ...items];
  return (
    <div style={cStyles.strip} data-c="strip" aria-hidden="true">
      <div className="escape-marquee-track" style={{ fontFamily: "var(--font-display)", fontSize: 56, fontStyle: "italic", letterSpacing: "-0.02em" }}>
        {row.map((tx, i) => (
          <span key={i} style={{ marginRight: 40, color: tx === "★" ? "var(--escape-red)" : "var(--escape-ink)" }}>{tx}</span>
        ))}
      </div>
    </div>
  );
}

function CPermisos({ radius }) {
  const ref = useReveal();
  const permisos = [
    { id: "B", tag: "COCHE", title: "Permiso B", price: 230, color: "var(--escape-ink)", text: "#fff", featured: true,
      lines: ["Plataforma online incluida", "Clases teóricas + tests", "Seguimiento personal", "Práctica suelta 33€ · 45 min"], note: "Tasa DGT (2 oportunidades) · Promo amigo 2+2" },
    { id: "A2", tag: "MOTO", title: "Permiso A2", price: 180, color: "#fff", text: "var(--escape-ink)",
      lines: ["Plataforma + libro + seguimiento", "Cerrado 30€ · 30 min", "Abierto 45€ · 45 min", "Equipamiento de la casa"], note: "Tasa DGT 100€ · 2 op · Promo 2+2" },
    { id: "A1", tag: "MOTO", title: "Permiso A1", price: 180, color: "#fff", text: "var(--escape-ink)",
      lines: ["Mismo material que A2", "Cerrado 28€ · 30 min", "Abierto 42€ · 45 min", "Desde 16 años"], note: "Tasa DGT 100€ · 2 op · Promo 2+2" },
    { id: "AM", tag: "CICLOMOTOR", title: "Permiso AM", price: 220, color: "#fff", text: "var(--escape-ink)",
      lines: ["Plataforma online", "Cerrado 28€ · 30 min", "Equipamiento incluido", "Desde 15 años"], note: "Tasa DGT 100€ · 2 op" },
  ];
  return (
    <section style={cStyles.section} id="permisos" data-c="section">
      <div className="escape-reveal" style={cStyles.sectionHead}>
        <div style={cStyles.eyebrow}>● PERMISOS Y PRECIOS</div>
        <h2 style={cStyles.sectionTitle} data-c="section-title">
          Elige <span className="escape-italic" style={{ color: "var(--escape-red)" }}>tu camino</span><br/>
          y nos vemos al volante.
        </h2>
      </div>

      <div ref={ref} className="escape-reveal-stagger" style={cStyles.permGrid} data-c="permGrid">
        {permisos.map((p) => (
          <article
            key={p.id}
            className="escape-perm-card"
            style={{ ...cStyles.permCard, background: p.color, color: p.text, border: p.color === "#fff" ? "1px solid var(--escape-line)" : "none", borderRadius: radius }}
          >
            <header style={cStyles.permHead}>
              <div>
                <div style={{ ...cStyles.permTag, color: "var(--escape-red)" }}>{p.tag}</div>
                <h3 style={cStyles.permTitle}>{p.title}</h3>
              </div>
              <div style={{ ...cStyles.permIdBadge, color: p.text, opacity: p.featured ? 0.4 : 0.15 }} className="escape-italic" aria-hidden="true">{p.id}</div>
            </header>

            <div style={cStyles.permPriceRow}>
              <span style={{ ...cStyles.permPriceLabel, opacity: 0.6 }}>desde</span>
              <span style={cStyles.permPriceNum}>{p.price}€</span>
            </div>

            <ul style={cStyles.permLines}>
              {p.lines.map((l, j) => (
                <li key={j} style={cStyles.permLi}>
                  <span style={{ ...cStyles.permTick, color: "var(--escape-red)" }} aria-hidden="true">→</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>

            <div style={{ ...cStyles.permNote, borderColor: p.featured ? "rgba(255,255,255,0.15)" : "var(--escape-line)" }}>
              {p.note}
            </div>

            <a
              href="Permisos.html"
              className="escape-btn"
              style={{ ...(p.featured ? cStyles.btnRed : cStyles.btnDark), textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center" }}
              aria-label={`Ver detalle del ${p.title}`}
            >
              Ver detalle <span className="escape-perm-arrow">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function CStats() {
  const ref = useReveal();
  return (
    <section style={cStyles.statsSection} data-c="stats">
      <div ref={ref} className="escape-reveal-stagger" style={cStyles.statsRow} data-c="statsRow">
        <div style={cStyles.statCell}>
          <div style={cStyles.statNum} data-c="statNum">89%*</div>
          <div style={cStyles.statLabel}>Aprobados a la 1ª</div>
        </div>
        <div style={cStyles.statCell}>
          <div style={cStyles.statNum} data-c="statNum">+15</div>
          <div style={cStyles.statLabel}>Años en Elx</div>
        </div>
        <div style={cStyles.statCell}>
          <div style={cStyles.statNum} data-c="statNum">24/7</div>
          <div style={cStyles.statLabel}>Plataforma online</div>
        </div>
        <div style={cStyles.statCell}>
          <div style={cStyles.statNum} data-c="statNum">2+2</div>
          <div style={cStyles.statLabel}>Promo amigo</div>
        </div>
      </div>
      <div style={cStyles.statsFootnote}>* Cifra interna pendiente de confirmación final.</div>
    </section>
  );
}

function CProceso({ radius }) {
  const ref = useReveal();
  const pasos = [
    { n: "01", t: "Te matriculas online", d: "En 2 minutos. Recibes acceso inmediato a la plataforma." },
    { n: "02", t: "Estudias el teórico", d: "Vídeos + tests ilimitados + tu profe siguiendo tu progreso." },
    { n: "03", t: "Apruebas el teórico", d: "Te inscribimos en cuanto estés listo. 2 oportunidades incluidas." },
    { n: "04", t: "Empiezas las prácticas", d: "Sueltas, sin bonos cerrados. 33€ coche, 28-45€ moto." },
    { n: "05", t: "Carnet en la mano", d: "Y si traes a un amigo, 2 prácticas gratis para los dos." },
  ];
  return (
    <section style={cStyles.section} data-c="section">
      <div className="escape-reveal" style={cStyles.sectionHead}>
        <div style={cStyles.eyebrow}>● CÓMO FUNCIONA</div>
        <h2 style={cStyles.sectionTitle} data-c="section-title">Cinco pasos. <span className="escape-italic" style={{ color: "var(--escape-red)" }}>Cero rollos.</span></h2>
      </div>
      <div ref={ref} className="escape-reveal-stagger" style={cStyles.procGrid} data-c="procGrid">
        {pasos.map((p, i) => (
          <div
            key={i}
            className="escape-card"
            style={{ ...cStyles.procCard, background: i === 0 ? "var(--escape-red)" : "#fff", color: i === 0 ? "#fff" : "var(--escape-ink)", border: i === 0 ? "none" : "1px solid var(--escape-line)", borderRadius: radius - 8 }}
          >
            <div className="escape-italic" style={{ fontSize: 56, opacity: i === 0 ? 0.9 : 0.2, color: i === 0 ? "#fff" : "var(--escape-red)" }}>{p.n}</div>
            <h3 style={cStyles.procTitle}>{p.t}</h3>
            <p style={cStyles.procText}>{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTestimonios({ radius }) {
  const ref = useReveal();
  const items = [
    { n: "Lucía M.", c: "B · 19 años", q: "Saqué el teórico en 3 semanas haciendo tests en el bus. Aprobé a la primera." },
    { n: "Hassan E.", c: "A2 · 22 años", q: "Equipamiento incluido y profes que te explican como tu hermano mayor." },
    { n: "María & Joel", c: "Promo amigo", q: "Vinimos juntos, 2+2 prácticas gratis y los dos con el carnet." },
  ];
  return (
    <section style={cStyles.testSection} data-c="section">
      <div className="escape-reveal" style={cStyles.sectionHead}>
        <div style={{ ...cStyles.eyebrow, color: "rgba(255,255,255,0.7)" }}>● VOCES DE ALUMNOS</div>
        <h2 style={{ ...cStyles.sectionTitle, color: "#fff" }} data-c="section-title">
          Llegan nerviosos.<br/>
          <span className="escape-italic">Salen conduciendo.</span>
        </h2>
      </div>
      <div ref={ref} className="escape-reveal-stagger" style={cStyles.testGrid} data-c="testGrid">
        {items.map((tit, i) => (
          <figure key={i} className="escape-card" style={{ ...cStyles.testCard, borderRadius: radius - 8 }}>
            <blockquote style={cStyles.testQuote}>“{tit.q}”</blockquote>
            <figcaption style={cStyles.testCap}>
              <div style={cStyles.testAvatar} aria-hidden="true">{tit.n.charAt(0)}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#fff" }}>{tit.n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{tit.c}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CEquipo({ radius }) {
  const ref = useReveal();
  const team = [
    { n: "Aitor Sánchez", r: "Profesor · Coche y Moto" },
    { n: "Juan de Dios Sánchez", r: "Profesor · Coche y Moto" },
  ];
  return (
    <section style={cStyles.section} id="equipo" data-c="section">
      <div className="escape-reveal" style={cStyles.sectionHead}>
        <div style={cStyles.eyebrow}>● EL EQUIPO</div>
        <h2 style={cStyles.sectionTitle} data-c="section-title">Personas, no máquinas <span className="escape-italic" style={{ color: "var(--escape-red)" }}>de aprobar.</span></h2>
      </div>
      <div ref={ref} className="escape-reveal-stagger" style={cStyles.equipoGrid} data-c="equipoGrid">
        {team.map((m, i) => (
          <article key={i} className="escape-card" style={{ ...cStyles.equipoCard, borderRadius: radius - 8 }}>
            <div className="escape-placeholder" style={cStyles.equipoPhoto}>FOTO · {m.n.toUpperCase()}</div>
            <h3 style={cStyles.equipoName}>{m.n}</h3>
            <p style={cStyles.equipoRole}>{m.r}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CContacto({ radius }) {
  const ref = useReveal();
  return (
    <section style={cStyles.contacto} id="contacto" data-c="contacto">
      <div ref={ref} className="escape-reveal" style={{ ...cStyles.contactoCard, borderRadius: radius }} data-c="contactoCard">
        <div style={cStyles.contactoLeft} data-c="contactoLeft">
          <div style={cStyles.eyebrow}>● HABLEMOS</div>
          <h2 style={cStyles.contactoTitle} data-c="contactoTitle">
            Ven a vernos.<br/>
            <span className="escape-italic" style={{ color: "var(--escape-red)" }}>Sin compromiso.</span>
          </h2>
          <div style={cStyles.contactoInfo} data-c="contacto-info">
            <div>
              <strong>Carrer Jaime Gómez Orts, 18</strong><br/>
              <a href={MAPS_URL} target="_blank" rel="noopener" style={{ textDecoration: "none", color: "inherit" }}>03202 Elx · Alicante</a>
            </div>
            <div><strong>L–V · 09:00–13:00 / 16:00–20:30</strong><br/>Sábados con cita</div>
            <div><a href={PHONE_TEL} style={{ textDecoration: "none", color: "inherit" }}><strong>{PHONE_DISPLAY}</strong></a></div>
            <div><a href="https://instagram.com/escapeautoescuelas" target="_blank" rel="noopener" style={{ textDecoration: "none", color: "inherit" }}><strong>@escapeautoescuelas</strong> en Instagram</a></div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="escape-btn" style={{ ...cStyles.btnRed, textDecoration: "none", display: "inline-block" }}>WhatsApp ahora</a>
            <a href={PHONE_TEL} className="escape-btn" style={{ ...cStyles.btnDark, textDecoration: "none", display: "inline-block" }} aria-label={`Llamar al ${PHONE_DISPLAY}`}>
              Llamar {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <a href={MAPS_URL} target="_blank" rel="noopener" className="escape-map-wrap" style={{ ...cStyles.mapWrap, display: "block", position: "relative", textDecoration: "none" }} data-c="mapWrap" aria-label="Abrir ubicación en Google Maps">
          <iframe
            title="Ubicación Escape Autoescuelas"
            src={MAPS_EMBED}
            style={{ width: "100%", height: "100%", border: 0, position: "absolute", inset: 0, pointerEvents: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ position: "absolute", left: 24, bottom: 24, background: "rgba(10,10,10,0.92)", padding: "12px 16px", borderRadius: 12, color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.7)" }}>VER EN GOOGLE MAPS</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 2, color: "#fff" }}>Cómo llegar →</div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function CFooter() {
  return (
    <footer style={cStyles.footer} data-c="footer">
      <div style={cStyles.footerHero} data-c="footer-hero" className="escape-italic">ESCAPE</div>
      <div style={cStyles.footerSub} data-c="footer-sub">
        <span style={{ fontFamily: "var(--font-display)", fontSize: 64, color: "#fff" }}>AUTOESCUELAS</span>
      </div>
      <div style={cStyles.footerBot} data-c="footer-bot">
        <span>© 2026 Escape Autoescuelas · Elx</span>
        <a href={PHONE_TEL} style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>{PHONE_DISPLAY}</a>
        <span style={{ fontFamily: "var(--font-mono)" }}>escapeautoescuelas.com</span>
        <span>Aviso legal · Privacidad · Cookies</span>
      </div>
    </footer>
  );
}

const cStyles = {
  shell: { background: "var(--escape-paper)", color: "var(--escape-ink)", width: "100%", overflow: "hidden" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 56px", background: "var(--escape-ink)", color: "#fff", position: "sticky", top: 0, zIndex: 50 },
  brand: { display: "flex", alignItems: "center", textDecoration: "none" },
  navLinks: { display: "flex", gap: 28 },
  navLink: { color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, cursor: "pointer", textDecoration: "none" },
  navCta: { background: "var(--escape-red)", color: "#fff", border: 0, padding: "12px 22px", borderRadius: 999, fontWeight: 700, fontSize: 14 },

  hero: { position: "relative", padding: "80px 56px 56px", background: "var(--escape-red)", color: "#fff", display: "grid", gap: 48, overflow: "hidden", minHeight: 720 },
  heroBg: { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" },
  heroBlob1: { position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(0,0,0,0.18)", top: -200, right: -100, filter: "blur(20px)" },
  heroBlob2: { position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.12)", bottom: -100, left: 200, filter: "blur(40px)" },
  heroGrid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" },
  heroContent: { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center" },
  heroEyebrow: { display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", color: "rgba(255,255,255,0.85)" },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#fff" },
  heroTitle: { display: "flex", flexDirection: "column", marginTop: 24, fontFamily: "var(--font-display)", fontSize: 144, lineHeight: 0.92, letterSpacing: "-0.045em" },
  heroTL1: { display: "block" },
  heroTL2: { display: "block", color: "rgba(255,255,255,0.55)" },
  heroTL3: { display: "block", color: "#fff", fontSize: 168 },
  heroLead: { fontSize: 20, lineHeight: 1.5, color: "rgba(255,255,255,0.92)", marginTop: 32, maxWidth: 560 },
  heroCtas: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 },
  heroChips: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 },
  chip: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500 },
  chipAccent: { background: "#fff", color: "var(--escape-red)", padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700 },

  heroSide: { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 24 },
  heroBigNum: { background: "var(--escape-ink)", color: "#fff", padding: 32, display: "flex", alignItems: "center", gap: 24 },
  heroBigNumValue: { fontFamily: "var(--font-display)", fontSize: 120, lineHeight: 0.85, letterSpacing: "-0.04em" },
  heroBigNumLabel: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 },
  heroPhotoWrap: { position: "relative", overflow: "hidden", flex: 1, minHeight: 320 },
  heroPhoto: { width: "100%", height: "100%", objectFit: "cover" },
  heroPhotoTag: { position: "absolute", left: 16, bottom: 16, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(8px)", color: "#fff", padding: "10px 14px", borderRadius: 12, display: "flex", flexDirection: "column", gap: 2 },

  btnWhite: { background: "#fff", color: "var(--escape-red)", border: 0, padding: "16px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: "pointer" },
  btnOutline: { background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "16px 24px", borderRadius: 999, fontWeight: 600, fontSize: 15, cursor: "pointer" },
  btnRed: { background: "var(--escape-red)", color: "#fff", border: 0, padding: "16px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, marginTop: 0, cursor: "pointer" },
  btnDark: { background: "var(--escape-ink)", color: "#fff", border: 0, padding: "14px 22px", borderRadius: 999, fontWeight: 700, fontSize: 14, marginTop: 0, cursor: "pointer" },

  strip: { padding: "20px 0", overflow: "hidden", borderBottom: "1px solid var(--escape-line)" },
  section: { padding: "112px 56px" },
  sectionHead: { marginBottom: 64 },
  eyebrow: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", color: "var(--escape-red)", marginBottom: 16 },
  sectionTitle: { fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.045em", maxWidth: 1100 },

  permGrid: { display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 16 },
  permCard: { padding: 28, display: "flex", flexDirection: "column", gap: 18, minHeight: 560 },
  permHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  permTag: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", marginBottom: 6 },
  permTitle: { fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "-0.02em" },
  permIdBadge: { fontSize: 64, fontWeight: 800, lineHeight: 1 },
  permPriceRow: { display: "flex", alignItems: "baseline", gap: 12, padding: "16px 0", borderTop: "1px solid currentColor", borderBottom: "1px solid currentColor", borderColor: "rgba(128,128,128,0.2)" },
  permPriceLabel: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em" },
  permPriceNum: { fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1, letterSpacing: "-0.04em" },
  permLines: { display: "flex", flexDirection: "column", gap: 10, flex: 1 },
  permLi: { display: "flex", gap: 10, fontSize: 14, lineHeight: 1.4, alignItems: "flex-start" },
  permTick: { fontWeight: 700 },
  permNote: { fontSize: 12, lineHeight: 1.4, padding: "12px 0", borderTop: "1px solid", opacity: 0.8 },

  statsSection: { padding: "80px 56px", background: "var(--escape-ink)", color: "#fff" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 },
  statCell: { borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 24 },
  statNum: { fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 0.9, letterSpacing: "-0.04em", color: "var(--escape-red)" },
  statLabel: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", marginTop: 12 },
  statsFootnote: { marginTop: 32, fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.5)" },

  procGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 },
  procCard: { padding: 24, minHeight: 220, display: "flex", flexDirection: "column", gap: 8 },
  procTitle: { fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.02em", marginTop: "auto" },
  procText: { fontSize: 13, lineHeight: 1.5, opacity: 0.85 },

  testSection: { padding: "112px 56px", background: "var(--escape-ink)" },
  testGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  testCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240 },
  testQuote: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, lineHeight: 1.45, color: "#fff", fontWeight: 400 },
  testCap: { display: "flex", gap: 12, alignItems: "center", marginTop: 24 },
  testAvatar: { width: 40, height: 40, borderRadius: "50%", background: "var(--escape-red)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 16 },

  equipoGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 },
  equipoCard: { background: "#fff", border: "1px solid var(--escape-line)", overflow: "hidden", padding: 0 },
  equipoPhoto: { aspectRatio: "4/5", width: "100%" },
  equipoName: { fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em", padding: "20px 20px 4px" },
  equipoRole: { fontSize: 14, color: "var(--escape-ink-2)", padding: "0 20px 20px" },

  contacto: { padding: "112px 56px", background: "var(--escape-paper-2)" },
  contactoCard: { background: "#fff", overflow: "hidden", display: "grid", gridTemplateColumns: "1.2fr 1fr", border: "1px solid var(--escape-line)" },
  contactoLeft: { padding: 56 },
  contactoTitle: { fontFamily: "var(--font-display)", fontSize: 88, lineHeight: 0.95, letterSpacing: "-0.04em", marginTop: 16 },
  contactoInfo: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--escape-line)", fontSize: 15, lineHeight: 1.5 },
  mapWrap: { position: "relative", background: "var(--escape-ink)", minHeight: 480 },

  footer: { background: "var(--escape-red)", color: "#fff", padding: "80px 56px 32px", overflow: "hidden" },
  footerHero: { fontFamily: "var(--font-display)", fontSize: 280, lineHeight: 0.85, color: "#fff" },
  footerSub: { marginTop: -16 },
  footerBot: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: 64, paddingTop: 24, fontSize: 13, color: "rgba(255,255,255,0.85)" },
};

window.VariantC = VariantC;
window.CNav = CNav;
window.CFooter = CFooter;
window.useReveal = useReveal;
window.ESCAPE_CONTACT = { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, MAPS_URL, MAPS_EMBED };
