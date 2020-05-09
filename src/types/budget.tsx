type Filter = {
  column: string;
  text: string;
};

export interface Budget {
  id: number;
}

export interface FetchBudgetsInput {
  userId: number;
}

export interface FetchCashflowInput {
  budgetId: number;
  page: number;
  perPage: number;
  sortBy?: string;
  orderDesc?: boolean;
  filterBy?: Filter;
}