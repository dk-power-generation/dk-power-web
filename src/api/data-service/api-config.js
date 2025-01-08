import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081'; // Replace with your Spring Boot API URL

const dataServiceApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default dataServiceApi;