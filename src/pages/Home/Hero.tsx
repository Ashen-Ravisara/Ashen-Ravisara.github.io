
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

function Hero() {
  const theme = useTheme();

  return (
    <Box
      id='home' pt={10}
      sx={{
        position: 'relative', height: '100dvh',
        backgroundImage: "url('/Images/HeroBg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'bottom',
        backgroundPositionX: 'center'
      }}
    >
      <div className="container">
        <img src="/Images/HeroButton.png" width={120} className="img-fluid" />
        <Typography variant={useMediaQuery(theme.breakpoints.up('sm')) ? 'h1' : 'h3'} fontFamily='Urbanist' textAlign='center'>
          I'm <span style={{ color: theme.palette.secondary.main }}>Ashen Ravisara</span>
        </Typography>
        <Typography variant={useMediaQuery(theme.breakpoints.up('sm')) ? 'h1' : 'h3'} fontFamily='Urbanist' textAlign='center' fontWeight='bold'>
          UI / UX Designer
        </Typography>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <img src="/Images/Ashen.png" width={460} className='img-fluid' />
      </div>
    </Box>
  );
}

export default Hero;
