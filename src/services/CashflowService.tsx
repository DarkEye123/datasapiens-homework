import { APIResponse } from './common';
import {
  Budget,
  Category,
  FetchEntriesInput,
  Entry,
  CreateCategoryInput,
  AddEntryToCategoryInput,
} from '../types/budget';
import { client } from './NetworkService';
import { formatDate } from '../utils/date';

interface BudgetListAPIResponse extends APIResponse {
  data: Budget[] | null;
}

interface CategoryListAPIResponse extends APIResponse {
  data: Category[] | null;
}

interface CategoryAPIResponse extends APIResponse {
  data: Category | null;
}

interface EntryAPIListResponse extends APIResponse {
  data: Entry[] | null;
}

interface EntryAPIResponse extends APIResponse {
  data: Entry | null;
}

export async function getBudgets(
  userID: number,
): Promise<BudgetListAPIResponse> {
  try {
    const response = await client.get<BudgetListAPIResponse>(
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
): Promise<CategoryListAPIResponse> {
  try {
    const response = await client.get<CategoryListAPIResponse>(
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
}: FetchEntriesInput): Promise<EntryAPIListResponse> {
  try {
    const response = await client.get<EntryAPIListResponse>(
      `/categories/${categoryID}/expenses?_sort=date`,
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
}: FetchEntriesInput): Promise<EntryAPIListResponse> {
  try {
    const response = await client.get<EntryAPIListResponse>(
      `/categories/${categoryID}/incomes?_sort=date`,
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

export async function createCategory({
  budgetID,
  payload,
}: CreateCategoryInput): Promise<CategoryAPIResponse> {
  try {
    let response = await client.post<CategoryAPIResponse>(`/categories/`, {
      budgetId: budgetID,
      name: payload.categoryName,
    });
    const category = response.data.data as Category;

    if (payload.entry) {
      const isExpense = payload.type === 'expense';
      const type = isExpense ? 'expenses' : 'incomes';
      const response = await client.post<EntryAPIResponse>(`/${type}/`, {
        categoryId: category.id,
        date: formatDate(payload.entry.date),
        value: payload.entry.value,
      });
      const entry = response.data.data as Entry;
      category.expenses = [];
      category.incomes = [];
      if (isExpense) {
        category.expenses.push(entry);
      } else category.incomes.push(entry);
    }

    return { data: category, errors: null };
  } catch (err) {
    console.log('category err', err);
    return { data: null, errors: err };
    // return makeMediaError(err) || makeNetworkError(err);
  }
}

export async function addEntryToCategory({
  categoryID,
  payload,
}: AddEntryToCategoryInput): Promise<EntryAPIResponse> {
  try {
    const isExpense = payload.type === 'expense';
    const type = isExpense ? 'expenses' : 'incomes';
    const response = await client.post<EntryAPIResponse>(`/${type}/`, {
      categoryId: categoryID,
      date: formatDate(payload.entry!.date),
      value: payload.entry!.value,
    });
    const entry = response.data.data as Entry;
    return { data: entry, errors: null };
  } catch (err) {
    console.log('add entry to category err', err);
    return { data: null, errors: err };
    // return makeMediaError(err) || makeNetworkError(err);
  }
}
