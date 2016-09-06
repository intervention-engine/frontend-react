import React from 'react';

import PageHeader from '../components/Header/PageHeader';
import PatientList from '../components/PatientList/PatientList';

const Patients = () => {
  return (
    <div className="patients container">
      <PageHeader title="Patients" />

      <PatientList />
    </div>
  );
};

Patients.displayName = 'Patients';

export default Patients;
