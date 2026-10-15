import { footerContent, homeCopy } from '../data/home'

export function Intro() {
  return (
    <section className="intro" id="welcome">
      <p className="section-label">{homeCopy.introEyebrow}</p>
      <h2 className="intro-title">{homeCopy.introTitle}</h2>
      <p className="intro-lead">{homeCopy.introBody[0]}</p>

      <div className="intro-split">
        <figure className="intro-figure" data-img-reveal>
          <img
            src="/assets/home/intro.jpg"
            alt="The towering vimana of the Brihadishwara Temple against a clear sky"
            width={960}
            height={1200}
            loading="lazy"
          />
        </figure>

        <div className="intro-col intro-col--aka">
          <p className="intro-col-label">Also known as</p>
          <ul>
            {footerContent.alsoKnownAs.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="intro-col intro-col--right">
          <p className="intro-col-label">The temple</p>
          <p>{homeCopy.introBody[1]}</p>
          <a className="btn btn-outline" href={homeCopy.introCtaHref}>
            {homeCopy.introCta}
          </a>
        </div>
      </div>
    </section>
  )
}
