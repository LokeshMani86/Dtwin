import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import MessageBubble from '../components/Chat/MessageBubble'
import InputBar from '../components/Chat/InputBar'
import TopicList from '../components/Sidebar/TopicList'
import useTwinStore from '../store/useTwinStore'
import { getMockResponse } from '../services/mock'
import { Sparkles } from 'lucide-react'
import { sendMessage } from '../services/api'

const suggestions = [
  "Explain Kubernetes ingress controllers",
  "What's the difference between CNI plugins?",
  "How does eBPF work in Cilium?",
  "When should I use EKS vs self-managed K8s?",
]




export default function Chat() {
  // ✅ Hook must be HERE, inside the function — not above it

  const { messages, addMessage, user, theme, persona, topics } = useTwinStore()
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const dark = theme === 'dark'
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

 const handleSend = async (text) => {
  addMessage({ role: 'user', content: text, id: Date.now() })
  setLoading(true)

  try {
    const topicMap = {}
    topics.forEach(t => { topicMap[t.name] = t.score })

    const data = await sendMessage({
      message: text,
      personaId: persona?.id,
      userName: user.name,
      topics: topicMap,
    })

    addMessage({
      role: 'assistant',
      id: Date.now() + 1,
      content: data.answer,
    })
  } catch (err) {
    addMessage({
      role: 'assistant',
      id: Date.now() + 1,
      content: 'Something went wrong. Please try again.',
    })
  } finally {
    setLoading(false)
  }
}
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Topic sidebar */}
      <div
        className="w-56 overflow-y-auto shrink-0 border-r"
        style={{
          backgroundColor: dark ? 'rgba(15,15,20,0.6)' : 'rgba(255,253,250,0.6)',
          borderColor: dark ? '#1f1f28' : '#e8e4de',
        }}
      >
        <TopicList />
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{
            borderColor: dark ? '#1f1f28' : '#e8e4de',
            backgroundColor: dark ? 'rgba(15,15,20,0.4)' : 'rgba(255,253,250,0.4)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div>
            <h1
              className="text-sm font-semibold"
              style={{ color: dark ? '#f1f0ee' : '#1a1916' }}
            >
              Chat with your Twin
            </h1>
            <p
  className="text-xs mt-0.5"
  style={{ color: dark ? '#6b7280' : '#9ca3af' }}
>
  {user.name} · {persona?.emoji} {persona?.title} mode
</p>
          </div>
          <div
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-medium"
            style={{
              color: '#7c3aed',
              backgroundColor: dark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
          >
            <Sparkles size={12} />
            <span>Memory active</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="text-center">
                <h2
                  className="text-lg font-semibold mb-1"
                  style={{ color: dark ? '#f1f0ee' : '#1a1916' }}
                >
                  Hey {user.name} 👋
                </h2>
                <p
                  className="text-sm"
                  style={{ color: dark ? '#9ca3af' : '#6b7280' }}
                >
                  What are you learning today? Your twin adapts to your skill level.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-left px-4 py-3 rounded-xl text-xs font-medium transition-all"
                    style={{
                      backgroundColor: dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
                      color: dark ? '#d1d5db' : '#374151',
                      border: `1px solid ${dark ? '#2a2a35' : '#e8e4de'}`,
                      boxShadow: dark
                        ? '0 2px 8px rgba(0,0,0,0.2)'
                        : '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#7c3aed'
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.15)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = dark ? '#2a2a35' : '#e8e4de'
                      e.currentTarget.style.boxShadow = dark
                        ? '0 2px 8px rgba(0,0,0,0.2)'
                        : '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                style={{ backgroundColor: '#7c3aed' }}
              >
                🧠
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#7c3aed' }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        <InputBar onSend={handleSend} disabled={loading} />
      </div>
    </div>
  )
}