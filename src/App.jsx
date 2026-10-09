import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import Sobre from './pages/Sobre'
import Case from './pages/Case'
import Contato from './pages/Contato'
import Login from './pages/Login'
import Leads from './pages/Leads'

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, '')
  return path || '/'
}

function parseLocation(pathname) {
  const path = normalizePath(pathname)

  if (path === '/') return { screen: 'home' }
  if (path === '/projetos') return { screen: 'projetos' }
  if (path === '/sobre') return { screen: 'sobre' }
  if (path === '/contato') return { screen: 'contato' }
  if (path === '/login')   return { screen: 'login' }
  if (path === '/painel')  return { screen: 'leads' }
  if (path === '/leads')   return { screen: 'leads' }
  if (path.startsWith('/case/')) {
    return { screen: 'case', param: decodeURIComponent(path.slice('/case/'.length)) }
  }

  return { screen: 'not-found' }
}

export default function App() {
  const [loc, setLoc] = useState(() => parseLocation(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setLoc(parseLocation(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loc])

  const navigate = (target) => {
    const path = target.startsWith('case:')
      ? `/case/${encodeURIComponent(target.slice('case:'.length))}`
      : target === 'home' ? '/' : `/${target}`

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }
    setLoc(parseLocation(path))
  }

  const { screen, param } = loc

  return (
    <>
      <Header onNav={navigate} />
      {screen === 'home'     && <Home onNav={navigate} />}
      {screen === 'projetos' && <Projetos onNav={navigate} />}
      {screen === 'sobre'    && <Sobre onNav={navigate} />}
      {screen === 'case'     && <Case slug={param} onNav={navigate} />}
      {screen === 'contato'  && <Contato onNav={navigate} />}
      {screen === 'login'    && <Login onNav={navigate} />}
      {screen === 'leads'    && <Leads onNav={navigate} />}
      {screen === 'not-found' && (
        <section className="case-page">
          <div className="shell">
            <p>Página não encontrada.</p>
            <button className="btn btn-dark" onClick={() => navigate('home')} style={{ marginTop: '1rem' }}>
              ← Voltar ao início
            </button>
          </div>
        </section>
      )}
    </>
  )
}
