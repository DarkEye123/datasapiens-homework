import { Category, DonutGraphCategory } from '../../../types/budget';

export function donutDataTransformer(data: Category[]): DonutGraphCategory[] {
  return data.map((c) => ({
    id: c.name,
    label: c.name,
    value: c.expenses.length + c.incomes.length,
    category: c,
  }));
}
