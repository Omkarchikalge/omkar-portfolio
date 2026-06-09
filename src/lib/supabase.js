// ─── CONFIG ────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://lwlfegchswvpxycfmsdd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3bGZlZ2Noc3d2cHh5Y2Ztc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTk2MTYsImV4cCI6MjA5NjQ5NTYxNn0.u8aJTy5RGIhG3JHkQEWzTWMpfvxqlcSXYJ-wWRTto_U'
// ────────────────────────────────────────────────────────────────────────────

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Prefer': 'return=representation',
}

async function query(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: { ...headers, ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : []
}

// ─── VISITORS ────────────────────────────────────────────────
export async function trackVisit(visitorId) {
  return query('/visitors', {
    method: 'POST',
    body: JSON.stringify({
      visitor_id: visitorId,
      page: window.location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    }),
  })
}

export async function getVisitorCount() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visitors?select=visitor_id`, { headers })
  if (!res.ok) return 0
  const data = await res.json()
  return new Set(data.map(r => r.visitor_id)).size
}

// ─── GUESTBOOK ───────────────────────────────────────────────
export async function getGuestbook() {
  return query('/guestbook?order=created_at.desc&limit=50')
}

export async function addGuestbookEntry({ name, message, avatar }) {
  return query('/guestbook', {
    method: 'POST',
    body: JSON.stringify({ name, message, avatar }),
  })
}

// ─── LEADERBOARD ─────────────────────────────────────────────
export async function getLeaderboard() {
  return query('/leaderboard?order=wpm.desc&limit=10')
}

export async function addLeaderboardEntry({ name, wpm, accuracy, completed }) {
  return query('/leaderboard', {
    method: 'POST',
    body: JSON.stringify({ name, wpm, accuracy, completed }),
  })
}

// ─── PROJECT VIEWS ───────────────────────────────────────────
export async function getProjectViews() {
  return query('/project_views?select=project_id,views')
}

export async function incrementProjectView(projectId) {
  const rows = await query(`/project_views?project_id=eq.${projectId}&select=views`)
  const current = rows?.[0]?.views ?? 0
  return query(`/project_views?project_id=eq.${projectId}`, {
    method: 'PATCH',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({ views: current + 1 }),
  })
}
