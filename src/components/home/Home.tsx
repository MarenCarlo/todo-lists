import { CssBaseline } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { UserToDoView } from '../todo-lists/UserToDoView';
import { AddTask } from '../todo-lists/AddTask';
import { TaskProps } from '../interfaces/TaskProps';

const Home = ({ newTask, setNewTask, ownTodoArray, setOwnTodo }: TaskProps) => {
    //<UserToDoList />
    return (
        <>
            <CssBaseline />
            <UserToDoView newTask={newTask} setNewTask={setNewTask} ownTodoArray={ownTodoArray} setOwnTodo={setOwnTodo} />
            <Toolbar />
            <AddTask newTask={newTask} setNewTask={setNewTask} ownTodoArray={ownTodoArray} setOwnTodo={setOwnTodo} />
        </>
    )
}

export default Home;