import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTwinStore = create(
  persist(
    (set) => ({
      user: null,
      persona: null,
      messages: [],
      topics: [
        { name: 'Kubernetes', score: 91, trend: 'stable' },
        { name: 'AWS', score: 72, trend: 'improving' },
       
        
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
    }),
    {
      name: 'digital-twin-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these — not messages
        user: state.user,
        persona: state.persona,
        topics: state.topics,
        theme: state.theme,
      }),
    }
  )
)

export default useTwinStore