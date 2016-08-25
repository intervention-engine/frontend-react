import React from 'react';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';

const PatientList = () => {
  return (
    <div className="patient-list">
      <PatientListSelectors />
    </div>
  );
};

PatientList.displayName = 'PatientList';

export default PatientList;
