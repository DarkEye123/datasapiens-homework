import 'date-fns';
import React, { FC } from 'react';
import {
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  makeStyles,
  createStyles,
  Button,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { isMobile } from '../../utils/graph';
import { Actions } from './styles';
import { Entry } from '../../types/budget';

interface FormProps {
  onConfirm: (x: Partial<Entry>) => void;
}

interface FormValidationValues {
  value: string;
  date: Date;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    valueInput: {
      position: 'relative',
      bottom: -theme.spacing(4),
    },
    divider: {
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(4),
        height: '1px',
      },
    },
  }),
);

const EntryForm: FC<FormProps> = ({ onConfirm }) => {
  const theme = useTheme();
  const classes = useStyles();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Formik
      initialValues={{
        value: '',
        date: new Date(),
      }}
      onSubmit={({ value, date }, { setSubmitting }) => {
        setSubmitting(false);
        onConfirm({ value: Number(value), date });
      }}
      validate={({ value, date }) => {
        const errors: Partial<FormValidationValues> = {};
        if (!value) {
          errors.value = 'Required';
        }
        return errors;
      }}
    >
      {({ submitForm, handleReset, isValid, dirty, errors, touched }) => (
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
                id="value"
                name="value"
                color="primary"
                placeholder="Transaction Value"
                type="number"
                autoFocus
                className={classes.valueInput}
              ></Field>
            </Grid>
            <Divider
              light
              flexItem
              variant="middle"
              orientation={isBigScreen ? 'vertical' : 'horizontal'}
              className={classes.divider}
            ></Divider>
            <Grid xs={12} item sm="auto">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  component={KeyboardDatePicker}
                  disableToolbar
                  variant={isMobile() || !isBigScreen ? 'dialog' : 'inline'}
                  format="yyyy-MM-dd"
                  id="date"
                  name="date"
                  margin="normal"
                  label="Select Date of the Transaction"
                  maxDate={new Date()}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                ></Field>
              </MuiPickersUtilsProvider>
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
              disabled={!dirty || !isValid}
            >
              Next
            </Button>
          </Actions>
        </>
      )}
    </Formik>
  );
};

export default EntryForm;
