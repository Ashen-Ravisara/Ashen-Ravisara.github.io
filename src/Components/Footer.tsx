
import { Box, ListItemButton, ListItemText, Typography } from '@mui/material'

function Footer() {

  const navLinks = [
    { path: '#about', label: 'About' },
    { path: '#services', label: 'Services' },
    { path: '#portfolio', label: 'Portfolio' }
  ];

  return (
    <Box sx={{ backgroundColor: 'common.black' }}>
      <div className='container d-flex justify-content-between flex-wrap gap-3 p-5 my-5'>
        <a href='#home'>
          <img src="/Images/LogoWhite.png" width={70} className='img-fluid cursor-pointer' />
        </a>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {navLinks.map((link, index) => (
            <ListItemButton
              key={index} href={link.path}
              sx={{ textAlign: 'center', borderBottom: location.pathname === link.path ? '2px solid' : 'none' }}
            >
              <ListItemText primary={link.label} slotProps={{ primary: { fontWeight: 'bold', color: 'text.secondary' } }} />
            </ListItemButton>
          ))}
        </Box>
      </div>
      <Typography variant='body2' textAlign='center' color='text.secondary' component='span' gutterBottom>
        © 2025 Ashen Ravisara. All rights reserved. 
      </Typography>
      <Typography variant='body2' textAlign='center' color='text.secondary' component='span' gutterBottom> Developed by <a href='https://minindusenadheera.github.io'>Minindu Senadheera</a></Typography>
    </Box>
  )
}

export default Footer