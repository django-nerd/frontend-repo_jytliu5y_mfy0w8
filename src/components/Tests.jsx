import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function MCQ({ q, index }) {
  const [selected, setSelected] = useState(null)
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <p className="text-slate-300">{index+1}. {q.question}</p>
      <div className="mt-3 space-y-2">
        {q.options.map((opt, i) => (
          <button key={i} onClick={()=>setSelected(i)} className={`w-full text-left px-3 py-2 rounded border ${selected===i ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-200'}`}>{opt}</button>
        ))}
      </div>
      {selected!==null && (
        <p className={`mt-3 text-sm ${selected===q.answer_index ? 'text-green-400' : 'text-red-400'}`}>
          {selected===q.answer_index ? 'Correct!' : `Incorrect. Answer: ${q.options[q.answer_index]}`}
        </p>
      )}
    </div>
  )
}

export default function Tests() {
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState('')
  const [answerIndex, setAnswerIndex] = useState(0)
  const [tag, setTag] = useState('')

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/questions`)
    setQuestions(await res.json())
  }

  const add = async (e) => {
    e.preventDefault()
    const opts = options.split('\n').map(s=>s.trim()).filter(Boolean)
    if (!question || opts.length<2) return
    await fetch(`${API_BASE}/api/questions`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ question, options: opts, answer_index: Number(answerIndex), tag }) })
    setQuestion(''); setOptions(''); setAnswerIndex(0); setTag('')
    load()
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white font-semibold">Practice Tests</h2>
      <form onSubmit={add} className="space-y-3 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
        <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Question" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <textarea value={options} onChange={e=>setOptions(e.target.value)} placeholder="Options (one per line)" rows={4} className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <input type="number" min={0} value={answerIndex} onChange={e=>setAnswerIndex(e.target.value)} placeholder="Answer index (0-based)" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="Tag (optional)" className="w-full bg-slate-900 text-white rounded px-3 py-2 outline-none border border-slate-700"/>
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">Add Question</button>
      </form>
      <div className="grid md:grid-cols-2 gap-4">
        {questions.map((q,i)=>(<MCQ key={q._id} q={q} index={i} />))}
      </div>
    </div>
  )
}
