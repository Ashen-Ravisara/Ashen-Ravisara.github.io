import { NorthEast } from '@mui/icons-material'
import { Box, Fab, Grid2, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Projects() {
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      image: 'Images/Projects/Artigala.png',
      title: 'Artigala Ayurveda',
      type: 'Web & Mobile Design',
      to: '/projects/artigala'
    },
    {
      id: 2,
      image: 'Images/Projects/Redwood.png',
      title: 'Redwood Cabins',
      type: 'Web Design',
      to: '/projects/redwood'
    },
    {
      id: 3,
      image: 'Images/Projects/Cinepro.png',
      title: 'Cinepro',
      type: 'Web Design',
      to: '/projects/cinepro'
    },
    {
      id: 4,
      image: 'Images/Projects/Blackpool.png',
      title: 'Blackpool Redesign',
      type: 'Web Design',
      to: '/projects/blackpool'
    },
    {
      id: 5,
      image: 'Images/Projects/CodeQuest.png',
      title: 'CodeQuest',
      type: 'Web Design',
      to: '/projects/code-quest'
    },
    {
      id: 6,
      image: 'Images/Projects/Prime.png',
      title: 'Prime Ceylon',
      type: 'Web Design',
      to: '/projects/prime-ceylon'
    }
  ]

  return (
    <div>
      <Box sx={{ backgroundColor: 'common.black' }} py={10} pb={25}>
        <div className='container px-5'>
          <Typography variant='h4' color='common.white' fontWeight='bold' textAlign='center' gutterBottom mb={3}>
            My Portfolio
          </Typography>
          <Typography variant='body1' color='common.white' textAlign='center'>
            Explore my design services, from user interface and experience to prototyping and testing. Let's craft exceptional digital experiences together.
          </Typography>
        </div>
      </Box>
      <div className='container' style={{ translate: '0% -20vh' }}>
        <Grid2 container spacing={8} mt={10}>
          {projects.map((project, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ textAlign: 'start' }}>
              <img
                src={project.image} alt={project.title} className='img-fluid mb-4 w-100'
                style={{ borderRadius: '8px' }}
              />
              <div className='d-flex justify-content-between align-items-end'>
                <div>
                  <Typography variant='h5' fontWeight='bold' gutterBottom>{project.title}</Typography>
                  <Typography variant='body1'>{project.type}</Typography>
                </div>
                <Fab
                  size='small' color='secondary' href={project.to} sx={{ boxShadow: 'none' }}
                  onClick={() => navigate('/project', { state: { projectId: project.id } })}
                >
                  <NorthEast sx={{ color: 'common.white' }} />
                </Fab>
              </div>
            </Grid2>
          ))}
        </Grid2>
      </div>
    </div>
  )
}

export default Projects