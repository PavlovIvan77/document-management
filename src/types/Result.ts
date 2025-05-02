export interface Result {
    id?: string;
    fileUrl: string;
    resultData: ResultItem[];
    status: string;
    createdAt: string;
  }
  
  export interface ResultItem {
    text: string;
    bbox: number[];
    label: string;
    confidence: number;
  }