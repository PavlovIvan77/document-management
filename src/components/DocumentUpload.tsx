import React, { useState, useCallback } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Paper,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import { s3Service } from '../services/s3Service';

export const DocumentUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const result = await s3Service.uploadFile(selectedFile);
            setUploadProgress(100);

            setSnackbar({
                open: true,
                message: 'Файл успешно загружен',
                severity: 'success',
            });
            setSelectedFile(null);
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Ошибка при загрузке файла',
                severity: 'error',
            });
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
        }
    }, []);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
            }}
        >
            <input
                type="file"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Paper
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    p: 4,
                    border: isDragging ? '2px dashed #2196F3' : '2px dashed #ccc',
                    backgroundColor: isDragging ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    cursor: 'pointer',
                }}
                onClick={() => fileInputRef.current?.click()}
            >
                <CloudUploadIcon sx={{ fontSize: 48, color: isDragging ? '#2196F3' : '#ccc' }} />
                <Typography variant="h6" sx={{ color: isDragging ? '#2196F3' : '#666' }}>
                    {isDragging ? 'Отпустите файл здесь' : 'Перетащите файл сюда или нажмите для выбора'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                </Typography>
            </Paper>

            {selectedFile && (
                <Paper
                    sx={{
                        p: 2,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, color: '#2196F3' }}>
                        Выбранный файл:
                    </Typography>
                    <ListItem
                        sx={{
                            border: '1px solid rgba(33, 150, 243, 0.2)',
                            borderRadius: '8px',
                            '&:hover': {
                                background: 'rgba(33, 150, 243, 0.05)',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary={selectedFile.name}
                            secondary={`Размер: ${formatFileSize(selectedFile.size)}`}
                        />
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={handleRemoveFile}
                            sx={{ color: '#f44336' }}
                            disabled={isUploading}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                    <Box sx={{ mt: 2 }}>
                        {isUploading && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <CircularProgress variant="determinate" value={uploadProgress} />
                                <Typography>
                                    {Math.round(uploadProgress)}% загружено
                                </Typography>
                            </Box>
                        )}
                        <Button
                            variant="contained"
                            onClick={handleUpload}
                            disabled={isUploading}
                            sx={{ width: '100%' }}
                        >
                            {isUploading ? 'Загрузка...' : 'Загрузить файл'}
                        </Button>
                    </Box>
                </Paper>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}; 