import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

export type LightboxImage = {
  src: string
  alt: string
  title?: string
  caption?: string
  credit?: string
}

type LightboxContextValue = {
  openLightbox: (image: LightboxImage) => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) {
    throw new Error('useLightbox must be used within ImageLightboxProvider')
  }
  return ctx
}

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<LightboxImage | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const openLightbox = useCallback((next: LightboxImage) => {
    setImage(next)
  }, [])

  const close = useCallback(() => setImage(null), [])

  useEffect(() => {
    if (!image) return
    lockScroll()
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [image, close])

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      {image
        ? createPortal(
            <div className="img-lightbox" role="presentation">
              <button
                type="button"
                className="img-lightbox-backdrop"
                aria-label="Close fullscreen image"
                onClick={close}
              />
              <div
                className="img-lightbox-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
              >
                <button
                  ref={closeRef}
                  type="button"
                  className="img-lightbox-close"
                  aria-label="Close"
                  onClick={close}
                >
                  <span aria-hidden="true">×</span>
                </button>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="img-lightbox-photo"
                />
                <div className="img-lightbox-meta" id={titleId}>
                  {image.title ? (
                    <p className="img-lightbox-title">{image.title}</p>
                  ) : (
                    <span className="img-lightbox-sr">
                      {image.alt || 'Fullscreen image'}
                    </span>
                  )}
                  {image.caption ? (
                    <p className="img-lightbox-caption">{image.caption}</p>
                  ) : null}
                  {image.credit ? (
                    <p className="img-lightbox-credit">{image.credit}</p>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </LightboxContext.Provider>
  )
}
