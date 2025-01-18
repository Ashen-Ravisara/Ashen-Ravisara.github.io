import { Close, Menu } from '@mui/icons-material'
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { useState } from 'react'

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const navLinks = [
    { path: '#about', label: 'About' },
    { path: '#services', label: 'Services' },
    { path: '#portfolio', label: 'Portfolio' }
  ];

  const handleDrawerClick = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'common.white', p: 1 }} elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => setIsDrawerOpen((prevState) => !prevState)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <a href='#home'>
            <img src="/Images/LogoBlack.png" width={70} className='img-fluid cursor-pointer' />
          </a>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', color: 'text.primary' }}>
            {navLinks.map((link, index) => (
              <ListItemButton key={index} href={link.path}>
                <ListItemText primary={link.label} slotProps={{ primary: { fontWeight: 'bold' } }} />
              </ListItemButton>
            ))}
          </Box>
          <Button
            href='#contact'
            variant='contained' sx={{ display: { xs: 'none', sm: 'flex', borderRadius: '16px' } }}
          >
            Lets Talk
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen((prevState) => !prevState)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '75%',
              backgroundColor: 'common.white',
              backgroundImage: 'url(/Images/DrawerBg.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPositionY: 'bottom',
            },
          }}
        >
          <Box display='flex' justifyContent='end' alignItems='end'>
            <IconButton onClick={() => setIsDrawerOpen((prevState) => !prevState)}>
              <Close />
            </IconButton>
          </Box>
          <Box display='flex' flexDirection='column' justifyContent='space-between' px={4} pt={4} pb={5} height='100%'>
            <div>
              <img src='Images/LogoBlack.png' alt='Logo' className='img-fluid' width={70} />
              <Box display='flex' flexDirection='column' alignItems='start' gap={3} mt={4} color='primary.main'>
                <List>
                  {navLinks.map((link, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={() => handleDrawerClick()} href={link.path} >
                        <ListItemText primary={link.label} slotProps={{ primary: { fontWeight: 'bold', color: 'primary.main' } }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Button href='#contact' variant='contained' sx={{ borderRadius: '16px' }}>
                Lets Talk
              </Button>
            </div>
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
          </Box>
        </Drawer>
      </nav>
    </>
  )
}

export default Navbar