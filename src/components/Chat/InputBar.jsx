import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import useTwinStore from '../../store/useTwinStore'

export default function InputBar({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const dark = useTwinStore((s) => s.theme === 'dark')

  const handleSend = () => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="p-4 border-t"
      style={{ borderColor: dark ? '#1f1f28' : '#e8e4de' }}
    >
      <div
        className="flex items-end gap-3 rounded-2xl px-4 py-3 border transition-all"
        style={{
          backgroundColor: dark ? 'rgba(31,31,40,0.9)' : 'rgba(255,253,250,0.95)',
          borderColor: dark ? '#2a2a35' : '#e8e4de',
          boxShadow: dark
            ? '0 2px 16px rgba(0,0,0,0.3)'
            : '0 2px 16px rgba(0,0,0,0.06)',
        }}
      >
        <button
          className="transition-colors mb-0.5"
          style={{ color: dark ? '#6b7280' : '#9ca3af' }}
        >
          <Paperclip size={18} />
        </button>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask your twin anything..."
          rows={1}
          className="flex-1 bg-transparent text-sm resize-none outline-none max-h-32"
          style={{
            color: dark ? '#f1f0ee' : '#1a1916',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="mb-0.5 p-2 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#7c3aed', color: 'white' }}
        >
          <Send size={14} />
        </button>
      </div>
      <p
        className="text-xs text-center mt-2"
        style={{ color: dark ? '#4b5563' : '#d1d5db' }}
      >
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}