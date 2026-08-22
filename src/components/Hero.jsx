import { useState, useEffect, useRef } from 'react'
import useInView from './useInView'
import Terminal from './Terminal'

// ── Name in different languages/scripts ──────────────────────────
const NAME_VARIANTS = [
  { lang: 'English', parts: [['O', 'mkar'], ['C', 'hikalge']], rtl: false, en: true },
  { lang: 'Hindi', parts: [['ओं', 'कार'], ['चि', 'कलगे']], rtl: false, en: false },
  { lang: 'Marathi', parts: [['ओं', 'कार'], ['चि', 'कलगे']], rtl: false, en: false },
  { lang: 'Japanese', parts: [['オ', 'ムカル'], ['チ', 'カルゲ']], rtl: false, en: false },
  { lang: 'Korean', parts: [['오', '마르'], ['치', '칼게']], rtl: false, en: false },
  { lang: 'Arabic', parts: [['ع', 'مكار'], ['چ', 'يكالگه']], rtl: true, en: false },
  { lang: 'Russian', parts: [['О', 'мкар'], ['Ч', 'икалге']], rtl: false, en: false },
  { lang: 'Tamil', parts: [['ஓ', 'ம்கர்'], ['சி', 'கல்கே']], rtl: false, en: false },
  { lang: 'Greek', parts: [['Ο', 'μκάρ'], ['Τ', 'σικαλγκέ']], rtl: false, en: false },
]

function AnimatedName() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)

      setTimeout(() => {
        setIdx(i => (i + 1) % NAME_VARIANTS.length)
        setVisible(true)
      }, 420)
    }, 2400)

    return () => clearInterval(t)
  }, [])

  const v = NAME_VARIANTS[idx]

  return (
    <div style={{ marginBottom: '1rem', minHeight: '9rem' }}>
      <div style={{
        fontSize: 10,
        color: 'var(--text-muted)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        marginBottom: '0.8rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s'
      }}>
        {v.lang}
      </div>

      <h1 style={{
        fontFamily: v.en ? 'var(--font-display)' : 'monospace',
        fontSize: v.en
          ? 'clamp(3.5rem,9vw,4rem)'
          : 'clamp(2.2rem,5vw,4.8rem)',
        fontWeight: 600,
        lineHeight: 1.4,
        margin: 0,
        letterSpacing: v.en ? '-0.02em' : '0.01em',
        direction: v.rtl ? 'rtl' : 'ltr',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.42s ease, transform 0.42s ease',
      }}>
        {v.en ? (
          <>
            <span style={{ color: 'var(--accent)' }}>
              {v.parts[0][0]}
            </span>
            <span style={{ color: 'var(--text-primary)' }}>
              {v.parts[0][1]}
            </span>
            {' '}
            <span style={{ color: 'var(--accent)' }}>
              {v.parts[1][0]}
            </span>
            <span style={{ color: 'var(--text-primary)' }}>
              {v.parts[1][1]}
            </span>
          </>
        ) : (
          <span>
            <span style={{ color: 'var(--accent)' }}>
              {v.parts[0][0]}
            </span>
            <span style={{ color: 'var(--text-primary)' }}>
              {v.parts[0][1]}
            </span>
            {' '}
            <span style={{ color: 'var(--accent)' }}>
              {v.parts[1][0]}
            </span>
            <span style={{ color: 'var(--text-primary)' }}>
              {v.parts[1][1]}
            </span>
          </span>
        )}
      </h1>
    </div>
  )
}


// ── Orbit tools ───────────────────────────────────────────────────
const INNER = [
  {
    logo: '/logos/Docker.svg',
    label: 'Docker'
  },
  {
    logo: '/logos/Linux.svg',
    label: 'Linux'
  },
  {
    logo: '/logos/Kubernetes.svg',
    label: 'Kubernetes'
  },
  {
    logo: '/logos/HashiCorp Terraform.svg',
    label: 'Terraform'
  },
]

const MIDDLE = [
  {
    logo: '/logos/AWS.svg',
    label: 'AWS'
  },
  {
    logo: '/logos/Argo CD.svg',
    label: 'ArgoCD'
  },
  {
    logo: '/logos/Jenkins.svg',
    label: 'Jenkins'
  },
  {
    logo: '/logos/Azure Devops.svg',
    label: 'Azure-DevOps'
  },
  {
    logo: '/logos/GitHub.svg',
    label: 'GitHub'
  },
]

const OUTER = [
  {
    logo: '/logos/GitLab.svg',
    label: 'GitLab'
  },
  {
    logo: '/logos/OpenTelemetry.svg',
    label: 'OpenTelemetry'
  },
  {
    logo: '/logos/Ansible (1).svg',
    label: 'Ansible'
  },
  {
    logo: '/logos/Prometheus.svg',
    label: 'Prometheus'
  },
  {
    logo: '/logos/Grafana.svg',
    label: 'Grafana'
  },
  {
    logo: '/logos/Python.svg',
    label: 'Python'
  },
  {
    logo: '/logos/Google Cloud.svg',
    label: 'Google Cloud'
  },
]


// ── 3D Rotating Cube ──────────────────────────────────────────────
const CUBE_FACES = [
  {
    label: 'FOCUS',
    lines: ['Platform Engineering', 'Site Reliability', 'Cloud Native'],
    icon: '⚙️',
    color: '#00d4aa',
  },
  {
    label: 'STACK',
    lines: ['Linux · Git · Python', 'Docker · Kubernetes', 'Terraform · Bash'],
    icon: '💻',
    color: '#3b82f6',
  },
  {
    label: 'STATUS',
    lines: ['Open to Internships', 'Open Source Ready', 'Always Learning'],
    icon: '🚀',
    color: '#a855f7',
  },
  {
    label: 'LOCATION',
    lines: ['Pune, India 🇮🇳', 'IST · UTC+5:30', 'Remote Friendly'],
    icon: '📍',
    color: '#f59e0b',
  },
  {
    label: 'Name',
    lines: ['Omkar Chikalge'],
    icon: '📄',
    color: '#ef4444',
  },
  {
    label: 'GOAL',
    lines: ['Platform Engineer', 'CNCF Ecosystem', 'Build at Scale'],
    icon: '🎯',
    color: '#00d4aa',
  },
]


function RotatingCube() {
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [angle, setAngle] = useState(0)
  const [faceIdx, setFaceIdx] = useState(0)
  const [hovered, setHovered] = useState(null)

  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const autoRef = useRef(null)


  // ── Auto rotate cube + orbit ───────────────────────────────────
  useEffect(() => {
    let lastTime = performance.now()

    const animate = now => {
      const dt = Math.min((now - lastTime) / 16, 3)
      lastTime = now

      if (!dragging.current) {
        setRotY(r => (r + 0.55 * dt) % 360)
        setRotX(r => (r + 0.30 * dt) % 360)
      }

      setAngle(a => (a + 0.3 * dt) % 360)

      autoRef.current = requestAnimationFrame(animate)
    }

    autoRef.current = requestAnimationFrame(animate)

    const faceTimer = setInterval(() => {
      setFaceIdx(i => (i + 1) % CUBE_FACES.length)
    }, 2500)

    return () => {
      cancelAnimationFrame(autoRef.current)
      clearInterval(faceTimer)
    }
  }, [])

  // ── Mouse controls ─────────────────────────────────────────────
  const onMouseDown = e => {
    dragging.current = true
    lastPos.current = {
      x: e.clientX,
      y: e.clientY
    }
  }

  const onMouseMove = e => {
    if (!dragging.current) return

    setRotY(r =>
      r + (e.clientX - lastPos.current.x) * 0.5
    )

    setRotX(r =>
      r - (e.clientY - lastPos.current.y) * 0.5
    )

    lastPos.current = {
      x: e.clientX,
      y: e.clientY
    }
  }

  const onMouseUp = () => {
    dragging.current = false
  }


  const face = CUBE_FACES[faceIdx]

  // ── Orbit dimensions ──────────────────────────────────────────
  const SIZE = 160
  const CANVAS = 500
  const CENTER = CANVAS / 2

  const INNER_RADIUS = 145
  const MIDDLE_RADIUS = 200
  const OUTER_RADIUS = 245


  // ── Inner orbit icon positions ─────────────────────────────────
  const innerIcons = INNER.map((tool, i) => {
    const deg = (i * 360 / INNER.length + angle * 0.65) * Math.PI / 180
    const x = CENTER + INNER_RADIUS * Math.cos(deg)
    const y = CENTER + INNER_RADIUS * Math.sin(deg)
    const depth = Math.sin(deg)

    return { ...tool, x, y, depth }
  })

  const middleIcons = MIDDLE.map((tool, i) => {
    const deg = (i * 360 / MIDDLE.length + angle * 0.48 + 45) * Math.PI / 180
    const x = CENTER + MIDDLE_RADIUS * Math.cos(deg)
    const y = CENTER + MIDDLE_RADIUS * Math.sin(deg)
    const depth = Math.sin(deg)

    return { ...tool, x, y, depth }
  })


  const outerIcons = OUTER.map((tool, i) => {
    const deg = (i * 360 / OUTER.length - angle * 0.35 + 30) * Math.PI / 180
    const x = CENTER + OUTER_RADIUS * Math.cos(deg)
    const y = CENTER + OUTER_RADIUS * Math.sin(deg)
    const depth = Math.sin(deg)

    return { ...tool, x, y, depth }
  })


  // ── Orbit icon renderer ────────────────────────────────────────
  const renderIcon = (tool, i) => {
    const scale = 0.82 + 0.18 * ((tool.depth + 1) / 2)
    const opacity = 1

    return (
      <div
        key={`${tool.label}-${i}`}
        onMouseEnter={() => setHovered(tool.label)}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: 'absolute',
          left: tool.x - 18,
          top: tool.y - 18,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          transform: `scale(${scale})`,
          opacity,
          zIndex: tool.depth > 0 ? 20 : 2,
          filter: `drop-shadow(0 0 24px ${face.color}55)`,
          cursor: 'default',
          transition: 'opacity 0.15s, transform 0.15s'
        }}
      >
        <img
          src={tool.logo}
          alt={tool.label}
          draggable="false"
          style={{
            width: 35,
            height: 35,
            objectFit: 'contain',
            opacity: 1,
          }}
        />

        {hovered === tool.label && (
          <div
            style={{
              position: 'absolute',
              bottom: '120%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 9,
              color: 'var(--accent)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              padding: '3px 8px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 200,
              fontFamily: 'var(--font-mono)'
            }}
          >
            {tool.label}
          </div>
        )}
      </div>
    )
  }


  // ── Cube face style ────────────────────────────────────────────
  const faceStyle = (transform) => ({
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    background: 'rgba(8, 12, 18, 0.97)',
    border: `1px solid ${face.color}88`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    transform,
    padding: '1rem',
    boxSizing: 'border-box',
    boxShadow: `inset 0 0 25px ${face.color}18`,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* ── Orbit canvas ───────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: CANVAS,
          height: CANVAS,
          userSelect: 'none'
        }}
      >

        {/* ── Orbit Rings ──────────────────────────────────────── */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'visible'
          }}
          width={CANVAS}
          height={CANVAS}
        >
          {/* Inner ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={INNER_RADIUS}
            fill="none"
            stroke="rgba(0,212,170,0.20)"
            strokeWidth={1.5}
            strokeDasharray="6 7"
          />

          {/* Middle ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={MIDDLE_RADIUS}
            fill="none"
            stroke="rgba(59,130,246,0.18)"
            strokeWidth={1.2}
            strokeDasharray="5 8"
          />

          {/* Outer ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={OUTER_RADIUS}
            fill="none"
            stroke="rgba(59,130,246,0.15)"
            strokeWidth={1}
            strokeDasharray="4 9"
          />
        </svg>


        {/* ── Back orbit icons ─────────────────────────────────── */}
        {[...innerIcons, ...middleIcons, ...outerIcons]
          .filter(tool => tool.depth <= 0)
          .map(renderIcon)
        }


        {/* ── Cube ────────────────────────────────────────────── */}
        <div
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            position: 'absolute',
            left: CENTER - SIZE / 2,
            top: CENTER - SIZE / 2,
            width: SIZE,
            height: SIZE,
            perspective: 600,
            cursor: dragging.current ? 'grabbing' : 'grab',
            zIndex: 10,
            filter: `drop-shadow(0 0 24px ${face.color}55)`,
            transition: 'filter 0.5s'
          }}
        >

          <div
            style={{
              width: SIZE,
              height: SIZE,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: dragging.current ? 'none' : 'transform 0.05s linear'
            }}
          >

            {/* Front */}
            <div style={faceStyle(`translateZ(${SIZE / 2}px)`)}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>
                {face.icon}
              </div>

              <div style={{ fontSize: 11, color: face.color, fontWeight: 700, letterSpacing: '0.18em', marginBottom: 6 }}>
                {face.label}
              </div>

              {face.lines.map(line => (
                <div
                  key={line}
                  style={{
                    fontSize: 11,
                    color: '#e6edf3',
                    fontWeight: 500,
                    textAlign: 'center',
                    lineHeight: 1.6,
                    textShadow: `0 0 8px ${face.color}33`
                  }}
                >
                  {line}
                </div>
              ))}
            </div>


            {/* Back */}
            <div style={faceStyle(`rotateY(180deg) translateZ(${SIZE / 2}px)`)}>
              <div style={{ fontSize: 12, color: '#af2aed', letterSpacing: '0.15em' }}>
                HIRE<br />ME
              </div>
            </div>


            {/* Left */}
            <div style={faceStyle(`rotateY(-90deg) translateZ(${SIZE / 2}px)`)}>
              <div style={{ fontSize: 12, color: '#35d6ef', letterSpacing: '0.1em', textAlign: 'center', lineHeight: 1.8 }}>
                Platform<br />Engineer & SRE
              </div>
            </div>


            {/* Right */}
            <div style={faceStyle(`rotateY(90deg) translateZ(${SIZE / 2}px)`)}>
              <div style={{ fontSize: 12, color: 'rgba(68, 204, 68, 0.97)', letterSpacing: '0.1em', textAlign: 'center', lineHeight: 1.8 }}>
                SRE<br />Student
              </div>
            </div>


            {/* Top */}
            <div style={faceStyle(`rotateX(90deg) translateZ(${SIZE / 2}px)`)}>
              <div style={{ fontSize: 12, color: 'rgb(198, 35, 35)', letterSpacing: '0.1em' }}>
                PUNE, IN 🇮🇳 <br /> IST · UTC+5:30 <br /> OPEN TO REMOTE
              </div>
            </div>


            {/* Bottom */}
            <div style={faceStyle(`rotateX(-90deg) translateZ(${SIZE / 2}px)`)}>
              <div style={{ fontSize: 12, color: '#db7979', letterSpacing: '0.1em' }}>
                ALWAYS LEARNING
              </div>
            </div>

          </div>
        </div>


        {/* ── Front orbit icons ────────────────────────────────── */}
        {[...innerIcons, ...middleIcons, ...outerIcons]
          .filter(tool => tool.depth > 0)
          .map(renderIcon)
        }

      </div>


      {/* ── Face info card ─────────────────────────────────────── */}
      <div
        style={{
          background: 'rgba(8, 12, 18, 0.96)',
          border: `1px solid ${face.color}55`,
          borderRadius: 8,
          padding: '0.9rem 1.2rem',
          width: '100%',
          maxWidth: 300,
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 0 20px ${face.color}12, inset 0 0 20px ${face.color}08`,
          transition: 'all 0.5s ease',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 2,
            background: face.color,
            boxShadow: `0 0 12px ${face.color}`,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '0.7rem',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${face.color}55`,
              borderRadius: 6,
              background: `${face.color}10`,
              fontSize: 16,
              boxShadow: `0 0 10px ${face.color}15`,
            }}
          >
            {face.icon}
          </div>

          <div>
            <div
              style={{
                fontSize: 9,
                color: face.color,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {face.label}
            </div>

            <div
              style={{
                fontSize: 8,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                marginTop: 2,
              }}
            >
              SYSTEM PROFILE
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `${face.color}20`,
            marginBottom: '0.65rem',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {face.lines.map((line) => (
            <div
              key={line}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 10.5,
                color: '#e6edf3',
                lineHeight: 1.7,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: face.color,
                  boxShadow: `0 0 6px ${face.color}`,
                  flexShrink: 0,
                }}
              />
              {line}
            </div>
          ))}
        </div>

        {/* Bottom status */}
        <div
          style={{
            marginTop: '0.7rem',
            paddingTop: '0.55rem',
            borderTop: `1px solid ${face.color}15`,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 8,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span>ACTIVE</span>
          <span style={{ color: face.color }}>● LIVE</span>
        </div>
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────
export default function Hero({ soundEnabled }) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '5rem 2.5rem 4rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 340px',
          gap: '2rem',
          alignItems: 'start'
        }}
        className="hero-layout"
      >
        <div>
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 12,
              color: 'var(--accent)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                animation: 'blink 1.2s step-end infinite',
                fontSize: 8
              }}
            >
              ▶
            </span>
            available for opportunities
          </div>

          {/* Animated Name */}
          <AnimatedName />

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem,2.5vw,1.6rem)',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
            }}
          >
            Aspiring Platform Engineer &amp; Site Reliability Engineer
          </div>

          {/* Interactive Terminal */}
          <div
            style={{
              maxWidth: 580,
              marginBottom: '2rem'
            }}
          >
            <Terminal soundEnabled={soundEnabled} />
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.8rem',
                background: 'var(--accent)',
                color: '#000',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.2s',
                border: 'none',
              }}
              onMouseEnter={e =>
                e.currentTarget.style.boxShadow =
                '0 0 30px var(--accent-glow-strong)'
              }
              onMouseLeave={e =>
                e.currentTarget.style.boxShadow = 'none'
              }
            >
              view projects ↓
            </a>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.8rem',
                border: '1px solid var(--border-glow)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-glow)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-glow)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              get in touch →
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '3rem',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
            }}
          >
            {[
              ['3+', 'Technical Projects'],
              ['1', 'Research Publication'],
              ['OSS', 'Open Source Contributor']
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    lineHeight: 1
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '0.3rem'
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3D Cube + Orbits ─────────────────────────────────── */}
        <div
          style={{
            paddingTop: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          className="hero-right"
        >
          <RotatingCube />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%,100% { opacity:1 }
          50% { opacity:0 }
        }

        @media(max-width:900px){
          .hero-layout {
            grid-template-columns:1fr!important
          }
          .hero-right {
            order:-1;
            padding-top:0!important;
            margin-bottom:2rem
          }
        }

        @media(max-width:500px){
          .hero-right > div {
            transform:scale(0.78);
            transform-origin:center center;
            margin-top:-30px;
            margin-bottom:-30px;
          }
        }
      `}</style>
    </section>
  )
}