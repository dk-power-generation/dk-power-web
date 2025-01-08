import oldPidProjectApi from './api-config';

export const getFiles = () => oldPidProjectApi.get('/api/files');