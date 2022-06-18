/**
 * Funcion de llamada a la Api "callApi", esta esta exportada, para que pueda ser
 * utilizada desde nuestro componente Login().
 */
export const registerUser = async (userDataRegister: any, setUserDataRegister: any, registerErrors: any, setRegisterErrors: any) => {

    const userUsern: string = userDataRegister.username;
    const userEmail: string = userDataRegister.email;

    const resemail: any = await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/users?search=' + userEmail + '&l=1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const resUserMail: any = await resemail.json();
    if (resUserMail.length > 0) {
        setUserDataRegister({
            name: '',
            email: '',
            password: '',
            username: '',
            isAdmin: false
        })
        setRegisterErrors({
            message: 'Este Email ya ha sido registrado con anterioridad...'
        })
    } else {
        const resusname: any = await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/users?search=' + userUsern + '&l=1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const resUserName: any = await resusname.json();
        if (resUserName.length > 0) {
            setUserDataRegister({
                name: '',
                email: '',
                password: '',
                username: '',
                isAdmin: false
            })
            setRegisterErrors({
                message: 'Ese Nombre de Usuario ya ha sido registrado con anterioridad...'
            })
        } else {
            let jsonDATA = JSON.stringify(userDataRegister)
            await fetch('https://62a4098a259aba8e10e13872.mockapi.io/to-do/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonDATA
            });
            setUserDataRegister({
                name: '',
                email: '',
                password: '',
                username: '',
                isAdmin: false
            })
            setRegisterErrors({
                message: 'Usuario registrado exitosamente...'
            })
        }
    }
}