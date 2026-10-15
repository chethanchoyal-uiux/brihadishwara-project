import { Link } from 'react-router-dom'
import { homeCopy } from '../data/home'

/** Legacy home section — prefer `/tribute` page. Kept for optional reuse. */
export function Tribute() {
  return (
    <section className="tribute" id="tribute" aria-labelledby="tribute-title">
      <p className="section-label">{homeCopy.tributeEyebrow}</p>
      <h2 id="tribute-title">{homeCopy.tributeTitle}</h2>
      <p className="tribute-quote">“{homeCopy.tributeBody}”</p>

      <ul className="tribute-portraits">
        <li>
          <figure>
            <img
              src="/assets/home/thatha.jpg?v=3"
              alt={homeCopy.thatha}
              width={720}
              height={900}
              loading="lazy"
            />
            <figcaption>{homeCopy.thatha}</figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <img
              src="/assets/home/patti.jpg?v=3"
              alt={homeCopy.patti}
              width={720}
              height={900}
              loading="lazy"
            />
            <figcaption>{homeCopy.patti}</figcaption>
          </figure>
        </li>
      </ul>

      <p className="tribute-more">
        <Link to="/tribute">Read more</Link>
      </p>
    </section>
  )
}
