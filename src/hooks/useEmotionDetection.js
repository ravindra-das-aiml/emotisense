import { useRef, useState, useCallback, useEffect } from 'react'
import * as faceapi from 'face-api.js'

const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'
const EMOTIONS = ['happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised', 'neutral']

const EMOTION_COLORS = {
  happy:'#22c55e', sad:'#3b82f6', angry:'#ef4444',
  fearful:'#a855f7', disgusted:'#84cc16', surprised:'#f59e0b', neutral:'#6b7280'
}
const EMOTION_EMOJI = {
  happy:'😊', sad:'😢', angry:'😠', fearful:'😨', disgusted:'🤢', surprised:'😲', neutral:'😐'
}

// Play a short beep using Web Audio API
function playBeep(emotion) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const freqMap = { happy:880, sad:220, angry:440, fearful:660, disgusted:330, surprised:990, neutral:550 }
    osc.frequency.value = freqMap[emotion] || 440
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  } catch(e) {}
}

export function useEmotionDetection() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const animRef = useRef(null)
  const fpsRef = useRef({ count: 0, last: performance.now() })
  const lastEmotionRef = useRef(null)
  const historyTimerRef = useRef(null)

  const [status, setStatus] = useState('idle')
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [detections, setDetections] = useState([])
  const [fps, setFps] = useState(0)
  const [stats, setStats] = useState({ frames: 0, facesTotal: 0, dominant: null })
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [emotionHistory, setEmotionHistory] = useState([]) // [{time, emotion, confidence}]
  const dominantTally = useRef({})

  const loadModels = useCallback(async () => {
    if (modelsLoaded) return true
    setStatus('loading')
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ])
      setModelsLoaded(true)
      return true
    } catch (e) {
      setStatus('error')
      return false
    }
  }, [modelsLoaded])

  function drawFaceBox(ctx, box, dominant, exprs) {
    const color = EMOTION_COLORS[dominant] || '#fff'
    const { x, y, width: w, height: h } = box
    ctx.strokeStyle = color
    ctx.lineWidth = 2.5
    ctx.strokeRect(x, y, w, h)
    const cl = Math.min(w, h) * 0.2
    ctx.lineWidth = 4
    ;[[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]].forEach(([cx,cy,dx,dy]) => {
      ctx.beginPath()
      ctx.moveTo(cx + dx*cl, cy)
      ctx.lineTo(cx, cy)
      ctx.lineTo(cx, cy + dy*cl)
      ctx.stroke()
    })
    const labelY = y < 36 ? y + h + 4 : y - 4
    const label = `${EMOTION_EMOJI[dominant]} ${dominant}  ${Math.round(exprs[dominant]*100)}%`
    ctx.font = 'bold 13px Inter, sans-serif'
    const tw = ctx.measureText(label).width
    ctx.fillStyle = color + 'dd'
    ctx.beginPath()
    ctx.roundRect(x, labelY-18, tw+16, 24, 6)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.fillText(label, x+8, labelY-2)
  }

  const detect = useCallback(async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.paused) return

    const now = performance.now()
    fpsRef.current.count++
    if (now - fpsRef.current.last >= 1000) {
      setFps(fpsRef.current.count)
      fpsRef.current.count = 0
      fpsRef.current.last = now
    }

    const results = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
      .withFaceExpressions()

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const processed = results.map(det => {
      const exprs = det.expressions
      const dominant = EMOTIONS.reduce((a, b) => exprs[a] > exprs[b] ? a : b)
      dominantTally.current[dominant] = (dominantTally.current[dominant] || 0) + 1
      drawFaceBox(ctx, det.detection.box, dominant, exprs)

      // Sound on emotion change
      if (dominant !== lastEmotionRef.current) {
        if (soundEnabled) playBeep(dominant)
        lastEmotionRef.current = dominant
      }

      return { box: det.detection.box, expressions: exprs, dominant }
    })

    setDetections(processed)
    setStats(prev => {
      const totalDom = Object.entries(dominantTally.current).sort((a,b)=>b[1]-a[1])[0]
      return {
        frames: prev.frames + 1,
        facesTotal: prev.facesTotal + (processed.length > 0 ? 1 : 0),
        dominant: totalDom ? totalDom[0] : null,
      }
    })

    animRef.current = requestAnimationFrame(detect)
  }, [soundEnabled])

  // Record emotion history every 2 seconds
  useEffect(() => {
    if (status === 'active') {
      historyTimerRef.current = setInterval(() => {
        if (lastEmotionRef.current) {
          const time = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' })
          setEmotionHistory(prev => {
            const updated = [...prev, { time, emotion: lastEmotionRef.current }]
            return updated.slice(-20) // keep last 20
          })
        }
      }, 2000)
    } else {
      clearInterval(historyTimerRef.current)
    }
    return () => clearInterval(historyTimerRef.current)
  }, [status])

  const start = useCallback(async () => {
    const ok = await loadModels()
    if (!ok) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await new Promise(r => { videoRef.current.onloadedmetadata = r })
        videoRef.current.play()
      }
      setStatus('active')
      dominantTally.current = {}
      lastEmotionRef.current = null
      setStats({ frames: 0, facesTotal: 0, dominant: null })
      setEmotionHistory([])
      animRef.current = requestAnimationFrame(detect)
    } catch (e) {
      setStatus('error')
    }
  }, [loadModels, detect])

  const stop = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setStatus('idle')
    setDetections([])
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }, [])

  // Screenshot function
  const takeScreenshot = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const sc = document.createElement('canvas')
    sc.width = video.videoWidth
    sc.height = video.videoHeight
    const ctx = sc.getContext('2d')
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(video, -sc.width, 0)
    ctx.restore()
    ctx.drawImage(canvas, 0, 0)

    const link = document.createElement('a')
    link.download = `emotisense-${Date.now()}.png`
    link.href = sc.toDataURL('image/png')
    link.click()
  }, [])

  useEffect(() => () => stop(), [stop])

  return {
    videoRef, canvasRef, status, detections, fps, stats,
    soundEnabled, setSoundEnabled,
    emotionHistory,
    start, stop, takeScreenshot
  }
}
