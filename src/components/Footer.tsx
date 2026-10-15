import { Link, useLocation } from 'react-router-dom'
import { footerContent, homeCopy, navLinks } from '../data/home'
import { useLightbox } from './ImageLightbox'

type FooterProps = {
  variant?: 'compact' | 'full'
}

function isInternalPath(href: string) {
  return href.startsWith('/') && !href.startsWith('/#')
}

const dedicationSrc = '/assets/home/dedication.jpg?v=1'

function CompactFooter() {
  const { openLightbox } = useLightbox()
  const dedicationAlt = `${homeCopy.patti} and ${homeCopy.thatha}`

  return (
    <footer className="site-footer">
      <p className="footer-about">{footerContent.blurb}</p>

      <div className="footer-tribute">
        <div className="footer-portraits">
          <figure>
            <button
              type="button"
              className="footer-portraits-open"
              aria-label={`View ${dedicationAlt} fullscreen`}
              onClick={() =>
                openLightbox({
                  src: dedicationSrc,
                  alt: dedicationAlt,
                  title: dedicationAlt,
                })
              }
            >
              <img
                src={dedicationSrc}
                alt={dedicationAlt}
                width={1024}
                height={682}
                loading="lazy"
                decoding="async"
              />
            </button>
          </figure>
        </div>
        <div className="footer-tribute-copy">
          <p>{footerContent.tribute}</p>
        </div>
      </div>
    </footer>
  )
}

function FullFooter() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <footer className="site-footer site-footer--full" id="visit">
      <div className="footer-grid" id="visit-details">
        <div className="footer-brand">
          <p className="footer-logo-line">
            <img
              className="brand-mark"
              src="/assets/brand-logo.png?v=3"
              alt=""
              width={54}
              height={40}
            />
            <span className="brand-name">
              <span className="brand-name-main">{homeCopy.brand}</span>
              <span className="brand-name-sub">{homeCopy.brandSub}</span>
            </span>
          </p>
          <p className="footer-brand-blurb">{footerContent.brandBlurb}</p>
        </div>

        <div>
          <p className="footer-heading">{footerContent.exploreHeading}</p>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                {isInternalPath(link.href) ? (
                  <Link to={link.href}>{link.label}</Link>
                ) : onHome ? (
                  <a href={link.href}>{link.label}</a>
                ) : (
                  <Link
                    to={{ pathname: '/', hash: link.href.replace(/^#/, '') }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-heading">{footerContent.visit.heading}</p>
          <p className="footer-note">{footerContent.visit.note}</p>
          <ul>
            {footerContent.visit.hours.map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-heading">{footerContent.poojas.heading}</p>
          <ul className="footer-poojas">
            {footerContent.poojas.items.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{footerContent.tribute}</p>
        <p>{footerContent.unesco}</p>
      </div>
    </footer>
  )
}

export function Footer({ variant = 'compact' }: FooterProps) {
  return variant === 'full' ? <FullFooter /> : <CompactFooter />
}
