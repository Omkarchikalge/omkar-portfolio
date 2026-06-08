import { useState } from 'react'
import useInView from './useInView'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Omkarchikalge',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/omkar-chikalge-a18a55327/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.6v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.26V9h3.46v1.56h.05c.48-.91 1.65-1.87 3.4-1.87 3.63 0 4.3 2.39 4.3 5.5v6.26zM5.34 7.43a2.09 2.09 0 1 1 0-4.18 2.09 2.09 0 0 1 0 4.18zm1.8 13.02H3.54V9h3.6v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/Omkar_2506',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Dev.to',
    href: 'https://dev.to/omkar_chikalge_2006',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
      </svg>
    ),
  },
]

function SocialLink({ label, href, icon }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.8rem 1.4rem',
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        color: hov ? 'var(--accent)' : 'var(--text-secondary)',
        background: hov ? 'var(--accent-glow)' : 'transparent',
        textDecoration: 'none', fontSize: 12,
        letterSpacing: '0.08em', transition: 'all 0.2s',
      }}
    >
      {icon} {label}
    </a>
  )
}

export default function Contact() {
  const [ref, vis] = useInView()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Opens mailto as fallback — swap for your preferred form backend
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
    window.open(`mailto:omkar.chikalge@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" style={{ textAlign: 'center' }}>
      <div className="section-label" style={{ justifyContent: 'center' }}>08 — contact</div>
      <h2>Let's build<br/>something together.</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, maxWidth: 480, margin: '0 auto 2.5rem' }}>
        Open to internships, student collaborations, open source contributions, and GSoC opportunities.
      </p>

      <a
        href="mailto:omkarchikalge@gmail.com"
        style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem,3vw,2rem)',
          fontWeight: 700, color: 'var(--text-primary)',
          textDecoration: 'none', borderBottom: '2px solid var(--accent)',
          paddingBottom: 2, transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
      >
        omkarchikalge@gmail.com
      </a>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', margin: '2rem 0 3rem' }}>
        {socials.map(s => <SocialLink key={s.label} {...s} />)}
      </div>

      {/* Contact Form */}
      <div
        ref={ref}
        className={`fade-in${vis ? ' visible' : ''}`}
        style={{
          maxWidth: 560, margin: '0 auto',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          padding: '2rem', textAlign: 'left',
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          $ send message
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'name', type: 'text', key: 'name', placeholder: 'your name' },
            { label: 'email', type: 'email', key: 'email', placeholder: 'your@email.com' },
          ].map(({ label, type, key, placeholder }) => (
            <div key={key}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>
                <span style={{ color: 'var(--accent)' }}>--</span>{label}
              </div>
              <input
                type={type}
                required
                placeholder={placeholder}
                value={formData[key]}
                onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                style={{
                  width: '100%', padding: '0.7rem 1rem',
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-mono)',
                  fontSize: 13, outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          ))}
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>
              <span style={{ color: 'var(--accent)' }}>--</span>message
            </div>
            <textarea
              required
              rows={4}
              placeholder="what's on your mind..."
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              style={{
                width: '100%', padding: '0.7rem 1rem',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontFamily: 'var(--font-mono)',
                fontSize: 13, outline: 'none', resize: 'vertical',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.8rem 1.8rem', background: sent ? 'var(--accent-dim)' : 'var(--accent)',
              color: '#000', fontFamily: 'var(--font-mono)', fontSize: 12,
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: 'none', transition: 'all 0.2s', alignSelf: 'flex-start',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px var(--accent-glow-strong)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {sent ? '✓ message sent' : 'send message →'}
          </button>
        </form>
      </div>
    </section>
  )
}
