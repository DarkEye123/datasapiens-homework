import { connect } from 'react-redux';
import { fetchBudget } from './cashflowSlice';
import { RootState } from '..';

const mapDispatchToProps = {
  fetchBudget,
};

interface DispatchShape {
  fetchBudget: (budgetID: number) => void;
}

const mapStateToProps = (state: RootState) => ({
  budget: state.cashflow.budget,
  loading: state.cashflow.loading,
  user: state.users.user,
});

export type BudgetProps = ReturnType<typeof mapStateToProps> & DispatchShape;

export default connect(mapStateToProps, mapDispatchToProps);
