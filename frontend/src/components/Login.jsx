import React, { useContext, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';


const defaultTheme = createTheme();

export default function Register() {
    const {setUser} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Simple validation
        if (!email || !password) {
            setMsg({ type: 'error', text: 'All fields are required' });
            return;
        }

        const user = {email, password};
        const res = await axios.post('http://localhost:3000/auth/login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        setMsg({ type: 'success', text: res.data.message });
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/'), 2000);
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            setMsg({ type: 'error', text: error.response.data.message || error.response.data.error });
        } else {
            setMsg({ type: 'error', text: 'An error occurred. Please try again.' });
        }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        {msg && <Alert severity={msg.type} onClose={() => {
            setMsg('');}}>
            {msg.text}
        </Alert>}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}