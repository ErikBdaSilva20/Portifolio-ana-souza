import { useState } from 'react'

export default function Header({ onNav }) {
  const [open, setOpen] = useState(false)
  const go = (target) => { onNav(target); setOpen(false) }

  return (
    <header className="site-header">
      <div className="shell">
        <a className="brand" href="/" onClick={(event) => { event.preventDefault(); go('home') }}>
          ana<em>julia</em>®
        </a>
        <nav className={`nav${open ? ' open' : ''}`}>
          <a href="/sobre" onClick={(event) => { event.preventDefault(); go('sobre') }}>Sobre</a>
          <a href="/projetos" onClick={(event) => { event.preventDefault(); go('projetos') }}>Projetos</a>
          <a className="nav-cta" href="/contato" onClick={(event) => { event.preventDefault(); go('contato') }}>
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
