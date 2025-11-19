import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Notes from './components/Notes'
import Flashcards from './components/Flashcards'
import Tests from './components/Tests'
import TimerAndUpload from './components/TimerAndUpload'
import Logo from './components/Logo'

function TabButton({ active, onClick, children }){
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
        active
          ? 'bg-blue-600/90 text-white border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.4)]'
          : 'bg-[#0d0d0d] text-slate-300 border-slate-800 hover:bg-[#121212] hover:border-slate-700'
      }`}
    >
      {children}
    </button>
  )
}

function App() {
  const [tab, setTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 grid place-items-center rounded-xl bg-[#0b0b0b] border border-slate-800">
              <Logo size={28} />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold tracking-tight">Study Forge</h1>
              <p className="text-xs text-slate-500 -mt-1">Focus. Learn. Accelerate.</p>
            </div>
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
          Built for deep focus — matte black interface with electric blue accents
        </footer>
      </div>
      {/* Backdrop accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
    </div>
  )
}

export default App
