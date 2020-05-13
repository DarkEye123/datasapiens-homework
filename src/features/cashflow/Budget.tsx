import { connect } from 'react-redux';
import { fetchBudget, createCategory } from './cashflowSlice';
import { RootState } from '..';
import { CreateCategoryInput } from '../../types/budget';

const mapDispatchToProps = {
  fetchBudget,
  createCategory,
};

interface DispatchShape {
  fetchBudget: (budgetID: number) => void;
  createCategory: (args: CreateCategoryInput) => void;
}

const mapStateToProps = (state: RootState) => ({
  budget: state.cashflow.budget,
  loading: state.cashflow.loading,
  user: state.users.user,
  taskDone: state.cashflow.taskDone,
});

export type BudgetProps = ReturnType<typeof mapStateToProps> & DispatchShape;

export default connect(mapStateToProps, mapDispatchToProps);
