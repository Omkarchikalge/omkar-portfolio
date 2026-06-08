import { useCallback, useRef } from 'react'

// Generate tones using Web Audio API — no files needed
function createCtx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

function playTone(ctx, freq, type = 'sine', duration = 0.06, gain = 0.08) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime)
  gainNode.gain.setValueAtTime(gain, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

export default function useSound(enabled) {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = createCtx()
    return ctxRef.current
  }, [])

  const keyClick = useCallback(() => {
    if (!enabled) return
    try { playTone(getCtx(), 600 + Math.random() * 200, 'square', 0.04, 0.05) } catch {}
  }, [enabled, getCtx])

  const commandRun = useCallback(() => {
    if (!enabled) return
    try {
      const ctx = getCtx()
      playTone(ctx, 440, 'sine', 0.08, 0.1)
      setTimeout(() => playTone(ctx, 660, 'sine', 0.08, 0.08), 80)
    } catch {}
  }, [enabled, getCtx])

  const commandError = useCallback(() => {
    if (!enabled) return
    try {
      const ctx = getCtx()
      playTone(ctx, 220, 'sawtooth', 0.1, 0.12)
      setTimeout(() => playTone(ctx, 180, 'sawtooth', 0.1, 0.1), 90)
    } catch {}
  }, [enabled, getCtx])

  const success = useCallback(() => {
    if (!enabled) return
    try {
      const ctx = getCtx()
      ;[523, 659, 784].forEach((f, i) =>
        setTimeout(() => playTone(ctx, f, 'sine', 0.12, 0.12), i * 80)
      )
    } catch {}
  }, [enabled, getCtx])

  const konamiSound = useCallback(() => {
    if (!enabled) return
    try {
      const ctx = getCtx()
      const melody = [262,294,330,349,392,440,494,523]
      melody.forEach((f, i) => setTimeout(() => playTone(ctx, f, 'sine', 0.15, 0.15), i * 60))
    } catch {}
  }, [enabled, getCtx])

  const uiClick = useCallback(() => {
    if (!enabled) return
    try { playTone(getCtx(), 800, 'sine', 0.05, 0.07) } catch {}
  }, [enabled, getCtx])

  return { keyClick, commandRun, commandError, success, konamiSound, uiClick }
}
