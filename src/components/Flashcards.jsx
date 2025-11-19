import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Card({ card }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div onClick={()=>setFlipped(!flipped)} className="cursor-pointer bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center hover:border-blue-600 transition-colors">
      <p className="text-slate-400 text-xs mb-2">{card.tag || 'General'}</p>
      <p className="text-white text-lg font-medium min-h-[64px] flex items-center justify-center">{flipped ? card.back : card.front}</p>
      <p className="text-slate-500 text-xs mt-2">Click to flip</p>
    </div>
  )
}

export default function Flashcards() {
  const [cards, setCards] = useState([])
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [tag, setTag] = useState('')

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/flashcards`)
    setCards(await res.json())
  }

  const add = async (e) => {
    e.preventDefault()
    if (!front || !back) return
    await fetch(`${API_BASE}/api/flashcards`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ front, back, tag }) })
    setFront(''); setBack(''); setTag('')
    load()
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white font-semibold">Flashcards</h2>
      <form onSubmit={add} className="space-y-3 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
        <input value={front} onChange={e=>setFront(e.target.value)} placeholder="Front (question)" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <input value={back} onChange={e=>setBack(e.target.value)} placeholder="Back (answer)" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="Tag (optional)" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">Add Card</button>
      </form>
      <div className="grid md:grid-cols-3 gap-4">
        {cards.map(c => <Card key={c._id} card={c} />)}
      </div>
    </div>
  )
}
