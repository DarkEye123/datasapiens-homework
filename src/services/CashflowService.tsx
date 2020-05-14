import { APIResponse } from './common';
import {
  Budget,
  Category,
  FetchEntriesInput,
  Entry,
  CreateCategoryInput,
  AddEntryToCategoryInput,
  CreateBudgetInput,
} from '../types/budget';
import { client } from './NetworkService';
import { formatDate } from '../utils/date';

interface BudgetListAPIResponse extends APIResponse {
  data: Budget[] | null;
}

interface BudgetAPIResponse extends APIResponse {
  data: Budget | null;
}

interface CategoryListAPIResponse extends APIResponse {
  data: Category[] | null;
}

interface CategoryAPIResponse extends APIResponse {
  data: Category | null;
}

interface EntryListAPIResponse extends APIResponse {
  data: Entry[] | null;
}

interface EntryAPIResponse extends APIResponse {
  data: Entry | null;
}

export async function getBudgets(
  userID: number,
): Promise<BudgetListAPIResponse> {
  try {
    const normalBudgetsResponse = await client.get<BudgetListAPIResponse>(
      `/users/${userID}/budgets`,
    );
    const { data: budgets } = normalBudgetsResponse.data;
    const sharedBudgetsResponse = await client.get<BudgetListAPIResponse>(
      `/users/${userID}/sharedBudgets`,
    );
    const { data: sharedBudgets } = sharedBudgetsResponse.data;
    const sharedPromises = await Promise.all(
      sharedBudgets!.map((b) =>
        client.get<BudgetListAPIResponse>(`/budgets/${(b as any).budgetId}`),
      ),
    );

    let sharedBudgetList = sharedPromises.flatMap(
      (element) => element.data.data || [],
    );
    sharedBudgetList = sharedBudgetList.map((budget) => ({
      ...budget,
      isShared: true,
    }));

    const combined = budgets?.concat(sharedBudgetList);
    return { data: combined!, errors: null };
  } catch (err) {
    console.log('budget err');
    return { data: null, errors: err };
    // return makeAppError(err) || makeNetworkError(err);
  }
}

export async function createBudget(
  args: CreateBudgetInput,
): Promise<BudgetAPIResponse> {
  try {
    const isShared = args.userList.length >= 1;

    const payload: any = {
      name: args.budgetName,
    };

    if (!isShared) {
      payload.userId = args.owner;
    }

    const response = await client.post<BudgetAPIResponse>('/budgets', payload);
    const budget = response.data.data;
    budget!.isShared = isShared;
    if (isShared) {
      args.userList.push(args.owner);
      args.userList.forEach((userID) => {
        client.post('/sharedBudgets', {
          budgetId: budget?.id,
          userId: userID,
        });
      });
    }
    return { data: budget, errors: null };
  } catch (err) {
    console.log(err);
    return { data: null, errors: err };
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
    // return makeAppError(err) || makeNetworkError(err);
  }
}

export async function getExpensesForCategory({
  categoryID,
}: FetchEntriesInput): Promise<EntryListAPIResponse> {
  try {
    const response = await client.get<EntryListAPIResponse>(
      `/categories/${categoryID}/expenses?_sort=date`,
    );
    const { data } = response.data;
    return { data, errors: null };
  } catch (err) {
    console.log('expenses err');
    return { data: null, errors: err };
    // return makeAppError(err) || makeNetworkError(err);
  }
}

export async function getIncomeForCategory({
  categoryID,
}: FetchEntriesInput): Promise<EntryListAPIResponse> {
  try {
    const response = await client.get<EntryListAPIResponse>(
      `/categories/${categoryID}/incomes?_sort=date`,
    );
    const { data } = response.data;
    return { data, errors: null };
  } catch (err) {
    console.log('incomes err');
    return { data: null, errors: err };
    // return makeAppError(err) || makeNetworkError(err);
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
    // return makeAppError(err) || makeNetworkError(err);
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
    // return makeAppError(err) || makeNetworkError(err);
  }
}
