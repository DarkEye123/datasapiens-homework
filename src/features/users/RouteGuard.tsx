import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { PAGES } from '../../routes';
import { RootState } from '..';

const mapStateToProps = (state: RootState) => ({
  loggedUser: state.users.loggedUser,
  loading: state.users.loading,
  autologinFinished: state.users.autologinDone,
});

type RouteGuardProps = RouteProps & ReturnType<typeof mapStateToProps>;

const RouteGuard: FC<RouteGuardProps> = ({
  component: Component,
  loggedUser,
  loading,
  autologinFinished,
  location,
  ...rest
}) => {
  // fixes `JSX element type 'Component' does not have any construct or call signatures.`
  if (!Component) {
    return null;
  }

  if (loading || !autologinFinished) {
    return <div>loading route</div>;
  }

  if (!loggedUser) {
    return (
      <Redirect
        to={{
          pathname: PAGES.login.name,
          state: { from: location },
        }}
      />
    );
  }
  return (
    <Route
      {...rest}
      location={location}
      render={(props) => <Component {...props} />}
    />
  );
};

export default connect(mapStateToProps)(RouteGuard);
