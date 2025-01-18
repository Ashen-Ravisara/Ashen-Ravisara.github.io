import { Close } from '@mui/icons-material'
import { projects } from '../ProjectsList'
import { Box, Dialog, IconButton } from '@mui/material'

function ProjectModal(props: { projectId: number, open: boolean, closeModal: CallableFunction }) {

  const project = projects.find(project => project.id === props.projectId)

  return (
    <Dialog
      open={props.open} onClose={() => props.closeModal()} fullWidth maxWidth={'md'}
      PaperProps={{ sx: { borderRadius: '8px' } }}
      scroll='paper'
    >
      <Box sx={{ position: 'absolute', right: 10, top: 10 }}>
        <IconButton onClick={() => props.closeModal()}><Close sx={{ color: 'common.white' }} /></IconButton>
      </Box>
      <img src={project?.longImage} alt="Project" className="img-fluid " />
    </Dialog>
  )
}

export default ProjectModal