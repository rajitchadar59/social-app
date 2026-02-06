import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C853', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#263238', 
    },
    background: {
      default: '#f4f6f8', 
    }
  },
  shape: {
    borderRadius: 12, 
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 } 
  }
});

export default theme;