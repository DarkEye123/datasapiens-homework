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
import CreateBudget from '../components/Forms/CreateBudget';
import { useTranslation } from 'react-i18next';

const Home: FC<BudgetsProps> = ({
  fetchBudgets,
  user,
  budgets,
  loading,
  createBudget,
  deleteBudget,
}) => {
  useEffect(() => {
    fetchBudgets(user!.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setCreateOpen(false);
  }, [budgets]);

  const { t } = useTranslation();
  const history = useHistory();
  const [openCreate, setCreateOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [budgetForDelete, setBudgetForDelete] = useState<number | null>(null);

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

  function handleRequestDelete(id: number) {
    setBudgetForDelete(id);
    setOpenDelete(true);
  }

  function handleDelete() {
    setOpenDelete(false);
    budgetForDelete && deleteBudget(budgetForDelete);
    // console.log('deleting', budgetForDelete);
  }

  return (
    <>
      <Dialog
        open={openCreate}
        onClose={() => setCreateOpen(false)}
        title="Create Budget"
      >
        {user && (
          <CreateBudget
            onConfirm={({ budgetName, userID }) =>
              createBudget({
                budgetName,
                userList: userID ? [userID] : [],
                owner: user.id,
              })
            }
            userID={user.id}
          ></CreateBudget>
        )}
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Budget"
      >
        {t('Are you sure?')}
      </Dialog>
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
                {t('Your Budgets')}
              </Typography>
            </Grid>
            <Grid item xs container justify="flex-end">
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => setCreateOpen(true)}
                  variant="outlined"
                >
                  {t('Create Budget')}
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
                    onAction={() => handleRequestDelete(b.id)}
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
