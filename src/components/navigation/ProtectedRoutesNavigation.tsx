import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext, Fragment, useState } from 'react'
import { UserDataContext } from '../../App';
import { matchPath, Outlet, Link, useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



function useRouteMatch(patterns: any) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function CurrentRoute(): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const location = useLocation();
}

export default function ProtectedRoutesNavigation() {

    const history = useNavigate();

    async function Logout() {
        await localStorage.removeItem('admin');
        await localStorage.removeItem('logged');
        await localStorage.removeItem('userData');
        await history("/", { replace: true });
    };


    // Inicia config para ruteo dinamico
    const userData = useContext(UserDataContext);
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/task_list', '/completed_tasks']);
    const currentTab = routeMatch?.pattern?.path;
    // Termina config para ruteo dinamico
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleClickLogout = (event: React.MouseEvent<HTMLElement>) => {
        Logout();
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // Termina Config para boton menu

    if (userData.name !== '') {
        return (
            <Fragment>
                <Box sx={{ width: '100%' }}>
                    <CssBaseline />
                    <AppBar position="fixed" color="secondary">
                        <Toolbar>
                            <Container maxWidth="xl">
                                <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                                    <Grid item>
                                        <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
                                            {userData.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip title="Menú">
                                                <IconButton onClick={handleOpenUserMenu} size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="menu"
                                                    sx={{ mr: 2 }}>
                                                    <MenuIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClick={handleCloseUserMenu}
                                            >
                                                <MenuItem onClick={handleClickLogout} >Cerrar Sesión</MenuItem>
                                            </Menu>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Toolbar>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Routes>
                                <Route path="*" element={<CurrentRoute />} />
                            </Routes>
                            <Tabs value={currentTab} centered>
                                <Tab label="Mis Tareas" value="/task_list" to="/task_list" component={Link} />
                                <Tab label="Tareas Completadas" value="/completed_tasks" to="/completed_tasks" component={Link} />
                            </Tabs>
                        </Box>
                    </AppBar>
                    <Toolbar />
                </Box>
                <Outlet />
            </Fragment>
        );
    }
    return (
        <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
            unlogged
        </Typography>
    );
}

/**
 * PARA DESPUES ;)
 */
// {
//     userData.isAdmin ?
//         <Container maxWidth="xl">
//             <Grid container direction="column" justifyContent="center" alignItems="center">
//                 <Tabs value={currentTab}
//                     variant="scrollable"
//                     scrollButtons="auto"
//                     aria-label="scrollable auto tabs example">
//                     <Tab label="Mis Tareas" value="/task_list" to="/task_list" component={Link} />
//                     <Tab label="Tareas de Usuarios" value="/users_task_list" to="/users_task_list" component={Link} />
//                     <Tab label="Tareas Completadas" value="/completed_tasks" to="/completed_tasks" component={Link} />
//                 </Tabs>
//             </Grid>
//         </Container>
//         :
//         <Tabs value={currentTab} centered>
//             <Tab label="Mis Tareas" value="/task_list" to="/task_list" component={Link} />
//             <Tab label="Tareas Completadas" value="/completed_tasks" to="/completed_tasks" component={Link} />
//         </Tabs>
// }

// {
// <Grid item>
//     {
//         userData.isAdmin ?
//             <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
//                 {userData.name} (Admin)
//             </Typography>
//             :
//             <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
//                 {userData.name} (Usuario)
//             </Typography>
//     }
// </Grid>
// }