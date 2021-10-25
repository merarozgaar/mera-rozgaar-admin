// @flow
import React, { useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { getAppRoutes } from './utils/contentProviders';
import Layout from './layout';
import AppRoute from './containers/AppRoute';
import LoginContainer from './modules/login';
import EmployersContainer from './modules/employer';
import EmployeeContainer from './modules/employee';
import JobsContainer from './modules/jobs';
import InterviewsContainer from './modules/interviews';
import NotificationsContainer from './modules/notifications';

type RoutesType = () => React$Node;

const Routes: RoutesType = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return (
    <Layout>
      <Switch>
        <AppRoute
          exact
          isPrivate
          path={getAppRoutes().employer}
          component={EmployersContainer}
        />
        <AppRoute
          exact
          isPrivate
          path={getAppRoutes().employee}
          component={EmployeeContainer}
        />
        <AppRoute
          exact
          isPrivate
          path={getAppRoutes().jobs}
          component={JobsContainer}
        />
        <AppRoute
          exact
          isPrivate
          path={getAppRoutes().interviews}
          component={InterviewsContainer}
        />
        <AppRoute
          exact
          isPrivate
          path={getAppRoutes().notifications}
          component={NotificationsContainer}
        />
        <AppRoute
          isPrivate={false}
          path={getAppRoutes().home}
          component={LoginContainer}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
