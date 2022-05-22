import axios from 'axios';
import { QueryClient } from 'react-query';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

const queryClient = new QueryClient();

export { apiClient, queryClient };
