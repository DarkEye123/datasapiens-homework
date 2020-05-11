import {
  Category,
  DonutGraphCategory,
  BarGraphEntry,
  Entry,
} from '../types/budget';

function donutDataTransformer(
  data: Category | Category[],
): DonutGraphCategory | DonutGraphCategory[] {
  if (Array.isArray(data)) {
    return data.map((c) => ({
      id: c.name,
      label: c.name,
      value: c.expenses.length + c.incomes.length,
      category: c,
    }));
  } else {
    return {
      id: data.name,
      label: data.name,
      value: data.expenses.length + data.incomes.length,
      category: data,
    };
  }
}

function initIfNecessary(id: string, entries: Record<string, BarGraphEntry>) {
  if (!(id in entries)) {
    entries[id] = {
      id,
      get transactions() {
        return this.entries.length;
      },
      get transactionsIncome() {
        return this.incomes.length;
      },
      get transactionsExpenses() {
        return this.expenses.length;
      },
      get 'total income'() {
        return this.incomes.reduce((acc, val) => acc + val.value, 0);
      },
      get 'total expenses'() {
        return this.expenses.reduce((acc, val) => acc - val.value, 0);
      },
      expenses: [],
      incomes: [],
      get entries() {
        return this.incomes.concat(this.expenses);
      },
    };
  }
}

function barDataTransformer({ expenses, incomes }: Category): BarGraphEntry[] {
  const entries: Record<string, BarGraphEntry> = {};
  let entry: Entry;
  let id: string;
  for (let x = 0; x < Math.max(incomes.length, expenses.length); ++x) {
    if (x < incomes.length) {
      entry = incomes[x];
      id = entry.date.toString();
      initIfNecessary(id, entries);
      entries[id].incomes.push(entry);
    }
    if (x < expenses.length) {
      entry = expenses[x];
      id = entry.date.toString();
      initIfNecessary(id, entries);
      entries[id].expenses.push(entry);
    }
  }
  return Object.values(entries);
}

function isMobile() {
  return 'ontouchstart' in document.documentElement;
}

export { donutDataTransformer, barDataTransformer, isMobile };
