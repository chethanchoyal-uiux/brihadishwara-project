import { useId } from 'react'

type AccessMapProps = {
  className?: string
  cardImage: string
  cardTitle: string
  cardRegion: string
  cardObjectPosition?: string
  mapLabel: string
  embedSrc: string
}

export function ThanjavurAccessMap({
  className = '',
  cardImage,
  cardTitle,
  cardRegion,
  cardObjectPosition,
  mapLabel,
  embedSrc,
}: AccessMapProps) {
  const titleId = useId()

  return (
    <div className={`tj-live-map ${className}`.trim()} aria-labelledby={titleId}>
      <p id={titleId} className="tj-sr-only">
        {mapLabel}
      </p>

      <iframe
        key={embedSrc}
        className="tj-live-map-frame"
        title={mapLabel}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <aside className="tj-live-map-card" aria-label={cardTitle}>
        <div className="tj-live-map-card-media">
          <img
            key={cardImage}
            src={cardImage}
            alt=""
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            style={cardObjectPosition ? { objectPosition: cardObjectPosition } : undefined}
          />
          <div className="tj-live-map-card-place">
            <p className="tj-live-map-card-city">{cardTitle}</p>
            <p className="tj-live-map-card-region">{cardRegion}</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
