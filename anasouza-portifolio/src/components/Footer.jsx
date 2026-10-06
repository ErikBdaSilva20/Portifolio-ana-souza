export default function Footer({ id }) {
  return (
    <footer className="footer" id={id}>
      <div className="shell">
        <div className="eyebrow">Próximo projeto?</div>
        <h2>Vamos criar algo que faça sentido para as pessoas.</h2>
        <a className="btn btn-light" href="mailto:anajuliamartinezdesouza@gmail.com">
          Entrar em contato ↗
        </a>
        <div className="footer-bottom">
          <span>Ana Julia Martinez · São Paulo, SP</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}
