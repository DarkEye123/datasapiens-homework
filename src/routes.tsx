import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login as LoginView,
  NotFound as NotFoundView,
  Home as HomeView,
} from './views';
import RouteGuard from './features/users/RouteGuard';
import BudgetView from './views/Budget';

const PAGES = {
  home: {
    path: '/',
    name: '/',
  },
  login: { path: '/login', name: '/login' },
  budget: { path: '/budget/:id', name: '/budget' },
};
const Routes: FC = () => (
  <Switch>
    <RouteGuard path={PAGES.home.path} exact component={HomeView} />
    <Route path={PAGES.login.path} exact component={LoginView} />
    <RouteGuard path={PAGES.budget.path} exact component={BudgetView} />
    <Route path="*">
      <NotFoundView />
    </Route>
  </Switch>
);

export { PAGES };

export default Routes;
