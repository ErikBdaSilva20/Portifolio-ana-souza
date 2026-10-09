const WA_URL = 'https://wa.me/5511987336995'

export default function Footer({ id, onNav }) {
  return (
    <footer className="footer" id={id}>
      <div className="shell">
        <div className="eyebrow">Próximo projeto?</div>
        <h2>Vamos criar algo que faça sentido para as pessoas.</h2>
        <div className="footer-actions">
          {onNav ? (
            <button className="btn btn-light" onClick={() => onNav('contato')}>
              Preencher formulário ↗
            </button>
          ) : (
            <a className="btn btn-light" href="/contato">
              Preencher formulário ↗
            </a>
          )}
          <a className="btn btn-ghost" href={WA_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <div className="footer-bottom">
          <span>Ana Julia Martinez · São Paulo, SP</span>
          <span>
            {onNav
              ? <button className="footer-secret" onClick={() => onNav('login')} aria-hidden="true" tabIndex={-1}>© 2026</button>
              : '© 2026'
            }
          </span>
        </div>
      </div>
    </footer>
  )
}
