import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Fragment, useState } from 'react'
import { matchPath, Outlet, Link, useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, CssBaseline, Toolbar } from '@mui/material';


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

export default function UnloggedNavigation() {

    const history = useNavigate();

    // Inicia config para ruteo dinamico
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/', '/register']);
    const currentTab = routeMatch?.pattern?.path;
    // Termina config para ruteo dinamico
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // Termina Config para boton menu

    return (
        <Fragment>
            <Box sx={{ width: '100%' }}>
                <CssBaseline />
                <AppBar position="fixed" color="secondary">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Routes>
                            <Route path="*" element={<CurrentRoute />} />
                        </Routes>
                        <Tabs value={currentTab} centered>
                            <Tab label="Login" value="/" to="/" component={Link} />
                            <Tab label="Registrarse" value="/register" to="/register" component={Link} />
                        </Tabs>
                    </Box>
                </AppBar>
                <Toolbar />
            </Box>
            <Outlet />
        </Fragment>
    );
}