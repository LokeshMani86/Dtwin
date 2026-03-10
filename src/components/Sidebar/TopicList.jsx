import useTwinStore from '../../store/useTwinStore'
import { TrendingUp, TrendingDown, Minus, HelpCircle } from 'lucide-react'

const trendIcon = {
  improving: <TrendingUp size={12} className="text-emerald-500" />,
  decaying: <TrendingDown size={12} className="text-red-400" />,
  stable: <Minus size={12} className="text-gray-400" />,
  unknown: <HelpCircle size={12} className="text-gray-400" />,
}

const scoreColor = (score) => {
  if (score >= 75) return '#10b981'
  if (score >= 45) return '#f59e0b'
  if (score >= 20) return '#f97316'
  return '#ef4444'
}

export default function TopicList() {
  const topics = useTwinStore((s) => s.topics)
  const dark = useTwinStore((s) => s.theme === 'dark')

  return (
    <div className="p-4 border-b" style={{ borderColor: dark ? '#1f1f28' : '#e8e4de' }}>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: dark ? '#6b7280' : '#9ca3af' }}
      >
        Your Topics
      </p>
      <div className="flex flex-col gap-3">
        {topics.map((topic) => (
          <div key={topic.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs font-medium"
                  style={{ color: dark ? '#d1d5db' : '#374151' }}
                >
                  {topic.name}
                </span>
                {trendIcon[topic.trend]}
              </div>
              <span
                className="text-xs font-mono"
                style={{ color: scoreColor(topic.score) }}
              >
                {topic.score}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full"
              style={{ backgroundColor: dark ? '#1f1f28' : '#e8e4de' }}
            >
              <div
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: `${topic.score}%`,
                  backgroundColor: scoreColor(topic.score),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}