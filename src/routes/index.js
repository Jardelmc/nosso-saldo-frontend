import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

// Apenas autenticado
import ScanCode from '../pages/ScanCode';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/inicio" exact component={ScanCode} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
