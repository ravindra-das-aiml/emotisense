import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-brand-600 flex items-center justify-center text-xs">😊</div>
            <span className="text-white/70 text-sm font-medium">EmotiSense</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <Link to="/demo" className="hover:text-white/70 transition-colors">Demo</Link>
            <Link to="/about" className="hover:text-white/70 transition-colors">About</Link>
          </div>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} EmotiSense. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
