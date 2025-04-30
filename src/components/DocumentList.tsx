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
    Chip,
    Box,
    Button,
} from '@mui/material';
import { Document, DocumentStatus } from '../types/Document';
import { documentService } from '../services/api';
import moment from 'moment';

const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
        case DocumentStatus.COMPLETED:
            return 'success';
        case DocumentStatus.PROCESSING:
            return 'warning';
        case DocumentStatus.FAILED:
            return 'error';
        default:
            return 'default';
    }
};

export const DocumentList: React.FC = () => {
    const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>([]);
    const [processedDocuments, setProcessedDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const [uploaded, processed] = await Promise.all([
                    documentService.getUploadedDocuments(),
                    documentService.getProcessedDocuments(),
                ]);
                setUploadedDocuments(uploaded);
                setProcessedDocuments(processed);
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const DocumentTable: React.FC<{ documents: Document[]; title: string }> = ({
        documents,
        title,
    }) => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя файла</TableCell>
                            <TableCell>Дата загрузки</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>{doc.fileName}</TableCell>
                                <TableCell>
                                    {moment(doc.uploadedAt).format('YYYY-MM-DD HH:mm:ss')}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={doc.status}
                                        color={getStatusColor(doc.status) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            href={doc.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ minWidth: '80px' }}
                                        >
                                            Просмотр
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            href={doc.fileUrl}
                                            download
                                            sx={{ 
                                                minWidth: '80px',
                                                backgroundColor: '#2e7d32',
                                                '&:hover': {
                                                    backgroundColor: '#1b5e20',
                                                },
                                            }}
                                        >
                                            Скачать
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    if (loading) {
        return <Typography>Загрузка...</Typography>;
    }

    return (
        <Box>
            <DocumentTable
                documents={uploadedDocuments}
                title="Загруженные документы"
            />
            <DocumentTable
                documents={processedDocuments}
                title="Обработанные документы"
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    Загрузить документы
                </Button>
            </Box>
        </Box>
    );
}; 