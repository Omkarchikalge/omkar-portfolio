import { useState, useRef, useEffect } from 'react'

const ANSWERS = {
  projects:
    "I've built projects around Platform Engineering, real-time hand gesture recognition, cloud-native infrastructure, and Metsy.",

  internships:
    "Yes! I'm currently open to Platform Engineering, SRE, DevOps, and cloud-native internship opportunities.",

  stack:
    "My current stack includes Linux, Git, Python, Bash, Docker, Kubernetes, Terraform, and cloud-native tooling.",

  research:
    "I'm working on research related to computer vision and cloud-native engineering, including my ICRAES 2026 research work.",

  metsy:
    "Metsy is a nightlife discovery startup focused on helping users discover nightlife experiences in Tier 2 and Tier 3 Indian cities.",

  contact:
    "You can reach me at omkarchikalge@gmail.com, or connect with me through GitHub and LinkedIn."
}

const SUGGESTED = [
  'What projects have you built?',
  'Are you open to internships?',
  'What is your tech stack?',
  'Tell me about your research paper',
  'What is Metsy?',
  'How can I contact you?',
]

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm Omkar's AI assistant. Ask me anything about his skills, projects, or how to get in touch. 👋" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const send = (text) => {
    const msg = text || input.trim()

    if (!msg || loading) return

    setInput('')

    const userMsg = {
      role: 'user',
      content: msg
    }

    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    const q = msg.toLowerCase()

    let answer =
      "I can answer questions about Omkar's skills, projects, research, internships, and contact information."

    if (
      q.includes('project') ||
      q.includes('built')
    ) {
      answer = ANSWERS.projects

    } else if (
      q.includes('internship') ||
      q.includes('intern')
    ) {
      answer = ANSWERS.internships

    } else if (
      q.includes('skill') ||
      q.includes('stack') ||
      q.includes('technology') ||
      q.includes('technologies')
    ) {
      answer = ANSWERS.stack

    } else if (
      q.includes('research') ||
      q.includes('paper')
    ) {
      answer = ANSWERS.research

    } else if (
      q.includes('metsy')
    ) {
      answer = ANSWERS.metsy

    } else if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('reach')
    ) {
      answer = ANSWERS.contact
    }

    // Small delay to keep the chatbot feeling natural
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: answer
        }
      ])

      setLoading(false)
    }, 400)
  }

  const onKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: 56, height: 56, borderRadius: '50%',
          background: open ? 'var(--bg-card)' : 'var(--accent)',
          border: `2px solid ${open ? 'var(--accent)' : 'transparent'}`,
          color: open ? 'var(--accent)' : '#000',
          fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 800, transition: 'all 0.3s',
          boxShadow: open ? '0 0 0 0 transparent' : '0 0 20px var(--accent-glow-strong)',
          animation: open ? 'none' : 'chatPulse 2.5s ease infinite',
        }}
        title="Ask Omkar's AI"
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '5.5rem', right: '2rem',
          width: 360, maxHeight: 520,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          display: 'flex', flexDirection: 'column',
          zIndex: 800,
          boxShadow: '0 0 40px rgba(0,0,0,0.5)',
          animation: 'slideUpChat 0.25s ease',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '0.9rem 1.2rem',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: '0.7rem',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--accent-glow)',
              border: '1px solid var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>🤖</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Omkar's AI</div>
              <div style={{ fontSize: 10, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{
                  fontSize: 10,
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'inline-block'
                  }} />
                  online — portfolio assistant
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.8rem',
            scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent',
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '0.6rem 0.9rem',
                  borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-surface)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                  color: m.role === 'user' ? '#000' : 'var(--text-secondary)',
                  fontSize: 12.5, lineHeight: 1.6,
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 4, padding: '0.4rem 0' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--accent)',
                    animation: `dotBounce 1.2s ease ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}

            {/* Suggested questions (only at start) */}
            {messages.length === 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                {SUGGESTED.map(q => (
                  <button key={q} onClick={() => send(q)} style={{
                    fontSize: 10.5, padding: '4px 10px',
                    background: 'var(--accent-glow)',
                    border: '1px solid rgba(0,212,170,0.3)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.15s', textAlign: 'left',
                    borderRadius: 20,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,170,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-glow)'}
                  >{q}</button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '0.8rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: '0.5rem',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask anything about Omkar..."
              disabled={loading}
              style={{
                flex: 1, padding: '0.6rem 0.9rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12, outline: 'none', borderRadius: 6,
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                padding: '0.6rem 1rem',
                background: input.trim() && !loading ? 'var(--accent)' : 'var(--border)',
                color: input.trim() && !loading ? '#000' : 'var(--text-muted)',
                border: 'none', fontFamily: 'var(--font-mono)',
                fontSize: 13, fontWeight: 700,
                transition: 'all 0.2s', borderRadius: 6,
              }}
            >→</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatPulse {
          0%,100%{box-shadow:0 0 20px var(--accent-glow-strong)}
          50%{box-shadow:0 0 35px var(--accent-glow-strong),0 0 60px var(--accent-glow)}
        }
        @keyframes slideUpChat {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes dotBounce {
          0%,80%,100%{transform:scale(0.6);opacity:0.4}
          40%{transform:scale(1);opacity:1}
        }
      `}</style>
    </>
  )
}
