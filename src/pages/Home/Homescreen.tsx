import { Box, Typography } from '@mui/material'

function HomeScreen() {
  return (
    <div>
      <Box sx={{ backgroundColor: 'common.black' }} py={10}>
        <div className='container px-5'>
          <Typography variant='h4' color='common.white' fontWeight='bold' textAlign='center' gutterBottom mb={3}>
            About Me
          </Typography>
          <Typography variant='body1' color='common.white' textAlign='center'>
            I'm Ashen Ravisara, a UI/UX designer dedicated to crafting intuitive and visually stunning digital experiences. With a passion for user-centric design, I transform ideas into functional and beautiful interfaces. Let's collaborate and shape the future of design together.
          </Typography>
        </div>
      </Box>
    </div>
  )
}

export default HomeScreen