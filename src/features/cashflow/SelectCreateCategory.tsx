import { connect } from 'react-redux';
import { RootState } from '..';

const mapStateToProps = (state: RootState) => ({
  budget: state.cashflow.budget,
  user: state.users.user,
  loading: state.cashflow.loading,
});

export type SelectCreateCategoryFeatureProps = ReturnType<
  typeof mapStateToProps
>;

export default connect(mapStateToProps);
