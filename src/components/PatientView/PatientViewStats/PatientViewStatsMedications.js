import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';

// import patientProps from '../../../prop-types/patient';
// import huddleGroupProps from '../../../prop-types/huddle_group';
// import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
// import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewStatsMedications extends Component {
  render() {
    return (
      <div className="patient-view-stats-medications">
        <CollapsiblePanel panelTitle="Medications">
          <div>Medications</div>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsMedications.displayName = 'PatientViewStatsMedications';

PatientViewStatsMedications.propTypes = {
  // patient: patientProps,
  // huddles: PropTypes.arrayOf(huddleGroupProps),
  // riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  // selectedRiskAssessment: riskAssessmentTypeProps.isRequired
};
