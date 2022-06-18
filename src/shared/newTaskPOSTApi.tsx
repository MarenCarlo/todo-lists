/**
 * Funcion de POST para Agregar Tarea.
 */
export const newTaskPOSTApi = async (newTask: any, setNewTask: any) => {
    let jsonData: any = JSON.stringify(newTask);
    await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData
    });
    setNewTask({
        task: '',
        checked: false,
        idUserOwner: 0
    })
}