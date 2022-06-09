export const Logout_Clear_States = async (setAdmin: any, setLogged: any, setUserData: any, setLoginErrors: any) => {
    await setAdmin(false);
    await setLogged(false);
    /**
     * SetUserData nos sirve para almacenar toda la data que recibimos
     * del usuario que quiere ingresar al sistema.
     */
    await setUserData({
        id: 0,
        name: '',
        email: '',
        username: '',
        password: '',
        isAdmin: false
    })
    await setLoginErrors({
        message: ''
    });
}