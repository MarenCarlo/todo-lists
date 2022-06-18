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
import { TaskData, OwnTodoArray } from "./components/interfaces/TaskProps";
import { RegisterErrors, UserDataRegister } from "./components/interfaces/RegisterProps";
// MUI Components Imports
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme'
// import functions
import { callApi } from './shared/enviarDatos';
import CompletedTasks from "./components/home/Completed";
import { Logout_Clear_States } from "./shared/Logout";
import { getOwnTodoList } from "./shared/getOwnTodoList";
import { NewTaskPOSTApi } from "./shared/newTaskPOSTApi";
import { Register } from "./components/auth/Register";
import UnloggedNavigation from "./components/navigation/UnloggedNavigation";
import ProtectedRoutesNavigation from "./components/navigation/ProtectedRoutesNavigation";
import { registerUser } from "./shared/registerUser";


export const UserDataContext = createContext(JSON.parse(localStorage.getItem('userData')!));
export const OwnTodoDataContext = createContext(JSON.parse(localStorage.getItem('ownTodoArrayLS')!));

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
    isAdmin: false
  });

  /**
   * State userDataRegister, data del usuario que se registra
   */
  const [userDataRegister, setUserDataRegister] = useState<UserDataRegister>({
    name: '',
    email: '',
    password: '',
    username: '',
    isAdmin: false
  });

  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({
    message: ''
  });


  /**
   * Estado de lista de tareas para el usuario logueado.
   */
  const [ownTodoArray, setOwnTodo] = useState<OwnTodoArray>([]);

  /**
   * Estado para agregar nueva tarea
   */
  const [newTask, setNewTask] = useState<TaskData>({
    task: '',
    checked: false,
    idUserOwner: 0
  })
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

  /**
   * useEffect que se efectua cada vez que las dos propiedades 
   * newTask.Task y newTask.idUserOwner son modificadas
   */
  useEffect(() => {
    if (newTask.task !== '' && newTask.idUserOwner > 0 && isLogged === true) {
      NewTaskPOSTApi(newTask, setNewTask);
      getOwnTodoList(userData, setOwnTodo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTask]);

  /**
   * useEffect que valida si han ingresado un Email y una password en los inputs, 
   * para ejecutar la funcion de llamada a la API Usuarios
   */
  useEffect(() => {
    if ((user.user !== '' && user.user !== undefined) || (user.password !== '' && user.password !== undefined)) {
      callApi(user, setUser, userData, setUserData, loginErrors, setLoginErrors, isLogged, setLogged, isAdmin, setAdmin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * useEffect que valida si han ingresado un name, email, user o pass en los inputs, 
   * para ejecutar la funcion de registerUser();
   */
  useEffect(() => {
    if ((userDataRegister.name !== '' && userDataRegister.name !== undefined)
      && (userDataRegister.email !== '' && userDataRegister.email !== undefined)
      && (userDataRegister.password !== '' && userDataRegister.password !== undefined)
      && (userDataRegister.password !== '' && userDataRegister.password !== undefined)
      && (userDataRegister.username !== '' && userDataRegister.username !== undefined)
      && (userDataRegister.isAdmin === false)) {
      registerUser(userDataRegister, setUserDataRegister, registerErrors, setRegisterErrors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataRegister]);

  /**
    * Condicional que se ejecuta para obtener la data de las Tareas desde la API
    * esta verifica si el usuario esta logueado y si existe el objeto del array de las tareas
    * en el LocalStorage y si su estado no tiene objets.
    * 
    * Y si el usuario no esta logueado y aun existe el objeto del array de tareas en LocalStorage, se encarga
    * de eliminarlo y vaciar el estado
    * 
    * Array de Dependencias vacio, para hacer que solo se ejecute una vez!
    */
  useEffect(() => {
    if (isLogged === true && localStorage.getItem('ownTodoArrayLS')! !== null && ownTodoArray.length === 0) {
      const ownTodoArrayLocSt = JSON.parse(localStorage.getItem('ownTodoArrayLS')!);
      setOwnTodo(ownTodoArrayLocSt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    /**
     * Condicional que valida si los objetos escenciales para estar logueado estan en LocalHost
     * y si no lo estan, ejecuta la Funcion para limpiar LocalHost y Estados correspondientes
     */
    if ((localStorage.getItem('userData') === null) && (location.pathname === '/task_list' || location.pathname === '/users_task_list' || location.pathname === '/completed_tasks')) {
      Logout_Clear_States(setAdmin, setLogged, setUserData, setLoginErrors);
    }
    /**
     * condicional para eliminar array de tareas al cerrar sesion
     */
    if (isLogged === false && localStorage.getItem('ownTodoArrayLS')! !== null) {
      localStorage.removeItem('ownTodoArrayLS');
      setOwnTodo([]);
    }

    /**
     * Condicional que valida si esta logueado un usuario y si existe data de Usuario en LocalStorage
     * y si esto es asi, que setee esa data en su respectivo estado
     * 
     * Esto porque React por si solo no puede mantener estados al refrescar la web app.
     */
    if (userData.id === 0 && isLogged === true) {
      const userDataLS = JSON.parse(localStorage.getItem('userData')!);
      setUserData({
        id: userDataLS[0].id,
        name: userDataLS[0].name,
        email: userDataLS[0].email,
        username: userDataLS[0].username,
        isAdmin: true
      })
    }

    /**
     * Condicional que se ejecuta para obtener la data de las Tareas desde la API
     * esto se realiza solamente si el usuario esta logueado y si no existe el objeto del array de las tareas
     * en el LocalStorage.
     */
    if (isLogged === true && localStorage.getItem('ownTodoArrayLS')! === null) {
      getOwnTodoList(userData, setOwnTodo);
    }
  }, [user, loginErrors, userData, isLogged, isAdmin, location.pathname, ownTodoArray.length, ownTodoArray, newTask]);
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
                <OwnTodoDataContext.Provider value={ownTodoArray}>
                  <ProtectedRoutesNavigation />
                  <Routes>
                    <Route path="/" element={<Navigate to="/task_list" replace />} />
                    <Route path="/task_list" element={
                      <Home
                        ownTodoArray={ownTodoArray} setOwnTodo={setOwnTodo}
                        newTask={newTask} setNewTask={setNewTask}
                      />}
                    />
                    {
                      userData.isAdmin ?
                        <Route path="/users_task_list" element={<Home2 />} />
                        :
                        <Route path="/users_task_list" element={<Navigate to="/task_list" replace />} />
                    }
                    <Route path="/completed_tasks" element={<CompletedTasks />} />
                    <Route path="*" element={<Navigate to="/resource_not_found" replace />} />
                    <Route path="/resource_not_found" element={<Error404 />} />
                  </Routes>
                </OwnTodoDataContext.Provider>
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
        <UnloggedNavigation />
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
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
          <Route path="/Register" element={
            <Register
              userDataRegister={userDataRegister}
              setUserDataRegister={setUserDataRegister}
              registerErrors={registerErrors}
              setRegisterErrors={setRegisterErrors}
            />}
          />
        </Routes>
      </>
    </ThemeProvider>
  );
  /**
   * FINALIZA VISTAS QUE SE MUESTRAN AL NO HABER INICIADO SESION
   */
}

export default App;