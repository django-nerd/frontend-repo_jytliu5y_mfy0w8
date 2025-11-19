import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topic, setTopic] = useState('')

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/notes`)
    setNotes(await res.json())
  }

  const add = async (e) => {
    e.preventDefault()
    if (!title || !content) return
    await fetch(`${API_BASE}/api/notes`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, content, topic }) })
    setTitle(''); setContent(''); setTopic('')
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white font-semibold">Notes</h2>
      <form onSubmit={add} className="space-y-3 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" rows={4} className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic (optional)" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">Add Note</button>
      </form>
      <div className="grid md:grid-cols-2 gap-4">
        {notes.map(n => (
          <div key={n._id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-xs">{n.topic || 'General'}</p>
            <h3 className="text-white font-semibold">{n.title}</h3>
            <p className="text-slate-300 whitespace-pre-wrap mt-2 text-sm">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
