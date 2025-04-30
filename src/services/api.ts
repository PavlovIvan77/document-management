import axios from 'axios';
import { Document } from '../types/Document';

const UPLOAD_API_URL = 'http://localhost:8080/api/documents';
const PROCESSED_API_URL = 'http://localhost:8080/api/documents/result';

export const documentService = {
    getUploadedDocuments: async (): Promise<Document[]> => {
        const response = await axios.get(UPLOAD_API_URL);
        return response.data;
    },

    getProcessedDocuments: async (): Promise<Document[]> => {
        const response = await axios.get(PROCESSED_API_URL);
        return response.data;
    }
}; 