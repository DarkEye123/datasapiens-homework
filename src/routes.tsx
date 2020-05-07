import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, NotFound, Home } from './views';
import RouteGuard from './features/users/RouteGuard';

const PAGES = {
  home: '/',
  login: '/login',
};
const Routes: FC = () => (
  <Switch>
    <RouteGuard path={PAGES.home} exact component={Home} />
    <Route path={PAGES.login} exact component={Login} />
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

export { PAGES };

export default Routes;
