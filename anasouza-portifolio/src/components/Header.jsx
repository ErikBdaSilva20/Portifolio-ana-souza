import { useState } from 'react'

export default function Header({ onNav }) {
  const [open, setOpen] = useState(false)
  const go = (hash) => { onNav(hash); setOpen(false) }

  return (
    <header className="site-header">
      <div className="shell">
        <a className="brand" onClick={() => go('home')} style={{ cursor: 'pointer' }}>
          ana<em>julia</em>®
        </a>
        <nav className={`nav${open ? ' open' : ''}`}>
          <a onClick={() => go('sobre')} style={{ cursor: 'pointer' }}>Sobre</a>
          <a onClick={() => go('projetos')} style={{ cursor: 'pointer' }}>Projetos</a>
          <a className="nav-cta" onClick={() => go('contato')} style={{ cursor: 'pointer' }}>
            Vamos conversar ↗
          </a>
        </nav>
        <button
          className="nav-toggle"
          aria-label="Abrir menu"
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
