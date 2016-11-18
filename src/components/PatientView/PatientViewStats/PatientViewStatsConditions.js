import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';

// import patientProps from '../../../prop-types/patient';
// import huddleGroupProps from '../../../prop-types/huddle_group';
// import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
// import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewStatsConditions extends Component {
  render() {
    return (
      <div className="patient-view-stats-conditions">
        <CollapsiblePanel panelTitle="Conditions">
          <div>Conditions</div>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsConditions.displayName = 'PatientViewStatsConditions';

PatientViewStatsConditions.propTypes = {
  // patient: patientProps,
  // huddles: PropTypes.arrayOf(huddleGroupProps),
  // riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  // selectedRiskAssessment: riskAssessmentTypeProps.isRequired
};
