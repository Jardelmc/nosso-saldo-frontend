import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Index from '../pages/Index';
import SignIn from '../pages/SignIn';
import Users from '../pages/Users';

// Apenas autenticado
import Start from '../pages/Start';
import SignUp from '../pages/SignUp';
import Historic from '../pages/Historic';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/login" exact component={SignIn} />
      <Route path="/cadastrar" exact component={SignUp} />
      <Route path="/inicio" exact component={Start} isPrivate />
      <Route path="/usuarios" exact component={Users} isPrivate />
      <Route path="/historico" exact component={Historic} isPrivate />
      <Route
        path="/historico/:balanceId"
        exact
        component={Historic}
        isPrivate
      />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
