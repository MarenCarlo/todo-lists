/**
 * Función que nos sirve para actualizar el estado de esa tarea en BD.
 */
export const putCheckedState = async (taskModifiedData: any, taskId: any, newState: any, setOwnTodo: any) => {
    await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/todos/' + taskId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: taskModifiedData
    });
    setOwnTodo(newState);
}