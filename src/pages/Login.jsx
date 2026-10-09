import { useState } from 'react'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export default function Login({ onNav }) {
  if (localStorage.getItem('admin')) { onNav('leads'); return null }

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim() === ADMIN_EMAIL && senha === ADMIN_PASSWORD) {
      localStorage.setItem('admin', '1')
      onNav('leads')
    } else {
      setErro('E-mail ou senha incorretos.')
    }
  }

  return (
    <section className="login-page">
      <div className="login-wrap">
        <div className="eyebrow">Área restrita</div>
        <h2 className="login-title">Acesso</h2>
        <form className="contato-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label className="form-label" htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              className="form-input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="login-senha">Senha</label>
            <input
              id="login-senha"
              className="form-input"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {erro && <p className="form-error">{erro}</p>}
          <button className="btn btn-dark form-submit" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </section>
  )
}
