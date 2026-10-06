const ART = {
  publigirls: <div className="wordmark">Publigirls</div>,
  nestle:     <div className="donut" />,
  cafe:       <div className="coffee">☕<br /><small>ideias à mesa</small></div>,
}

export default function ProjectCard({ c, onClick, wide }) {
  return (
    <a
      className={`project-card${c.dark ? ' dark' : ''}${wide ? ' wide' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer', gridColumn: wide ? 'span 2' : undefined }}
    >
      <div className="project-meta">
        <span>{c.eyebrow}</span>
      </div>
      <div className="project-bottom">
        <div>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          {ART[c.slug] && <div className="project-art">{ART[c.slug]}</div>}
        </div>
        <span className="arrow">↗</span>
      </div>
    </a>
  )
}
