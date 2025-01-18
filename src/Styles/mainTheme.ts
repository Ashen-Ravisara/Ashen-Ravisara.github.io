import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#1F1F1F',
    },
    secondary: {
      main: '#FDAC1A', // yellow
    },
    common: {
      white: '#F8F8F8',
      black: '#1F1F1F',
    },
    text: {
      primary: '#1F1F1F1', // black
      secondary: '#F8F8F8', // white
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
        },
        contained: {
          "&:hover": {
            boxShadow: "none",
          },
        },
        endIcon: {
          color: 'inherit',
        },
        startIcon: {
          color: 'inherit',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        noWrap: {
          whiteSpace: "initial",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
        }
      }
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Montserrat',
      color: '#00170C', // This sets the text color globally in your theme
    },
    h1: {
      fontSize: '6rem', // Desktop default
      lineHeight: 1.167,
      fontWeight: 300,
      [`@media (max-width:600px)`]: {
        fontSize: '3.75rem', // Mobile size
      },
    },
    h2: {
      fontSize: '3.75rem',
      lineHeight: 1.2,
      fontWeight: 300,
      [`@media (max-width:600px)`]: {
        fontSize: '3rem',
      },
    },
    h3: {
      fontSize: '3rem',
      lineHeight: 1.167,
      fontWeight: 400,
      [`@media (max-width:600px)`]: {
        fontSize: '2.5rem',
      },
    },
    h4: {
      fontSize: '2.125rem',
      lineHeight: 1.235,
      fontWeight: 400,
      [`@media (max-width:600px)`]: {
        fontSize: '2rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      lineHeight: 1.334,
      fontWeight: 400,
      [`@media (max-width:600px)`]: {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
      fontWeight: 500,
      [`@media (max-width:600px)`]: {
        fontSize: '1rem',
      },
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.75,
      fontWeight: 400,
      [`@media (max-width:600px)`]: {
        fontSize: '0.875rem',
      },
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      fontWeight: 500,
      [`@media (max-width:600px)`]: {
        fontSize: '0.75rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
      [`@media (max-width:600px)`]: {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      fontWeight: 400,
      [`@media (max-width:600px)`]: {
        fontSize: '0.8125rem',
      },
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.625rem',
      lineHeight: 2.5,
      fontWeight: 400,
    },
  },
});
