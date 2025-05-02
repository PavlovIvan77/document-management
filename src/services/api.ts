import axios from 'axios';
import { Document } from '../types/Document';
import { Result } from '../types/Result';

const UPLOAD_API_URL = 'http://localhost:8080/api/documents';

export const documentService = {
  getUploadedDocuments: async (): Promise<Document[]> => {
    try {
      console.log('Making GET request to:', UPLOAD_API_URL);
      const response = await axios.get(UPLOAD_API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response from getUploadedDocuments:', response.data);

      if (!Array.isArray(response.data)) {
        console.error('Response data is not an array:', response.data);
        return [];
      }

      // Сохраняем оригинальный fileUrl как имя файла
      const documents = response.data.map((doc: Document) => ({
        ...doc,
        fileUrl: doc.fileUrl, // Оставляем fileUrl без изменений (имя файла, например, 66fc410a-2b47-4fdf-af62-1eb870f2a9c6-a_1_2.jpg)
      }));

      console.log('Processed documents:', documents);
      return documents;
    } catch (error: any) {
      console.error('Error fetching uploaded documents:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        request: error.request,
        config: error.config,
      });
      return [];
    }
  },

  getResults: async (): Promise<Result[]> => {
    const response = await axios.get('http://localhost:8081/api/result');
    return response.data;
  },
};