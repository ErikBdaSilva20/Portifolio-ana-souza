import Footer from '../components/Footer'

const SKILLS = [
  'Marketing digital',
  'Branding',
  'Conteúdo para redes sociais',
  'Estratégia de comunicação',
  'Experiência do consumidor',
  'Atendimento e relacionamento',
  'Organização de processos',
  'Tom de voz de marca',
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

          <div className="sobre-content">
            <div className="sobre-bio">
              <div className="eyebrow">Quem sou eu</div>
              <h2 className="sobre-bio-title">Comunicação que aproxima.</h2>

              <p>
                Sou profissional autônoma na área da comunicação, com formação em Publicidade e
                Propaganda com ênfase em Marketing, e acredito no
                poder da comunicação para criar conexões entre marcas e pessoas. Tenho interesse
                por branding, comportamento do consumidor e experiências que unem criatividade e
                estratégia.
              </p>
              <p>
                Gosto de acompanhar tendências, explorar novas tecnologias e buscar referências
                em áreas como design, moda e comunicação — com o objetivo de construir uma
                carreira voltada para a experiência do consumidor e o desenvolvimento de marcas
                relevantes. Sou também fundadora da <strong>Publigirls</strong>, comunidade que
                conecta e apoia mulheres da área de comunicação.
              </p>
              <p>
                De 20/07/2026 a 16/10/2026, atuei no atendimento da área de comunicação para
                marcas do grupo Nestlé — entre
                elas <strong>Garoto</strong>, <strong>KitKat</strong> e Nestlé Chocolates —
                principalmente na linha de frente dos feedbacks negativos e reclamações, além da
                sugestão de produtos. Cada resposta precisava resolver o problema do consumidor e
                soar como a marca: foi ali que aprendi a trabalhar tom de voz na prática, com a
                marca sob pressão.
              </p>
              <p>
                Antes de mergulhar de cabeça no marketing, trabalhei como auxiliar administrativa
                em uma empresa de sistemas e planos de saúde. Atuei no SAC e no suporte
                administrativo — resolvendo demandas, organizando processos e me comunicando com
                os mais variados perfis de clientes. Foi lá que desenvolvi escuta ativa, empatia
                e a habilidade de encontrar soluções com calma e objetividade.
              </p>
              <p>
                Essa combinação — formação em comunicação mais vivência em rotinas operacionais —
                é o que me diferencia. Tenho disciplina, atenção a detalhes e facilidade para
                estruturar informações, mas também uma visão estratégica que identifica melhorias
                e enxerga a comunicação como parte do processo, não um apêndice dele.
              </p>
              <p>
                Aprendo rápido, me adapto bem e entrego com consistência. Estou em desenvolvimento
                contínuo — e é exatamente por isso que estou sempre buscando o próximo nível.
              </p>

            </div>

            <div className="sobre-col-right">
              <div className="formacao-block">
                <div className="eyebrow" style={{ marginBottom: '.5rem' }}>Formação Acadêmica</div>
                <h3>Publicidade e Propaganda — Marketing</h3>
                <p>4º semestre · Universidade Pitágoras Unopar Anhanguera · São Paulo, SP</p>
                <p style={{ marginTop: '.5rem', fontSize: '.85rem' }}>
                  Comunicação integrada, comportamento do consumidor, branding e planejamento de campanhas.
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
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
          </div>

        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  )
}
