import { useEffect, useState } from 'react'

// Konami code sequence
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

// Matrix rain canvas
function MatrixRain({ onClose }) {
  const canvasRef = (canvas) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const cols = Math.floor(canvas.width / 16)
    const drops = Array(cols).fill(1)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノkubectl terraform docker helm git python linux bash ansible prometheus grafana k8s devops sre platform 01'.split('')

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00d4aa'
      ctx.font = '14px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = i % 5 === 0 ? '#fff' : `rgba(0,212,170,${Math.random() * 0.8 + 0.2})`
        ctx.fillText(char, i * 16, y * 16)
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }
    const iv = setInterval(draw, 45)
    return () => clearInterval(iv)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.5s ease',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      <div style={{
        position: 'relative', zIndex: 1, textAlign: 'center',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        <div style={{
          fontSize: 'clamp(1.5rem,5vw,3rem)', fontWeight: 800,
          color: '#00d4aa', marginBottom: '1rem',
          textShadow: '0 0 30px #00d4aa',
          letterSpacing: '0.1em',
        }}>
          KONAMI CODE ACTIVATED
        </div>
        <div style={{ fontSize: 14, color: 'rgba(0,212,170,0.7)', marginBottom: '0.5rem' }}>
          You found the Easter egg. You are now a 10x engineer.
        </div>
        <div style={{ fontSize: 12, color: 'rgba(0,212,170,0.4)', marginBottom: '2rem' }}>
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
        <button onClick={onClose} style={{
          padding: '0.7rem 2rem',
          background: 'transparent',
          border: '1px solid #00d4aa',
          color: '#00d4aa',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 13, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,170,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >exit matrix →</button>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  )
}

// Nyan cat toast
function NyanToast({ onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t) }, [onClose])
  return (
    <div style={{
      position: 'fixed', top: '5rem', left: '50%', transform: 'translateX(-50%)',
      background: 'var(--bg-card)', border: '1px solid var(--accent)',
      padding: '1rem 2rem', zIndex: 9000,
      fontFamily: 'JetBrains Mono, monospace',
      animation: 'slideDown 0.4s ease',
      display: 'flex', alignItems: 'center', gap: '1rem',
      boxShadow: '0 0 30px var(--accent-glow-strong)',
    }}>
      <span style={{ fontSize: 28 }}>🐱</span>
      <div>
        <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>SECRET UNLOCKED: Nyan Dev</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>You typed "nyan" in the terminal. Legend.</div>
      </div>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  )
}

// Hacker mode toast
function HackerToast({ onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  return (
    <div style={{
      position: 'fixed', bottom: '6rem', right: '2rem',
      background: '#000', border: '1px solid var(--red)',
      padding: '1rem 1.5rem', zIndex: 9000,
      fontFamily: 'JetBrains Mono, monospace',
      animation: 'slideUp 0.3s ease',
      maxWidth: 280,
      boxShadow: '0 0 20px rgba(239,68,68,0.3)',
    }}>
      <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, marginBottom: 4 }}>
        ⚠ ACCESS DENIED
      </div>
      <div style={{ fontSize: 11, color: 'rgba(239,68,68,0.7)', marginBottom: 8 }}>
        FBI Cyber Division has been notified.<br/>Just kidding. sudo is disabled. 😄
      </div>
      <div style={{ fontSize: 10, color: 'rgba(239,68,68,0.4)' }}>
        This incident has been logged at /dev/null
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}

// Glitch effect overlay
function GlitchOverlay({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1200); return () => clearTimeout(t) }, [onDone])
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none',
      animation: 'glitch 1.2s ease forwards',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(transparent 0%, rgba(0,212,170,0.03) 50%, transparent 100%)',
        backgroundSize: '100% 4px',
      }}/>
      <style>{`
        @keyframes glitch {
          0%{opacity:0}
          10%{opacity:1;transform:skewX(2deg)}
          20%{transform:skewX(-1deg) translateX(3px)}
          30%{transform:skewX(0)}
          40%{transform:translateX(-2px)}
          50%{transform:none}
          80%{opacity:0.5}
          100%{opacity:0}
        }
      `}</style>
    </div>
  )
}

export default function EasterEggs() {
  const [konamiIdx, setKonamiIdx] = useState(0)
  const [showMatrix, setShowMatrix] = useState(false)
  const [showNyan, setShowNyan] = useState(false)
  const [showHacker, setShowHacker] = useState(false)
  const [showGlitch, setShowGlitch] = useState(false)
  const [secretsFound, setSecretsFound] = useState([])

  // Konami code listener
  useEffect(() => {
    const onKey = (e) => {
      const expected = KONAMI[konamiIdx]
      if (e.key === expected) {
        const next = konamiIdx + 1
        setKonamiIdx(next)
        if (next === KONAMI.length) {
          setKonamiIdx(0)
          setShowGlitch(true)
          setTimeout(() => { setShowMatrix(true) }, 800)
          setSecretsFound(s => s.includes('konami') ? s : [...s, 'konami'])
        }
      } else {
        setKonamiIdx(0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [konamiIdx])

  // Listen for custom events from Terminal
  useEffect(() => {
    const onNyan = () => {
      setShowNyan(true)
      setSecretsFound(s => s.includes('nyan') ? s : [...s, 'nyan'])
    }
    const onHacker = () => {
      setShowHacker(true)
      setSecretsFound(s => s.includes('hacker') ? s : [...s, 'hacker'])
    }
    window.addEventListener('easter:nyan', onNyan)
    window.addEventListener('easter:hacker', onHacker)
    return () => {
      window.removeEventListener('easter:nyan', onNyan)
      window.removeEventListener('easter:hacker', onHacker)
    }
  }, [])

  return (
    <>
      {showGlitch && <GlitchOverlay onDone={() => setShowGlitch(false)} />}
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
      {showNyan && <NyanToast onClose={() => setShowNyan(false)} />}
      {showHacker && <HackerToast onClose={() => setShowHacker(false)} />}

      {/* Secrets counter badge in corner */}
      {secretsFound.length > 0 && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '2rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, color: 'var(--accent)',
          border: '1px solid var(--border)',
          padding: '4px 10px',
          background: 'var(--bg-card)',
          zIndex: 700,
          letterSpacing: '0.1em',
        }}>
          🥚 {secretsFound.length}/3 secrets found
        </div>
      )}
    </>
  )
}
