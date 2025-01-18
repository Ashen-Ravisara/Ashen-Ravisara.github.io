import { NorthEast } from '@mui/icons-material'
import { Box, Fab, Grid2, Typography } from '@mui/material'
import { projects } from '../../ProjectsList'
import { useState } from 'react'
import ProjectModal from '../ProjectModal'

function Projects() {
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0)

  return (
    <div id='portfolio'>
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
                src={project.image} alt={project.title} className='mb-4 w-100'
                style={{ borderRadius: '8px', objectFit: 'cover' }} width={'350px'} height={'200px'}
              />
              <div className='d-flex justify-content-between align-items-end'>
                <div>
                  <Typography variant='h5' fontWeight='bold' gutterBottom>{project.title}</Typography>
                  <Typography variant='body1'>{project.type}</Typography>
                </div>
                <Fab
                  size='small' color='secondary' sx={{ boxShadow: 'none' }}
                  onClick={() => { setShowProjectModal(true); setSelectedProjectId(project.id) }}
                >
                  <NorthEast sx={{ color: 'common.white' }} />
                </Fab>
              </div>
            </Grid2>
          ))}
        </Grid2>
      </div>
      <ProjectModal projectId={selectedProjectId} open={showProjectModal} closeModal={() => setShowProjectModal(false)} />
    </div>
  )
}

export default Projects