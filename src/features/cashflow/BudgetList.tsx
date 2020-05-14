import { connect } from 'react-redux';
import { fetchBudgets, createBudget, deleteBudget } from './cashflowSlice';
import { RootState } from '..';
import { CreateBudgetInput } from '../../types/budget';

const mapDispatchToProps = {
  fetchBudgets,
  createBudget,
  deleteBudget,
};

interface DispatchShape {
  fetchBudgets: (userID: number) => void;
  createBudget: (args: CreateBudgetInput) => void;
  deleteBudget: (id: number) => void;
}

const mapStateToProps = (state: RootState) => ({
  budgets: state.cashflow.budgets,
  loading: state.cashflow.loading,
  user: state.users.user,
});

export type BudgetsProps = ReturnType<typeof mapStateToProps> & DispatchShape;

export default connect(mapStateToProps, mapDispatchToProps);
