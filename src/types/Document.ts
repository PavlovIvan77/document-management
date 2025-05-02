export enum DocumentStatus {
    UPLOADED = 'UPLOADED',
    PREPROCESSED = 'PREPROCESSED',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export interface Document {
    id: string;           // Уникальный идентификатор документа
    fileName: string;     // Имя файла
    fileUrl: string;      // URL файла для скачивания или просмотра
    uploadedAt: string;   // Дата загрузки документа в формате ISO 8601
    status: string;       // Статус документа (например, 'UPLOADED', 'PREPROCESSED', 'COMPLETED', 'FAILED')
}

  