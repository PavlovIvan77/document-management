import axios from 'axios';

interface S3Config {
    bucketName: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
}

interface UploadResponse {
    success: boolean;
    message: string;
    fileUrl?: string;
}

export const s3Service = {
    config: {
        bucketName: 'documents',
        region: 'us-east-1',
        accessKeyId: 'admin',
        secretAccessKey: 'password',
    } as S3Config,

    async uploadFile(file: File): Promise<UploadResponse> {
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await axios.post('http://localhost:8080/api/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            return {
                success: true,
                message: response.data || 'File uploaded successfully',
                fileUrl: undefined, // Можно дополнить, если бэк возвращает URL
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to upload file',
            };
        }
    }
    ,

    async getPresignedUrl(fileName: string, fileType: string): Promise<{ uploadUrl: string; key: string }> {
        try {
            const response = await axios.post('http://localhost:8000/api/documents/upload', {
                fileName,
                fileType,
            });
            return response.data;
        } catch (error) {
            console.error('Error getting presigned URL:', error);
            throw new Error('Failed to get presigned URL');
        }
    },

    

    async getFileUrl(key: string): Promise<string> {
        try {
            const response = await axios.get(`http://localhost:8000/api/documents/${key}/url`);
            return response.data.url;
        } catch (error) {
            console.error('Error getting file URL:', error);
            throw new Error('Failed to get file URL');
        }
    },

    async listFiles(): Promise<{ key: string; url: string }[]> {
        try {
            const response = await axios.get('http://localhost:8000/api/documents');
            return response.data;
        } catch (error) {
            console.error('Error listing files:', error);
            throw new Error('Failed to list files');
        }
    }
}; 