import { CssBaseline } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { RegisterProps, UserDataRegister } from '../interfaces/RegisterProps';

export const Register = ({ setUserDataRegister, registerErrors }: RegisterProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let registerData: UserDataRegister = {
            name: String(data.get('firstName') + ' ' + data.get('lastName')),
            email: String(data.get('email')).toLowerCase(),
            password: String(data.get('password')).toLowerCase(),
            username: String(data.get('username')).toLowerCase(),
            isAdmin: false
        }
        setUserDataRegister(registerData);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: '10vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ color: '#464E47' }}>
                    Registro de Usuario Nuevo
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Primer Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Primer Apellido"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Nombre de Usuario"
                                name="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2, pt: 1, pb: 1, boxShadow: 5 }}
                    >
                        Registrarse
                    </Button>
                </Box>
                <Typography component="p" sx={{ mt: 2, color: '#E84135', textAlign: 'center' }}>
                    {registerErrors.message}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                {'Copyright © '}
                <Link color="inherit" href="https://marencarlo.github.io/kyoko_portfolio/">
                    Kyoko Designs
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Container>
    )
}
