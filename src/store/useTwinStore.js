import { create } from 'zustand'

const useTwinStore = create((set) => ({
  user: {
    name: '',
    role: '',
    level: 'Intermediate'
  },
  persona: null,
  messages: [],
  topics: [
    { name: 'Kubernetes', score: 91, trend: 'stable' },
    { name: 'AWS', score: 72, trend: 'improving' },
    { name: 'Networking', score: 43, trend: 'decaying' },
    { name: 'eBPF', score: 12, trend: 'unknown' },
    { name: 'Terraform', score: 65, trend: 'improving' },
  ],
  theme: 'light',
  setUser: (user) => set({ user }),
  setPersona: (persona) => set({ persona }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}))

export default useTwinStore