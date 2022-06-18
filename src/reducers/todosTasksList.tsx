import { deleteTask } from '../shared/deleteTask';
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
            let newEditState = state.map((todo) => {
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
            localStorage.setItem('ownTodoArrayLS', JSON.stringify(newEditState));

            let editedPosition = newEditState.map((position) => {
                return {
                    ...position
                }
            });

            let taskEditedData = JSON.stringify(editedPosition[action.index])
            let taskEditedId = editedPosition[action.index].id;
            putCheckedState(taskEditedData, taskEditedId, newEditState, action.setOwnTodo);
            //console.log(taskId + "  ||  " + taskModifiedData)
            return newEditState;

        default:
            return state;
    }
};
