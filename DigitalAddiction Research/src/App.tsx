import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import ProgressDashboard from './pages/ProgressDashboard'
import LearningHub from './pages/LearningHub'
import WellnessCenter from './pages/WellnessCenter'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<ProgressDashboard />} />
        <Route path="/learning" element={<LearningHub />} />
        <Route path="/wellness" element={<WellnessCenter />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </HashRouter>
  )
}
