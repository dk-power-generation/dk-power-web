import dataServiceApi from './api-config.js';

export const getFiles = async () => {
  try {
    const response = await dataServiceApi.get('/api/files');
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

export const createFile = async (formData) => {
  try {
    const response = await dataServiceApi.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating file:', error);
    throw error;
  }
};