import { Box, Typography } from '@mui/material'
import Services from './Services'
import Projects from './Projects'
import Contact from './Contact'
import About from './About'

function HomeScreen() {
  return (
    <div>
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  )
}

export default HomeScreen