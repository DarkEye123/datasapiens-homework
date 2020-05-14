type Filter = {
  column: string;
  text: string;
};

export interface Budget {
  id: number;
  categories: Category[];
}

export interface FetchEntriesInput {
  categoryID: number;
}

export interface Entry {
  id: number;
  categoryId: number;
  date: Date;
  value: number;
}

export interface BarGraphEntry {
  id: string;
  entries: Entry[];
  'total income': number;
  'total expenses': number;
  expenses: Entry[];
  incomes: Entry[];
  transactions: number;
  transactionsIncome: number;
  transactionsExpenses: number;
}

export interface Category {
  id: number;
  name: string;
  expenses: Entry[];
  incomes: Entry[];
}

export interface CreateCategoryPayload extends CategoryInputPayload {
  categoryName: string;
}

export type CreateCategoryInput = {
  payload: CreateCategoryPayload;
  budgetID: number;
};

export interface CategoryInputPayload {
  entry?: Pick<Entry, 'value' | 'date'>;
  type?: 'income' | 'expense';
}

export type AddEntryToCategoryInputPayload = CategoryInputPayload;

export interface AddEntryToCategoryInput {
  payload: CategoryInputPayload;
  categoryID: number;
}

export interface DonutGraphCategory {
  id: string;
  label: string;
  value: number;
  category: Category;
}

export interface FetchCashflowInput {
  budgetId: number;
  page: number;
  perPage: number;
  sortBy?: string;
  orderDesc?: boolean;
  filterBy?: Filter;
}
