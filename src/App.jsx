import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Demo from './pages/Demo'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'} style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main style={{flex:1}}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Demo darkMode={darkMode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
