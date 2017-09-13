import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Patients from './containers/Patients';
import Patient from './containers/Patient';
import FilterBuilder from './containers/FilterBuilder';
import PrintPatientList from './containers/PrintPatientList';

export default (
  <Route component={App}>
    <Route path="/" component={Patients} />
    <Route path="/patients/:patient_id" component={Patient} />
    <Route path="/FilterBuilder/:population_id" component={FilterBuilder} />
    <Route path="/FilterBuilder/" component={FilterBuilder} />

    <Route path="/PrintPatientList" component={PrintPatientList} />
  </Route>
);
