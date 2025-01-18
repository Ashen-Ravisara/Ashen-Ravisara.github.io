import Hero from './Hero'
import Services from './Services'
import Projects from './Projects'
import Contact from './Contact'
import About from './About'

function HomeScreen() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  )
}

export default HomeScreen