import { homeCopy, sections } from '../data/home'

export function Sections() {
  return (
    <section className="sections" id="discover" aria-labelledby="sections-title">
      <header className="sections-head">
        <p className="section-label">{homeCopy.sectionsEyebrow}</p>
        <h2 id="sections-title">{homeCopy.sectionsTitle}</h2>
        <p className="sections-lead">{homeCopy.sectionsLead}</p>
      </header>

      <div className="chapters">
        {sections.map((section, index) => (
          <article
            key={section.id}
            id={section.id}
            className={`chapter ${index % 2 === 1 ? 'chapter--flip' : ''}`}
          >
            <div className="chapter-media" data-img-reveal>
              <img
                src={section.image}
                alt=""
                width={1200}
                height={900}
                loading="lazy"
              />
            </div>
            <div className="chapter-copy">
              <p className="chapter-index">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3>{section.title}</h3>
              <p>{section.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
