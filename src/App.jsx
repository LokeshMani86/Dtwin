import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shell from './components/Layout/Shell'
import Chat from './pages/Chat'
import KnowledgeMap from './pages/KnowledgeMap'
import TwinViewer from './pages/TwinViewer'
import LearningFeed from './pages/LearningFeed'
import Onboarding from './pages/Onboarding'
import useTwinStore from './store/useTwinStore'

function AppRoutes() {
  const persona = useTwinStore((s) => s.persona)

  if (!persona) {
    return <Onboarding />
  }

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/knowledge" element={<KnowledgeMap />} />
        <Route path="/twin" element={<TwinViewer />} />
        <Route path="/feed" element={<LearningFeed />} />
      </Routes>
    </Shell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}