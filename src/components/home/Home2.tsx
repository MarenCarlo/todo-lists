import { Container, CssBaseline, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { UserDataContext } from '../../App';

const Home2 = () => {
    const userData = useContext(UserDataContext);
    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
            <CssBaseline />
            <Typography component="h6" sx={{ mt: 5, textAlign: 'center' }}>
                Bienvenido a Home2!!: {userData.name}
            </Typography>
        </Container>
    )
}

export default Home2;