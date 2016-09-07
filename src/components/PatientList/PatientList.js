import React from 'react';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from '../PatientListResults/PatientListResults';

const PatientList = () => {
  return (
    <div className="patient-list row">
      <PatientListSelectors />
      <PatientListResults/>
    </div>
  );
};

PatientList.displayName = 'PatientList';

export default PatientList;
