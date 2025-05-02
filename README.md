# Document Management System

A modern web application for managing document uploads and processing, built with React and TypeScript.

## Features

- Document upload with drag-and-drop support
- Display of uploaded and processed documents
- Contact information page
- Responsive design using Material-UI
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

1. Start the development server:

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

## API Configuration

The application is configured to work with the following API endpoints:

- Upload documents: `http://localhost:8080/api/documents`
- Get processed documents: `http://localhost:7070/api/documents`

Make sure these services are running and accessible before using the application.

## MinIO Configuration

The application is configured to use MinIO for file storage with the following settings:

```yaml
minio:
  url: http://minio:9000
  access-key: admin
  secret-key: password
  bucket: documents
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used

- React
- TypeScript
- Material-UI
- React Router
- Axios
- Moment.js
