import Footer from '../components/Footer'

const SKILLS = [
  'Marketing digital',
  'Branding',
  'Conteúdo para redes sociais',
  'Estratégia de comunicação',
  'Experiência do consumidor',
  'Atendimento e relacionamento',
  'Organização de processos',
  'Fotografia publicitária',
  'Pesquisa de referências',
  'Direção criativa em formação',
]

export default function Sobre({ onNav }) {
  return (
    <>
      <section className="sobre-page">
        <div className="shell">
          <div className="sobre-hero">
            <div>
              <div className="eyebrow">Sobre mim</div>
              <h1>Curiosa por natureza.<br />Estratégica por escolha.</h1>
            </div>
            <div>
              <div className="portrait-frame" style={{ height: '320px' }}>
                <span className="portrait-note">São Paulo · SP</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div>
              <div className="eyebrow">Quem sou eu</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
                Comunicação que aproxima.
              </h2>
              <p style={{ lineHeight: 1.8, color: 'var(--cacau-q)', marginBottom: '1.25rem' }}>
                Eu acredito que uma boa comunicação nasce quando estratégia e sensibilidade
                trabalham juntas. Gosto de entender pessoas, organizar ideias e transformar
                referências em caminhos de comunicação mais claros, relevantes e humanos.
              </p>
              <p style={{ lineHeight: 1.8, color: 'var(--cacau-q)' }}>
                Sou fundadora da <strong>Publigirls</strong>, comunidade que conecta e apoia
                mulheres da área de comunicação. Nela, aprendi na prática como construir marca,
                conteúdo e comunidade do zero.
              </p>

              <div className="formacao-block">
                <div className="eyebrow" style={{ marginBottom: '.5rem' }}>Formação</div>
                <h3>Publicidade e Propaganda</h3>
                <p>4º semestre · São Paulo, SP</p>
                <p style={{ marginTop: '.5rem', fontSize: '.85rem' }}>
                  Foco em Marketing, Branding e Comportamento do Consumidor
                </p>
              </div>
            </div>

            <div>
              <div className="eyebrow">Competências</div>
              <div className="skills-grid">
                {SKILLS.map((s, i) => (
                  <div key={s} className="skill-item">
                    <span className="skill-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--linha)' }}>
            <div className="eyebrow">Próximo passo?</div>
            <h2 style={{ maxWidth: '20ch', marginBlock: '1rem 2rem' }}>
              Aberta a conexões,<br />parcerias e bons projetos.
            </h2>
            <button className="btn btn-dark" onClick={() => onNav('contato')}>
              Vamos conversar ↗
            </button>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  )
}
