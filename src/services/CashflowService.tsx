import { APIResponse } from './common';
import { Budget, FetchBudgetsInput } from '../types/budget';
import { client } from './NetworkService';

interface BudgetAPIResponse extends APIResponse {
  data: Budget[] | null;
}

export async function getBudgets({
  userId,
}: FetchBudgetsInput): Promise<BudgetAPIResponse> {
  try {
    const response = await client.get<BudgetAPIResponse>(
      `/users/${userId}/budgets`,
    );
    const { data } = response.data;
    return { data, errors: null };
  } catch (err) {
    console.log('budget err');
    return { data: null, errors: err };
    // return makeMediaError(err) || makeNetworkError(err);
  }
}
