import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import AuthenticationService from '../../../services/Authentication.service';
import { checkCookiesPermission, getLastURLPath, getLogOffLocalStorage, removeLocalStorageLogOff, showToast } from '../../../helper';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E1E30',
    },
    background: {
      default: '#f4f5f7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '15px',
        },
      },
    },
  },
});

const Login = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ Username: '', Password: '' });
  const navigate = useNavigate();

  const addGameURLPath = () => {
    navigate('/game');
  }

  useEffect(() => {
    checkCookiesPermission((res) => {
      if (!res) {
        addGameURLPath();
      }
    });
  }, []);

  useEffect(() => {
    const lastPathHistory = getLastURLPath();
    const logOffStorage = getLogOffLocalStorage();

    if (lastPathHistory.LastPath && lastPathHistory.LastPath !== '/' && !logOffStorage) {
      showToast(toast, "Necessário fazer Login!", "warn", {}, "X");
    }

    if(logOffStorage) {
      removeLocalStorageLogOff()
      showToast(toast, "Volte sempre 😁!", "success", {}, "X");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await AuthenticationService.signIn({
      ...formData
    });

    if (response === "SignIn successful and token set") {
      addGameURLPath();
    }

    if (response.includes("User not found")) {
      showToast(toast, "Username incorreto!", "error", {}, "X");
    }

    if (response.includes("Invalid password")) {
      showToast(toast, "Senha incorreta!", "error", {}, "X");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ mt: 8, mb: 4, p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <ToastContainer />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="username"
            label="Username"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="password"
            label="Password"
            name="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
          <Button fullWidth variant="outlined" color="primary" onClick={onSwitch} sx={{ mt: 1 }}>
            Switch to Register
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
