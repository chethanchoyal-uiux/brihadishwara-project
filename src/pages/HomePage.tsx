import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <div id="top" className="page frame">
      <Header />
      <main className="frame-main">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
