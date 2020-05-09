import axios from 'axios';

export interface NetworkError {
  message: string;
  id: number;
  // consumed: boolean
}

export const client = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
