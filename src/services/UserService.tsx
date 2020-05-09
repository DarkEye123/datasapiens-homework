import { client } from './NetworkService';
import { User, LoginInput } from '../types/users';
import { APIResponse } from './common';

interface UserAPIResponse extends APIResponse {
  data: User[] | User | null;
}

export async function login(args: LoginInput): Promise<UserAPIResponse> {
  const response = await client.post<UserAPIResponse>('/login', args);
  return response.data;
}

export async function autologin(): Promise<UserAPIResponse> {
  const response = await client.post<UserAPIResponse>('/login?auto=true');
  return response.data;
}
