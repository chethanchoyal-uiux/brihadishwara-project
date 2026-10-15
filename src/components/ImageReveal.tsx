import { useImageReveal } from '../hooks/useImageReveal'

/** Mount once in the app shell to enable section image reveals site-wide. */
export function ImageReveal() {
  useImageReveal()
  return null
}
