import { Link } from 'react-router-dom'

export default function About() {
  const tech = [
    { name: 'React 18', role: 'UI framework', color: '#61dafb' },
    { name: 'Vite', role: 'Build tool', color: '#646cff' },
    { name: 'Tailwind CSS', role: 'Styling', color: '#38bdf8' },
    { name: 'face-api.js', role: 'Face detection', color: '#f59e0b' },
    { name: 'TensorFlow.js', role: 'AI inference', color: '#ff6f00' },
    { name: 'React Router', role: 'Navigation', color: '#f44250' },
  ]

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About <span className="text-gradient">EmotiSense</span>
        </h1>

        <p className="text-white/60 text-lg leading-relaxed mb-12">
          EmotiSense is an open-source project that demonstrates how modern AI can run 
          entirely in the browser — no cloud, no API keys, no data sharing. Built with 
          React and face-api.js, it detects seven universal facial emotions in real time.
        </p>

        {/* Founder Section */}
        <div className="glass rounded-2xl p-8 mb-8 border border-brand-600/20">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Founder & CEO</p>
          <div className="flex items-center gap-5">
            {/* Avatar with initials */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 shadow-lg">
              RM
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Ravindra Malhotra</h2>
              <p className="text-brand-400 font-medium mt-1">Founder & CEO, EmotiSense</p>
              <p className="text-white/40 text-sm mt-2">
                Building AI-powered tools that run privately in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Tech stack</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tech.map(t => (
              <div key={t.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model info */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">The model</h2>
          <p className="text-white/50 leading-relaxed">
            We use the <span className="text-white/80">TinyFaceDetector</span> for fast face 
            localization and the <span className="text-white/80">FaceExpressionNet</span> for 
            classifying expressions into seven categories — happy, sad, angry, fearful, 
            disgusted, surprised, and neutral. Both models are loaded from a CDN and cached 
            locally after the first visit.
          </p>
        </div>

        {/* Privacy */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-4">Privacy policy</h2>
          <p className="text-white/50 leading-relaxed">
            EmotiSense processes all video locally in your browser using WebAssembly. 
            We do not collect, transmit, or store any video frames, facial landmarks, 
            or emotion data. No analytics are run on your camera feed.
          </p>
        </div>

      </div>
    </div>
  )
}
