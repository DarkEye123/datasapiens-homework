import { connect } from 'react-redux';
import {
  fetchBudget,
  createCategory,
  addEntryToCategory,
} from './cashflowSlice';
import { RootState } from '..';
import {
  CreateCategoryInput,
  AddEntryToCategoryInput,
} from '../../types/budget';

const mapDispatchToProps = {
  fetchBudget,
  createCategory,
  addEntryToCategory,
};

interface DispatchShape {
  fetchBudget: (budgetID: number) => void;
  createCategory: (args: CreateCategoryInput) => void;
  addEntryToCategory: (args: AddEntryToCategoryInput) => void;
}

const mapStateToProps = (state: RootState) => ({
  budget: state.cashflow.budget,
  loading: state.cashflow.loading,
  user: state.users.user,
});

export type BudgetProps = ReturnType<typeof mapStateToProps> & DispatchShape;

export default connect(mapStateToProps, mapDispatchToProps);
