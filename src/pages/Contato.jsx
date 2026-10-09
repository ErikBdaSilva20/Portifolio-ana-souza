import { useState } from 'react'
import Footer from '../components/Footer'

const WA_NUMBER = '5511987336995'
const WA_URL = `https://wa.me/${WA_NUMBER}`
const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL

const ASSUNTOS = [
  'Projeto de marketing',
  'Parceria',
  'Branding e conteúdo',
  'Consultoria',
  'Outro',
]

const INITIAL = {
  nome: '',
  email: '',
  whatsapp: '',
  assunto: '',
  mensagem: '',
  melhor_data: '',
}

async function enviarLead(dados) {
  if (!APPS_SCRIPT_URL) return
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ type: 'lead', ...dados }),
  })
}

export default function Contato({ onNav }) {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await enviarLead(form)
      setStatus('done')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="contato-page">
        <div className="shell">
          <button className="case-back" onClick={() => onNav('home')}>
            ← Voltar
          </button>

          <div className="contato-grid">
            <div className="contato-intro">
              <div className="eyebrow">Vamos conversar</div>
              <h1 className="contato-title">
                Conta pra mim<br />
                <span>o que você precisa.</span>
              </h1>
              <p className="contato-desc">
                Preencha o formulário e eu entro em contato.
                Se preferir uma resposta mais rápida, chama direto no WhatsApp.
              </p>
              <a
                href={WA_URL}
                className="btn btn-dark contato-wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chamar no WhatsApp
              </a>
            </div>

            <div className="contato-form-wrap">
              {status === 'done' ? (
                <div className="contato-success">
                  <div className="contato-success-icon">✓</div>
                  <h3>Mensagem enviada!</h3>
                  <p>Obrigada pelo contato. Entrarei em breve.</p>
                  <button className="btn btn-dark" style={{ marginTop: '1.5rem' }} onClick={() => setStatus('idle')}>
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form className="contato-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <label className="form-label" htmlFor="nome">Nome *</label>
                    <input
                      id="nome"
                      className="form-input"
                      type="text"
                      placeholder="Seu nome completo"
                      value={form.nome}
                      onChange={set('nome')}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <label className="form-label" htmlFor="email">E-mail *</label>
                    <input
                      id="email"
                      className="form-input"
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={set('email')}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <label className="form-label" htmlFor="whatsapp">WhatsApp *</label>
                    <input
                      id="whatsapp"
                      className="form-input"
                      type="tel"
                      placeholder="(11) 9 0000-0000"
                      value={form.whatsapp}
                      onChange={set('whatsapp')}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <label className="form-label" htmlFor="assunto">Assunto *</label>
                    <select
                      id="assunto"
                      className="form-input form-select"
                      value={form.assunto}
                      onChange={set('assunto')}
                      required
                    >
                      <option value="" disabled>Selecione um assunto</option>
                      {ASSUNTOS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <label className="form-label" htmlFor="mensagem">Mensagem *</label>
                    <textarea
                      id="mensagem"
                      className="form-input form-textarea"
                      placeholder="Conte um pouco sobre o que você precisa..."
                      value={form.mensagem}
                      onChange={set('mensagem')}
                      required
                      rows={4}
                    />
                  </div>

                  <div className="form-row">
                    <label className="form-label" htmlFor="melhor_data">Melhor data para contato</label>
                    <input
                      id="melhor_data"
                      className="form-input"
                      type="date"
                      value={form.melhor_data}
                      onChange={set('melhor_data')}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="form-error">Algo deu errado. Tente novamente ou chame no WhatsApp.</p>
                  )}

                  <button
                    className="btn btn-dark form-submit"
                    type="submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Enviando…' : 'Enviar mensagem ↗'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
