import React, { Component, PropTypes } from 'react';

import PageHeader from '../components/Header/PageHeader';
import PatientList from '../components/PatientList/PatientList';


class Patients extends Component {
  render() {
    return (
      <div className="patients container">
        <PageHeader title="Patients" />
        <PatientList />
      </div>
    );
  }
}

Patients.displayName = 'Patients';

Patients.propTypes = {
  location: PropTypes.object
};

export default Patients;
