import { useEffect, useRef, useState } from 'react'

const W = 340, H = 340, R = 130
const PUNE = { lat: 18.5204, lng: 73.8567 }

// Convert lat/lng to 3D point on sphere
function latLngTo3D(lat, lng, r, rotY) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + rotY) * (Math.PI / 180)
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  }
}

// Simplified world land coordinates [lat, lng]
const LAND_DOTS = (() => {
  const dots = []
  for (let lat = -80; lat <= 80; lat += 5) {
    for (let lng = -180; lng <= 180; lng += 5) {
      // Crude land mask — keeps dots on continent shapes
      const isLand = (
        // North America
        (lat > 25 && lat < 75 && lng > -140 && lng < -55) ||
        // South America
        (lat > -55 && lat < 15 && lng > -82 && lng < -35) ||
        // Europe
        (lat > 35 && lat < 72 && lng > -12 && lng < 40) ||
        // Africa
        (lat > -35 && lat < 38 && lng > -18 && lng < 52) ||
        // Asia
        (lat > 5 && lat < 75 && lng > 40 && lng < 145) ||
        // India
        (lat > 8 && lat < 35 && lng > 68 && lng < 97) ||
        // SE Asia
        (lat > -10 && lat < 25 && lng > 95 && lng < 140) ||
        // Australia
        (lat > -40 && lat < -10 && lng > 113 && lng < 154)
      )
      if (isLand) dots.push({ lat, lng })
    }
  }
  return dots
})()

// Cities to show
const CITIES = [
  { name: 'Pune', lat: 18.52, lng: 73.86, home: true },
  { name: 'San Francisco', lat: 37.77, lng: -122.42, home: false },
  { name: 'London', lat: 51.51, lng: -0.13, home: false },
  { name: 'Tokyo', lat: 35.69, lng: 139.69, home: false },
  { name: 'Berlin', lat: 52.52, lng: 13.40, home: false },
]

export default function Globe() {
  const canvasRef = useRef(null)
  const rotY = useRef(200)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const animRef = useRef(null)
  const [hoveredCity, setHoveredCity] = useState(null)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = W
    canvas.height = H

    let pulsePhase = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2

      // Auto-rotate when not dragging
      if (!dragging.current) rotY.current += 0.2

      // Atmosphere glow
      const atmo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.3)
      atmo.addColorStop(0, 'rgba(0,212,170,0.08)')
      atmo.addColorStop(1, 'transparent')
      ctx.fillStyle = atmo
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2)
      ctx.fill()

      // Globe base
      const grad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, R)
      grad.addColorStop(0, '#1a2744')
      grad.addColorStop(1, '#080b0f')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      // Globe outline
      ctx.strokeStyle = 'rgba(0,212,170,0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Latitude grid lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const p = latLngTo3D(lat, 0, R, rotY.current)
        if (p.z < 0) continue
        const yOff = cy + p.y
        const radiusAtLat = Math.sqrt(R * R - p.y * p.y)
        ctx.beginPath()
        ctx.ellipse(cx, yOff, radiusAtLat, radiusAtLat * 0.15, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,212,170,0.06)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Longitude grid lines (vertical)
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath()
        let first = true
        for (let lat = -80; lat <= 80; lat += 5) {
          const p = latLngTo3D(lat, lng, R, rotY.current)
          if (p.z < 0) { first = true; continue }
          const sx = cx + p.x, sy = cy - p.y
          if (first) { ctx.moveTo(sx, sy); first = false }
          else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = 'rgba(0,212,170,0.05)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Land dots
      LAND_DOTS.forEach(({ lat, lng }) => {
        const p = latLngTo3D(lat, lng, R, rotY.current)
        if (p.z < -5) return
        const brightness = Math.max(0, (p.z + R) / (2 * R))
        const sx = cx + p.x, sy = cy - p.y
        ctx.beginPath()
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,170,${brightness * 0.45})`
        ctx.fill()
      })

      // Cities
      CITIES.forEach(city => {
        const p = latLngTo3D(city.lat, city.lng, R, rotY.current)
        if (p.z < 0) return
        const sx = cx + p.x, sy = cy - p.y
        const brightness = (p.z + R) / (2 * R)

        if (city.home) {
          // Pulse rings for Pune
          pulsePhase += 0.03
          for (let i = 0; i < 3; i++) {
            const phase = (pulsePhase + i * 0.7) % 2
            const pr = phase * 20
            const alpha = (1 - phase / 2) * 0.6
            ctx.beginPath()
            ctx.arc(sx, sy, pr, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(0,212,170,${alpha})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
          // Dot
          ctx.beginPath()
          ctx.arc(sx, sy, 5, 0, Math.PI * 2)
          ctx.fillStyle = '#00d4aa'
          ctx.fill()
          ctx.beginPath()
          ctx.arc(sx, sy, 3, 0, Math.PI * 2)
          ctx.fillStyle = '#fff'
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(sx, sy, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59,130,246,${brightness * 0.8})`
          ctx.fill()
        }
      })

      // "You are here" label for Pune when visible
      const pune3d = latLngTo3D(PUNE.lat, PUNE.lng, R, rotY.current)
      if (pune3d.z > 10) {
        const px = cx + pune3d.x, py = cy - pune3d.y
        ctx.font = '10px JetBrains Mono, monospace'
        ctx.fillStyle = 'rgba(0,212,170,0.9)'
        ctx.fillText('📍 Pune, IN', px + 10, py - 5)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Drag to rotate
  const onMouseDown = e => { dragging.current = true; lastX.current = e.clientX }
  const onMouseMove = e => {
    if (!dragging.current) return
    rotY.current += (e.clientX - lastX.current) * 0.5
    lastX.current = e.clientX
  }
  const onMouseUp = () => { dragging.current = false }

  // Touch
  const onTouchStart = e => { dragging.current = true; lastX.current = e.touches[0].clientX }
  const onTouchMove = e => {
    if (!dragging.current) return
    rotY.current += (e.touches[0].clientX - lastX.current) * 0.5
    lastX.current = e.touches[0].clientX
  }

  return (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {/* Globe canvas */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <canvas
          ref={canvasRef}
          width={W} height={H}
          style={{ display: 'block', borderRadius: '50%', cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        />
      </div>

      {/* Info panel */}
      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Current Location
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
          Pune, India
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: '2rem' }}>
          18.52°N · 73.86°E · IST (UTC+5:30)
        </div>

        {[
          { label: 'Status', value: 'Open to opportunities', color: 'var(--accent)' },
          { label: 'Timezone', value: 'IST · UTC+5:30', color: 'var(--text-secondary)' },
          { label: 'Remote', value: 'Yes — anywhere', color: 'var(--blue)' },
          { label: 'Relocation', value: 'Open to discuss', color: 'var(--amber)' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '0.6rem 0',
            borderBottom: '1px solid var(--border)',
            fontSize: 12,
          }}>
            <span style={{ color: 'var(--text-muted)' }}>{label}</span>
            <span style={{ color }}>{value}</span>
          </div>
        ))}

        <div style={{ marginTop: '1.5rem', fontSize: 11, color: 'var(--text-muted)' }}>
          Drag the globe to rotate ↕↔
        </div>
      </div>
    </div>
  )
}
