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
            // Формируем ключ файла с уникальным идентификатором
            const fileKey = `${Date.now()}-${file.name}`;
            
            // Формируем URL для загрузки в S3
            const s3Url = `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/${fileKey}`;
            
            // Загружаем файл напрямую в S3
            await axios.put(s3Url, file, {
                headers: {
                    'Content-Type': file.type,
                    'x-amz-acl': 'public-read',
                },
                auth: {
                    username: this.config.accessKeyId,
                    password: this.config.secretAccessKey,
                },
            });

            // Формируем публичный URL файла
            const fileUrl = `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/${fileKey}`;

            // Отправляем метаинформацию на бэкенд
            const notifyResponse = await axios.post('http://localhost:8080/api/documents/notify', {
                fileUrl,
                fileName: file.name,
            });

            return {
                success: true,
                message: notifyResponse.data.message || 'File uploaded successfully',
                fileUrl,
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to upload file',
            };
        }
    },

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