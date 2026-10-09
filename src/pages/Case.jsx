import Footer from '../components/Footer'
import { CASES } from '../data/cases'

export default function Case({ slug, onNav }) {
  const c = CASES[slug]

  if (!c) {
    return (
      <section className="case-page">
        <div className="shell">
          <p>Case não encontrado.</p>
          <button className="btn btn-dark" onClick={() => onNav('projetos')} style={{ marginTop: '1rem' }}>
            ← Ver projetos
          </button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="case-page">
        <div className="shell">
          <button className="case-back" onClick={() => onNav('projetos')}>
            ← Voltar aos projetos
          </button>

          <div className="eyebrow">{c.eyebrow}</div>
          <h1 style={{ marginBlock: '.5rem 1.25rem' }}>{c.title}</h1>

          <div className="tags" style={{ marginBottom: '1.75rem' }}>
            {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          <p style={{ fontSize: '1.1rem', maxWidth: '60ch', lineHeight: 1.75, color: 'var(--cacau-q)' }}>
            {c.description}
          </p>

          <div className="case-grid">
            <div className="case-block">
              <h4>Contexto</h4>
              <p>{c.context}</p>
              {c.note && <div className="case-note">⚠ {c.note}</div>}
            </div>
            <div className="case-block">
              <h4>Atuação</h4>
              <p>{c.role}</p>
            </div>
            <div className="case-block">
              <h4>Entregas</h4>
              <ul>
                {c.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>

          <div className="case-actions">
            <button className="btn btn-dark" onClick={() => onNav('projetos')}>
              Ver outros projetos
            </button>
            <button className="btn btn-light" onClick={() => onNav('contato')}>
              Entrar em contato ↗
            </button>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  )
}
