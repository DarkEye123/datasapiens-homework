import { client } from './NetworkService';
import { User, LoginInput } from '../types/users';
import { APIResponse } from './common';

interface UserListAPIResponse extends APIResponse {
  data: User[] | null;
}

interface UserAPIResponse extends APIResponse {
  data: User | null;
}

export async function login(args: LoginInput): Promise<UserAPIResponse> {
  const response = await client.post<UserAPIResponse>('/login', args);
  return response.data;
}

export async function logout() {
  await client.post('/logout');
}

export async function autologin(): Promise<UserAPIResponse> {
  const response = await client.post<UserAPIResponse>('/login?auto=true');
  return response.data;
}

export async function getAppUsers(): Promise<UserListAPIResponse> {
  const response = await client.get<UserListAPIResponse>('/users');
  return response.data;
}
