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

export default function Leads({ onNav }) {
  const [leads, setLeads] = useState([])
  const [status, setStatus] = useState('loading') // loading | done | error
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('admin')) { onNav('login'); return }
    fetchLeads()
      .then((data) => { setLeads(data.reverse()); setStatus('done') })
      .catch((err) => { setErro(err.message); setStatus('error') })
  }, [onNav])

  return (
    <section className="painel-page">
      <div className="shell">
        <button className="case-back" onClick={() => onNav('painel')}>← Painel</button>

        <div className="painel-head">
          <div>
            <div className="eyebrow">Formulário de contato</div>
            <h2>Leads</h2>
          </div>
          {status === 'done' && (
            <span className="leads-count">{leads.length} {leads.length === 1 ? 'registro' : 'registros'}</span>
          )}
        </div>

        {status === 'loading' && <p className="painel-msg">Carregando…</p>}
        {status === 'error'   && <p className="painel-msg painel-msg--error">{erro}</p>}

        {status === 'done' && leads.length === 0 && (
          <p className="painel-msg">Nenhum lead ainda.</p>
        )}

        {status === 'done' && leads.length > 0 && (
          <div className="leads-grid">
            {leads.map((lead) => (
              <div key={lead.lead_id} className="lead-card">
                <div className="lead-card-head">
                  <strong>{lead.nome || '—'}</strong>
                  <span className="lead-data">{formatData(lead.criado_em)}</span>
                </div>
                <div className="lead-row"><span>E-mail</span><span>{lead.email || '—'}</span></div>
                <div className="lead-row"><span>WhatsApp</span><span>{lead.whatsapp || '—'}</span></div>
                <div className="lead-row"><span>Assunto</span><span>{lead.assunto || '—'}</span></div>
                {lead.melhor_data && (
                  <div className="lead-row"><span>Melhor data</span><span>{lead.melhor_data}</span></div>
                )}
                {lead.mensagem && (
                  <div className="lead-mensagem">{lead.mensagem}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
