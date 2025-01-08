import dataService from './api-config.js';

export const getFiles = () => dataService.get('/api/files');
export const createFile = (file) => dataService.post('/api/files', file);