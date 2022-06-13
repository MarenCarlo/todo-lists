import { CssBaseline, Modal } from '@mui/material';
import UserToDoList from '../todo-lists/UserToDoList';
import { OwnTodoDataContext } from '../../App';
import { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { ModalForm } from '../todo-lists/ModalForm';

const Home = () => {
    const arrayTodoList = useContext(OwnTodoDataContext);

    const [open, setOpen] = useState(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '20vh',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <CssBaseline />
            <UserToDoList />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Agregar Nueva Lista</h2>
                    <ModalForm />
                </Box>
            </Modal>

            <Toolbar />
            <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0, mt: 5 }}>
                <Toolbar>
                    <Fab sx={{ background: '#5A5A5A' }} aria-label="add" onClick={handleOpen}>
                        <AddIcon />
                    </Fab>
                    <Box sx={{ flexGrow: 1 }} />
                    <Fab sx={{ background: '#FFF', fontSize: '12pt' }} aria-label="add">
                        {arrayTodoList.length}
                    </Fab>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Home;