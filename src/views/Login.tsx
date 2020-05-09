import React, { FC, useState } from 'react';
import { RouteProps, Redirect } from 'react-router-dom';
import {
  Button,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
  InputAdornment,
  makeStyles,
  createStyles,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff, AccountCircle } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import LoginFeature, { LoginProps } from '../features/users/Login';
import { PAGES } from '../routes';

const useStyles = makeStyles((theme) =>
  createStyles({
    padded: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: '5rem',
      },
      paddingTop: '5rem',
      paddingBottom: '1rem',
    },
  }),
);

interface FormValidationValues {
  username: string;
  password: string;
}

const Login: FC<LoginProps & RouteProps> = ({
  loggedUser,
  loading,
  logIn,
  location,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const classes = useStyles();
  const { from }: any = location?.state || { from: { pathname: PAGES.home } };

  if (loggedUser) {
    return <Redirect to={from} />;
  }

  return (
    <>
      <Grid container alignItems="center" direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h1" className={classes.padded}>
            Log In
          </Typography>
        </Grid>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={({ username, password }, { setSubmitting }) => {
            logIn(username, password);
            setSubmitting(false);
          }}
          validate={({ username, password }) => {
            const errors: Partial<FormValidationValues> = {};
            if (!username) {
              errors.username = 'Required';
            }
            if (!password) {
              errors.password = 'Required';
            }
            console.log(errors);
            return errors;
          }}
        >
          {({ submitForm, isValid, dirty, errors, touched }) => (
            <Grid
              container
              item
              component={Form}
              direction="column"
              xs={12}
              sm={6}
              spacing={1}
            >
              <Grid item>
                <Field
                  component={TextField}
                  id="username"
                  name="username"
                  variant="outlined"
                  color="primary"
                  autoFocus
                  fullWidth
                  label="Username"
                  disabled={loading}
                  InputProps={{
                    'aria-label': 'Username',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton disabled>
                          <AccountCircle
                            color={
                              errors.username && touched.username
                                ? 'secondary'
                                : 'primary'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></Field>
              </Grid>
              <Grid item>
                <Field
                  component={TextField}
                  id="password"
                  name="password"
                  variant="outlined"
                  type={passwordVisible ? 'text' : 'password'}
                  fullWidth
                  label="Password"
                  disabled={loading}
                  InputProps={{
                    'aria-label': 'Password',
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <IconButton
                          color={
                            errors.password && touched.password
                              ? 'secondary'
                              : 'primary'
                          }
                        >
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></Field>
              </Grid>
              <Grid item justify="flex-end" container>
                <Button
                  aria-label="Log in"
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                  type="submit"
                  disabled={loading || !dirty || !isValid}
                  startIcon={loading && dirty && <CircularProgress size={20} />}
                >
                  Log{loading && dirty && 'ing'} In
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Grid>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export { Login };
export default LoginFeature(Login);
