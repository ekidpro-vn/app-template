import React from 'react';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import { WelcomePage } from '../pages/welcome.page';
import { AboutPage } from '../pages/about.page';

export const AppLayout: React.FC = () => {
  return (
    <Router>
      <Link to="/welcome">Welcome page</Link>
      <br />
      <br />
      <Link to="/about">About Page</Link>
      <br />
      <br />
      <br />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/welcome" component={WelcomePage} />
        <Redirect to="/welcome" />
      </Switch>
    </Router>
  );
};
