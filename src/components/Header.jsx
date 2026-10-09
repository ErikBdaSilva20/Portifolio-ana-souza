import { useState, useEffect, useRef } from 'react'
import { getFCMToken, sendTokenToSheet } from '../lib/firebase'

export default function Header({ onNav }) {
  const [open, setOpen] = useState(false)
  const [notifState, setNotifState] = useState(() => Notification.permission)
  const ran = useRef(false)
  const go = (target) => { onNav(target); setOpen(false) }

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    console.log('[FCM] Permissão atual:', Notification.permission)
    if (Notification.permission !== 'granted') return
    console.log('[FCM] Permissão já concedida — gerando token...')
    getFCMToken()
      .then((token) => {
        if (token) {
          console.log('[FCM] Token completo:', token)
          setNotifState('granted')
          sendTokenToSheet(token)
        } else {
          console.warn('[FCM] Token não gerado — permissão:', Notification.permission)
          setNotifState(Notification.permission)
        }
      })
      .catch((err) => console.error('[FCM] Erro ao gerar token no mount:', err))
  }, [])

  const handleNotif = async () => {
    if (notifState === 'granted') return
    try {
      const token = await getFCMToken()
      if (token) {
        console.log('[FCM] Token completo:', token)
        setNotifState('granted')
        await sendTokenToSheet(token)
      } else {
        console.warn('[FCM] Token não gerado — permissão:', Notification.permission)
        setNotifState(Notification.permission)
      }
    } catch (err) {
      console.error('[FCM] Erro ao gerar token:', err)
    }
  }

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
          className="notif-btn"
          aria-label={notifState === 'granted' ? 'Notificações ativas' : 'Ativar notificações'}
          title={notifState === 'granted' ? 'Notificações ativas' : 'Ativar notificações'}
          onClick={handleNotif}
          disabled={notifState === 'denied'}
        >
          {notifState === 'granted' ? '🔔' : '🔕'}
        </button>
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
