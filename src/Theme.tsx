/**
 * Paleta de Colores
 * https://coolors.co/f1fffa-ccfccb-96e6b3-03b1bb-258db0-464e47
 */
import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
            contrastText: '#FFFFFF',
            light: '#8a8a8a',
            dark: '#555555',
        },
        secondary: {
            main: 'rgba(220,10,84,0.94)',
            contrastText: '#f1fffa',
            dark: '#b70042',
            light: '#e23974',
        },
        divider: '#adbebf',
        error: {
            main: '#e84135',
            contrastText: '#f1fffa',
        },
        warning: {
            main: '#f1940a',
            contrastText: '#2c3531',
        },
        info: {
            main: '#2092ec',
            contrastText: '#f1fffa',
        },
        success: {
            main: '#50b554',
            contrastText: '#f1fffa',
        },
        text: {
            primary: '#f7f7f7',
            secondary: '#5a5a5a',
            disabled: '#57576f'
        },
        background: {
            default: '#000',
            paper: '#161623',
        },
    },
    typography: {
        fontSize: 12,
    },
    shape: {
        borderRadius: 50,
    },
    spacing: 8,
    transitions: {
        duration: {
            shortest: 200,
            shorter: 300,
            short: 600,
            // most basic recommended timing
            standard: 300,
            // this is to be used in complex animations
            complex: 375,
            // recommended when something is entering screen
            enteringScreen: 400,
            // recommended when something is leaving screen
            leavingScreen: 250,
        },
    },
});