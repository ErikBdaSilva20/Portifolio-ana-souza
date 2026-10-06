import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import Sobre from './pages/Sobre'
import Case from './pages/Case'

function parseHash(hash) {
  const h = (hash || '').replace(/^#/, '') || 'home'
  const [screen, param] = h.split(':')
  return { screen, param }
}

export default function App() {
  const [loc, setLoc] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const onHash = () => setLoc(parseHash(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (loc.screen === 'contato') {
      setTimeout(() => {
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    }
  }, [loc])

  const navigate = (target) => {
    window.location.hash = target
  }

  const { screen, param } = loc

  return (
    <>
      <Header onNav={navigate} />
      {screen === 'home'     && <Home onNav={navigate} />}
      {screen === 'projetos' && <Projetos onNav={navigate} />}
      {screen === 'sobre'    && <Sobre onNav={navigate} />}
      {screen === 'case'     && <Case slug={param} onNav={navigate} />}
      {screen === 'contato'  && <Home onNav={navigate} />}
    </>
  )
}
