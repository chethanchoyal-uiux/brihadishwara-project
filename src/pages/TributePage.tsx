import { type FormEvent, type ReactNode, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useLightbox } from '../components/ImageLightbox'
import { tributePage as t } from '../data/tribute'

function RichText({ text }: { text: string }): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function TributePage() {
  const { openLightbox } = useLightbox()
  const dedicationAlt = t.hero.imageAlt
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedComment = comment.trim()
    if (!trimmedName || !trimmedComment) return

    const body = [
      `Name: ${trimmedName}`,
      '',
      trimmedComment,
    ].join('\n')

    const href = `mailto:${t.contact.email}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  return (
    <div id="top" className="page page-scroll page-tribute">
      <Header />
      <main className="temple-main tribute-main">
        <section className="tp-hero tp-hero--stack" aria-label={t.hero.title}>
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">{t.hero.eyebrow}</p>
            <h1 aria-label={t.hero.title}>
              {t.hero.titleLines.map((line) => (
                <span key={line} className="trb-hero-title-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="tp-lead">
              <RichText text={t.hero.lead} />
            </p>
          </div>
          <figure className="tp-hero-media trb-hero-figure">
            <button
              type="button"
              className="trb-hero-open"
              aria-label={`View ${dedicationAlt} fullscreen`}
              onClick={() =>
                openLightbox({
                  src: t.hero.image,
                  alt: dedicationAlt,
                  title: dedicationAlt,
                })
              }
            >
              <img
                src={t.hero.image}
                alt={dedicationAlt}
                width={1200}
                height={800}
              />
            </button>
            <figcaption className="trb-hero-caption">{t.hero.imageCaption}</figcaption>
          </figure>
        </section>

        <section
          className="tp-section tp-section-alt"
          id={t.purpose.id}
          data-nav-flash="section"
        >
          <div className="tp-section-inner">
            <div className="trb-purpose">
              <header className="trb-purpose-head">
                <p className="tp-eyebrow">{t.purpose.eyebrow}</p>
                <h2 className="trb-purpose-title">{t.purpose.title}</h2>
                <p className="trb-purpose-goal">
                  {t.purpose.goalLines.map((line) => (
                    <span key={line} className="trb-purpose-goal-line">
                      {line}
                    </span>
                  ))}
                </p>
              </header>
              <div className="tp-prose trb-prose trb-purpose-copy">
                {t.purpose.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="tp-section" id={t.book.id} data-nav-flash="section">
          <div className="tp-section-inner trb-book">
            <div className="trb-book-copy">
              <h2>{t.book.title}</h2>
              <p>{t.book.body}</p>
              {t.book.href ? (
                <a
                  className="trb-book-link"
                  href={t.book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.book.linkLabel}
                </a>
              ) : (
                <span className="trb-book-link is-placeholder" aria-disabled="true">
                  <span className="trb-book-link-label">{t.book.linkLabel}</span>
                  <span className="trb-book-link-note">{t.book.placeholder}</span>
                </span>
              )}
            </div>
            <figure className="trb-book-visual">
              <img
                src={t.book.image}
                alt={t.book.imageAlt}
                width={640}
                height={800}
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section
          className="trb-contact-band"
          id={t.contact.id}
          data-nav-flash="section"
          aria-labelledby="trb-contact-title"
        >
          <div className="tp-section-inner trb-contact-inner">
            <div className="trb-contact-intro">
              <p className="tp-eyebrow">{t.contact.eyebrow}</p>
              <h2 id="trb-contact-title" className="trb-contact-title">
                {t.contact.titleLines.map((line) => (
                  <span key={line} className="trb-contact-title-line">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="trb-contact-body">{t.contact.body}</p>
              <div className="trb-contact-mail">
                <span className="trb-contact-mail-label">{t.contact.emailLabel}</span>
                <a className="trb-contact-mail-link" href={`mailto:${t.contact.email}`}>
                  {t.contact.email}
                </a>
              </div>
            </div>

            <form className="trb-contact-form" onSubmit={handleContactSubmit}>
              <label className="trb-contact-field" htmlFor="trb-contact-name">
                <span className="trb-contact-field-label">{t.contact.nameLabel}</span>
                <input
                  id="trb-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.contact.namePlaceholder}
                />
              </label>
              <label className="trb-contact-field" htmlFor="trb-contact-comment">
                <span className="trb-contact-field-label">{t.contact.commentLabel}</span>
                <textarea
                  id="trb-contact-comment"
                  name="comment"
                  rows={5}
                  required
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder={t.contact.commentPlaceholder}
                />
              </label>
              <button className="trb-contact-submit" type="submit">
                {t.contact.cta}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer variant="full" />
    </div>
  )
}
