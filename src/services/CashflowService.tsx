import { APIResponse } from './common';
import { Budget, Category, FetchEntriesInput, Entry } from '../types/budget';
import { client } from './NetworkService';

interface BudgetAPIResponse extends APIResponse {
  data: Budget[] | null;
}

interface CategoryAPIResponse extends APIResponse {
  data: Category[] | null;
}

interface EntryAPIResponse extends APIResponse {
  data: Entry[] | null;
}

export async function getBudgets(userID: number): Promise<BudgetAPIResponse> {
  try {
    const response = await client.get<BudgetAPIResponse>(
      `/users/${userID}/budgets`,
    );
    const { data } = response.data;
    return { data, errors: null };
  } catch (err) {
    console.log('budget err');
    return { data: null, errors: err };
    // return makeMediaError(err) || makeNetworkError(err);
  }
}

export async function getCategories(
  budgetID: number,
): Promise<CategoryAPIResponse> {
  try {
    const response = await client.get<CategoryAPIResponse>(
      `/budgets/${budgetID}/categories`,
    );
    const { data } = response.data;
    return { data, errors: null };
  } catch (err) {
    console.log('category err');
    return { data: null, errors: err };
    // return makeMediaError(err) || makeNetworkError(err);
  }
}

export async function getExpensesForCategory({
  categoryID,
}: FetchEntriesInput): Promise<EntryAPIResponse> {
  try {
    const response = await client.get<EntryAPIResponse>(
      `/categories/${categoryID}/expenses`,
    );
    const { data } = response.data;
    return { data, errors: null };
  } catch (err) {
    console.log('expenses err');
    return { data: null, errors: err };
    // return makeMediaError(err) || makeNetworkError(err);
  }
}

export async function getIncomeForCategory({
  categoryID,
}: FetchEntriesInput): Promise<EntryAPIResponse> {
  try {
    const response = await client.get<EntryAPIResponse>(
      `/categories/${categoryID}/incomes`,
    );
    const { data } = response.data;
    return { data, errors: null };
  } catch (err) {
    console.log('incomes err');
    return { data: null, errors: err };
    // return makeMediaError(err) || makeNetworkError(err);
  }
}

/**
 * Wrapper around incomes and expenses for specific category
 *
 * @returns [expenses, incomes]
 */
export async function getEntriesForCategory(arg: FetchEntriesInput) {
  return await Promise.all([
    getExpensesForCategory(arg),
    getIncomeForCategory(arg),
  ]);
}
