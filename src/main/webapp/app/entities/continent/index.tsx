import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Continent from './continent';
import ContinentDetail from './continent-detail';
import ContinentUpdate from './continent-update';
import ContinentDeleteDialog from './continent-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContinentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContinentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContinentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Continent} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ContinentDeleteDialog} />
  </>
);

export default Routes;
