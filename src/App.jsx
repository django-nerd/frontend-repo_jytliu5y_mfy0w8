import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Notes from './components/Notes'
import Flashcards from './components/Flashcards'
import Tests from './components/Tests'
import TimerAndUpload from './components/TimerAndUpload'

function TabButton({ active, onClick, children }){
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
      {children}
    </button>
  )
}

function App() {
  const [tab, setTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500" />
            <h1 className="text-white text-2xl font-bold tracking-tight">Study Forge</h1>
          </div>
          <nav className="flex gap-2">
            <TabButton active={tab==='dashboard'} onClick={()=>setTab('dashboard')}>Home</TabButton>
            <TabButton active={tab==='notes'} onClick={()=>setTab('notes')}>Notes</TabButton>
            <TabButton active={tab==='flashcards'} onClick={()=>setTab('flashcards')}>Flashcards</TabButton>
            <TabButton active={tab==='tests'} onClick={()=>setTab('tests')}>Tests</TabButton>
            <TabButton active={tab==='focus'} onClick={()=>setTab('focus')}>Focus & Upload</TabButton>
          </nav>
        </header>

        <main className="space-y-6">
          {tab==='dashboard' && <Dashboard />}
          {tab==='notes' && <Notes />}
          {tab==='flashcards' && <Flashcards />}
          {tab==='tests' && <Tests />}
          {tab==='focus' && <TimerAndUpload />}
        </main>

        <footer className="mt-10 text-center text-slate-500 text-sm">
          Built for deep focus with a sleek dark theme
        </footer>
      </div>
    </div>
  )
}

export default App
