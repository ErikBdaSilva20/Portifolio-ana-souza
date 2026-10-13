import { useState } from 'react'
import Footer from '../components/Footer'
import { CASES } from '../data/cases'

function Carousel({ images }) {
  const [idx, setIdx] = useState(0)
  const img = images[idx]
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <div className="carousel">
      <div className="carousel-slide">
        <img src={img.src} alt={img.alt} className="carousel-img" style={img.fit ? { objectFit: img.fit } : undefined} />
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={prev}>←</button>
        <span className="carousel-counter">{idx + 1} / {images.length}</span>
        <button className="carousel-btn" onClick={next}>→</button>
      </div>
      {img.caption && <p className="case-gallery-caption" style={{ textAlign: 'center', marginTop: '.75rem' }}>{img.caption}</p>}
    </div>
  )
}

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

  const useCarousel = c.images?.length > 4

  return (
    <>
      <section className="case-page">
        <div className="shell">
          <button className="case-back" onClick={() => onNav('projetos')}>
            ← Voltar aos projetos
          </button>

          {c.banner && (
            <div className="case-banner">
              <img src={c.banner.src} alt={c.title} className="case-banner-img" />
              <div className="case-banner-caption">
                <span className="case-banner-arrow">↑</span>
                <p>{c.banner.caption}</p>
              </div>
            </div>
          )}

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

          {c.images?.length > 0 && (
            useCarousel ? (
              <Carousel images={c.images} />
            ) : (
              <div className="case-gallery">
                {c.images.map((img, i) => (
                  <div key={i} className="case-gallery-item">
                    <img src={img.src} alt={img.alt} className="case-gallery-img" style={img.fit ? { objectFit: img.fit } : undefined} />
                    {img.caption && <p className="case-gallery-caption">{img.caption}</p>}
                  </div>
                ))}
              </div>
            )
          )}

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
