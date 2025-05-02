import React from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Avatar,
} from '@mui/material';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    description: string;
    imagePath: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Павлов Иван',
        role: 'Frontend разработчик',
        description: 'Сделал данный сайт, контролировал Miro для работы команды, делал презентацию',
        imagePath: '/images/member1.jpg',
    },
    {
        id: 2,
        name: 'Медведев Никита',
        role: 'ML разработчик, Тимлид',
        description: 'Разработали  пайплайн для распознавания текста в банковских документах. Для устранения перекрытий между bbox используется NMS (non-maximum suppression) на основе confidence от CLIP',
        imagePath: '/images/member2.jpg',
    },
    {
        id: 3,
        name: 'Медведев Егор',
        role: 'Backend разработчик',
        description: 'Организовал работу хранилища и передачу данных между сервисами',
        imagePath: '/images/member3.jpg',
    },
    {
        id: 4,
        name: 'Щапов Андрей',
        role: 'Аналитик',
        description: 'Автоматизировал приведение документов к единому формату',
        imagePath: '/images/member4.jpg',
    },
];

export const AboutUs: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography
                variant="h3"
                component="h1"
                align="center"
                gutterBottom
                sx={{
                    color: 'black',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    mb: 6,
                }}
            >
                О нас
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {teamMembers.map((member) => (
                    <Paper
                        key={member.id}
                        elevation={3}
                        sx={{
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Avatar
                            src={member.imagePath}
                            alt={member.name}
                            sx={{
                                width: 200,
                                height: 200,
                                border: '4px solid #1976d2',
                            }}
                        />
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                {member.name}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="primary"
                                gutterBottom
                                sx={{ mb: 2 }}
                            >
                                {member.role}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {member.description}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}; 