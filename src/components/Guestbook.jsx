import { useState, useEffect } from 'react'
import useInView from './useInView'

const STORAGE_KEY = 'portfolio_guestbook'
const VISITOR_KEY = 'portfolio_visitor_id'
const COUNT_KEY   = 'portfolio_visit_count'

function getVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = 'visitor_' + Math.random().toString(36).slice(2, 10)
    localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

function loadEntries() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 50)))
}

function loadCount() {
  const raw = localStorage.getItem(COUNT_KEY)
  const base = 142 // seed so it doesn't start at 0
  if (!raw) {
    const count = base + 1
    localStorage.setItem(COUNT_KEY, count)
    return count
  }
  const n = parseInt(raw, 10)
  const updated = n + 1
  localStorage.setItem(COUNT_KEY, updated)
  return updated
}

const AVATARS = ['🧑‍💻','👩‍💻','🐧','🦊','🚀','⚡','🌟','🎯','🔥','💡','🦄','🐳']
const COUNTRIES = ['🇮🇳','🇺🇸','🇩🇪','🇬🇧','🇯🇵','🇧🇷','🇫🇷','🇨🇦','🇦🇺','🇳🇱']

// Seed entries so guestbook isn't empty
const SEED_ENTRIES = [
  { id:'s1', name:'Priya S.', avatar:'👩‍💻', flag:'🇮🇳', msg:'Great portfolio! The terminal is so cool 🔥', time: Date.now() - 86400000 * 3 },
  { id:'s2', name:'DevOps Dan', avatar:'🐳', flag:'🇺🇸', msg:'Fellow SRE here — love the observability stack knowledge. Keep it up!', time: Date.now() - 86400000 * 2 },
  { id:'s3', name:'Arjun K.', avatar:'🚀', flag:'🇮🇳', msg:'The typing game got me 😂 only 34 WPM, need practice', time: Date.now() - 86400000 },
]

export default function Guestbook({ soundEnabled }) {
  const [ref, vis] = useInView()
  const [entries, setEntries] = useState(() => {
    const saved = loadEntries()
    return saved.length ? saved : SEED_ENTRIES
  })
  const [visitCount] = useState(() => loadCount())
  const [form, setForm] = useState({ name: '', msg: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const visitorId = getVisitorId()

  const alreadySigned = entries.some(e => e.visitorId === visitorId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.msg.trim()) { setError('Both fields are required.'); return }
    if (form.msg.length > 200) { setError('Keep it under 200 characters.'); return }
    setError('')
    setSubmitting(true)

    setTimeout(() => {
      const newEntry = {
        id: Date.now().toString(),
        visitorId,
        name: form.name.trim(),
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        flag: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
        msg: form.msg.trim(),
        time: Date.now(),
      }
      const updated = [newEntry, ...entries]
      setEntries(updated)
      saveEntries(updated)
      setForm({ name: '', msg: '' })
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  const timeAgo = (ts) => {
    const diff = (Date.now() - ts) / 1000
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <section id="guestbook" ref={ref}>
      <div className="section-label">07 — guestbook</div>
      <h2><span style={{ color: 'var(--accent)' }}>$</span> cat guestbook.log</h2>

      {/* Visitor counter */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        padding: '0.7rem 1.2rem', marginBottom: '2rem', marginTop: '0.5rem',
      }}>
        <span style={{ fontSize: 18 }}>👁</span>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>
            {visitCount.toLocaleString()}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
            visitors (this device)
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }} className="gb-grid">

        {/* Form */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '1.5rem',
          opacity: vis ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            {submitted ? '✓ signed — thanks!' : alreadySigned ? '✓ you already signed!' : '$ sign guestbook'}
          </div>

          {!submitted && !alreadySigned ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>
                  <span style={{ color: 'var(--accent)' }}>--</span>name
                </div>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="your name or handle"
                  maxLength={40}
                  style={{
                    width: '100%', padding: '0.6rem 0.9rem',
                    background: 'var(--bg-surface)', border: '1px solid var(--border)',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>
                  <span style={{ color: 'var(--accent)' }}>--</span>message <span style={{ color: 'var(--text-muted)' }}>({form.msg.length}/200)</span>
                </div>
                <textarea
                  value={form.msg}
                  onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                  placeholder="say something..."
                  rows={3} maxLength={200}
                  style={{
                    width: '100%', padding: '0.6rem 0.9rem',
                    background: 'var(--bg-surface)', border: '1px solid var(--border)',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, outline: 'none', resize: 'vertical',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              {error && <div style={{ fontSize: 11, color: 'var(--red)' }}>{error}</div>}
              <button type="submit" disabled={submitting} style={{
                padding: '0.65rem 1.5rem', alignSelf: 'flex-start',
                background: submitting ? 'var(--border)' : 'var(--accent)',
                color: submitting ? 'var(--text-muted)' : '#000',
                border: 'none', fontFamily: 'var(--font-mono)',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}>
                {submitting ? 'posting...' : 'sign ✍'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: 40, marginBottom: '0.8rem' }}>{submitted ? '🎉' : '✅'}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {submitted ? 'Your message is live in the guestbook!' : 'You already left a message. Thank you!'}
              </div>
            </div>
          )}
        </div>

        {/* Entries feed */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
          maxHeight: 420, overflowY: 'auto',
          scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent',
          paddingRight: '0.3rem',
        }}>
          {entries.map((entry, i) => (
            <div key={entry.id} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              padding: '0.9rem 1rem',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(10px)',
              transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: 18 }}>{entry.avatar}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{entry.name}</span>
                <span style={{ fontSize: 14 }}>{entry.flag}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)' }}>{timeAgo(entry.time)}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{entry.msg}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){.gb-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
