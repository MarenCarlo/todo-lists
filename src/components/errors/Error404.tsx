import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, Outlet } from 'react-router-dom';
import { Button, Container } from '@mui/material';


const Error404 = () => {
    return (
        <Box sx={{
            marginTop: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant="h2" component="div" gutterBottom>
                Error 404
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Recurso no encontrado
            </Typography>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Button
                        fullWidth
                        variant="contained"
                        color='error'
                        sx={{ mt: 3, mb: 2, pt: 1, pb: 1, boxShadow: 5 }}
                    >
                        Volver
                    </Button>
                </Container>
            </Link>
            <Outlet />
        </Box>
    );
}

export default Error404;