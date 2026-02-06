import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C853', // TaskPlanet jaisa vibrant Green
      contrastText: '#fff',
    },
    secondary: {
      main: '#263238', // Dark Grey for text
    },
    background: {
      default: '#f4f6f8', // Light Grey background
    }
  },
  shape: {
    borderRadius: 12, // Modern Rounded corners
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 } // Professional buttons
  }
});

export default theme;