import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import useTwinStore from '../../store/useTwinStore'

export default function MessageBubble({ message }) {
  const dark = useTwinStore((s) => s.theme === 'dark')
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[75%] flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: '#7c3aed' }}
            >
              🧠
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: dark ? '#9ca3af' : '#6b7280' }}
            >
              Digital Twin
            </span>
          </div>
        )}

        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
          style={{
            backgroundColor: isUser
              ? '#7c3aed'
              : dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
            color: isUser
              ? '#ffffff'
              : dark ? '#e5e7eb' : '#1a1916',
            borderRadius: isUser
              ? '18px 18px 4px 18px'
              : '18px 18px 18px 4px',
            border: !isUser
              ? `1px solid ${dark ? '#2a2a35' : '#e8e4de'}`
              : 'none',
            boxShadow: !isUser
              ? dark
                ? '0 2px 12px rgba(0,0,0,0.3)'
                : '0 2px 12px rgba(0,0,0,0.06)'
              : 'none',
          }}
        >
          {message.content}
        </div>

        {message.source && (
          <div className="flex items-center gap-1.5 px-1">
            <FileText size={11} style={{ color: dark ? '#6b7280' : '#9ca3af' }} />
            <span className="text-xs" style={{ color: dark ? '#6b7280' : '#9ca3af' }}>
              {message.source}
            </span>
            {message.confidence && (
              <span className="text-xs font-medium" style={{ color: '#7c3aed' }}>
                {Math.round(message.confidence * 100)}% match
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}