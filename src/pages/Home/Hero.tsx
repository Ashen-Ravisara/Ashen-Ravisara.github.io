
import { Box, useMediaQuery, useTheme } from "@mui/material";

function Hero() {
  const theme = useTheme();

  return (
    <Box id='home' sx={{ pt: 10, height: '100dvh', overflow: 'hidden' }} >
      {useMediaQuery(theme.breakpoints.up('sm')) ? (
        <img src='/Images/bg_desktop.png' height={'100%'} width='100%' style={{ objectFit: 'contain' }} />
      ) : (
        <img src='/Images/bg_phone.png' style={{ objectFit: 'cover', width: '100%'}} />
      )}
    </Box>
  );
}

export default Hero;
