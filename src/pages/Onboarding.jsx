import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useTwinStore from '../store/useTwinStore'
import { ArrowRight, Check } from 'lucide-react'

const personas = [
  {
    id: 'architect',
    emoji: '🏗️',
    title: 'AWS Architect',
    subtitle: 'Deep technical depth',
    description: 'Answers with architecture tradeoffs, best practices, and production-grade thinking. Assumes strong technical background.',
    color: '#f97316',
    bg: '#fff7ed',
    border: '#fed7aa',
  },
  {
    id: 'mentor',
    emoji: '🎓',
    title: 'Mentor',
    subtitle: 'Challenges your thinking',
    description: 'Explains your gaps, asks questions back, pushes you to think deeper. Like having a senior engineer guiding you.',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
  },
  {
    id: 'friend',
    emoji: '👫',
    title: 'Friend',
    subtitle: 'Casual & approachable',
    description: 'No jargon, lots of analogies, keeps it light. Explains complex things like you\'re chatting over coffee.',
    color: '#0891b2',
    bg: '#ecfeff',
    border: '#a5f3fc',
  },
  {
    id: 'seniordev',
    emoji: '👨‍💻',
    title: 'Senior Dev',
    subtitle: 'No hand-holding',
    description: 'Skips the basics, goes straight to advanced nuance. Best if you already know fundamentals and want expert-level detail.',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
  },
  {
    id: 'researcher',
    emoji: '🔬',
    title: 'Researcher',
    subtitle: 'Thorough & precise',
    description: 'Cites sources, gives comprehensive answers, explores edge cases. Great for deep-dive learning sessions.',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
  },
  {
    id: 'coach',
    emoji: '🧑‍⚕️',
    title: 'Learning Coach',
    subtitle: 'Adaptive & patient',
    description: 'Detects where you\'re stuck, adjusts explanation depth automatically, celebrates your progress.',
    color: '#ca8a04',
    bg: '#fefce8',
    border: '#fde68a',
  },
]

const steps = ['name', 'persona', 'confirm']

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [selectedPersona, setSelectedPersona] = useState(null)
  const { setUser, setPersona, theme } = useTwinStore()
  const navigate = useNavigate()
  const dark = theme === 'dark'

  const handleFinish = () => {
    setUser({ name, role: selectedPersona.title, level: 'Intermediate' })
    setPersona(selectedPersona)
    navigate('/')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: dark ? '#0f0f13' : '#f5f3ef' }}
    >
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: dark ? '#4c1d95' : '#ddd6fe' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: dark ? '#1e3a5f' : '#bfdbfe' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: dark ? '#065f46' : '#d1fae5' }} />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div
              key={s}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                backgroundColor: i <= step
                  ? '#7c3aed'
                  : dark ? '#2a2a35' : '#e8e4de',
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* Step 0: Name */}
          {step === 0 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl mb-6">🧠</div>
              <h1
                className="text-3xl font-bold mb-3 tracking-tight"
                style={{ color: dark ? '#f1f0ee' : '#1a1916' }}
              >
                Meet your Digital Twin
              </h1>
              <p
                className="text-base mb-10"
                style={{ color: dark ? '#9ca3af' : '#6b7280' }}
              >
                An AI that learns how you think, fills your knowledge gaps,
                and teaches you exactly what you need — personalized to you.
              </p>

              <div className="max-w-sm mx-auto">
                <label
                  className="block text-sm font-medium mb-2 text-left"
                  style={{ color: dark ? '#d1d5db' : '#374151' }}
                >
                  What should your twin call you?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && name.trim() && setStep(1)}
                  placeholder="Your name..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
                    border: `1px solid ${dark ? '#2a2a35' : '#e8e4de'}`,
                    color: dark ? '#f1f0ee' : '#1a1916',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = dark ? '#2a2a35' : '#e8e4de'}
                />

                <button
                  onClick={() => setStep(1)}
                  disabled={!name.trim()}
                  className="w-full mt-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#7c3aed', color: 'white' }}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Persona picker */}
          {step === 1 && (
            <motion.div
              key="persona"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h1
                  className="text-3xl font-bold mb-3 tracking-tight"
                  style={{ color: dark ? '#f1f0ee' : '#1a1916' }}
                >
                  Hey {name} 👋
                </h1>
                <p
                  className="text-base"
                  style={{ color: dark ? '#9ca3af' : '#6b7280' }}
                >
                  How should your twin talk to you?
                  <br />
                  <span className="text-sm">You can change this anytime.</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {personas.map((p, i) => {
                  const selected = selectedPersona?.id === p.id
                  return (
                    <motion.button
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setSelectedPersona(p)}
                      className="relative text-left p-4 rounded-2xl transition-all"
                      style={{
                        backgroundColor: selected
                          ? dark ? p.bg.replace('fff', '1a1') : p.bg
                          : dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
                        border: `2px solid ${selected ? p.color : dark ? '#2a2a35' : '#e8e4de'}`,
                        boxShadow: selected
                          ? `0 4px 20px ${p.color}25`
                          : '0 2px 8px rgba(0,0,0,0.04)',
                        transform: selected ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {selected && (
                        <div
                          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: p.color }}
                        >
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                      <div className="text-2xl mb-2">{p.emoji}</div>
                      <div
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: selected ? p.color : dark ? '#f1f0ee' : '#1a1916' }}
                      >
                        {p.title}
                      </div>
                      <div
                        className="text-xs font-medium mb-2"
                        style={{ color: dark ? '#9ca3af' : '#6b7280' }}
                      >
                        {p.subtitle}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: dark ? '#6b7280' : '#9ca3af' }}
                      >
                        {p.description}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
                    border: `1px solid ${dark ? '#2a2a35' : '#e8e4de'}`,
                    color: dark ? '#9ca3af' : '#6b7280',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedPersona}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#7c3aed', color: 'white' }}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Confirm */}
          {step === 2 && selectedPersona && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="text-6xl mb-6"
              >
                {selectedPersona.emoji}
              </motion.div>

              <h1
                className="text-3xl font-bold mb-3 tracking-tight"
                style={{ color: dark ? '#f1f0ee' : '#1a1916' }}
              >
                Your twin is ready, {name}
              </h1>
              <p
                className="text-base mb-8"
                style={{ color: dark ? '#9ca3af' : '#6b7280' }}
              >
                Talking to you as your{' '}
                <span className="font-semibold" style={{ color: selectedPersona.color }}>
                  {selectedPersona.title}
                </span>
                . It'll learn more about you with every conversation.
              </p>

              {/* Summary card */}
              <div
                className="max-w-sm mx-auto p-5 rounded-2xl mb-8 text-left"
                style={{
                  backgroundColor: dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
                  border: `1px solid ${dark ? '#2a2a35' : '#e8e4de'}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: selectedPersona.bg, border: `1px solid ${selectedPersona.border}` }}
                  >
                    {selectedPersona.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: dark ? '#f1f0ee' : '#1a1916' }}>
                      {name}
                    </p>
                    <p className="text-xs" style={{ color: dark ? '#9ca3af' : '#6b7280' }}>
                      {selectedPersona.title} mode
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Personalized answers', 'Memory across sessions', 'Knowledge tracking', 'Article uploads'].map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: selectedPersona.bg,
                        color: selectedPersona.color,
                        border: `1px solid ${selectedPersona.border}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 max-w-sm mx-auto">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
                    border: `1px solid ${dark ? '#2a2a35' : '#e8e4de'}`,
                    color: dark ? '#9ca3af' : '#6b7280',
                  }}
                >
                  Back
                </button>
                <motion.button
                  onClick={handleFinish}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#7c3aed', color: 'white' }}
                >
                  Start learning <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}