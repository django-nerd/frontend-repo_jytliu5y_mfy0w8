import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function FocusTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) { setRunning(false); return }
        setMinutes(m => m - 1)
        setSeconds(59)
      } else {
        setSeconds(s => s - 1)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [running, minutes, seconds])

  const reset = () => { setMinutes(25); setSeconds(0); setRunning(false) }

  const pad = (n) => n.toString().padStart(2, '0')

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex flex-col items-center">
      <h3 className="text-white font-semibold mb-2">Focus Timer</h3>
      <div className="text-5xl font-mono text-white mb-4">{pad(minutes)}:{pad(seconds)}</div>
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">{running ? 'Pause' : 'Start'}</button>
        <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-white rounded px-4 py-2">Reset</button>
      </div>
    </div>
  )
}

function UploadSummarizer() {
  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  const loadHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/summaries`)
      setHistory(await res.json())
    } catch(e){ /* ignore */ }
  }

  useEffect(()=>{ loadHistory() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setSummary('')
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch(`${API_BASE}/api/summarize`, { method: 'POST', body: form })
      const data = await res.json()
      setSummary(data.summary || 'No summary generated.')
      loadHistory()
    } catch (e) {
      setSummary('Error summarizing file.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Upload & Summarize</h3>
      <form onSubmit={submit} className="space-y-3">
        <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} className="text-slate-200" />
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2" disabled={loading}>{loading ? 'Summarizing...' : 'Summarize'}</button>
      </form>
      {summary && (
        <div className="mt-4">
          <h4 className="text-slate-300 mb-1">Summary</h4>
          <p className="text-slate-200 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
      <div className="mt-4">
        <h4 className="text-slate-300 mb-1">History</h4>
        <div className="space-y-2 max-h-40 overflow-auto pr-2">
          {history.map(h=> (
            <div key={h._id} className="text-slate-300 text-sm border-b border-slate-700 pb-2">
              <p className="text-slate-400">{h.file_name}</p>
              <p className="line-clamp-2">{h.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TimerAndUpload(){
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FocusTimer />
      <UploadSummarizer />
    </div>
  )
}
