import { useState } from 'react'
import Footer from '../components/Footer'
import { CASES_LIST, CATEGORIES } from '../data/cases'

export default function Projetos({ onNav }) {
  const [filter, setFilter] = useState('Todos')

  const visible = filter === 'Todos'
    ? CASES_LIST
    : CASES_LIST.filter(c => c.tags.includes(filter) || c.category === filter)

  return (
    <>
      <section className="projetos-page">
        <div className="shell">
          <div className="section-head" style={{ flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <div className="eyebrow">Arquivo completo</div>
              <h1>Projetos.</h1>
            </div>
            <div className="filters" role="group" aria-label="Filtrar por categoria">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${filter === cat ? ' active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid cols-3">
            {visible.map(c => (
              <a
                key={c.slug}
                className={`project-card${c.dark ? ' dark' : ''}`}
                onClick={() => onNav(`case:${c.slug}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-meta">
                  <span>{c.eyebrow}</span>
                </div>
                <div className="project-bottom">
                  <div>
                    <h3>{c.title}</h3>
                    <p style={{ fontSize: '.875rem', marginTop: '.35rem', opacity: .7 }}>{c.description}</p>
                    <div className="tags" style={{ marginTop: '1rem' }}>
                      {c.tags.map(t => (
                        <span key={t} className={`tag${c.dark ? ' tag-dark' : ''}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className="arrow">↗</span>
                </div>
              </a>
            ))}
          </div>

          {visible.length === 0 && (
            <p style={{ opacity: .5, marginTop: '2rem' }}>Nenhum projeto nessa categoria ainda.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
