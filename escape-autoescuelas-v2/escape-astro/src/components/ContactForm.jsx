import { useState } from "react";

// ⚠️  IMPORTANTE: Sustituye la URL por tu endpoint real de Formspree
// 1. Ve a formspree.io → New Form
// 2. Copia la URL tipo https://formspree.io/f/xxxxxxx
// 3. Pégala aquí abajo
const FORM_ENDPOINT = "https://formspree.io/f/mvzlppbw";
const TARGET_EMAIL = "info@escapeautoescuelas.com";
const WHATSAPP_URL = "https://wa.me/34601302309?text=Hola%2C%20quiero%20info%20de%20Escape%20Autoescuelas";

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

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [values, setValues] = useState({
    nombre: "", telefono: "", permiso: "Coche B", cuando: "", mensaje: "", consent: false, website: "",
  });

  const upd = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  function buildBody() {
    return [
      `Nombre: ${values.nombre}`,
      `Teléfono: ${values.telefono}`,
      `Permiso de interés: ${values.permiso}`,
      `Cuándo empezar: ${values.cuando}`,
      "", "Mensaje:", values.mensaje || "(sin mensaje)",
    ].join("\n");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (values.website) return; // honeypot
    if (!values.nombre.trim() || !values.telefono.trim() || !values.consent) {
      setStatus({ state: "error", msg: "Rellena nombre, teléfono y acepta la política." });
      return;
    }
    const cleaned = values.telefono.replace(/[\s.\-()]/g, "");
    if (!/^(\+?34)?[6789]\d{8}$/.test(cleaned)) {
      setStatus({ state: "error", msg: "Revisa el teléfono — formato español (9 dígitos)." });
      return;
    }
    setStatus({ state: "sending", msg: "Enviando…" });
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Form error");
        setStatus({ state: "success", msg: "¡Recibido! Te llamamos en menos de 24h." });
      } else {
        const subject = encodeURIComponent(`Web · Info ${values.permiso} · ${values.nombre}`);
        const body = encodeURIComponent(buildBody());
        window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
        setStatus({ state: "success", msg: "Abrimos tu cliente de email. ¿Prefieres WhatsApp? Es más rápido." });
      }
    } catch {
      setStatus({ state: "error", msg: "Algo ha fallado. Prueba por WhatsApp." });
    }
  }

  // ── Estado de éxito animado ────────────────────────────────────────────────
  if (status.state === "success") {
    const firstName = values.nombre ? values.nombre.trim().split(" ")[0] : null;
    return (
      <>
        <style>{`
          @keyframes circleAnim {
            from { stroke-dashoffset: 166; opacity: 0; }
            to   { stroke-dashoffset: 0;   opacity: 1; }
          }
          @keyframes tickAnim {
            0%   { stroke-dashoffset: 48; }
            60%  { stroke-dashoffset: 48; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes successFadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .success-circle { stroke-dasharray: 166; animation: circleAnim 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
          .success-tick   { stroke-dasharray: 48;  animation: tickAnim   0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
          .success-body   { animation: successFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
        `}</style>
        <div style={{ background: "#fff", border: "1px solid var(--escape-line)", borderRadius: 28, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20, minHeight: 380, justifyContent: "center" }}>
          {/* Checkmark animado */}
          <svg width="80" height="80" viewBox="0 0 52 52" fill="none" aria-hidden="true">
            <circle className="success-circle" cx="26" cy="26" r="25" stroke="var(--escape-red)" strokeWidth="1.5"/>
            <path className="success-tick" d="M14 27l9 9 15-18" stroke="var(--escape-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Texto */}
          <div className="success-body">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 34, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {firstName ? <>¡Listo, <span style={{ color: "var(--escape-red)" }}>{firstName}</span>!</> : "¡Recibido!"}
            </div>
            <p style={{ fontSize: 16, color: "var(--escape-ink-2)", margin: "12px 0 0", lineHeight: 1.65, maxWidth: 340 }}>
              Te llamamos en menos de 24h. Si necesitas algo antes, estamos en WhatsApp ahora mismo.
            </p>
          </div>
          {/* Botón WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="success-body"
            style={{ background: "#25D366", color: "#fff", padding: "14px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, animationDelay: "0.75s" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.2-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Escribir por WhatsApp
          </a>
        </div>
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ background: "#fff", border: "1px solid var(--escape-line)", borderRadius: 28, padding: 40, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "-0.02em" }}>Pide info</div>
      <p style={{ fontSize: 14, color: "var(--escape-ink-2)", margin: 0 }}>Te llamamos sin compromiso en menos de 24h.</p>

      {/* Honeypot anti-spam */}
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
        <input type="checkbox" checked={values.consent} onChange={upd("consent")} style={{ marginTop: 3, accentColor: "var(--escape-red)" }} required />
        <span>
          He leído la <a href="/legal/politica-privacidad.html" style={{ color: "var(--escape-red)" }}>política de privacidad</a> y acepto que me llaméis solo para resolver mi duda.
        </span>
      </label>

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="escape-btn"
        style={{ background: status.state === "sending" ? "var(--escape-mute)" : "var(--escape-ink)", color: "#fff", border: 0, padding: "16px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, marginTop: 8, cursor: status.state === "sending" ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        {status.state === "sending" ? "Enviando…" : <>Enviar <span className="escape-btn-arrow">→</span></>}
      </button>

      {/* Solo mostramos errores inline; el éxito ya tiene pantalla completa */}
      {status.msg && status.state === "error" && (
        <div
          role="alert"
          aria-live="polite"
          style={{ fontSize: 13, lineHeight: 1.5, padding: "10px 14px", borderRadius: 10, background: "rgba(200,16,46,0.08)", color: "var(--escape-red)", border: "1px solid rgba(200,16,46,0.25)" }}
        >
          {status.msg}
        </div>
      )}

      <p style={{ fontSize: 12, color: "var(--escape-mute)", lineHeight: 1.4, margin: 0 }}>
        ¿Prefieres hablar ya?{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" style={{ color: "var(--escape-red)", fontWeight: 600 }}>Escríbenos por WhatsApp →</a>
      </p>
    </form>
  );
}
