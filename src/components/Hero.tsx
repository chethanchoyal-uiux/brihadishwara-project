import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { footerContent, homeCopy, sections, sectionRoutes } from '../data/home'
import { HeroBrandCycle } from './HeroBrandCycle'

const HERO_VIDEO_MOBILE = '/assets/video/hero-loop-mobile.mp4?v=6'
const HERO_VIDEO_DESKTOP = '/assets/video/hero-loop.mp4?v=9'
const HERO_POSTER_MOBILE = '/assets/video/hero-poster-mobile.jpg?v=2'
const HERO_POSTER_DESKTOP = '/assets/video/hero-poster.jpg?v=10'
const HERO_MOBILE_MQ = '(max-width: 719px)'

function pickHeroAssets(isMobile: boolean) {
  return isMobile
    ? { src: HERO_VIDEO_MOBILE, poster: HERO_POSTER_MOBILE }
    : { src: HERO_VIDEO_DESKTOP, poster: HERO_POSTER_DESKTOP }
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wantPlayRef = useRef(true)
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [assets, setAssets] = useState(() =>
    pickHeroAssets(
      typeof window !== 'undefined'
        ? window.matchMedia(HERO_MOBILE_MQ).matches
        : true,
    ),
  )

  const active = sections.find((s) => s.id === activeId) ?? null

  // Swap mobile/desktop source when viewport crosses the breakpoint
  useEffect(() => {
    const mq = window.matchMedia(HERO_MOBILE_MQ)
    const onChange = () => setAssets(pickHeroAssets(mq.matches))
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Seamless loop of baked forward+reverse (ping-pong) clip
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let wrapping = false
    wantPlayRef.current = true

    const tryPlay = () => {
      if (!wantPlayRef.current) return
      void video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }

    const onPlaying = () => {
      video.removeAttribute('poster')
    }

    const onSeeked = () => {
      wrapping = false
      if (video.paused && wantPlayRef.current) {
        void video.play().catch(() => undefined)
      }
    }

    // Restart just before EOF — avoids end-frame freeze / loop flash
    const onTimeUpdate = () => {
      const { duration, currentTime } = video
      if (wrapping || !duration || Number.isNaN(duration)) return
      if (currentTime >= duration - 0.2) {
        wrapping = true
        video.currentTime = 0.05
      }
    }

    const onEnded = () => {
      if (!wantPlayRef.current) return
      wrapping = true
      video.currentTime = 0.05
      void video.play().catch(() => undefined)
    }

    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('ended', onEnded)
    tryPlay()

    return () => {
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('ended', onEnded)
    }
  }, [assets.src])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      wantPlayRef.current = true
      void video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      wantPlayRef.current = false
      video.pause()
      setPlaying(false)
    }
  }

  const onRailClick = (id: string) => {
    const route = sectionRoutes[id]
    if (route) {
      navigate(route)
      return
    }
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-media">
        <video
          ref={videoRef}
          className="hero-video"
          key={assets.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={assets.poster}
          src={assets.src}
        />
        <div className="hero-veil" aria-hidden="true" />
      </div>

      <button
        className="hero-play"
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        {playing ? (
          <svg
            className="hero-play-icon"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="6" y="5" width="4" height="14" rx="0.5" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="0.5" fill="currentColor" />
          </svg>
        ) : (
          <svg
            className="hero-play-icon"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="hero-stage">
        <div className="hero-intro">
          <p className="tp-eyebrow hero-brand-eyebrow">Also known as</p>
          <HeroBrandCycle />
          <h1>{homeCopy.headline}</h1>
          <div className="hero-intro-row">
            <p className="hero-lead">{homeCopy.heroLead}</p>
            <div className="hero-visit-meta" id="visit">
              <div>
                <span className="hero-visit-heading">Hours</span>
                <span className="hero-visit-hours">
                  {footerContent.visit.hours.map((hour) => (
                    <span key={hour}>{hour}</span>
                  ))}
                </span>
              </div>
              <div>
                <span className="hero-visit-heading">
                  {footerContent.location.heading}
                </span>
                <span>{footerContent.location.place}</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="section-rail" id="rail" aria-label="Explore sections">
          <p className="rail-hint" aria-hidden="true">
            <span>Swipe</span>
            <svg
              className="rail-hint-chevron"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </p>
          <ul className="rail-list">
            {sections.map((section) => {
              const hasRoute = Boolean(sectionRoutes[section.id])
              const isActive = activeId === section.id
              return (
                <li key={section.id} id={section.id}>
                  <button
                    type="button"
                    className={`rail-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => onRailClick(section.id)}
                  >
                    <span className="rail-thumb">
                      <img
                        src={section.image}
                        alt=""
                        width={120}
                        height={90}
                        loading="lazy"
                      />
                    </span>
                    <span className="rail-copy">
                      <span className="rail-title">{section.title}</span>
                      <span className="rail-blurb">{section.blurb}</span>
                      <span className="rail-more">
                        {hasRoute
                          ? '+ Read more'
                          : isActive
                            ? '− Close'
                            : '+ Read more'}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>

      {active ? (
        <div className="rail-detail" role="dialog" aria-labelledby="rail-detail-title">
          <button
            type="button"
            className="rail-detail-close"
            aria-label="Close"
            onClick={() => setActiveId(null)}
          >
            ×
          </button>
          <img
            className="rail-detail-image"
            src={active.image}
            alt=""
            width={800}
            height={600}
          />
          <h2 id="rail-detail-title">{active.title}</h2>
          <p>{active.blurb}</p>
        </div>
      ) : null}
    </section>
  )
}
