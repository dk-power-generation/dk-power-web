import dataServiceApi from './api-config.js';

export const getValuesByCategory = async (category) => {
  try {
    const response = await dataServiceApi.get(`/api/categories/${category}/values`);
    return response.data;
  } catch (error) {
    console.error('Error fetching values:', error);
    throw error;
  }
};

export const createFile = async (fileData) => {
  try {
    const response = await dataServiceApi.post('/api/files', fileData);
    return response.data;
  } catch (error) {
    console.error('Error creating file:', error);
    throw error;
  }
};