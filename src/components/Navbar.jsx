import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({ darkMode, setDarkMode }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/demo', label: 'Live Demo' },
    { to: '/how-it-works', label: 'How it works' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-sm shadow-lg group-hover:scale-105 transition-transform">
            😊
          </div>
          <span className="font-semibold text-white tracking-tight">EmotiSense</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                pathname === l.to
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Dark/Light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-lg hover:scale-105 transition-transform"
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/demo"
            className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors">
            Try free →
          </Link>
        </div>

        <button className="md:hidden text-white/60 hover:text-white" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm ${pathname === l.to ? 'bg-white/10 text-white' : 'text-white/60'}`}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <button onClick={() => setDarkMode(!darkMode)}
              className="flex-1 py-3 rounded-lg glass text-center text-sm">
              {darkMode ? '☀️ Light mode' : '🌙 Dark mode'}
            </button>
            <Link to="/demo" onClick={() => setOpen(false)}
              className="flex-1 py-3 rounded-lg bg-brand-600 text-white text-sm font-medium text-center">
              Try free →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
