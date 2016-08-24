import React, { Component } from 'react';

import PageHeader from '../components/Header/PageHeader';
import PatientList from '../components/PatientList/PatientList';
import PatientListResults from '../components/PatientListResults/PatientListResults';


const Patients = () => {
  return (
    <div className="patients container">
      <PageHeader title="Patients" />
	  <PatientListResults />
      <PatientList />
    </div>
  );
};

Patients.displayName = 'Patients';

export default Patients;
