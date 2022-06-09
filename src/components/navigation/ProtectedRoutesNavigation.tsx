import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext, Fragment, useState } from 'react'
import { UserDataContext } from '../../App';
import { matchPath, Outlet, Link, useLocation, Route, Routes, useNavigate } from 'react-router-dom';
//import { Logout } from '../../shared/Logout';
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
        await localStorage.clear();
        await history("/", { replace: true });
    };


    // Inicia config para ruteo dinamico
    const userData = useContext(UserDataContext);
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/Home', '/Home2']);
    const currentTab = routeMatch?.pattern?.path;
    // Termina config para ruteo dinamico
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        Logout();
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
                                                <MenuItem onClick={handleCloseUserMenu} >Cerrar Sesión</MenuItem>
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
                                <Tab label="Home" value="/Home" to="/Home" component={Link} />
                                <Tab label="Home2" value="/Home2" to="/Home2" component={Link} />
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
