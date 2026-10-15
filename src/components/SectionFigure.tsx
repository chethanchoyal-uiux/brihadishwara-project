import type { CSSProperties } from 'react'
import { useLightbox } from './ImageLightbox'

export type SectionImage = {
  src: string
  alt: string
  caption?: string
  title?: string
  credit?: string
  objectPosition?: string
  lightboxSrc?: string
}

/** Section media figure with bottom-to-top reveal + fullscreen open. */
export function SectionFigure({
  image,
  className = '',
}: {
  image: SectionImage
  className?: string
}) {
  const { openLightbox } = useLightbox()
  const hasOverlay = Boolean(image.title || image.caption)
  const label = image.title || image.alt || 'image'

  return (
    <figure
      className={`tp-figure tp-figure-overlay ${className}`.trim()}
      data-img-reveal
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={
          image.objectPosition
            ? ({ objectPosition: image.objectPosition } as CSSProperties)
            : undefined
        }
      />
      <button
        type="button"
        className="img-fs-btn"
        aria-label={`View ${label} fullscreen`}
        onClick={(event) => {
          event.stopPropagation()
          openLightbox({
            src: image.lightboxSrc || image.src,
            alt: image.alt,
            title: image.title,
            caption: image.caption,
            credit: image.credit,
          })
        }}
      >
        <svg
          className="img-fs-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M9 3H3v6" />
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M15 21h6v-6" />
        </svg>
      </button>
      {hasOverlay ? (
        <figcaption
          className={`tp-figure-caption-overlay${image.title ? ' has-title' : ' is-caption-only'}`}
        >
          {image.title ? (
            <span className="tp-figure-overlay-title">{image.title}</span>
          ) : null}
          {image.caption ? (
            <span className="tp-figure-overlay-text">{image.caption}</span>
          ) : null}
        </figcaption>
      ) : null}
      {image.credit ? <span className="hi-credit">{image.credit}</span> : null}
    </figure>
  )
}
