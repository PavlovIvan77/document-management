import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { theme } from './theme';
import { DocumentForm } from './components/DocumentForm';
import { DocumentList } from './components/DocumentList';
import { DocumentUpload } from './components/DocumentUpload';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { AboutUs } from './components/AboutUs';

const Navigation: React.FC = () => {
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                    color: 'white',
                    borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
                }}
            >
                Главная
            </Button>
            <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{
                    color: 'white',
                    borderBottom: location.pathname === '/about' ? '2px solid white' : 'none',
                }}
            >
                О нас
            </Button>
            <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{
                    color: 'white',
                    borderBottom: location.pathname === '/contact' ? '2px solid white' : 'none',
                }}
            >
                Контакты
            </Button>
        </Box>
    );
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box
                    sx={{
                        minHeight: '100vh',
                        background: theme.palette.background.default,
                    }}
                >
                    <AppBar 
                        position="fixed" 
                        sx={{ 
                            height: '85px',
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                    >
                        <Toolbar sx={{ height: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '15%',
                                    alignItems: 'center',
                                    mr: 4,
                                }}
                            >
                                <Box
                                    component="a"
                                    href="https://mai.ru"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    <Box
                                        component="img"
                                        src="/images/MAI.png"
                                        alt="Лого МАИ"
                                        sx={{
                                            width: '65px',
                                            height: '65px',
                                            objectFit: 'contain',
                                            opacity: 0.8,
                                            transition: 'opacity 0.3s ease',
                                            '&:hover': {
                                                opacity: 1,
                                            },
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Box>
                                <Box
                                    component="a"
                                    href="https://t1.ru"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    <Box
                                        component="img"
                                        src="/images/T1.png"
                                        alt="Лого Т1"
                                        sx={{
                                            width: '65px',
                                            height: '65px',
                                            objectFit: 'contain',
                                            opacity: 0.8,
                                            transition: 'opacity 0.3s ease',
                                            '&:hover': {
                                                opacity: 1,
                                            },
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Box>
                                <Box
                                    component="img"
                                    src="/images/Nerv.png"
                                    alt="Наше Лого"
                                    sx={{
                                        width: '65px',
                                        height: '65px',
                                        objectFit: 'contain',
                                        opacity: 0.8,
                                        transition: 'opacity 0.3s ease',
                                        '&:hover': {
                                            opacity: 1,
                                        },
                                    }}
                                />
                            </Box>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    color: 'white',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                Система управления документами
                            </Typography>
                            <Navigation />
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ mt: '85px' }}>
                        <Container
                            maxWidth="lg"
                            sx={{
                                py: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 'calc(100vh - 85px)',
                            }}
                        >
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 4,
                                                width: '100%',
                                                maxWidth: '800px',
                                                animation: 'fadeIn 0.5s ease-out',
                                            }}
                                        >
                                            <Typography
                                                variant="h4"
                                                component="h1"
                                                align="center"
                                                sx={{
                                                    color: 'black',
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                }}
                                            >
                                                Документы
                                            </Typography>
                                            <DocumentUpload />
                                            <Box sx={{ mt: 4 }}>
                                                <DocumentList />
                                            </Box>
                                        </Box>
                                    }
                                />
                                <Route path="/about" element={<AboutUs />} />
                                <Route
                                    path="/contact"
                                    element={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 4,
                                                width: '100%',
                                                maxWidth: '800px',
                                                animation: 'fadeIn 0.5s ease-out',
                                            }}
                                        >
                                            <ContactForm />
                                            <ContactInfo />
                                        </Box>
                                    }
                                />
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
