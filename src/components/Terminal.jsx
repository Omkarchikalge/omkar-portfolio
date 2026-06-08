import { useState, useEffect, useRef } from 'react'
import useSound from './useSound'

const FILES = {
  'about.txt': `Name    : Omkar Chikalge
Role    : Aspiring Platform Engineer & SRE
Location: Pune, Maharashtra, India
Status  : Open to internships & collaborations
Interests: Linux, Kubernetes, Observability, GitOps`,

  'skills.txt': `FOUNDATIONS  : Linux, Git, GitHub, Networking, Bash
PROGRAMMING  : Python, JavaScript
CLOUD        : Docker (learning), Kubernetes (learning)
IaC          : Terraform (learning), AWS (learning)
TOOLS        : VS Code, WSL2, GitHub Actions (learning)`,

  'projects.txt': `1. Real-Time Hand Gesture Recognition (Python, MediaPipe, LSTM)
2. ICRAES 2026 Research Publication (Computer Vision)
3. Platform Engineering Lab (Linux, Docker, K8s, WSL2)
4. Open Source Contribution Journey (CNCF ecosystem)
5. Metsy — Nightlife Discovery Platform (React, Node.js)`,

  'roadmap.txt': `Stage 1 → Linux & Git & Networking & Bash      [ACTIVE]
Stage 2 → Docker & Containers                   [NEXT]
Stage 3 → Kubernetes & Helm & Orchestration     [PLANNED]
Stage 4 → Terraform & Cloud & IaC               [PLANNED]
Stage 5 → Prometheus & Grafana & SLOs & SRE     [PLANNED]`,

  'contact.txt': `Email   : omkar.chikalge@gmail.com
GitHub  : github.com/omkar-chikalge
LinkedIn: linkedin.com/in/omkar-chikalge
Twitter : twitter.com/omkar_chikalge
Dev.to  : dev.to/omkar_chikalge`,
}

const COMMANDS = {
  help: () => `Available commands:

  whoami          — who is omkar
  ls              — list files
  cat <file>      — read a file
  skills          — print tech stack
  projects        — list projects
  roadmap         — show learning roadmap
  contact         — get contact info
  github          — open github profile
  clear           — clear terminal
  pwd             — print working directory
  echo <text>     — print text
  uname           — system info
  date            — current date/time
  history         — command history
  sudo <cmd>      — nice try 😄

  🥚 hidden commands exist. explore to find them.`,

  whoami: () => `omkar-chikalge
─────────────────────────────────────
Role     : Aspiring Platform Engineer & SRE
Location : Pune, Maharashtra, India 🇮🇳
Status   : Engineering Student
Focus    : Linux · Containers · Cloud-Native
Mission  : Build reliable, scalable infrastructure`,

  ls: () => `drwxr-xr-x  about.txt
drwxr-xr-x  skills.txt
drwxr-xr-x  projects.txt
drwxr-xr-x  roadmap.txt
drwxr-xr-x  contact.txt`,

  skills: () => FILES['skills.txt'],
  projects: () => FILES['projects.txt'],
  roadmap: () => FILES['roadmap.txt'],
  contact: () => FILES['contact.txt'],

  pwd: () => `/home/omkar/portfolio`,

  uname: () => `Linux omkar-dev 6.8.0-platform-engineer #1 SMP x86_64 GNU/Linux
Kernel   : 6.8.0
Distro   : Ubuntu 24.04 LTS (Noble Numbat)
Shell    : /bin/bash
Uptime   : always learning`,

  date: () => new Date().toString(),

  github: () => {
    setTimeout(() => window.open('https://github.com/omkar-chikalge', '_blank'), 400)
    return `Opening github.com/omkar-chikalge...`
  },

  clear: () => '__CLEAR__',

  sudo: (args) => {
    if (!args.length) return `sudo: no command provided`
    setTimeout(() => window.dispatchEvent(new Event('easter:hacker')), 300)
    return `[sudo] password for omkar: 
Sorry, you are not allowed to run sudo on this machine.
This incident will be reported. 😄`
  },

  nyan: () => {
    setTimeout(() => window.dispatchEvent(new Event('easter:nyan')), 200)
    return `Nyan nyan nyan nyan nyan nyan! 🐱
~=[,,_,,]:3`
  },

  hack: () => `Initializing hack sequence...
> scanning target...
> bypassing firewall...
> ERROR: target is Omkar's portfolio
> Omkar says hi 👋
> connection terminated`,

  matrix: () => {
    setTimeout(() => window.dispatchEvent(new CustomEvent('easter:konami')), 300)
    return `Wake up, Neo...
The Matrix has you...
Follow the white rabbit. 🐇`
  },

  ls_la: () => `total 42
drwxr-xr-x  omkar omkar  4096 Jan 01 00:00 .
drwxr-xr-x  root  root   4096 Jan 01 00:00 ..
-rw-r--r--  omkar omkar   420 Jan 01 00:00 dreams.txt
-rwxr-xr-x  omkar omkar  1337 Jan 01 00:00 future.sh
-rw-------  omkar omkar   999 Jan 01 00:00 .secrets`,

  echo: (args) => args.join(' ') || '',

  history: (args, hist) => hist.map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`).join('\n'),

  cat: (args) => {
    if (!args.length) return `cat: missing operand\nUsage: cat <filename>`
    const file = args[0]
    if (FILES[file]) return FILES[file]
    return `cat: ${file}: No such file or directory\nTry: ls`
  },
}

const HINTS = ['help', 'whoami', 'ls', 'skills', 'projects', 'roadmap', 'contact', 'github', 'clear', 'uname', 'date', 'nyan', 'hack', 'matrix', 'ls_la']

export default function Terminal({ soundEnabled = false }) {
  const { keyClick, commandRun, commandError } = useSound(soundEnabled)
  const [lines, setLines] = useState([
    { type: 'system', text: 'omkar-portfolio terminal v1.0.0' },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'system', text: '─'.repeat(48) },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [hint, setHint] = useState('')
  const bottomRef = useRef(null)
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll only the terminal output div — never the page
  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  useEffect(() => {
    // Tab-complete hint
    if (!input) { setHint(''); return }
    const match = HINTS.find(h => h.startsWith(input) && h !== input)
    setHint(match ? match.slice(input.length) : '')
  }, [input])

  const runCommand = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const [cmd, ...args] = trimmed.split(/\s+/)
    const newHistory = [trimmed, ...history].slice(0, 50)
    setHistory(newHistory)
    setHistIdx(-1)

    const newLines = [...lines, { type: 'input', text: trimmed }]

    const fn = COMMANDS[cmd.toLowerCase()]
    if (fn) {
      const result = fn(args, newHistory.slice(1).reverse())
      if (result === '__CLEAR__') {
        setLines([{ type: 'system', text: 'Terminal cleared. Type "help" for commands.' }])
        return
      }
      commandRun()
      setLines([...newLines, { type: 'output', text: result }])
    } else {
      commandError()
      setLines([...newLines, {
        type: 'error',
        text: `bash: ${cmd}: command not found\nType "help" to see available commands.`
      }])
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
      setHint('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (hint) { keyClick(); setInput(input + hint) }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next])
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([{ type: 'system', text: 'Terminal cleared. Type "help" for commands.' }])
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      setLines(prev => [...prev, { type: 'input', text: input + '^C' }])
      setInput('')
    } else if (e.key.length === 1) {
      keyClick()
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        cursor: 'text',
        boxShadow: '0 0 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Title bar */}
      <div style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        padding: '0.7rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ marginLeft: '0.8rem', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          omkar@portfolio: ~
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)' }}>bash — 80×24</span>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        style={{
          height: 340,
          overflowY: 'auto',
          padding: '1rem 1.2rem',
          lineHeight: 1.8,
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border) transparent',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: '0.1rem' }}>
            {line.type === 'input' && (
              <div>
                <span style={{ color: 'var(--accent)' }}>omkar@portfolio</span>
                <span style={{ color: 'var(--text-muted)' }}>:</span>
                <span style={{ color: 'var(--blue)' }}>~</span>
                <span style={{ color: 'var(--text-muted)' }}>$ </span>
                <span style={{ color: 'var(--text-primary)' }}>{line.text}</span>
              </div>
            )}
            {line.type === 'output' && (
              <pre style={{
                color: 'var(--text-secondary)',
                margin: '0.2rem 0 0.6rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'inherit',
              }}>{line.text}</pre>
            )}
            {line.type === 'error' && (
              <pre style={{
                color: 'var(--red)',
                margin: '0.2rem 0 0.6rem',
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
              }}>{line.text}</pre>
            )}
            {line.type === 'system' && (
              <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{line.text}</div>
            )}
          </div>
        ))}

        {/* Active prompt */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'var(--accent)', whiteSpace: 'nowrap' }}>omkar@portfolio</span>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <span style={{ color: 'var(--blue)' }}>~</span>
          <span style={{ color: 'var(--text-muted)' }}>$ </span>
          <span style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-primary)' }}>{input}</span>
            {hint && <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{hint}</span>}
            <span style={{
              display: 'inline-block', width: 8, height: '1.1em',
              background: 'var(--accent)', marginLeft: 1,
              animation: 'blink 1s step-end infinite',
            }} />
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              style={{
                position: 'absolute', opacity: 0,
                width: '100%', height: '100%',
                border: 'none', outline: 'none',
                background: 'transparent', cursor: 'none',
              }}
            />
          </span>
        </div>
      </div>

      {/* Bottom hint bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '0.4rem 1.2rem',
        display: 'flex',
        gap: '1.5rem',
        fontSize: 10,
        color: 'var(--text-muted)',
      }}>
        <span><span style={{ color: 'var(--accent)' }}>TAB</span> autocomplete</span>
        <span><span style={{ color: 'var(--accent)' }}>↑↓</span> history</span>
        <span><span style={{ color: 'var(--accent)' }}>CTRL+L</span> clear</span>
        <span><span style={{ color: 'var(--accent)' }}>CTRL+C</span> cancel</span>
      </div>
    </div>
  )
}
