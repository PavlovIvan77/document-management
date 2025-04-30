import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3',
            light: '#21CBF3',
            dark: '#1976D2',
        },
        secondary: {
            main: '#90CAF9',
            light: '#E3F2FD',
            dark: '#42A5F5',
        },
        background: {
            default: 'linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%)',
            paper: 'rgba(255, 255, 255, 0.9)',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#2196F3',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#2196F3',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#2196F3',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#2196F3',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#2196F3',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#2196F3',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                    },
                },
                outlined: {
                    borderColor: '#2196F3',
                    color: '#2196F3',
                    '&:hover': {
                        background: 'rgba(33, 150, 243, 0.1)',
                        borderColor: '#1976D2',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 'bold',
                    color: '#2196F3',
                    fontSize: '1.1rem',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        background: 'rgba(33, 150, 243, 0.1)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
}); 