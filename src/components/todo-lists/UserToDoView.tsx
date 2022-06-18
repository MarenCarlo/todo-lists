import { Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from '@mui/icons-material';
import { useEffect, useReducer, useState } from 'react'
// Interface
import { TaskProps } from '../interfaces/TaskProps';
// Reducer
import { tasksReducer } from '../../reducers/todosTasksList';
import { Box } from '@mui/system';


export const UserToDoView = ({ ownTodoArray, setOwnTodo }: TaskProps) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '30vh',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75vw',
        bgcolor: '#000',
        border: '2px solid #000',
        boxShadow: 24,
    };
    //DESCUBRIMIENTOS IMPORTANTES
    /**
     * Se renderiza una vez vacio, quiza por eso no dibuja nada en pantalla
     */


    const [todos, dispatch] = useReducer(tasksReducer, JSON.parse(localStorage.getItem('ownTodoArrayLS')!));

    const handleComplete = (todo: any, index: number) => {
        dispatch({ type: "CHECK", id: todo.id, index, setOwnTodo });
    };
    const handleDelete = (todo: any, index: number) => {
        dispatch({ type: "DELETE", id: todo.id, index, setOwnTodo });
    };
    const handleEdit = (todo: any, index: number) => {
        //
        console.log('editar')
    };

    const [open, setOpen] = useState(false);
    const [taskEdit, setTaskEdit] = useState({
        id: 0,
        task: '',
        checked: false,
        idUserOwner: 0
    });

    const handleOpen = (todo: any, index: number) => {
        setOpen(true)
        setTaskEdit({
            id: todo.id,
            task: todo.task,
            checked: todo.checked,
            idUserOwner: todo.idUserOwner
        })
    };
    const handleClose = () => setOpen(false);

    const handleEditTaskSubmit = (event: React.FormEvent<HTMLFormElement>,) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let editTask = {
            id: taskEdit.id,
            task: String(data.get('editTask')),
            checked: taskEdit.checked,
            idUserOwner: taskEdit.idUserOwner
        }
        setOpen(false)
        dispatch({ type: "EDIT", editTask, setOwnTodo });
    };

    //onClick={() => handleEdit(todo, index)} 
    if (ownTodoArray.length > 0) {
        return (
            <>
                <CssBaseline />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Container maxWidth="sm">
                            <Typography component="h6" sx={{ textAlign: 'center' }}>
                                {taskEdit.id} || {taskEdit.idUserOwner}
                            </Typography>
                            <Box component="form" sx={{ justifyContent: 'center' }} onSubmit={handleEditTaskSubmit} noValidate >
                                <TextField
                                    margin="normal"
                                    name="editTask"
                                    id="editTask"
                                    multiline={true}
                                    required={true}
                                    fullWidth
                                    autoFocus
                                    variant="outlined"
                                    label="Editar Tarea"
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
                    </Box>
                </Modal>

                <Container maxWidth="xl" sx={{ mt: 6, mb: 10 }}>
                    <List sx={{ width: '100%' }}>
                        {
                            todos === null &&
                            <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
                                <CssBaseline />
                                <Typography component="h6" sx={{ textAlign: 'center' }}>
                                    Aun no hay tareas agregadas...
                                </Typography>
                            </Container>
                        }
                        {
                            todos !== null &&
                            todos.map((todo: any, index: number) => {
                                return (
                                    <ListItem
                                        key={todo.id.toString()}
                                        secondaryAction={
                                            <>
                                                <IconButton edge="end" aria-label="comments" color="primary" sx={{ mr: 1 }} onClick={() => handleDelete(todo, index)} >
                                                    <Delete />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="comments" color="primary" sx={{ mr: 1 }} onClick={() => handleOpen(todo, index)}>
                                                    <Edit />
                                                </IconButton>
                                            </>
                                        }
                                        disablePadding
                                    >
                                        {/* Dispatch en la siguiente linea */}
                                        <ListItemButton dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    checked={todo.checked}
                                                    id={todo.id.toString()}
                                                    onChange={() => handleComplete(todo, index)}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            {
                                                todo.checked ?
                                                    <ListItemText sx={{ textDecoration: 'line-through', color: '#202124' }} primary={todo.task} />
                                                    :
                                                    <ListItemText primary={todo.task} />
                                            }
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Container>
            </>
        );
    }
    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
            <CssBaseline />
            <Typography component="h6" sx={{ textAlign: 'center' }}>
                Aun no hay tareas agregadas...
            </Typography>
        </Container>
    );
}
