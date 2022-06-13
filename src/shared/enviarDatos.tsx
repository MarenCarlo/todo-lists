/**
 * Funcion de llamada a la Api "callApi", esta esta exportada, para que pueda ser
 * utilizada desde nuestro componente Login().
 */
export const callApi = async (user: any, setUser: any, userData: any, setUserData: any, loginErrors: any, setLoginErrors: any,
    isLogged: boolean, setLogged: any, isAdmin: boolean, setAdmin: any) => {

    const userEmail: string = user.user;
    const userPass: string = user.password;
    setUser({
        user: '',
        password: ''
    })

    const res: any = await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/users?search=' + userEmail + '&l=1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const resUser: any = await res.json();

    /**
     * Condicional que valida si el resultado de la llamada a la API
     * no esta vacia (Que no encontro ningun Usuarios)
     */
    if (resUser.length > 0) {
        const userApiPass: string = resUser[0].password;
        if (userPass === userApiPass) {
            const userIsAdmin: boolean = resUser[0].isAdmin;
            /**
             * Romaguera-Crona es para validar para mientras si el usuario es de tipo
             * Administrador
             */
            if (userIsAdmin === true) {
                setAdmin(true);
                setLogged(true);
                /**
                 * SetUserData nos sirve para almacenar toda la data que recibimos
                 * del usuario que quiere ingresar al sistema.
                 */
                setUserData({
                    id: resUser[0].id,
                    name: resUser[0].name,
                    email: resUser[0].email,
                    username: resUser[0].username,
                    isAdmin: true
                })
                setLoginErrors({
                    message: ''
                });
                localStorage.setItem('userData', JSON.stringify({
                    id: resUser[0].id,
                    name: resUser[0].name,
                    email: resUser[0].email,
                    username: resUser[0].username,
                    isAdmin: true
                }));
                localStorage.setItem('admin', JSON.stringify(true));
                localStorage.setItem('logged', JSON.stringify(true));
            } else {
                setAdmin(false);
                setLogged(true);
                /**
                 * SetUserData nos sirve para almacenar toda la data que recibimos
                 * del usuario que quiere ingresar al sistema.
                 */
                setUserData({
                    id: resUser[0].id,
                    name: resUser[0].name,
                    email: resUser[0].email,
                    username: resUser[0].username,
                    isAdmin: false
                })
                setLoginErrors({
                    message: ''
                });
                localStorage.setItem('userData', JSON.stringify({
                    id: resUser[0].id,
                    name: resUser[0].name,
                    email: resUser[0].email,
                    username: resUser[0].username,
                    isAdmin: false
                }));
                localStorage.setItem('admin', JSON.stringify(false));
                localStorage.setItem('logged', JSON.stringify(true));
            }
        } else {
            setLoginErrors({
                message: 'La contraseña es Incorrecta...'
            });
        }
        /**
         * Si la peticion esta vacia seteara el estado de LoginErrors para
         * dar a entender que no se encontro ese usuario en la Base De Datos.
         */
    } else {
        setLoginErrors({
            message: 'No existe ningun Usuario con este nombre de usuario...'
        });
    }
}

