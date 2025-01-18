import { Mail, Phone } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

function Contact() {
  return (
    <div className='py-5' style={{ position: 'relative' }} id='contact'>
      <div className='container text-start my-5'>
        <Typography variant='h4' fontWeight='bold' gutterBottom mb={3}>
          Get In Touch
        </Typography>
        <div className='d-flex flex-column gap-3'>
          <Typography variant='body1' gutterBottom>
            Have a question or a project in mind? I'd love to hear from you. Let's chat and make something amazing together.
          </Typography>
          <a href='tel:+94763940690'><Phone />  +94 76 394 0690 </a>
          <a href='mailto:ashen2ravisara@gmail.com'><Mail /> ashen2ravisara@gmail.com</a>
          <div className='d-flex gap-2'>
            <IconButton href='https://www.linkedin.com/in/ashen-ravisara/' target='_blank'>
              <img src='/Images/Icons/LinkedIn.png' alt='LinkedIn' />
            </IconButton>
            <IconButton href='https://www.behance.net/ashenravisara' target='_blank'>
              <img src='/Images/Icons/Behance.png' alt='Behance' />
            </IconButton>
            <IconButton href='https://www.instagram.com/_ash__en_/' target='_blank'>
              <img src='/Images/Icons/Instagram.png' alt='Instagram' />
            </IconButton>
            <IconButton href='https://www.facebook.com/ashen.ravisara.5' target='_blank'>
              <img src='/Images/Icons/Facebook.png' alt='Facebook' />
            </IconButton>
          </div>
        </div>
      </div>
      <Box sx={{ position: 'absolute', bottom: 0, right: 0, display: { xs: 'none', sm: 'block' } }}>
        <img src='/Images/ContactBg.png' alt='contact bg' className='img-fluid' style={{ transform: 'translateY(30%)' }} />
      </Box>
    </div>
  )
}

export default Contact