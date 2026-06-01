"use client"

import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('paytii_cookie_consent')
      if (!stored) setVisible(true)
    } catch (e) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try { localStorage.setItem('paytii_cookie_consent', 'accepted') } catch (e) {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      left: 16,
      right: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 10,
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      zIndex: 9999,
    }} role="dialog" aria-live="polite">
      <div style={{ flex: 1, minWidth: 0 }}>
        <strong>We use cookies</strong>
        <div style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
          By using PAYTII you agree to our use of cookies. See our <a href="/cookie-policy">Cookie Policy</a> for details.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={accept} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Accept</button>
        <button onClick={() => setVisible(false)} className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>Dismiss</button>
      </div>
    </div>
  )
}
