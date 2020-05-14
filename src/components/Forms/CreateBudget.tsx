import 'date-fns';
import React, { FC, useState, useEffect } from 'react';
import {
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Actions } from './styles';
import CreatableInput from '../CreatableInput';
import { getAppUsers } from '../../services/UserService';

type FormProps = {
  onConfirm: (arg: CallbackProps) => void;
  userID: number;
};

export interface CallbackProps {
  budgetName: string;
  userID?: number;
}

type SelectableUser = {
  name: string;
  id: number;
};

/**
 * -----------NOTE-----------
 * In this case I don't use redux - I have no use case for users in this simple scenario - just for listing values.
 * Although I would add it there if I wanted to show which users are associated with the budget
 */
const CreateBudget: FC<FormProps> = ({ onConfirm, userID }) => {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const [users, setUsers] = useState<SelectableUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isUnmounted = false;
    async function fetchUsers() {
      setLoadingUsers(true);
      const users = await getAppUsers();
      const filteredUsers = users.data?.filter((u) => u.id !== userID) || [];
      const selectableUsers = filteredUsers.map(
        (u) => ({ id: u.id, name: u.username } as SelectableUser),
      );
      if (!isUnmounted) {
        setLoadingUsers(false);
        setUsers(selectableUsers || []);
      }
    }
    fetchUsers();
    return () => {
      isUnmounted = true;
    };
  }, [userID]);

  return (
    <Formik
      initialValues={{
        budgetName: '',
        user: undefined,
      }}
      onSubmit={({ budgetName, user }, { setSubmitting }) => {
        setSubmitting(false);
        setLoading(true);
        const userID = user && (user as any).id ? (user as any).id : null;
        onConfirm({
          budgetName,
          userID,
        });
      }}
      validate={(val) => {
        const errors: Record<string, string> = {};
        if (!val.budgetName) {
          errors.budgetName = 'Required';
        }
        return errors;
      }}
    >
      {({ submitForm, handleReset, isValid, dirty }) => (
        <>
          <Grid
            container
            component={Form}
            spacing={isBigScreen ? 1 : 6}
            direction={isBigScreen ? 'row' : 'column'}
            justify="center"
            alignContent="center"
          >
            <Grid item xs={12} sm="auto">
              <Field
                component={TextField}
                id="budgetName"
                name="budgetName"
                label="Budget Title"
                variant="outlined"
              ></Field>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Field
                component={CreatableInput}
                id="user"
                name="user"
                label={
                  loadingUsers ? 'loading users...' : 'select user to share'
                }
                data={users}
              ></Field>
            </Grid>
          </Grid>
          <Actions>
            <Button onClick={handleReset} color="primary">
              Reset
            </Button>
            <Button
              onClick={submitForm}
              variant="contained"
              color="primary"
              disabled={loading || !dirty || !isValid}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Finish
            </Button>
          </Actions>
        </>
      )}
    </Formik>
  );
};

export default CreateBudget;
