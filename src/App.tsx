// React Imports
import { useEffect, useState, createContext } from "react"
// Router Imports
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
// Components Imports
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Home2 from './components/home/Home2';
import Error404 from './components/errors/Error404';
// Interfaces Imports
import { LoginErrors, User } from './components/interfaces/LoginProps';
import { UserData, Token } from './components/interfaces/HomeProps';
// MUI Components Imports
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme'
// import functions
import { callApi } from './shared/enviarDatos';
import ProtectedRoutesNavigation from "./components/navigation/ProtectedRoutesNavigation";
import { Logout_Clear_States } from "./shared/Logout";


export const UserDataContext = createContext(JSON.parse(localStorage.getItem('userData')!));

function App() {

  /**
   * INICIA SECCION DE STATES
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<Token>({
    token: 'xDfsdsdfD434123454XD'
  })
  /**
   * State user es para el estado de los inputs del login
   * username y password
   */
  const [user, setUser] = useState<User>({
    user: '',
    password: ''
  });
  /**
   * State userData es el estado para almacenar la data del usuario
   * que inicia una sesión.
   */
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    name: '',
    email: '',
    username: '',
    password: '',
    isAdmin: false
  });

  /**
   * State loginErrors es el estado con el que se manejan todos los errores
   * al momento de intentar iniciar una sesión
   */
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({
    message: ''
  });
  /**
   * State isLogged es el estado que se utiliza para validar si se muestra el login
   * o nuestras rutas protegidas
   */
  const loggedM = JSON.parse(localStorage.getItem('logged')!);
  const [isLogged, setLogged] = useState<boolean>(loggedM);
  /**
   * State isAdmin es el estado que se utiliza para validar si el usuario tiene el rol de
   * Administrador para validar si este puede ingresar al sistemas
   */
  const adminM = JSON.parse(localStorage.getItem('admin')!);
  const [isAdmin, setAdmin] = useState<boolean>(adminM);
  /**
   * FINALIZA SECCION DE STATES
   */
  const location = useLocation();

  useEffect(() => {
    if ((user.user !== '' && user.user !== undefined) || (user.password !== '' && user.password !== undefined)) {
      callApi(user, setUser, userData, setUserData, loginErrors, setLoginErrors, isLogged, setLogged, isAdmin, setAdmin);
    }
    if ((localStorage.getItem('userData') === null) && (location.pathname === '/Home')) {
      Logout_Clear_States(setAdmin, setLogged, setUserData, setLoginErrors);
    }
    if (userData.id === 0 && isLogged === true) {
      const userDataLS = JSON.parse(localStorage.getItem('userData')!)
      setUserData({
        id: userDataLS[0].id,
        name: userDataLS[0].name,
        email: userDataLS[0].email,
        username: userDataLS[0].username,
        password: 'Aca no hay nada que ver 7w7',
        isAdmin: true
      })
    }
  }, [user, loginErrors, userData, isLogged, isAdmin, location.pathname]);
  /**
   * INICIA SECCION DE VALIDACIONES AL INICIAR SESION
   */
  if (isLogged === true) {
    if (userData.id > 0 && userData.username !== '') {
      if (token.token !== '') {
        return (
          <ThemeProvider theme={Theme}>
            <>
              <UserDataContext.Provider value={userData}>
                <ProtectedRoutesNavigation />
                <Routes>
                  <Route path="/" element={<Navigate to="/Home" replace />} />
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Home2" element={<Home2 />} />
                  <Route path="*" element={<Navigate to="/resource_not_found" replace />} />
                  <Route path="/resource_not_found" element={<Error404 />} />
                </Routes>
              </UserDataContext.Provider>
            </>
          </ThemeProvider>
        );
      } else {
        setLoginErrors({
          message: 'Token no recibido...'
        })
        setLogged(false);
        setAdmin(false);
        localStorage.removeItem('logged');
        localStorage.removeItem('admin');
        localStorage.removeItem('userData');
      }
    } else {
      if (userData.id === 0) {
        if (localStorage.getItem('userData') === null) {
          setLogged(false);
          setAdmin(false);
          setLoginErrors({
            message: 'No se recibio Data del Usuario...'
          })
          localStorage.removeItem('logged');
          localStorage.removeItem('admin');
        } else {
          const userDataM = JSON.parse(localStorage.getItem('userData')!);
          setUserData(userDataM);
        }
      }
    }
  } else if (isLogged === null) {
    setLogged(false);
    setAdmin(false);
    setLoginErrors({
      message: ''
    });
    localStorage.removeItem('logged');
    localStorage.removeItem('admin');
    localStorage.removeItem('userData');
  }
  /**
   * FINALIZA SECCION DE VALIDACIONES AL INICIAR SESION
   */
  /**
   * INICIA VISTAS QUE SE MUESTRAN SI NO SE HA INICIADO SESION
   */
  return (
    <ThemeProvider theme={Theme}>
      <>
        <Routes>
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/" element={
            <Login
              user={user}
              setUser={setUser}
              userData={userData}
              setUserData={setUserData}
              loginErrors={loginErrors}
              setLoginErrors={setLoginErrors}
            />
          } />
          <Route path="*" element={<Navigate to="/resource_not_found" replace />} />
          <Route path="/resource_not_found" element={<Error404 />} />
        </Routes>
      </>
    </ThemeProvider>
  );
  /**
   * FINALIZA VISTAS QUE SE MUESTRAN AL NO HABER INICIADO SESION
   */
}

export default App;