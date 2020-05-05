import { client } from './NetworkService';
import { User, LoginInput } from '../types/users';
import { AppError } from '../types/errors';

interface UserAPIResponse {
  data: User[] | User;
  errors: AppError[];
}

export async function login(args: LoginInput): Promise<UserAPIResponse> {
  const response = await client.post<UserAPIResponse>('/login', args);
  return response.data;
}
