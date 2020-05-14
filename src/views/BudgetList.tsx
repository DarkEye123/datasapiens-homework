import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Backdrop,
  CircularProgress,
  Box,
  List,
  Typography,
  Button,
} from '@material-ui/core';
import BudgetListFeature, {
  BudgetsProps,
} from '../features/cashflow/BudgetList';
import { PAGES } from '../routes';
import BudgetListItem from '../components/BudgetListItem';
import Dialog from '../components/Dialog';

const Home: FC<BudgetsProps> = ({ fetchBudgets, user, budgets, loading }) => {
  useEffect(() => {
    fetchBudgets(user!.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const history = useHistory();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    );
  }

  function handleOpenBudget(id: number) {
    history.push(`${PAGES.budget.name}/${id}`);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Create Budget"
      ></Dialog>
      <Box mt={12}>
        <Grid container>
          <Grid item container xs={12}>
            <Grid item>
              <Typography
                variant="h6"
                component="h1"
                color="textPrimary"
                gutterBottom
              >
                Your Budgets
              </Typography>
            </Grid>
            <Grid item xs container justify="flex-end">
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => setOpen(true)}
                  variant="outlined"
                >
                  Create Budget
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <List>
                {budgets.map((b) => (
                  <BudgetListItem
                    key={b.id}
                    name={b.name}
                    isShared={b.isShared}
                    onOpen={() => handleOpenBudget(b.id)}
                  ></BudgetListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { Home as BudgetList };
export default BudgetListFeature(Home);
