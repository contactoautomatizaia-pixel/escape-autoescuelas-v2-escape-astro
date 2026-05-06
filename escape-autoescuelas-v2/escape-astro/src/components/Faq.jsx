import { useState, useRef, useEffect } from "react";

const WHATSAPP_URL = "https://wa.me/34601302309?text=Hola%2C%20quiero%20info%20de%20Escape%20Autoescuelas";

const faqs = [
  {
    q: "¿Cuánto tiempo tarda en sacarse el carnet?",
    a: "Depende de tu ritmo. Hay quien aprueba el teórico en 3 semanas y se saca el carnet completo en 2 meses; otros lo hacen en 5–6. Tú marcas el ritmo — nosotros te seguimos.",
    tag: "Tiempo"
  },
  {
    q: "¿Qué necesito para matricularme?",
    a: "DNI o NIE en vigor, una foto tipo carnet, certificado psicotécnico (te lo gestionamos en el centro médico de al lado, 15€) y rellenar el alta. Ya está.",
    tag: "Matrícula"
  },
  {
    q: "¿Y si suspendo el examen?",
    a: "La matrícula incluye 2 exámenes DGT. Si apruebas el teórico a la primera, tienes 2 oportunidades para el práctico. Si necesitas repetir el teórico, usas una, y te queda 1 para el práctico. A partir de ahí, cada examen extra son 100€ de tasa DGT (2 oportunidades de nuevo).",
    tag: "Examen"
  },
  {
    q: "¿Puedo pagar fraccionado?",
    a: "Sí. La matrícula puede pagarse en 2 o 3 plazos. Las prácticas son sueltas, así que pagas según las necesites — sin bonos cerrados que te obliguen a comprar de más.",
    tag: "Precio"
  },
  {
    q: "¿Necesito haber estudiado algo de tráfico antes?",
    a: "No. Los manuales y vídeos de la plataforma están pensados para empezar de cero. Si tienes dudas, pregunta al profe en clase o por WhatsApp.",
    tag: "Teoría"
  },
  {
    q: "¿La plataforma online va bien en el móvil?",
    a: "Sí — móvil, tablet o portátil, lo que prefieras. Mucha gente hace los tests en el bus o en pausas del curro. Funciona 24/7.",
    tag: "Plataforma"
  },
  {
    q: "¿Vais con cita o puedo pasarme directamente?",
    a: "Pásate cuando quieras en horario L–V 10:00–14:00 / 16:00–20:30. Si es fin de semana, puedes llamarnos o escribirnos por WhatsApp sin problema.",
    tag: "Horario"
  },
];

function FaqItem({ f, i, open, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      style={{
        background: open ? "#fff" : "#fff",
        border: `1.5px solid ${open ? "var(--escape-red)" : "var(--escape-line)"}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        boxShadow: open ? "0 8px 40px -8px rgba(200,16,46,0.15)" : "none",
        transform: open ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <button
        onClick={() => onToggle(i)}
        aria-expanded={open}
        style={{
          width: "100%", textAlign: "left", padding: "22px 28px",
          background: "transparent", border: 0, cursor: "pointer",
          fontFamily: "inherit", color: "inherit",
          display: "grid", gridTemplateColumns: "1fr auto",
          alignItems: "center", gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em",
            color: "var(--escape-red)", opacity: open ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}>
            {f.tag.toUpperCase()}
          </span>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 22,
            letterSpacing: "-0.02em", lineHeight: 1.2,
            color: open ? "var(--escape-ink)" : "var(--escape-ink)",
          }}>
            {f.q}
          </span>
        </div>

        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
          background: open ? "var(--escape-red)" : "var(--escape-paper-2)",
          color: open ? "#fff" : "var(--escape-ink)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s, color 0.3s, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      <div style={{
        height: height,
        overflow: "hidden",
        transition: "height 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div ref={bodyRef} style={{ padding: "0 28px 24px" }}>
          <div style={{
            width: 32, height: 3, background: "var(--escape-red)",
            borderRadius: 999, marginBottom: 14,
            opacity: open ? 1 : 0,
            transition: "opacity 0.3s 0.15s",
          }} />
          <p style={{
            fontSize: 16, lineHeight: 1.7,
            color: "var(--escape-ink-2)", margin: 0,
          }}>
            {f.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => setOpenIdx(openIdx === i ? -1 : i);

  return (
    <section
      style={{ padding: "80px 56px", background: "var(--escape-paper)" }}
      data-c="section"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="escape-reveal" style={{ marginBottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", color: "var(--escape-red)", marginBottom: 16 }}>
            ● PREGUNTAS FRECUENTES
          </div>
          <h2
            style={{ fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.045em", margin: 0 }}
            data-c="section-title"
          >
            Lo que <span className="escape-italic" style={{ color: "var(--escape-red)" }}>te preguntas</span><br />
            antes de empezar.
          </h2>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--escape-mute)", marginBottom: 8 }}>
            {faqs.length} PREGUNTAS
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "-0.04em", color: "var(--escape-red)" }}>
            FAQ
          </div>
        </div>
      </div>

      <div
        className="escape-reveal"
        style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}
        data-c="faqList"
      >
        {faqs.map((f, i) => (
          <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <meta itemProp="name" content={f.q} />
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <meta itemProp="text" content={f.a} />
            </div>
            <FaqItem f={f} i={i} open={openIdx === i} onToggle={toggle} />
          </div>
        ))}
      </div>

      <div className="escape-reveal" style={{ maxWidth: 860, margin: "48px auto 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, padding: "28px 32px", borderRadius: 20, background: "var(--escape-ink)", color: "#fff" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em" }}>
            ¿No está tu duda aquí?
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "4px 0 0" }}>
            Te respondemos en menos de 2 minutos.
          </p>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          className="escape-btn"
          style={{
            background: "#25D366", color: "#fff", padding: "14px 24px",
            borderRadius: 999, fontWeight: 700, fontSize: 15,
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.2-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Pregúntanos por WhatsApp
        </a>
      </div>
    </section>
  );
}
