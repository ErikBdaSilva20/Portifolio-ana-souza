import cafeImg from '../assets/cafemarqueteiro/cafemarqueteiro.jpeg'

// ponytail: troque o valor de IMG_MAP[slug] pela imagem real de cada projeto quando disponível
const IMG_MAP = {
  publigirls: cafeImg,
  nestle:     cafeImg,
  cafe:       cafeImg,
}

const OVERLAY = 'linear-gradient(to bottom, rgba(0,0,0,.35) 0%, rgba(0,0,0,.6) 100%)'

export default function ProjectCard({ c, onClick, wide }) {
  const img = IMG_MAP[c.slug]
  const bgStyle = img
    ? { backgroundImage: `${OVERLAY}, url(${img})` }
    : {}

  return (
    <a
      href={`/case/${c.slug}`}
      className={`project-card${img ? ' card-img' : c.dark ? ' dark' : ''}${wide ? ' wide' : ''}`}
      onClick={(event) => { event.preventDefault(); onClick(event) }}
      style={{ gridColumn: wide ? 'span 2' : undefined, ...bgStyle }}
    >
      <div className="project-meta">
        <span>{c.eyebrow}</span>
      </div>
      <div className="project-bottom">
        <div>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </div>
        <span className="arrow">↗</span>
      </div>
    </a>
  )
}
