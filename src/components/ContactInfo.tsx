import React from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Email,
    Phone,
    LocationOn,
    AccessTime,
} from '@mui/icons-material';

export const ContactInfo: React.FC = () => {
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Контактная информация
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Email color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Почта"
                                    secondary="pavlovivan7733@gmail.com"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Phone color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Номер телефона"
                                    secondary="+7-929-594-51-71"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOn color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Адрес"
                                    secondary="г.Караганда, ул. Пушкина, д.Колотушкина"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <AccessTime color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Время работы"
                                    secondary="Как получится"
                                />
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Информация
                        </Typography>
                        <Typography paragraph>
                            Работали в команде над кейсом компании T1 в весеннем лагере МАИ МатМод 2025
                        </Typography>
                        <Typography paragraph>
                            По всем вопросам не связывайтесь с нами, мы ничего не знаем и не решим ваши проблемы
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}; 