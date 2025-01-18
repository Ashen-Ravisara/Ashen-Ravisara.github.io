import { Box, Typography } from '@mui/material'
import Services from './Services'
import Projects from './Projects'
import About from './About'

function HomeScreen() {
  return (
    <div>
      <About />
      <Services />
      <Projects />
    </div>
  )
}

export default HomeScreen