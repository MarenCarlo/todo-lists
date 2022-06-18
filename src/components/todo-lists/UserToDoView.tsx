import { Container, CssBaseline, Modal, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from '@mui/icons-material';
import { useReducer, useState } from 'react'
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
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [todos, dispatch] = useReducer(tasksReducer, ownTodoArray);

    const handleComplete = (todo: any, index: number) => {
        dispatch({ type: "CHECK", id: todo.id, index, setOwnTodo });
    };
    const handleDelete = (todo: any, index: number) => {
        dispatch({ type: "DELETE", id: todo.id, index, setOwnTodo });
    };
    const handleEdit = (todo: any, index: number) => {
        //dispatch({ type: "EDIT", id: todo.id, index, setOwnTodo });
        console.log('editar')
    };

    const [open, setOpen] = useState(false);
    const [idEdit, setIdEdit] = useState();

    const handleOpen = (todo: any, index: number) => {
        setOpen(true)
        setIdEdit(todo.id)
    };
    const handleClose = () => setOpen(false);

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
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {idEdit}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>

                <Container maxWidth="xl" sx={{ mt: 6, mb: 10 }}>
                    <List sx={{ width: '100%' }}>
                        {
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
