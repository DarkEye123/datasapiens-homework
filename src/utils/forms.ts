import { Category, Entry } from '../types/budget';

function prepareCategoryData(
  categoryName: string,
  entry: Pick<Entry, 'date' | 'value'>,
): Omit<Category, 'id'> {
  let value = entry.value;
  const isExpense = value < 0;
  if (isExpense) {
    value = Math.abs(value);
  }

  const _entry = { date: entry.date, value };

  return {
    name: categoryName,
    expenses: (isExpense ? [_entry] : []) as Entry[],
    incomes: (!isExpense ? [_entry] : []) as Entry[],
  };
}

export { prepareCategoryData };
