import Globe from './Globe'

export default function GlobeSection() {
  return (
    <section id="location" style={{ paddingBottom: '3rem' }}>
      <div className="section-label">06 — location</div>
      <h2><span style={{ color: 'var(--accent)' }}>$</span> geolocate --me</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: '2.5rem', marginTop: '0.5rem' }}>
        Based in Pune, India. Open to remote work and relocation.
      </p>
      <Globe />
    </section>
  )
}
