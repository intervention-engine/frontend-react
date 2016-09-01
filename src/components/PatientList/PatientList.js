import React from 'react';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';

const PatientList = () => {
  return (
    <div className="patient-list row">
      <PatientListSelectors />
    </div>
  );
};

PatientList.displayName = 'PatientList';

export default PatientList;
