/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import HttpClient from '../../services/httpClient';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Login() {
  const theme = createTheme();

  const [cpf, setCpf] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (expect: React.FormEvent<HTMLFormElement>) => {
    expect.preventDefault();
    const token = await auth.signIn(cpf, password);
    if (token) {
      HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
      navigate('/List');
    }

    function Copyright(props: any) {
      return (
        <Typography variant="body2" color="text.secondary" align="left" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}.
        </Typography>
      );
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://a-static.mlcdn.com.br/1500x1500/quadro-decorativo-dragon-ball-goku-desenho-anime-com-moldura-g08-vital-quadros/vitalquadrosdobrasil/0090980707/43401908b32d3eeefaf6d040bf3c64a2.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="Cpf"
                name="cpf"
                onChange={(event) => setCpf(event.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Login;