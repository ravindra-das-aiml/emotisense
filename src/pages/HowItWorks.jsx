import { Link } from 'react-router-dom'

const STEPS = [
  {
    num: '01',
    icon: '📷',
    title: 'Camera access lena',
    color: '#6366f1',
    desc: 'Jab aap "Start camera" dabate ho, browser aapse permission maangta hai. Yeh ek browser-level security feature hai — koi bhi website camera tab tak access nahi kar sakti jab tak aap allow na karo.',
    detail: 'Camera stream sirf aapke browser tab mein hota hai. Koi data bahar nahi jaata.',
  },
  {
    num: '02',
    icon: '🧠',
    title: 'AI model load hona',
    color: '#8b5cf6',
    desc: 'Pehli baar mein face-api.js ke 2 neural network models CDN se download hote hain — TinyFaceDetector aur FaceExpressionNet. Dono milke sirf ~2MB ke hain.',
    detail: 'Models browser cache mein save ho jaate hain — agli baar instant load hoga.',
  },
  {
    num: '03',
    icon: '🔍',
    title: 'Face detect karna',
    color: '#a855f7',
    desc: 'TinyFaceDetector model har frame mein aapka chehra dhundta hai. Yeh ek convolutional neural network hai jo images mein face-like patterns recognize karta hai.',
    detail: '224×224 pixel resolution par 30+ FPS mein process hota hai.',
  },
  {
    num: '04',
    icon: '😊',
    title: 'Emotion classify karna',
    color: '#ec4899',
    desc: 'Face milne ke baad FaceExpressionNet us area ko analyze karta hai — eyebrows, eyes, mouth ke positions se 7 emotions mein se sabse zyada match dhundta hai.',
    detail: 'Saatho emotions ke liye probability score milta hai — sirf ek label nahi.',
  },
  {
    num: '05',
    icon: '📊',
    title: 'Result dikhana',
    color: '#f59e0b',
    desc: 'Results canvas par draw hote hain — colored bounding box, emotion label, confidence %. Sath mein bars aur history bhi update hoti hai real-time mein.',
    detail: 'Pura pipeline ek requestAnimationFrame loop mein run karta hai.',
  },
]

const EMOTIONS = [
  { e:'😊', name:'Happy', trigger:'Raised cheeks, upturned mouth corners' },
  { e:'😢', name:'Sad', trigger:'Drooping eyelids, downturned mouth' },
  { e:'😠', name:'Angry', trigger:'Lowered brows, tightened jaw' },
  { e:'😨', name:'Fearful', trigger:'Wide eyes, raised upper eyelids' },
  { e:'🤢', name:'Disgusted', trigger:'Nose wrinkle, upper lip curl' },
  { e:'😲', name:'Surprised', trigger:'Raised brows, open mouth' },
  { e:'😐', name:'Neutral', trigger:'Relaxed facial muscles, no strong signal' },
]

export default function HowItWorks() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">Deep dive</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How it <span className="text-gradient">works</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            EmotiSense ke andar kya hota hai — step by step, simple bhasha mein
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative flex gap-6">
                {/* Icon circle */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: s.color + '22', border: `1px solid ${s.color}44` }}>
                  {s.icon}
                </div>
                {/* Content */}
                <div className="glass rounded-2xl p-6 flex-1 border border-white/8 hover:border-white/15 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <span className="text-3xl font-bold flex-shrink-0" style={{ color: s.color + '33' }}>{s.num}</span>
                  </div>
                  <p className="text-white/50 leading-relaxed mb-3 text-sm">{s.desc}</p>
                  <div className="flex items-start gap-2 text-xs"
                    style={{ color: s.color }}>
                    <span className="mt-0.5">💡</span>
                    <span>{s.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Emotions explained */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-2">7 emotions kaisi detect hoti hain?</h2>
          <p className="text-white/40 mb-6 text-sm">Model in facial muscle movements ko recognize karna seekha hai:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {EMOTIONS.map(e => (
              <div key={e.name} className="glass rounded-xl p-4 flex items-start gap-3 border border-white/5 hover:border-white/10 transition-colors">
                <span className="text-3xl">{e.e}</span>
                <div>
                  <div className="text-white font-medium text-sm">{e.name}</div>
                  <div className="text-white/40 text-xs mt-0.5">{e.trigger}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech architecture */}
        <div className="mt-12 glass rounded-2xl p-8 border border-white/8">
          <h2 className="text-xl font-bold text-white mb-6">Technical architecture</h2>
          <div className="space-y-3">
            {[
              { layer:'Browser', detail:'Chrome / Firefox / Edge — WebRTC camera access', color:'#6366f1' },
              { layer:'React + Vite', detail:'UI framework aur fast build tool', color:'#61dafb' },
              { layer:'face-api.js', detail:'JavaScript wrapper for TensorFlow.js face models', color:'#f59e0b' },
              { layer:'TensorFlow.js', detail:'WebAssembly mein neural network inference', color:'#ff6f00' },
              { layer:'Canvas API', detail:'Video par bounding boxes aur labels draw karna', color:'#22c55e' },
            ].map(t => (
              <div key={t.layer} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <div className="text-white text-sm font-medium w-36">{t.layer}</div>
                <div className="text-white/40 text-sm">{t.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/demo"
            className="inline-block px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all hover:scale-105 glow-indigo">
            Ab khud try karo →
          </Link>
        </div>
      </div>
    </div>
  )
}
