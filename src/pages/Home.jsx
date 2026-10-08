import Footer from '../components/Footer'
import anaPhoto from '../assets/Ana.jpeg'

const TAPE_ITEMS = ['ESTRATÉGIA', 'CONTEÚDO', 'CONEXÃO', 'BRANDING', 'PESSOAS']
const tape = [...TAPE_ITEMS, ...TAPE_ITEMS, ...TAPE_ITEMS, ...TAPE_ITEMS]

const LINKEDIN   = 'https://www.linkedin.com/in/ana-souza-822987342'
const INSTAGRAM  = 'https://www.instagram.com/anajuliamartineez'
const PUBLIGIRLS = 'https://chat.whatsapp.com/DXq5kfnCGQeAmTMJ2ZzVzJ'

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Home({ onNav }) {
  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="shell">
          <div className="hero-grid">

            {/* Texto — esquerda */}
            <div className="hero-copy">
              <div className="eyebrow">Publicidade &amp; Propaganda · Marketing B2C</div>
              <h1 className="hero-name">
                Ana Julia<br />
                <span className="hero-name-sub">Martinez</span>
              </h1>
              <p className="hero-tagline">
                Estratégia de comunicação que conecta marcas e pessoas.
                Branding, conteúdo e experiências que aproximam.
              </p>
              <div className="hero-contacts">
                <a href={LINKEDIN} className="hero-contact-link" target="_blank" rel="noopener noreferrer">
                  <IconLinkedIn />LinkedIn
                </a>
                <a href={INSTAGRAM} className="hero-contact-link" target="_blank" rel="noopener noreferrer">
                  <IconInstagram />Instagram
                </a>
                <a href={PUBLIGIRLS} className="hero-contact-link hero-contact-publigirls" target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp />Publigirls
                </a>
              </div>
              <div className="hero-actions">
                <button className="btn btn-dark" onClick={() => onNav('projetos')}>Ver projetos ↗</button>
                <button className="btn btn-light" onClick={() => onNav('sobre')}>Conhecer meu olhar</button>
              </div>
            </div>

            {/* Arte / foto — direita */}
            <div className="hero-art">
              <div className="hero-collage">
                <div className="hero-scribble">ideias com intenção</div>
                <div className="hero-photo-wrap">
                  <div className="hero-photo-frame">
                    <img src={anaPhoto} alt="Ana Julia Martinez" className="hero-photo" />
                  </div>
                </div>
                <div className="stamp">estratégia<br />+ intenção</div>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-value">4°</span>
                  <span className="hero-stat-label">Semestre</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">SP</span>
                  <span className="hero-stat-label">São Paulo</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">B2C</span>
                  <span className="hero-stat-label">Marketing</span>
                </div>
              </div>
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
      <section className="section section-projects" id="projetos-home">
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
            <a className="project-card" href="/case/publigirls" onClick={(event) => { event.preventDefault(); onNav('case:publigirls') }}>
              <div className="project-meta"><span>01 / Comunidade</span><span>2024</span></div>
              <div className="project-bottom">
                <div>
                  <h3>Publigirls</h3>
                  <div className="project-art"><div className="wordmark">Publigirls</div></div>
                </div>
                <span className="arrow">↗</span>
              </div>
            </a>
            <a className="project-card" href="/case/nestle" onClick={(event) => { event.preventDefault(); onNav('case:nestle') }}>
              <div className="project-meta"><span>02 / Conceito</span><span>Em construção</span></div>
              <div className="project-bottom">
                <div>
                  <h3>Marcas que ficam</h3>
                  <div className="project-art"><div className="donut" /></div>
                </div>
                <span className="arrow">↗</span>
              </div>
            </a>
            <a className="project-card" href="/case/cafe" onClick={(event) => { event.preventDefault(); onNav('case:cafe') }}>
              <div className="project-meta"><span>03 / Branding</span><span>Autoral</span></div>
              <div className="project-bottom">
                <div>
                  <h3>Café Marqueteiro</h3>
                  <div className="project-art"><div className="coffee">☕<br /><small>ideias<br />à mesa</small></div></div>
                </div>
                <span className="arrow">↗</span>
              </div>
            </a>
            <a className="project-card dark" href="/projetos" onClick={(event) => { event.preventDefault(); onNav('projetos') }}>
              <div className="project-meta"><span>Arquivo completo</span><span>↗</span></div>
              <div className="project-bottom">
                <h3>Ver todos<br />os projetos</h3>
                <span className="arrow">↗</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Sobre snippet */}
      <section className="section section-dark" id="sobre">
        <div className="shell">
          <div className="about-layout">
            <div>
              <div className="eyebrow">Um pouco sobre mim</div>
              <h2>Curiosa por natureza.<br />Estratégica por escolha.</h2>
            </div>
            <div className="about-copy">
              <p>
                Eu acredito que uma boa comunicação nasce quando estratégia e
                sensibilidade trabalham juntas.
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
