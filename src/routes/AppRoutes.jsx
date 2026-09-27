import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import PracticeGame from '../pages/PracticeGame.jsx'
import DailyGame from '../pages/DailyGame.jsx'
import Leaderboard from '../pages/Leaderboard.jsx'
import Profile from '../pages/Profile.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/practice"
        element={
          <ProtectedRoute>
            <PracticeGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/daily"
        element={
          <ProtectedRoute>
            <DailyGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
