
import { Box, useMediaQuery, useTheme } from "@mui/material";

function Hero() {
  const theme = useTheme();

  return (
    <Box
      id='home' pt={10}
      sx={{ position: 'relative', height: '100dvh' }}
    >
      {useMediaQuery(theme.breakpoints.up('sm')) ? (
        <img src='/Images/bg_desktop.png' height={'100%'} width='100%' style={{ objectFit: 'contain' }} />
      ) : (
        <img src='/Images/bg_phone.png' width='100%' style={{ objectFit: 'cover' }} />
      )}
    </Box>
  );
}

export default Hero;
