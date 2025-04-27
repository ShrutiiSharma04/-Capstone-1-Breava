// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './App.css';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

// 1️⃣ Create a Context for toggling
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Main() {
  // 2️⃣ Hold the current mode in state
  const [mode, setMode] = React.useState('light');

  // 3️⃣ Memoize the toggle function
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  // 4️⃣ Create a theme that reacts to `mode`
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // primary is pink: normal vs neon
          primary: {
            main: mode === 'light' ? '#b22262' : '#ff1ac6',
          },
          // secondary / text accents
          secondary: {
            main: mode === 'light' ? '#555' : '#888',
          },
          background: {
            default: mode === 'light' ? '#f9f9f9' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* 5️⃣ Apply global resets */}
        <CssBaseline />

        {/* 6️⃣ Your Auth & App */}
        <AuthProvider>
          <App />
        </AuthProvider>

        {/* 7️⃣ Floating FAB to toggle */}
        <ThemeToggleFab />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// The floating button in bottom-left
function ThemeToggleFab() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: theme.zIndex.tooltip,
      }}
    >
      <Fab
        size="small"
        onClick={colorMode.toggleColorMode}
        color="primary"
        aria-label="toggle light/dark"
      >
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </Fab>
    </Box>
  );
}

// Mount it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);