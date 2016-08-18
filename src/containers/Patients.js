import React from 'react';

import PageHeader from '../components/Header/PageHeader';

const Patients = () => {
  return (
    <div className="patients container">
      <PageHeader title="Patients" />

      <div>Patients</div>
    </div>
  );
};

Patients.displayName = 'Patients';

export default Patients;
