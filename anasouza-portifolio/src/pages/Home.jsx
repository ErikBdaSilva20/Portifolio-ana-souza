import Footer from '../components/Footer'
import { CASES_LIST } from '../data/cases'

const TAPE_ITEMS = ['ESTRATÉGIA', 'CONTEÚDO', 'CONEXÃO', 'BRANDING', 'PESSOAS']
// 4 cópias garante loop visualmente perfeito em qualquer largura de tela.
// A animação vai de 0 a -50% (= 2 cópias), então 4 cópias = sempre preenchido.
const tape = [...TAPE_ITEMS, ...TAPE_ITEMS, ...TAPE_ITEMS, ...TAPE_ITEMS]

export default function Home({ onNav }) {
  const featured = CASES_LIST.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="shell">
          <div className="hero-grid">
            <div>
              <div className="eyebrow hero-eyebrow">Publicidade · Marketing · B2C</div>
              <h1 className="hero-title">
                Marcas que<br /><em>conectam.</em>
              </h1>
              <p className="hero-sub">
                Sou Ana Julia, estudante de Publicidade e Propaganda com foco em marketing,
                conteúdo e experiências que aproximam marcas e pessoas.
              </p>
              <div className="hero-actions">
                <button className="btn btn-dark" onClick={() => onNav('projetos')}>
                  Ver projetos ↗
                </button>
                <button className="btn btn-light" onClick={() => onNav('sobre')}>
                  Conhecer meu olhar
                </button>
              </div>
            </div>
            <div className="hero-art">
              <div className="portrait-frame">
                <span className="portrait-note">São Paulo · SP</span>
              </div>
              <div className="hero-scribble">ideias com intenção</div>
              <div className="stamp">estratégia<br />+ afeto</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tape */}
      <div className="tape" aria-hidden="true">
        <div className="tape-track">
          {tape.map((t, i) => (
            <span key={i} className={i % 2 === 0 ? 'tape-a' : 'tape-b'}>{t}</span>
          ))}
        </div>
      </div>

      {/* Projetos selecionados */}
      <section className="section" id="projetos-home">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Seleção de trabalhos</div>
              <h2>Projetos<br />com propósito.</h2>
            </div>
            <p>
              Cada projeto começa com uma pergunta: como transformar uma ideia
              em uma experiência que alguém queira lembrar?
            </p>
          </div>

          <div className="projects-grid">
            {featured.map((c) => (
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
                    <p style={{ fontSize: '.875rem', marginTop: '.35rem', opacity: .7 }}>
                      {c.description}
                    </p>
                  </div>
                  <span className="arrow">↗</span>
                </div>
              </a>
            ))}
            <a
              className="project-card dark"
              onClick={() => onNav('projetos')}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-meta"><span>Arquivo completo</span></div>
              <div className="project-bottom">
                <h3>Ver todos<br />os projetos</h3>
                <span className="arrow">↗</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Sobre snippet */}
      <section className="section section-alt" id="sobre">
        <div className="shell">
          <div className="about-layout">
            <div>
              <div className="eyebrow">Um pouco sobre mim</div>
              <h2>Curiosa por natureza.<br />Estratégica por escolha.</h2>
              <div style={{ marginTop: '2rem' }}>
                <button className="btn btn-dark" onClick={() => onNav('sobre')}>
                  Saber mais sobre mim ↗
                </button>
              </div>
            </div>
            <div className="about-copy">
              <p>
                Eu acredito que uma boa comunicação nasce quando estratégia e
                sensibilidade trabalham juntas. Gosto de entender pessoas, organizar
                ideias e transformar referências em caminhos de comunicação mais
                claros, relevantes e humanos.
              </p>
              <div className="about-list">
                <div className="about-row"><strong>Marketing digital</strong><span>01</span></div>
                <div className="about-row"><strong>Branding &amp; conteúdo</strong><span>02</span></div>
                <div className="about-row"><strong>Experiência do consumidor</strong><span>03</span></div>
                <div className="about-row"><strong>Atendimento &amp; relacionamento</strong><span>04</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer id="contato" />
    </>
  )
}
