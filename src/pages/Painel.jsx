import { useEffect } from 'react'

export default function Painel({ onNav }) {
  useEffect(() => {
    if (!sessionStorage.getItem('admin')) {
      onNav('login')
    }
  }, [onNav])

  const sair = () => {
    sessionStorage.removeItem('admin')
    onNav('home')
  }

  return (
    <section className="login-page">
      <div className="login-wrap" style={{ maxWidth: '700px' }}>
        <div className="eyebrow">Painel</div>
        <h2 className="login-title">Olá, Ana ✦</h2>
        <div className="painel-menu">
          <button className="painel-card" onClick={() => onNav('leads')}>
            <span className="painel-card-icon">📋</span>
            <strong>Leads</strong>
            <span>Ver contatos recebidos</span>
          </button>
        </div>
        <button className="btn btn-dark" style={{ marginTop: '2rem' }} onClick={sair}>Sair</button>
      </div>
    </section>
  )
}
