import { AppError } from '../types/errors';

export interface APIResponse {
  data: any[] | any;
  errors?: AppError[] | null;
}
