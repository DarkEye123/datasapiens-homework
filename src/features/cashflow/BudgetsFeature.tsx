import { connect } from 'react-redux';
import { getBudgets } from './cashflowSlice';
import { RootState } from '..';

const mapDispatchToProps = {
  getBudgets,
};

interface DispatchShape {
  getBudgets: (userId: number) => void;
}

const mapStateToProps = (state: RootState) => ({
  budgets: state.cashflow.budgets,
  loading: state.cashflow.loading,
  user: state.users.loggedUser,
});

export type BudgetsProps = ReturnType<typeof mapStateToProps> & DispatchShape;

export default connect(mapStateToProps, mapDispatchToProps);
