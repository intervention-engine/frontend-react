import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Patients from './components/Patients';
import FilterBuilder from './components/FilterBuilder';

export default (
  <Route component={App}>
    <Route path="/" component={Patients} />
    <Route path="/FilterBuilder" component={FilterBuilder} />
  </Route>
);
