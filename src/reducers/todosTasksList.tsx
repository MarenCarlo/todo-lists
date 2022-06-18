import { deleteTask } from '../shared/deleteTask';
import { editTask } from '../shared/editTask';
import { getOwnTodoList } from '../shared/getOwnTodoList';
import { NewTaskPOSTApi } from '../shared/newTaskPOSTApi';
import { putCheckedState } from '../shared/putCheckedState';

export const tasksReducer = (state: any[], action: any) => {
    switch (action.type) {

        case 'CHECK':
            let newState = state.map((todo) => {
                if (todo.id === action.id) {
                    /**
                     * OBTENER DATA PARA ENVIAR COMO PARAMETROS A LA FUNCION DE PUT EN BD
                     */
                    return {
                        ...todo,
                        checked: !todo.checked,
                    };
                } else {
                    return todo;
                }
            });
            localStorage.setItem('ownTodoArrayLS', JSON.stringify(newState));

            let updatedPosition = newState.map((position) => {
                return {
                    ...position
                }
            });

            let taskModifiedData = JSON.stringify(updatedPosition[action.index])
            let taskId = updatedPosition[action.index].id;
            putCheckedState(taskModifiedData, taskId, newState, action.setOwnTodo);
            //console.log(taskId + "  ||  " + taskModifiedData)
            return newState;

        case 'DELETE':
            let newModState: any = state.filter(element => element.id !== action.id).map((todo) => {
                if (todo.id === action.id) {
                    return {
                        ...todo,
                    };
                } else {
                    return todo;
                }
            });
            let taskDeleteId = action.id;
            deleteTask(taskDeleteId, newModState, action.setOwnTodo);
            localStorage.setItem('ownTodoArrayLS', JSON.stringify(newModState));
            return newModState;

        case 'EDIT':
            let idEditTask = action.editTask.id;

            let obtainTaskData = state.filter(element => element.id === action.editTask.id).map((todo) => {
                if (todo.id === action.editTask.id) {
                    /**
                     * OBTENER DATA PARA ENVIAR COMO PARAMETROS A LA FUNCION DE PUT EN BD
                     */
                    return {
                        ...todo,
                        task: action.editTask.task
                    };
                } else {
                    return todo;
                }
            });
            let newEditState = state.map((todo) => {
                if (todo.id === action.editTask.id) {
                    /**
                     * OBTENER DATA PARA ENVIAR COMO PARAMETROS A LA FUNCION DE PUT EN BD
                     */
                    return {
                        ...todo,
                        task: action.editTask.task
                    };
                } else {
                    return todo;
                }
            });
            localStorage.setItem('ownTodoArrayLS', JSON.stringify(newEditState));
            let taskDataEdit = JSON.stringify(obtainTaskData[0]);
            editTask(taskDataEdit, idEditTask, newEditState, action.setOwnTodo);
            return newEditState;

        // Para despues xd
        // case 'UPLOAD':
        //     let newTodoArray = state.map((todo) => {
        //         /**
        //          * OBTENER DATA PARA ENVIAR COMO PARAMETROS A LA FUNCION DE PUT EN BD
        //          */
        //         let newDataObject = action.newTaskData;
        //         return {
        //             ...todo,
        //             newDataObject
        //         };
        //     });
        //     //localStorage.setItem('ownTodoArrayLS', JSON.stringify(newTodoArray));
        //     console.log(newTodoArray);
        //     action.setNewTask(action.newTaskData);
        //     action.setOwnTodo(newTodoArray);
        //     NewTaskPOSTApi(action.newTaskData, action.setNewTask);
        //     getOwnTodoList(action.userData, action.setOwnTodo);
        //     return newTodoArray;

        default:
            return state;
    }
};
