import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const EMOTIONS = [
  { emoji: '😊', label: 'Happy', color: '#22c55e', desc: 'Joy & pleasure detected' },
  { emoji: '😢', label: 'Sad', color: '#3b82f6', desc: 'Sorrow & grief detected' },
  { emoji: '😠', label: 'Angry', color: '#ef4444', desc: 'Frustration detected' },
  { emoji: '😲', label: 'Surprised', color: '#f59e0b', desc: 'Astonishment detected' },
  { emoji: '😨', label: 'Fearful', color: '#a855f7', desc: 'Anxiety detected' },
  { emoji: '🤢', label: 'Disgusted', color: '#84cc16', desc: 'Revulsion detected' },
  { emoji: '😐', label: 'Neutral', color: '#6b7280', desc: 'Calm state detected' },
]

const FEATURES = [
  {
    icon: '⚡',
    title: 'Real-time detection',
    desc: 'Process 30+ frames per second directly in your browser — no server round-trips, zero latency.',
  },
  {
    icon: '🔒',
    title: 'Privacy first',
    desc: 'Your camera feed never leaves your device. All AI inference runs locally in WebAssembly.',
  },
  {
    icon: '🧠',
    title: 'Deep learning model',
    desc: 'Powered by face-api.js and a TensorFlow.js model trained on millions of facial expressions.',
  },
  {
    icon: '📊',
    title: 'Confidence scores',
    desc: 'Get probability scores for all 7 emotions simultaneously, not just a single label.',
  },
  {
    icon: '🌐',
    title: 'Works everywhere',
    desc: 'Any modern browser on desktop or mobile — no install, no plugin, no signup required.',
  },
  {
    icon: '🎯',
    title: 'Multi-face support',
    desc: 'Detect and analyze emotions for multiple faces in the same frame simultaneously.',
  },
]

const STATS = [
  { value: '7', label: 'Emotions detected' },
  { value: '30+', label: 'Frames per second' },
  { value: '100%', label: 'Private & local' },
  { value: '0ms', label: 'Server latency' },
]

export default function Landing() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-white/60 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live AI — runs in your browser
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Read emotions<br />
            <span className="text-gradient">in real-time</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            EmotiSense uses on-device AI to detect 7 facial emotions from your camera — 
            instantly, privately, and with no code required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:scale-105 glow-indigo"
            >
              Open live demo →
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-xl glass text-white/70 hover:text-white font-medium text-lg transition-all"
            >
              How it works
            </a>
          </div>

          {/* Emotion pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {EMOTIONS.map(e => (
              <div
                key={e.label}
                className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm"
                style={{ borderColor: e.color + '33' }}
              >
                <span>{e.emoji}</span>
                <span className="text-white/60">{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-sm text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">How it works</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Three steps to insight</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Allow camera access', desc: 'Grant browser permission — your video never leaves your device.' },
              { step: '02', title: 'AI scans your face', desc: 'A neural network detects your face and runs expression classification in real time.' },
              { step: '03', title: 'See live results', desc: 'Emotion labels and confidence scores update 30 times per second on-screen.' },
            ].map(s => (
              <div key={s.step} className="glass rounded-2xl p-8">
                <div className="text-5xl font-bold text-brand-600/40 mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Built for accuracy & privacy</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="glass rounded-2xl p-6 hover:border-brand-600/30 transition-colors group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotion showcase */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">Detection scope</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">7 emotions, one model</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {EMOTIONS.map(e => (
              <div
                key={e.label}
                className="glass rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-default"
                style={{ borderColor: e.color + '44' }}
              >
                <div className="text-4xl mb-3">{e.emoji}</div>
                <div className="text-sm font-semibold text-white">{e.label}</div>
                <div className="text-xs text-white/40 mt-1">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 border-brand-600/20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to try it?
            </h2>
            <p className="text-white/50 mb-8 text-lg">
              No signup. No app. Just open your browser and go.
            </p>
            <Link
              to="/demo"
              className="inline-block px-10 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:scale-105 glow-indigo"
            >
              Launch live demo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
