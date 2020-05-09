import { connect } from 'react-redux';
import { fetchBudgets } from './cashflowSlice';
import { RootState } from '..';

const mapDispatchToProps = {
  fetchBudgets,
};

interface DispatchShape {
  fetchBudgets: (userID: number) => void;
}

const mapStateToProps = (state: RootState) => ({
  budgets: state.cashflow.budgets,
  loading: state.cashflow.loading,
  user: state.users.user,
});

export type BudgetsProps = ReturnType<typeof mapStateToProps> & DispatchShape;

export default connect(mapStateToProps, mapDispatchToProps);
