import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ label, value }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white text-2xl font-semibold">{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const [counts, setCounts] = useState({ notes: 0, cards: 0, questions: 0, summaries: 0 })

  const fetchCounts = async () => {
    try {
      const [n, c, q, s] = await Promise.all([
        fetch(`${API_BASE}/api/notes`).then(r => r.json()),
        fetch(`${API_BASE}/api/flashcards`).then(r => r.json()),
        fetch(`${API_BASE}/api/questions`).then(r => r.json()),
        fetch(`${API_BASE}/api/summaries`).then(r => r.json()),
      ])
      setCounts({ notes: n.length || 0, cards: c.length || 0, questions: q.length || 0, summaries: s.length || 0 })
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => { fetchCounts() }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white font-semibold">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Notes" value={counts.notes} />
        <Stat label="Flashcards" value={counts.cards} />
        <Stat label="Questions" value={counts.questions} />
        <Stat label="Summaries" value={counts.summaries} />
      </div>
    </div>
  )
}
