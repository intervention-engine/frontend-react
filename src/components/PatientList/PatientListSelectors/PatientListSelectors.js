import React from 'react';

import RiskAssessmentSelector from './RiskAssessmentSelector';
import FilterSelector from './FilterSelector/FilterSelector';
import SortBySelector from './SortBySelector';
import CollapsiblePanel from '../../../elements/CollapsiblePanel';

const PatientListSelectors = () => {
  return (
    <div className="patient-list-selectors col-md-3 col-sm-4">
      <CollapsiblePanel panelTitle="Risk Assessment">
        <RiskAssessmentSelector />
      </CollapsiblePanel>

      <CollapsiblePanel panelTitle="Filters" hasNested={true}>
        <FilterSelector />
      </CollapsiblePanel>

      <CollapsiblePanel panelTitle="Sort">
        <SortBySelector />
      </CollapsiblePanel>
    </div>
  );
};

PatientListSelectors.displayName = 'PatientListSelectors';

export default PatientListSelectors;
