import { useState, useEffect } from 'react'

export default function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme')
    return saved ? saved === 'dark' : true // default dark
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.style.setProperty('--bg', '#080b0f')
      root.style.setProperty('--bg-surface', '#0d1117')
      root.style.setProperty('--bg-card', '#111820')
      root.style.setProperty('--bg-card-hover', '#161f2a')
      root.style.setProperty('--border', '#1e2d3d')
      root.style.setProperty('--border-glow', '#2a4a6b')
      root.style.setProperty('--text-primary', '#e2e8f0')
      root.style.setProperty('--text-secondary', '#7d96b0')
      root.style.setProperty('--text-muted', '#3d5166')
      document.body.style.background = '#080b0f'
    } else {
      root.style.setProperty('--bg', '#f0f4f8')
      root.style.setProperty('--bg-surface', '#ffffff')
      root.style.setProperty('--bg-card', '#ffffff')
      root.style.setProperty('--bg-card-hover', '#f8fafc')
      root.style.setProperty('--border', '#cbd5e1')
      root.style.setProperty('--border-glow', '#94a3b8')
      root.style.setProperty('--text-primary', '#0f172a')
      root.style.setProperty('--text-secondary', '#475569')
      root.style.setProperty('--text-muted', '#94a3b8')
      document.body.style.background = '#f0f4f8'
    }
    localStorage.setItem('portfolio_theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}
