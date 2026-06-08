import { useState } from 'react'

// Small icon buttons with tooltip
function ToolBtn({ icon, label, onClick, active, activeColor = 'var(--accent)' }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        title={label}
        style={{
          width: 38, height: 38,
          background: active ? activeColor : 'var(--bg-card)',
          border: `1px solid ${active ? activeColor : hov ? 'var(--border-glow)' : 'var(--border)'}`,
          color: active ? (activeColor === 'var(--accent)' ? '#000' : '#fff') : hov ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', borderRadius: 6,
        }}
      >{icon}</button>
      {hov && (
        <div style={{
          position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          padding: '3px 8px', fontSize: 10, color: 'var(--text-secondary)',
          whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '0.05em',
          zIndex: 999,
        }}>{label}</div>
      )}
    </div>
  )
}

export default function Toolbar({ dark, setDark, soundEnabled, setSoundEnabled }) {
  const handleCV = () => {
    // Creates a simple text resume and downloads it
    // Replace this URL with your actual PDF path once you add resume.pdf to /public
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Omkar_Chikalge_Resume.pdf'
    link.click()
  }

  return (
    <div style={{
      position: 'fixed', right: '1.2rem', top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
      zIndex: 850,
    }}>
      {/* Theme toggle */}
      <ToolBtn
        icon={dark ? '☀️' : '🌙'}
        label={dark ? 'Light mode' : 'Dark mode'}
        onClick={() => setDark(d => !d)}
        active={false}
      />

      {/* Sound toggle */}
      <ToolBtn
        icon={soundEnabled ? '🔊' : '🔇'}
        label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        onClick={() => setSoundEnabled(s => !s)}
        active={soundEnabled}
        activeColor='var(--accent)'
      />

      {/* CV download */}
      <ToolBtn
        icon='📄'
        label='Download CV'
        onClick={handleCV}
        active={false}
      />

      {/* Scroll to top */}
      <ToolBtn
        icon='↑'
        label='Back to top'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        active={false}
      />
    </div>
  )
}
