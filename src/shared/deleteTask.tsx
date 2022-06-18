/**
 * Función que nos sirve para actualizar el estado de esa tarea en BD.
 */
export const deleteTask = async (taskDeleteId: any, newModState: any, setOwnTodo: any) => {
    await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/todos/' + taskDeleteId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    setOwnTodo(newModState);
}