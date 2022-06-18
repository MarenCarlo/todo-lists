import React, { useState, useReducer } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { UserDataContext, OwnTodoDataContext } from '../../App';
import { useContext } from 'react'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, Container, CssBaseline, FormControlLabel, FormGroup, Grid } from '@mui/material';

/**
 * 
 * 
 * DOCUMENTO QUE SE UTILIZARA DESPUES
 * 
 * 
 */


export default function UserToDoList() {
    const userData = useContext(UserDataContext);
    const arrayTodoList = useContext(OwnTodoDataContext);
    const [checked, setChecked] = useState(true);

    const initialState = { checked };
    type ActionType =
        | { type: 'check' }
        | { type: 'uncheck' }

    const checkTasks = (state: typeof initialState, action: ActionType) => {

        switch (action.type) {
            case 'check':
                return {
                    ...state,
                    checked: true
                }
            case 'uncheck':
                return {
                    ...state,
                    checked: false
                }
            default:
                return state;
        }
    }

    const [checkState, dispatch] = useReducer(checkTasks, initialState);

    if (arrayTodoList.length > 0) {
        return (
            <Box>
                <CssBaseline />
                <Container maxWidth="xl" sx={{ mt: 6 }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="baseline" spacing={4}>
                        {
                            arrayTodoList.map((todo: any) => {
                                const arrayTasks = todo.todo;
                                return (
                                    <Grid component="div" key={todo.id} item xs={12} md={6} lg={4}>
                                        <Card sx={{ mt: 4 }}>
                                            <CardContent sx={{ ml: 4 }}>
                                                {
                                                    todo.importancy === 1 ?
                                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                            Prioridad Máxima
                                                        </Typography>
                                                        :
                                                        <div>
                                                        </div>
                                                }
                                                {
                                                    todo.importancy === 2 ?
                                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                            Prioritaria
                                                        </Typography>
                                                        :
                                                        <div>
                                                        </div>
                                                }
                                                {
                                                    todo.importancy === 3 ?
                                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                            Sin Prioridad
                                                        </Typography>
                                                        :
                                                        <div>
                                                        </div>
                                                }
                                                <Typography variant="h5" component="div">
                                                    {todo.id} - {todo.title}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    Tareas:
                                                </Typography>
                                            </CardContent>
                                            <hr></hr>
                                            <CardContent sx={{ ml: 4 }}>
                                                <FormGroup>
                                                    {
                                                        arrayTasks.map((task: any, index: number) => {
                                                            return (
                                                                <>
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                                                        <FormControlLabel
                                                                            label={task.task}
                                                                            control={<Checkbox checked={task.checked} onClick={() => dispatch({ type: 'check' })} />}
                                                                        />
                                                                    </Box>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </FormGroup>
                                            </CardContent>
                                            <hr></hr>
                                            <Grid container direction="row" justifyContent="center" alignItems="baseline" spacing={2}>
                                                <Grid item xs={3}>
                                                    <CardActions>
                                                        <Button size="small">Marcar Completada</Button>
                                                    </CardActions>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CardActions>
                                                        <Button size="small">Agregar Tarea</Button>
                                                    </CardActions>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CardActions>
                                                        <Button size="small">Eliminar Lista</Button>
                                                    </CardActions>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Box>
        );
    }
    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
            <CssBaseline />
            <Typography component="h6" sx={{ textAlign: 'center' }}>
                {userData.name}, Aun no hay tareas agregadas...
            </Typography>
        </Container>
    );
}