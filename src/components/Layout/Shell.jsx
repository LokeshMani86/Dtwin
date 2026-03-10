import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  MessageSquare, Map, User, BookOpen, Menu, X, Brain, Sun, Moon
} from 'lucide-react'
import useTwinStore from '../../store/useTwinStore'

const navItems = [
  { icon: MessageSquare, label: 'Chat', path: '/' },
  { icon: Map, label: 'Knowledge Map', path: '/knowledge' },
  { icon: User, label: 'My Twin', path: '/twin' },
  { icon: BookOpen, label: 'Learning Feed', path: '/feed' },
]

export default function Shell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme, user } = useTwinStore()

  const dark = theme === 'dark'

  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: dark ? '#0f0f13' : '#f5f3ef',
        color: dark ? '#f1f0ee' : '#1a1916',
      }}
    >
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: dark ? '#4c1d95' : '#ddd6fe' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: dark ? '#1e3a5f' : '#bfdbfe' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: dark ? '#065f46' : '#d1fae5' }}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-60' : 'w-16'} flex flex-col z-10 transition-all duration-300 border-r`}
        style={{
          backgroundColor: dark ? 'rgba(15,15,20,0.85)' : 'rgba(255,253,250,0.85)',
          borderColor: dark ? '#1f1f28' : '#e8e4de',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b"
          style={{ borderColor: dark ? '#1f1f28' : '#e8e4de' }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: dark ? '#4c1d95' : '#7c3aed' }}
          >
            <Brain size={16} className="text-white" />
          </div>
          {sidebarOpen && (
            <span
              className="font-semibold text-sm tracking-tight"
              style={{ color: dark ? '#f1f0ee' : '#1a1916' }}
            >
              Digital Twin
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto transition-colors"
            style={{ color: dark ? '#6b7280' : '#9ca3af' }}
          >
            {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-2 mt-2">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  backgroundColor: active
                    ? dark ? '#4c1d95' : '#7c3aed'
                    : 'transparent',
                  color: active
                    ? '#ffffff'
                    : dark ? '#9ca3af' : '#6b7280',
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.backgroundColor = dark ? '#1f1f28' : '#f0ede8'
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <Icon size={17} className="shrink-0" />
                {sidebarOpen && <span className="font-medium">{label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Bottom: theme toggle + user */}
        <div
          className="mt-auto border-t p-3 flex flex-col gap-3"
          style={{ borderColor: dark ? '#1f1f28' : '#e8e4de' }}
        >
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all w-full"
            style={{ color: dark ? '#9ca3af' : '#6b7280' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = dark ? '#1f1f28' : '#f0ede8'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {dark
              ? <Sun size={17} className="shrink-0" />
              : <Moon size={17} className="shrink-0" />
            }
            {sidebarOpen && <span>{dark ? 'Light mode' : 'Dark mode'}</span>}
          </button>

          {/* User */}
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: '#7c3aed' }}
              >
                {user.name[0]}
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: dark ? '#f1f0ee' : '#1a1916' }}
                >
                  {user.name}
                </p>
                <p className="text-xs" style={{ color: dark ? '#6b7280' : '#9ca3af' }}>
                  {user.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden z-10">
        {children}
      </div>
    </div>
  )
}