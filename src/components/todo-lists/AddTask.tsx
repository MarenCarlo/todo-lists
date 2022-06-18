import { AppBar, Box, Button, Fab, TextField, Toolbar } from '@mui/material'
import { Container } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import React, { useContext } from 'react'
import { TaskProps, TaskData } from '../interfaces/TaskProps';
import { UserDataContext } from '../../App';

export const AddTask = ({ newTask, setNewTask, ownTodoArray }: TaskProps) => {
    const userData = useContext(UserDataContext);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let newTaskData: TaskData = {
            task: String(data.get('add_todo')),
            checked: false,
            idUserOwner: Number(userData.id),
        }
        setNewTask(newTaskData);
    };
    return (
        <>
            <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0, mt: 5, pb: 1 }}>
                <Toolbar>
                    <Fab sx={{ background: '#FFF', fontSize: '12pt' }} aria-label="add">
                        {ownTodoArray.length}
                    </Fab>
                    <Container maxWidth="md">
                        <Box component="form" sx={{ justifyContent: 'center' }} onSubmit={handleSubmit} noValidate >
                            <TextField
                                margin="normal"
                                name="add_todo"
                                id="add_todo"
                                required={true}
                                fullWidth
                                autoFocus
                                label="Agregar Tarea"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="success"
                                sx={{ pt: 1, pb: 1, boxShadow: 5 }}
                            >
                                <AddIcon />
                            </Button>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    )
}
