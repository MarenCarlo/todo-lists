import { Container, CssBaseline, Typography } from '@mui/material';
import { useContext } from 'react'
import { UserDataContext } from '../../App';

const CompletedTasks = () => {
    const userData = useContext(UserDataContext);
    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
            <CssBaseline />
            <Typography component="h6" sx={{ mt: 5, textAlign: 'center' }}>
                Bienvenido a Tareas Completadas!!: {userData.name}
            </Typography>
        </Container>
    )
}

export default CompletedTasks;