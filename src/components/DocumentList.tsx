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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { Document, DocumentStatus } from '../types/Document';
import { Result } from '../types/Result';
import { documentService } from '../services/api';
import moment from 'moment';

const getStatusColor = (status: string) => {
  console.log('Status received:', status);
  switch (status) {
    case DocumentStatus.UPLOADED:
      return 'default';
    case DocumentStatus.PREPROCESSED:
      return 'info';
    case DocumentStatus.COMPLETED:
      return 'success';
    case DocumentStatus.FAILED:
      return 'error';
    default:
      console.warn('Unknown status:', status);
      return 'default';
  }
};

export const DocumentList: React.FC = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');

        const [uploaded, results] = await Promise.all([
          documentService.getUploadedDocuments().catch((error: any) => {
            console.error('Error in getUploadedDocuments:', error);
            return [];
          }),
          documentService.getResults().catch((error: any) => {
            console.error('Error in getResults:', error);
            return [];
          }),
        ]);

        console.log('Uploaded Documents:', uploaded);
        console.log('Results:', results);

        setUploadedDocuments(uploaded);
        setResults(results);
      } catch (error: any) {
        console.error('Unexpected error in fetchData:', {
          message: error.message,
          response: error.response,
          request: error.request,
          config: error.config,
        });
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated uploadedDocuments:', uploadedDocuments);
    console.log('Updated results:', results);
  }, [uploadedDocuments, results]);

  // Таблица для загруженных документов (с кнопкой "Скачать")
  const UploadedDocumentTable: React.FC<{ documents: Document[] }> = ({ documents }) => {
    const handleDownloadClick = async (fileUrl: string, fileName: string) => {
      console.log('Download button clicked, fileUrl:', fileUrl, 'fileName:', fileName);
      if (!fileUrl || fileUrl === '#') {
        console.warn('Invalid fileUrl for download:', fileUrl);
        alert('Файл недоступен для скачивания');
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8080/api/documents/download?fileName=${encodeURIComponent(fileUrl)}`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading file:', error);
        alert('Не удалось скачать файл. Проверьте доступность файла в MinIO.');
      }
    };

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Загруженные документы
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
              {documents.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Нет документов
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
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
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDownloadClick(doc.fileUrl, doc.fileName)}
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
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Таблица для результатов обработки (без кнопки "Скачать")
  const ResultTable: React.FC<{ results: Result[] }> = ({ results }) => {
    const handleOpenDialog = (result: Result) => {
      setSelectedResult(result);
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedResult(null);
    };

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Обработанные документы
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>URL файла</TableCell>
                <TableCell>Извлечённый текст (предпросмотр)</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дата обработки</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Нет результатов
                  </TableCell>
                </TableRow>
              ) : (
                results.map((result) => {
                  const previewTexts = result.resultData.slice(0, 3);

                  return (
                    <TableRow key={result.fileUrl}>
                      <TableCell>{result.fileUrl}</TableCell>
                      <TableCell>
                        <Box>
                          {previewTexts.map((item, index) => (
                            <Box key={index} sx={{ mb: 1 }}>
                              <Typography variant="body2">
                                <strong>Текст:</strong> {item.text}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                <strong>Тип:</strong> {item.label}, <strong>Уверенность:</strong>{' '}
                                {(item.confidence * 100).toFixed(2)}%
                              </Typography>
                              {index < previewTexts.length - 1 && <Divider sx={{ my: 1 }} />}
                            </Box>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={result.status}
                          color={getStatusColor(result.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {moment(result.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenDialog(result)}
                        >
                          Показать полный текст
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Модальное окно для полного текста */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Полный текст для {selectedResult?.fileUrl}</DialogTitle>
          <DialogContent>
            {selectedResult && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Текст</TableCell>
                      <TableCell>Тип</TableCell>
                      <TableCell>Уверенность</TableCell>
                      <TableCell>Координаты (bbox)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedResult.resultData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.text}</TableCell>
                        <TableCell>{item.label}</TableCell>
                        <TableCell>{(item.confidence * 100).toFixed(2)}%</TableCell>
                        <TableCell>[{item.bbox.join(', ')}]</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Box>
      <UploadedDocumentTable documents={uploadedDocuments} />
      <ResultTable results={results} />
    </Box>
  );
};