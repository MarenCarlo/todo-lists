/**
 * Función que nos sirve para obtener el array de lista de TODOs propia del usuario logueado.
 */
export const getOwnTodoList = async (userData: any, setOwnTodo: any) => {
    const idUserOwner = userData.id;
    const res: any = await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/todos?idUserOwner=' + idUserOwner + '&orderBy=asc', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const resTodoList: any = await res.json();
    setOwnTodo(resTodoList);
    localStorage.setItem('ownTodoArrayLS', JSON.stringify(resTodoList));
}