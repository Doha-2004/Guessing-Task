import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Gamepad2,
  Calendar,
  Trophy,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/practice', label: 'Practice', icon: Gamepad2 },
  { to: '/daily', label: 'Daily Game', icon: Calendar },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function handleLogout() {
    closeMenu()
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/dashboard" className="navbar-brand" onClick={closeMenu}>
          Guessly
        </NavLink>

        <nav className="navbar-links navbar-links-desktop">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'navbar-link-active' : ''}`
              }
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
          <button type="button" className="navbar-link navbar-logout" onClick={handleLogout}>
            <LogOut size={17} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </nav>

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="navbar-links navbar-links-mobile">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'navbar-link-active' : ''}`
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
          <button type="button" className="navbar-link navbar-logout" onClick={handleLogout}>
            <LogOut size={18} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </nav>
      )}
    </header>
  )
}
