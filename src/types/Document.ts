export enum DocumentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export interface Document {
    id: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
    status: DocumentStatus;
} 