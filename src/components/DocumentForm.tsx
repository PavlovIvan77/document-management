import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
} from '@mui/material';
import axios from 'axios';

export interface Document {
    id: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
    status: string;
}

export const DocumentForm: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showTable, setShowTable] = useState(false);

    const fetchDocuments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8000/api/documents/');
            setDocuments(response.data);
            setShowTable(true);
        } catch (err) {
            setError('Ошибка при загрузке файлов');
            console.error('Ошибка при загрузке файлов:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ru-RU');
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'Завершено';
            case 'PROCESSING':
                return 'В обработке';
            case 'FAILED':
                return 'Ошибка';
            default:
                return status;
        }
    };

    return (
        <Box 
            sx={{ 
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
            }}
        >
            <Button 
                variant="contained" 
                onClick={fetchDocuments}
                sx={{ 
                    mb: 3,
                    width: '300px',
                    height: '50px',
                    fontSize: '1.1rem',
                }}
            >
                Загрузить файлы
            </Button>

            {loading && (
                <Typography sx={{ 
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                }}>
                    Загрузка...
                </Typography>
            )}
            {error && (
                <Typography sx={{ 
                    color: '#f44336',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                }}>
                    {error}
                </Typography>
            )}

            {showTable && documents.length > 0 && (
                <TableContainer 
                    component={Paper}
                    sx={{
                        width: '100%',
                        animation: 'fadeIn 0.5s ease-out',
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Название файла</TableCell>
                                <TableCell>Дата загрузки</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow 
                                    key={doc.id}
                                    sx={{
                                        '&:hover': {
                                            background: 'rgba(33, 150, 243, 0.1)',
                                        },
                                    }}
                                >
                                    <TableCell>{doc.fileName}</TableCell>
                                    <TableCell>{formatDate(doc.uploadedAt)}</TableCell>
                                    <TableCell>{getStatusText(doc.status)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            href={doc.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                borderRadius: '10px',
                                                borderColor: '#2196F3',
                                                color: '#2196F3',
                                                '&:hover': {
                                                    background: 'rgba(33, 150, 243, 0.1)',
                                                    borderColor: '#1976D2',
                                                },
                                            }}
                                        >
                                            Просмотр
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}; 