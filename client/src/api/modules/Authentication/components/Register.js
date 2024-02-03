import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../../../services/Authentication.service';
import { Container, TextField, Button, Typography, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from '../../../helper';

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

const Register = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ Username: '', Email: '', Password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await AuthenticationService.signUp({
      ...formData
    });

    if (response.includes("successful")) {
      navigate("/game")
    }

    if (response.includes("Username")) {
      showToast(toast, "Username já está em uso!", "error", {}, "X");
    }

    if (response.includes("Email already taken")) {
      showToast(toast, "E-mail já está em uso!", "error", {}, "X");
    }

    if (response.includes("Email is not valid")) {
      showToast(toast, "E-mail inválido!", "error", {}, "X");
    }

    if (response.includes("Password")) {
      showToast(toast, response, "error", {}, "X"); //TODO: Maybe traduzir, tlgd ?
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ mt: 8, mb: 4, p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <ToastContainer />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
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
            id="email"
            label="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
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
            Register
          </Button>
          <Button fullWidth variant="outlined" color="primary" onClick={onSwitch} sx={{ mt: 1 }}>
            Switch to Login
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
