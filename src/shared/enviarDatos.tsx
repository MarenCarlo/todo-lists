import { Users } from '../database/Users';

/**
 * Funcion de llamada a la Api "callApi", esta esta exportada, para que pueda ser
 * utilizada desde nuestro componente Login().
 */
export const callApi = (user: any, setUser: any, userData: any, setUserData: any, loginErrors: any, setLoginErrors: any,
    isLogged: boolean, setLogged: any, isAdmin: boolean, setAdmin: any) => {

    const userEmail: string = user.user;
    const userPass: string = user.password;
    setUser({
        user: '',
        password: ''
    })

    const UsersRes = Users.filter(function (dato) {
        if (dato.email === userEmail) {
            return true;
        } else {
            return false;
        }
    });

    /**
     * Condicional que valida si el resultado de la llamada a la API
     * no esta vacia (Que no encontro ningun Usuarios)
     */
    if (UsersRes.length > 0) {
        const userApiPass: string = UsersRes[0].password;
        if (userPass === userApiPass) {
            const userIsAdmin: boolean = UsersRes[0].isAdmin;
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
                    id: UsersRes[0].id,
                    name: UsersRes[0].name,
                    email: UsersRes[0].email,
                    username: UsersRes[0].username,
                    password: 'Aca no hay nada que ver 7w7',
                    isAdmin: true
                })
                setLoginErrors({
                    message: ''
                });
                localStorage.setItem('userData', JSON.stringify(UsersRes[0]));
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
                    id: UsersRes[0].id,
                    name: UsersRes[0].name,
                    email: UsersRes[0].email,
                    username: UsersRes[0].username,
                    password: 'Aca no hay nada que ver 7w7',
                    isAdmin: false
                })
                setLoginErrors({
                    message: ''
                });
                localStorage.setItem('userData', JSON.stringify(UsersRes[0]));
                localStorage.setItem('admin', JSON.stringify(false));
                localStorage.setItem('logged', JSON.stringify(true));
            }
        } else {
            setLoginErrors({
                message: 'La contrase??a es Incorrecta...'
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

