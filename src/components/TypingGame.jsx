import { useState, useEffect, useRef, useCallback } from 'react'
import { addLeaderboardEntry } from '../lib/supabase'
import Leaderboard from './Leaderboard'

const CHALLENGES = [
  { cmd: 'kubectl get pods -n production', desc: 'Check running pods in production' },
  { cmd: 'terraform init && terraform plan', desc: 'Initialize and plan infrastructure' },
  { cmd: 'docker build -t omkar/app:latest .', desc: 'Build a Docker image' },
  { cmd: 'git commit -m "feat: add observability"', desc: 'Commit a feature with conventional commits' },
  { cmd: 'helm upgrade --install myapp ./charts', desc: 'Deploy app with Helm' },
  { cmd: 'prometheus --config.file=prometheus.yml', desc: 'Start Prometheus with config' },
  { cmd: 'ssh -i ~/.ssh/id_rsa ubuntu@10.0.0.1', desc: 'SSH into a remote server' },
  { cmd: 'grep -r "ERROR" /var/log/app/*.log', desc: 'Hunt for errors in logs' },
  { cmd: 'curl -s https://api.github.com/users/omkar', desc: 'Fetch GitHub profile via API' },
  { cmd: 'systemctl restart nginx && systemctl status nginx', desc: 'Restart and verify nginx' },
  { cmd: 'argo workflows submit --from workflotemplate/ci', desc: 'Submit an Argo workflow' },
  { cmd: 'ansible-playbook -i inventory site.yml', desc: 'Run an Ansible playbook' },
]

const RANKS = [
  { min: 0,   max: 30,  label: 'Script Kiddie',    color: '#ef4444' },
  { min: 30,  max: 50,  label: 'Junior DevOps',     color: '#f59e0b' },
  { min: 50,  max: 70,  label: 'SRE Apprentice',    color: '#3b82f6' },
  { min: 70,  max: 90,  label: 'Platform Engineer',  color: '#a855f7' },
  { min: 90,  max: 110, label: 'Cloud Architect',    color: '#00d4aa' },
  { min: 110, max: Infinity, label: '10x Engineer', color: '#ffd700' },
]

function getRank(wpm) {
  return RANKS.find(r => wpm >= r.min && wpm < r.max) || RANKS[0]
}

export default function TypingGame() {
  const [phase, setPhase] = useState('idle') // idle | countdown | playing | result
  const [challengeIdx, setChallengeIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [countdown, setCountdown] = useState(3)
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState({ wpm: 0, accuracy: 0, completed: 0, errors: 0 })
  const [totalTyped, setTotalTyped] = useState(0)
  const [totalErrors, setTotalErrors] = useState(0)
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState(false)
  const [bestWpm, setBestWpm] = useState(() => Number(localStorage.getItem('portfolio_best_wpm') || 0))
  const [playerName, setPlayerName] = useState('')
  const [namePrompt, setNamePrompt] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newLeaderboardEntry, setNewLeaderboardEntry] = useState(null)
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  const challenge = CHALLENGES[challengeIdx % CHALLENGES.length]

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 400) }
  const triggerFlash = () => { setFlash(true); setTimeout(() => setFlash(false), 300) }

  const startCountdown = () => {
    setPhase('countdown')
    setCountdown(3)
    let c = 3
    const iv = setInterval(() => {
      c--
      setCountdown(c)
      if (c === 0) {
        clearInterval(iv)
        startGame()
      }
    }, 1000)
  }

  const startGame = () => {
    setChallengeIdx(0)
    setTyped('')
    setTotalTyped(0)
    setTotalErrors(0)
    setTimeLeft(60)
    setStartTime(Date.now())
    setPhase('playing')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  useEffect(() => {
    if (phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          endGame()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  const endGame = useCallback(() => {
    setPhase('result')
    const elapsed = (Date.now() - startTime) / 1000 / 60
    const wpm = Math.round(totalTyped / 5 / Math.max(elapsed, 1/60))
    const acc = totalTyped > 0 ? Math.round(((totalTyped - totalErrors) / totalTyped) * 100) : 0
    const finalWpm = Math.round(wpm * (acc / 100))
    setScore({ wpm: finalWpm, accuracy: acc, completed: challengeIdx, errors: totalErrors })
    if (finalWpm > bestWpm) {
      setBestWpm(finalWpm)
      localStorage.setItem('portfolio_best_wpm', finalWpm)
    }
  }, [startTime, totalTyped, totalErrors, challengeIdx, bestWpm])

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) endGame()
  }, [timeLeft, phase, endGame])

  const onInput = (e) => {
    const val = e.target.value
    const target = challenge.cmd

    // Check for error on new char
    const newChar = val[val.length - 1]
    const expectedChar = target[val.length - 1]
    if (newChar && newChar !== expectedChar) {
      setTotalErrors(n => n + 1)
      triggerShake()
    }

    setTotalTyped(n => n + 1)
    setTyped(val)

    // Completed this challenge
    if (val === target) {
      triggerFlash()
      setTotalTyped(n => n + target.length)
      setChallengeIdx(i => i + 1)
      setTyped('')
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }

  // Render typed chars with color coding
  const renderChallenge = () => {
    const target = challenge.cmd
    return target.split('').map((char, i) => {
      let color = 'var(--text-muted)'
      if (i < typed.length) {
        color = typed[i] === char ? 'var(--accent)' : 'var(--red)'
      }
      const isCursor = i === typed.length
      return (
        <span key={i} style={{
          color,
          borderBottom: isCursor ? '2px solid var(--accent)' : 'none',
          background: isCursor ? 'var(--accent-glow)' : 'transparent',
          transition: 'color 0.05s',
        }}>{char}</span>
      )
    })
  }

  const submitScore = async () => {
    if (!playerName.trim()) return
    try {
      await addLeaderboardEntry({ name: playerName.trim(), wpm: score.wpm, accuracy: score.accuracy, completed: score.completed })
      setSubmitted(true)
      setNewLeaderboardEntry({ name: playerName.trim(), wpm: score.wpm })
    } catch { /* silent fail */ }
  }

  const rank = getRank(score.wpm)
  const progress = (typed.length / challenge.cmd.length) * 100
  const timerPct = (timeLeft / 60) * 100
  const timerColor = timeLeft > 20 ? 'var(--accent)' : timeLeft > 10 ? 'var(--amber)' : 'var(--red)'

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0.8rem 1.2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: 14 }}>🎮</span>
          <span style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            DevOps Typing Challenge
          </span>
        </div>
        {bestWpm > 0 && (
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            🏆 Best: <span style={{ color: 'var(--amber)' }}>{bestWpm} WPM</span>
          </span>
        )}
      </div>

      <div style={{ padding: '1.5rem' }}>

        {/* IDLE */}
        {phase === 'idle' && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: 48, marginBottom: '1rem' }}>⌨️</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              How fast can you type DevOps commands?
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8 }}>
              Type real-world commands as fast as you can.<br/>
              60 seconds. No mistakes. Prove you're a real engineer.
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {RANKS.map(r => (
                <div key={r.label} style={{
                  fontSize: 10, padding: '4px 10px',
                  border: `1px solid ${r.color}33`,
                  color: r.color, letterSpacing: '0.08em',
                }}>{r.label}: {r.min}+ WPM</div>
              ))}
            </div>
            <button onClick={startCountdown} style={{
              padding: '0.8rem 2.5rem',
              background: 'var(--accent)', color: '#000',
              border: 'none', fontFamily: 'var(--font-mono)',
              fontSize: 13, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px var(--accent-glow-strong)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >Start Challenge →</button>
          </div>
        )}

        {/* COUNTDOWN */}
        {phase === 'countdown' && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '6rem', fontWeight: 800,
              color: 'var(--accent)',
              lineHeight: 1,
              textShadow: '0 0 40px var(--accent-glow-strong)',
              animation: 'fadeUp 0.3s ease',
            }}>{countdown || 'GO!'}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: '1rem' }}>get ready...</div>
          </div>
        )}

        {/* PLAYING */}
        {phase === 'playing' && (
          <div>
            {/* Timer + stats bar */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
              {[
                { label: 'TIME', value: `${timeLeft}s`, color: timerColor },
                { label: 'COMPLETED', value: challengeIdx, color: 'var(--accent)' },
                { label: 'ERRORS', value: totalErrors, color: totalErrors > 5 ? 'var(--red)' : 'var(--text-secondary)' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  padding: '0.5rem 1rem', flex: 1, textAlign: 'center', minWidth: 80,
                }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Timer bar */}
            <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginBottom: '1.5rem', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${timerPct}%`,
                background: timerColor,
                transition: 'width 1s linear, background 0.5s',
                boxShadow: `0 0 8px ${timerColor}`,
              }} />
            </div>

            {/* Challenge description */}
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              # {challenge.desc}
            </div>

            {/* Command to type */}
            <div style={{
              background: 'var(--bg-surface)',
              border: `1px solid ${shake ? 'var(--red)' : flash ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 6,
              padding: '1rem 1.2rem',
              marginBottom: '1rem',
              fontSize: 15,
              letterSpacing: '0.04em',
              transition: 'border-color 0.1s',
              animation: shake ? 'shake 0.3s ease' : flash ? 'flashGreen 0.3s ease' : 'none',
            }}>
              <span style={{ color: 'var(--accent)', marginRight: 8 }}>$</span>
              {renderChallenge()}
            </div>

            {/* Progress bar for current command */}
            <div style={{ height: 2, background: 'var(--border)', borderRadius: 1, marginBottom: '1rem', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${progress}%`,
                background: 'var(--accent)',
                transition: 'width 0.05s',
                boxShadow: '0 0 6px var(--accent)',
              }} />
            </div>

            {/* Hidden input */}
            <input
              ref={inputRef}
              value={typed}
              onChange={onInput}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              style={{
                width: '100%', padding: '0.7rem 1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 14, outline: 'none',
                letterSpacing: '0.04em',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
              placeholder="Start typing the command above..."
            />

            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: '0.6rem', textAlign: 'center' }}>
              Command {challengeIdx + 1} of {CHALLENGES.length} — keep going!
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block', fontSize: 11, padding: '4px 14px',
              border: `1px solid ${rank.color}`, color: rank.color,
              letterSpacing: '0.15em', marginBottom: '1rem',
            }}>{rank.label}</div>

            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem,10vw,5rem)', fontWeight: 800,
              color: rank.color, lineHeight: 1,
              textShadow: `0 0 40px ${rank.color}44`, marginBottom: '0.3rem',
            }}>{score.wpm}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>WPM (adjusted for accuracy)</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label:'Accuracy', value:`${score.accuracy}%`, color: score.accuracy>90?'var(--accent)':score.accuracy>70?'var(--amber)':'var(--red)' },
                { label:'Commands', value:score.completed, color:'var(--blue)' },
                { label:'Errors',   value:score.errors,   color: score.errors<5?'var(--accent)':'var(--red)' },
              ].map(({label,value,color}) => (
                <div key={label} style={{ background:'var(--bg-surface)', border:'1px solid var(--border)', padding:'1rem', borderRadius:4 }}>
                  <div style={{ fontSize:10, color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:'1.5rem', fontWeight:700, color }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Submit to leaderboard */}
            {!submitted ? (
              <div style={{ marginBottom:'1.5rem', display:'flex', gap:'0.5rem', justifyContent:'center', flexWrap:'wrap' }}>
                <input
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && submitScore()}
                  placeholder="enter your name for leaderboard"
                  maxLength={20}
                  style={{
                    padding:'0.6rem 1rem', background:'var(--bg-surface)',
                    border:'1px solid var(--border)', color:'var(--text-primary)',
                    fontFamily:'var(--font-mono)', fontSize:12, outline:'none', minWidth:220,
                  }}
                  onFocus={e=>e.target.style.borderColor='var(--accent)'}
                  onBlur={e=>e.target.style.borderColor='var(--border)'}
                />
                <button onClick={submitScore} disabled={!playerName.trim()} style={{
                  padding:'0.6rem 1.2rem', background: playerName.trim()?'var(--accent)':'var(--border)',
                  color: playerName.trim()?'#000':'var(--text-muted)',
                  border:'none', fontFamily:'var(--font-mono)',
                  fontSize:12, fontWeight:700, letterSpacing:'0.08em',
                }}>submit →</button>
              </div>
            ) : (
              <div style={{ fontSize:12, color:'var(--accent)', marginBottom:'1.5rem' }}>✓ Score submitted to leaderboard!</div>
            )}

            {/* Live leaderboard */}
            <div style={{ marginBottom:'1.5rem', textAlign:'left' }}>
              <Leaderboard newEntry={newLeaderboardEntry} />
            </div>

            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={startCountdown} style={{
                padding:'0.7rem 2rem', background:'var(--accent)', color:'#000',
                border:'none', fontFamily:'var(--font-mono)',
                fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
              }}>Try Again →</button>
              <button onClick={() => { setPhase('idle'); setSubmitted(false); setPlayerName('') }} style={{
                padding:'0.7rem 2rem', background:'transparent',
                border:'1px solid var(--border)', color:'var(--text-secondary)',
                fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase',
              }}>← Back</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-6px)}
          40%{transform:translateX(6px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
        @keyframes flashGreen {
          0%{box-shadow:0 0 0 0 var(--accent-glow-strong)}
          100%{box-shadow:0 0 20px 4px var(--accent-glow)}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:scale(0.8)}
          to{opacity:1;transform:scale(1)}
        }
      `}</style>
    </div>
  )
}
