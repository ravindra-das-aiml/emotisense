import { useEmotionDetection } from '../hooks/useEmotionDetection'

const EMOTIONS = ['happy','sad','angry','fearful','disgusted','surprised','neutral']
const EMOJI = { happy:'😊', sad:'😢', angry:'😠', fearful:'😨', disgusted:'🤢', surprised:'😲', neutral:'😐' }
const COLORS = { happy:'#22c55e', sad:'#3b82f6', angry:'#ef4444', fearful:'#a855f7', disgusted:'#84cc16', surprised:'#f59e0b', neutral:'#6b7280' }

function EmotionBar({ emotion, value, isTop }) {
  const pct = Math.round(value * 100)
  return (
    <div className={`space-y-1.5 p-2 rounded-lg transition-all ${isTop ? 'bg-white/5' : ''}`}>
      <div className="flex justify-between items-center text-xs">
        <span className="text-white/70 capitalize flex items-center gap-1.5 font-medium">
          {EMOJI[emotion]} {emotion}
        </span>
        <span className="text-white/50 tabular-nums font-mono">{pct}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300 relative"
          style={{ width:`${pct}%`, background: COLORS[emotion] }}>
          {isTop && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />}
        </div>
      </div>
    </div>
  )
}

function MiniChart({ history }) {
  if (history.length === 0) return (
    <div className="text-center py-6 text-white/20 text-sm">
      Detection shuru hone par graph dikhega
    </div>
  )
  const last12 = history.slice(-12)
  return (
    <div className="space-y-2">
      <div className="flex gap-1 items-end h-16">
        {last12.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t transition-all"
              style={{
                background: COLORS[h.emotion],
                height: `${Math.max(8, (i+1)/last12.length * 52)}px`,
                opacity: 0.6 + (i/last12.length)*0.4
              }}
            />
          </div>
        ))}
        {Array.from({ length: Math.max(0, 12 - last12.length) }).map((_, i) => (
          <div key={`e${i}`} className="flex-1 h-2 rounded bg-white/5" />
        ))}
      </div>
      <div className="flex justify-between text-xs text-white/20">
        <span>older</span>
        <span>now</span>
      </div>
      {/* Last few entries */}
      <div className="space-y-1 mt-2 max-h-24 overflow-y-auto">
        {[...history].reverse().slice(0,5).map((h, i) => (
          <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
            <span style={{ color: COLORS[h.emotion] }}>{EMOJI[h.emotion]} {h.emotion}</span>
            <span className="text-white/30 font-mono">{h.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Demo({ darkMode }) {
  const {
    videoRef, canvasRef, status, detections, fps, stats,
    soundEnabled, setSoundEnabled,
    emotionHistory,
    start, stop, takeScreenshot
  } = useEmotionDetection()

  const isActive = status === 'active'
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const firstFace = detections[0]

  return (
    <div className="pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-white/50 mb-4">
            {isActive
              ? <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Recording live</>
              : <><span className="w-2 h-2 rounded-full bg-white/20" /> Camera off</>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Live <span className="text-gradient">Emotion Detection</span>
          </h1>
          <p className="text-white/40 text-sm">All processing happens in your browser — 100% private</p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-5">

          {/* Camera card */}
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <div className="relative bg-black" style={{ aspectRatio:'16/9' }}>
              <video ref={videoRef} autoPlay muted playsInline
                className="w-full h-full object-cover"
                style={{ transform:'scaleX(-1)', display: isActive ? 'block' : 'none' }} />
              <canvas ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform:'scaleX(-1)', display: isActive ? 'block' : 'none' }} />

              {!isActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20">
                  <div className="text-6xl opacity-30">📷</div>
                  <div className="text-sm">
                    {isLoading && '🧠 AI models load ho rahe hain...'}
                    {isError && '❌ Camera permission denied'}
                    {status === 'idle' && 'Start button dabao'}
                  </div>
                  {isLoading && (
                    <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full animate-pulse w-3/4" />
                    </div>
                  )}
                </div>
              )}

              {isActive && (
                <>
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/60 font-mono">
                    {fps} fps
                  </div>
                  {firstFace && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <span className="text-lg">{EMOJI[firstFace.dominant]}</span>
                      <span className="text-xs text-white/80 capitalize font-medium">{firstFace.dominant}</span>
                      <span className="text-xs font-mono" style={{color: COLORS[firstFace.dominant]}}>
                        {Math.round(firstFace.expressions[firstFace.dominant]*100)}%
                      </span>
                    </div>
                  )}
                  {detections.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/50">
                      {detections.length} faces
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Controls bar */}
            <div className="flex items-center justify-between p-4 border-t border-white/5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {/* Sound toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border ${
                    soundEnabled
                      ? 'bg-brand-600/20 border-brand-500/40 text-brand-400'
                      : 'border-white/10 text-white/40 hover:text-white/60'
                  }`}
                  title="Sound toggle"
                >
                  {soundEnabled ? '🔊' : '🔇'} Sound
                </button>

                {/* Screenshot */}
                {isActive && (
                  <button
                    onClick={takeScreenshot}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
                    title="Screenshot download"
                  >
                    📸 Screenshot
                  </button>
                )}
              </div>

              <button
                onClick={isActive ? stop : start}
                disabled={isLoading}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 ${
                  isActive
                    ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
                    : 'bg-brand-600 hover:bg-brand-500 text-white'
                }`}
              >
                {isLoading ? '⏳ Loading...' : isActive ? '⏹ Stop' : '▶ Start camera'}
              </button>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">

            {/* Current emotion — big display */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Detected emotion</p>
              {firstFace ? (
                <div className="text-center py-1">
                  <div className="text-6xl mb-3 animate-bounce">{EMOJI[firstFace.dominant]}</div>
                  <div className="text-2xl font-bold text-white capitalize mb-1">{firstFace.dominant}</div>
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-mono font-semibold"
                    style={{ background: COLORS[firstFace.dominant]+'22', color: COLORS[firstFace.dominant] }}>
                    {Math.round(firstFace.expressions[firstFace.dominant]*100)}% confidence
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="text-4xl mb-2 opacity-30">🫥</div>
                  <div className="text-white/20 text-sm">{isActive ? 'Face frame mein lao' : 'Camera start karo'}</div>
                </div>
              )}
            </div>

            {/* Emotion bars */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">All emotions</p>
              {firstFace ? (
                <div className="space-y-1">
                  {[...EMOTIONS].sort((a,b) => firstFace.expressions[b]-firstFace.expressions[a])
                    .map(e => (
                      <EmotionBar key={e} emotion={e} value={firstFace.expressions[e]}
                        isTop={e === firstFace.dominant} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-4 text-white/20 text-sm">Waiting...</div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: stats.frames, l: 'Frames' },
                { v: fps, l: 'FPS' },
                { v: stats.dominant ? EMOJI[stats.dominant] : '—', l: 'Top emotion' },
              ].map(s => (
                <div key={s.l} className="glass rounded-xl p-3 text-center border border-white/5">
                  <div className="text-lg font-bold text-white">{s.v}</div>
                  <div className="text-xs text-white/30 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emotion History Chart */}
        <div className="mt-5 glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest">Emotion history</p>
              <p className="text-white/50 text-sm mt-0.5">Last 20 readings (every 2 seconds)</p>
            </div>
            {emotionHistory.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {[...new Set(emotionHistory.map(h=>h.emotion))].map(e => (
                  <span key={e} className="text-xs px-2 py-1 rounded-full"
                    style={{ background: COLORS[e]+'22', color: COLORS[e] }}>
                    {EMOJI[e]} {e}
                  </span>
                ))}
              </div>
            )}
          </div>
          <MiniChart history={emotionHistory} />
        </div>

        {/* Privacy note */}
        <div className="mt-4 glass rounded-xl p-4 flex gap-3 items-start border border-white/5">
          <span className="text-base mt-0.5">🔒</span>
          <p className="text-xs text-white/30 leading-relaxed">
            <span className="text-white/50 font-medium">Privacy guaranteed.</span>{' '}
            Camera feed kabhi bhi server par nahi jaata. Sab kuch aapke browser mein process hota hai using WebAssembly.
          </p>
        </div>
      </div>
    </div>
  )
}
