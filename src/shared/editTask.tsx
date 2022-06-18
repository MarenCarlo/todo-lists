/**
 * Función que nos sirve para actualizar el estado de esa tarea en BD.
 */
export const editTask = async (taskDataEdit: any, idEditTask: any, newEditState: any, setOwnTodo: any) => {
    await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/todos/' + idEditTask, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: taskDataEdit
    });
    setOwnTodo(newEditState);
}