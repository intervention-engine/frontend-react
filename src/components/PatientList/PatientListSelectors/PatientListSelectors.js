import React from 'react';

import RiskAssessmentSelector from './RiskAssessmentSelector';
import FilterSelector from './FilterSelector/FilterSelector';
import SortBySelector from './SortBySelector';

const PatientListSelectors = () => {
  return (
    <div className="patient-list-selectors">
      <RiskAssessmentSelector />
      <FilterSelector />
      <SortBySelector />
    </div>
  );
};

PatientListSelectors.displayName = 'PatientListSelectors';

export default PatientListSelectors;
