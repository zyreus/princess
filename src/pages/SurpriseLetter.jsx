import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { MAIN_LETTER_TEXT } from '../data/letterContent.js'
import { markSurpriseLetterUnlocked } from '../utils/surpriseLetterUnlock.js'

/** Official music video — Edwin McCain "I'll Be" (YouTube; enables autoplay + custom controls). */
const YOUTUBE_VIDEO_ID = '5qrTmNDZ-nc'
const SPOTIFY_TRACK_ID = '5K7AMlpc4796JRWXb26nCV'

export default function SurpriseLetter() {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    markSurpriseLetterUnlocked()
  }, [])

  const destroyPlayer = useCallback(() => {
    if (playerRef.current?.destroy) {
      try {
        playerRef.current.destroy()
      } catch {
        /* ignore */
      }
      playerRef.current = null
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const createPlayer = () => {
      const YT = window.YT
      if (cancelled || !YT?.Player) return

      destroyPlayer()

      playerRef.current = new YT.Player('letter-youtube-host', {
        videoId: YOUTUBE_VIDEO_ID,
        width: '320',
        height: '180',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return
            setPlayerReady(true)
            event.target.mute()
            setIsMuted(true)
            event.target.playVideo()
            window.setTimeout(() => {
              if (cancelled || !event.target) return
              try {
                event.target.unMute()
                event.target.setVolume(55)
                setIsMuted(false)
              } catch {
                /* autoplay policies may block unmute */
              }
            }, 450)
          },
          onStateChange: (event) => {
            if (cancelled) return
            const PLAYING = 1
            const PAUSED = 2
            const ENDED = 0
            if (event.data === PLAYING) {
              setIsPlaying(true)
            } else if (event.data === PAUSED || event.data === ENDED) {
              setIsPlaying(false)
            }
          },
        },
      })
    }

    const boot = () => {
      if (cancelled) return
      createPlayer()
    }

    if (window.YT?.Player) {
      boot()
    } else {
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previous?.()
        boot()
      }

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const first = document.getElementsByTagName('script')[0]
        first.parentNode.insertBefore(tag, first)
      }
    }

    return () => {
      cancelled = true
      destroyPlayer()
      setPlayerReady(false)
    }
  }, [destroyPlayer])

  const togglePlay = useCallback(() => {
    const p = playerRef.current
    if (!p || typeof p.playVideo !== 'function') return
    if (isPlaying) p.pauseVideo()
    else p.playVideo()
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    if (p.isMuted()) {
      p.unMute()
      p.setVolume(60)
      setIsMuted(false)
    } else {
      p.mute()
      setIsMuted(true)
    }
  }, [])

  return (
    <Motion.div
      className="relative min-h-screen px-4 pb-20 pt-20 sm:px-6"
      initial={{ opacity: 0, scale: 0.94, filter: 'brightness(0.35)' }}
      animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0, scale: 0.98, filter: 'brightness(0.4)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/"
        className="back-birthday-link fixed left-4 top-4 z-20 rounded-full border border-violet-500/40 bg-violet-950/60 px-3 py-1.5 text-xs font-medium tracking-wide text-violet-100 shadow-lg shadow-violet-900/40 backdrop-blur-md transition-shadow hover:animate-back-link-pulse sm:left-6 sm:top-6"
      >
        ← Back to Birthday
      </Link>

      <div className="youtube-audio-only-shell" aria-hidden="true">
        <div id="letter-youtube-host" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-xl items-center justify-center pt-8">
        <div className="scroll-roll w-full rounded-2xl border border-violet-500/30 bg-violet-950/40 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/80">
            For Princess Angel Paslot
          </p>
          <h1 className="mt-4 text-center font-serif text-2xl font-light tracking-tighter text-violet-100 sm:text-3xl">
            Surprise Letter
          </h1>

          <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-violet-300/85">
            Music only · Edwin McCain — &quot;I&apos;ll Be&quot; · use the sparkly controls below
          </p>

          <div className="scroll-roll-inner mt-6 max-h-[min(48vh,440px)] overflow-y-auto pr-1 text-left">
            <p className="whitespace-pre-line text-sm leading-relaxed text-violet-300/80 sm:text-base">
              {MAIN_LETTER_TEXT}
            </p>
          </div>

          <div className="music-dock mt-8 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                disabled={!playerReady}
                className={`music-cute-btn flex min-w-[140px] items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 ${
                  isPlaying ? 'animate-music-glow' : ''
                }`}
              >
                <span className="text-lg" aria-hidden>
                  {isPlaying ? '⏸' : '▶'}
                </span>
                {isPlaying ? 'Pause' : 'Play'}
                <span className="text-base" aria-hidden>
                  ✨
                </span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                disabled={!playerReady}
                className="music-cute-btn-secondary flex min-w-[120px] items-center justify-center gap-2 rounded-full border border-violet-400/35 bg-violet-950/70 px-5 py-3 text-sm font-medium text-violet-100 shadow-md backdrop-blur-md transition-transform hover:scale-[1.04] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="text-lg" aria-hidden>
                  {isMuted ? '🔇' : '🔊'}
                </span>
                {isMuted ? 'Sound on' : 'Mute'}
              </button>
            </div>

            <p className="text-center text-[11px] leading-relaxed text-violet-400/85">
              Prefer{' '}
              <a
                href={`https://open.spotify.com/track/${SPOTIFY_TRACK_ID}`}
                target="_blank"
                rel="noreferrer"
                className="text-fuchsia-300/95 underline decoration-violet-500/45 underline-offset-2 hover:text-fuchsia-200"
              >
                I&apos;ll Be on Spotify
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Motion.div>
  )
}
