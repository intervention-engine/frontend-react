import React, { Component, PropTypes } from 'react';

import PageHeader from '../components/Header/PageHeader';
import PatientList from '../components/PatientList/PatientList';
import PatientListResults from '../components/PatientListResults/PatientListResults';

class Patients extends Component {
  render() {
    return (
      <div className="patients container">
        <PageHeader title="Patients" />
        <PatientListResults queryParams={this.props.location.query}/>
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
