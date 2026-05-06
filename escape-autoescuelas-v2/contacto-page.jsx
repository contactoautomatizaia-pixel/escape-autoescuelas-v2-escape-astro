/* global React, CNav, CFooter, ESCAPE_CONTACT */
const { useState } = React;

/* ============================================================
   ESCAPE — Página Contacto
   Formulario con validación + envío vía mailto (zero-backend)
   Tip: para producción, sustituir el handler por Formspree/Resend
   poniendo la URL en `FORM_ENDPOINT` y descomentando el fetch().
   ============================================================ */

const FORM_ENDPOINT = ""; // ej: "https://formspree.io/f/xxxxxxx"
const TARGET_EMAIL = "info@escapeautoescuelas.com"; // fallback mailto

function ContactoPage() {
  const reveal1 = window.useReveal ? window.useReveal() : { current: null };
  const reveal2 = window.useReveal ? window.useReveal() : { current: null };
  const reveal3 = window.useReveal ? window.useReveal() : { current: null };

  return (
    <div className="escape-root" style={{ background: "var(--escape-paper)", color: "var(--escape-ink)", width: "100%", overflow: "hidden" }}>
      <CNav />

      <section
        ref={reveal1}
        className="escape-reveal"
        style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}
        data-c="contactoFormGrid"
      >
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", color: "var(--escape-red)", marginBottom: 16 }}>● HABLEMOS</div>
          <h1
            style={{ fontFamily: "var(--font-display)", fontSize: 120, lineHeight: 0.92, letterSpacing: "-0.045em" }}
            data-c="contactoFormTitle"
          >
            Pásate o<br/>
            <span className="escape-italic" style={{ color: "var(--escape-red)" }}>escríbenos.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--escape-ink-2)", marginTop: 24, maxWidth: 520 }}>
            Te resolvemos dudas, te enseñamos el local y te explicamos lo que mejor te encaja. Sin compromiso, sin venderte nada raro.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--escape-line)" }} data-c="contacto-info">
            <InfoBlock label="DIRECCIÓN">
              <a
                href={ESCAPE_CONTACT.MAPS_URL}
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <strong>Carrer Jaime Gómez Orts, 18</strong><br/>
                03202 Elx · Alicante
              </a>
            </InfoBlock>
            <InfoBlock label="TELÉFONO / WHATSAPP">
              <a href={ESCAPE_CONTACT.PHONE_TEL} style={{ textDecoration: "none", color: "inherit" }}>
                <strong>{ESCAPE_CONTACT.PHONE_DISPLAY}</strong>
              </a>
            </InfoBlock>
            <InfoBlock label="HORARIO">
              <strong>L–V</strong> · 09:00–13:00 / 16:00–20:30<br/>
              <strong>Sábados</strong> con cita previa
            </InfoBlock>
            <InfoBlock label="REDES">
              <a href="https://instagram.com/escapeautoescuelas" target="_blank" rel="noopener" style={{ textDecoration: "none", color: "inherit" }}>
                <strong>@escapeautoescuelas</strong><br/>
                en Instagram
              </a>
            </InfoBlock>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
            <a
              href={ESCAPE_CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="escape-btn escape-btn-pulse"
              style={{ background: "var(--escape-red)", color: "#fff", padding: "16px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block" }}
            >
              WhatsApp ahora
            </a>
            <a
              href={ESCAPE_CONTACT.PHONE_TEL}
              className="escape-btn"
              style={{ background: "transparent", color: "var(--escape-ink)", border: "1.5px solid var(--escape-ink)", padding: "16px 24px", borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-block" }}
              aria-label={`Llamar al ${ESCAPE_CONTACT.PHONE_DISPLAY}`}
            >
              Llamar {ESCAPE_CONTACT.PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <ContactForm />
      </section>

      <section ref={reveal2} className="escape-reveal" style={{ padding: "0 56px 80px" }} data-c="contactoMapaSection">
        <a
          href={ESCAPE_CONTACT.MAPS_URL}
          target="_blank"
          rel="noopener"
          className="escape-map-wrap"
          style={{ display: "block", position: "relative", aspectRatio: "16/6", borderRadius: 28, overflow: "hidden", background: "var(--escape-ink)", textDecoration: "none" }}
          aria-label="Abrir Escape Autoescuelas en Google Maps"
        >
          <iframe
            title="Ubicación Escape Autoescuelas"
            src={ESCAPE_CONTACT.MAPS_EMBED}
            style={{ width: "100%", height: "100%", border: 0, position: "absolute", inset: 0, pointerEvents: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ position: "absolute", left: 32, bottom: 32, background: "rgba(10,10,10,0.92)", padding: "16px 20px", borderRadius: 12, color: "#fff", display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>VER EN GOOGLE MAPS</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, marginTop: 4 }}>Escape Autoescuelas</div>
              <div style={{ fontSize: 13, marginTop: 4, opacity: 0.85 }}>Carrer Jaime Gómez Orts, 18 · 03202 Elx</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--escape-red)", marginLeft: 12 }}>→</div>
          </div>
        </a>
      </section>

      <CFooter />
    </div>
  );
}

/* -------------------- Sub-componentes -------------------- */

function InfoBlock({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", color: "var(--escape-mute)" }}>{label}</div>
      <div style={{ fontSize: 16, marginTop: 8, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [values, setValues] = useState({
    nombre: "",
    telefono: "",
    permiso: "Coche B",
    cuando: "",
    mensaje: "",
    consent: false,
    /* honeypot anti-bots */
    website: "",
  });

  const upd = (k) => (e) =>
    setValues((v) => ({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  function buildBody() {
    return [
      `Nombre: ${values.nombre}`,
      `Teléfono: ${values.telefono}`,
      `Permiso de interés: ${values.permiso}`,
      `Cuándo empezar: ${values.cuando}`,
      "",
      "Mensaje:",
      values.mensaje || "(sin mensaje)",
    ].join("\n");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (values.website) return; // honeypot
    if (!values.nombre.trim() || !values.telefono.trim() || !values.consent) {
      setStatus({ state: "error", msg: "Rellena nombre, teléfono y acepta la política." });
      return;
    }
    /* Validación teléfono ES (9 dígitos, opcional +34) */
    const cleaned = values.telefono.replace(/[\s.\-()]/g, "");
    if (!/^(\+?34)?[6789]\d{8}$/.test(cleaned)) {
      setStatus({ state: "error", msg: "Revisa el teléfono — formato español (9 dígitos)." });
      return;
    }

    setStatus({ state: "sending", msg: "Enviando…" });

    try {
      if (FORM_ENDPOINT) {
        /* Producción: Formspree / Resend / endpoint propio */
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Form error");
        setStatus({ state: "success", msg: "¡Recibido! Te llamamos en menos de 24h." });
      } else {
        /* Fallback sin backend: abre el cliente de email del usuario */
        const subject = encodeURIComponent(`Web · Info ${values.permiso} · ${values.nombre}`);
        const body = encodeURIComponent(buildBody());
        window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
        setStatus({ state: "success", msg: "Abrimos tu cliente de email para que envíes la solicitud. ¿Prefieres WhatsApp? Es más rápido." });
      }
    } catch (err) {
      setStatus({ state: "error", msg: "Algo ha fallado. Prueba por WhatsApp al " + ESCAPE_CONTACT.PHONE_DISPLAY + "." });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ background: "#fff", border: "1px solid var(--escape-line)", borderRadius: 28, padding: 40, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "-0.02em" }}>Pide info</div>
      <p style={{ fontSize: 14, color: "var(--escape-ink-2)" }}>Te llamamos sin compromiso en menos de 24h.</p>

      {/* honeypot oculto, sin label, sin tab */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={upd("website")}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <Field label="Nombre" placeholder="Tu nombre" value={values.nombre} onChange={upd("nombre")} required />
      <Field label="Teléfono" placeholder="6XX XX XX XX" type="tel" value={values.telefono} onChange={upd("telefono")} required inputMode="tel" autoComplete="tel" />
      <Select
        label="Permiso que te interesa"
        value={values.permiso}
        onChange={upd("permiso")}
        options={["Coche B", "Moto A1", "Moto A2", "Moto A", "Ciclomotor AM", "No lo tengo claro"]}
      />
      <Field label="Cuándo te vendría bien empezar" placeholder="Esta semana, el mes que viene…" value={values.cuando} onChange={upd("cuando")} />

      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--escape-mute)" }}>MENSAJE (OPCIONAL)</span>
        <textarea
          rows={3}
          placeholder="Cuéntanos cualquier duda"
          value={values.mensaje}
          onChange={upd("mensaje")}
          className="escape-textarea"
          style={{ border: "1px solid var(--escape-line)", borderRadius: 12, padding: "12px 14px", fontSize: 15, fontFamily: "inherit", resize: "vertical", outline: "none" }}
        />
      </label>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.4, color: "var(--escape-ink-2)" }}>
        <input
          type="checkbox"
          checked={values.consent}
          onChange={upd("consent")}
          style={{ marginTop: 3, accentColor: "var(--escape-red)" }}
          required
        />
        <span>
          He leído la <a href="#" style={{ color: "var(--escape-red)" }}>política de privacidad</a> y acepto que me llaméis solo para resolver mi duda.
        </span>
      </label>

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="escape-btn"
        style={{
          background: status.state === "sending" ? "var(--escape-mute)" : "var(--escape-ink)",
          color: "#fff",
          border: 0,
          padding: "16px 24px",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 15,
          marginTop: 8,
          cursor: status.state === "sending" ? "not-allowed" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {status.state === "sending" ? "Enviando…" : <>Enviar <span className="escape-btn-arrow">→</span></>}
      </button>

      {status.msg && (
        <div
          role="status"
          aria-live="polite"
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            padding: "10px 14px",
            borderRadius: 10,
            background: status.state === "error" ? "rgba(200,16,46,0.08)" : status.state === "success" ? "rgba(16,160,80,0.10)" : "var(--escape-paper-2)",
            color: status.state === "error" ? "var(--escape-red-deep)" : "var(--escape-ink)",
            border: "1px solid " + (status.state === "error" ? "rgba(200,16,46,0.25)" : "var(--escape-line)"),
            animation: "escape-fade-in 0.3s var(--ease-out) both",
          }}
        >
          {status.msg}
        </div>
      )}

      <p style={{ fontSize: 12, color: "var(--escape-mute)", lineHeight: 1.4 }}>
        ¿Prefieres hablar ya? <a href={ESCAPE_CONTACT.WHATSAPP_URL} target="_blank" rel="noopener" style={{ color: "var(--escape-red)", fontWeight: 600 }}>Escríbenos por WhatsApp →</a>
      </p>
    </form>
  );
}

function Field({ label, placeholder, type = "text", value, onChange, required, inputMode, autoComplete }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--escape-mute)" }}>
        {label.toUpperCase()}{required && <span style={{ color: "var(--escape-red)" }}> *</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="escape-input"
        style={{ border: "1px solid var(--escape-line)", borderRadius: 12, padding: "12px 14px", fontSize: 15, fontFamily: "inherit", outline: "none" }}
      />
    </label>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--escape-mute)" }}>{label.toUpperCase()}</span>
      <select
        value={value}
        onChange={onChange}
        className="escape-select"
        style={{ border: "1px solid var(--escape-line)", borderRadius: 12, padding: "12px 14px", fontSize: 15, fontFamily: "inherit", background: "#fff", outline: "none" }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

window.ContactoPage = ContactoPage;
