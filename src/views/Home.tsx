import React, { FC, useEffect } from 'react';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';
import BudgetsFeature, {
  BudgetsProps,
} from '../features/cashflow/BudgetsFeature';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../routes';

const Home: FC<BudgetsProps> = ({ getBudgets, user, budgets, loading }) => {
  useEffect(() => {
    getBudgets(user!.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (budgets.length === 1) {
    return (
      <Redirect push to={`${PAGES.budget.name}/${budgets[0].id}`}></Redirect>
    );
  }

  return <Grid container>TODO: multiple budgets</Grid>;
};

export default BudgetsFeature(Home);
