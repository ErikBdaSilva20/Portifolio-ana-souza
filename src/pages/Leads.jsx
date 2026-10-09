import { useState, useEffect } from 'react'

const GAS_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
const GAS_SECRET = import.meta.env.VITE_APPS_SCRIPT_SECRET

async function fetchLeads() {
  const url = `${GAS_URL}?resource=leads&secret=${encodeURIComponent(GAS_SECRET)}`
  const res = await fetch(url)
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'Erro ao buscar leads.')
  return data.leads
}

function formatData(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatHorario(val) {
  if (!val) return null
  // Sheets converte time para Date ISO — extrai só HH:MM
  if (val.includes('T')) {
    const d = new Date(val)
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }
  return val
}

export default function Leads({ onNav }) {
  const [leads, setLeads] = useState([])
  const [status, setStatus] = useState('loading')
  const [erro, setErro] = useState('')

  const sair = () => { localStorage.removeItem('admin'); onNav('home') }

  useEffect(() => {
    if (!localStorage.getItem('admin')) { onNav('login'); return }
    fetchLeads()
      .then((data) => { setLeads(data.reverse()); setStatus('done') })
      .catch((err) => { setErro(err.message); setStatus('error') })
  }, [])

  return (
    <section className="painel-page">
      <div className="shell">
        <button className="case-back" onClick={() => onNav('home')}>← Início</button>

        <div className="painel-head">
          <div>
            <div className="eyebrow">Formulário de contato</div>
            <h2>Leads</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {status === 'done' && (
              <span className="leads-count">{leads.length} {leads.length === 1 ? 'registro' : 'registros'}</span>
            )}
            <button className="btn btn-dark" style={{ padding: '.5rem 1rem', fontSize: '.8rem' }} onClick={sair}>Sair</button>
          </div>
        </div>

        {status === 'loading' && <p className="painel-msg">Carregando…</p>}
        {status === 'error'   && <p className="painel-msg painel-msg--error">{erro}</p>}
        {status === 'done' && leads.length === 0 && <p className="painel-msg">Nenhum lead ainda.</p>}

        {status === 'done' && leads.length > 0 && (
          <div className="leads-grid">
            {leads.map((lead) => (
              <div key={lead.lead_id} className="lead-card">

                <div className="lead-card-top">
                  <div className="lead-tag">{lead.assunto || '—'}</div>
                  <span className="lead-data-recebido">{formatData(lead.criado_em)}</span>
                </div>

                {lead.mensagem && (
                  <div className="lead-mensagem-destaque">
                    <p>{lead.mensagem}</p>
                  </div>
                )}

                <div className="lead-card-body">
                  <div className="lead-nome">{lead.nome || '—'}</div>
                  <div className="lead-info-group">
                    <div className="lead-info-item">
                      <span className="lead-info-label">E-mail</span>
                      <a className="lead-info-value lead-link" href={`mailto:${lead.email}`}>{lead.email || '—'}</a>
                    </div>
                    <div className="lead-info-item">
                      <span className="lead-info-label">WhatsApp</span>
                      <a className="lead-info-value lead-link" href={`https://wa.me/55${String(lead.whatsapp ?? '').replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer">{lead.whatsapp || '—'}</a>
                    </div>
                    {formatHorario(lead.melhor_horario) && (
                      <div className="lead-info-item">
                        <span className="lead-info-label">Melhor horário</span>
                        <span className="lead-info-value">{formatHorario(lead.melhor_horario)}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
