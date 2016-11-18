import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';
import RiskAssessmentSelector from '../../PatientList/PatientListSelectors/RiskAssessmentSelector';

import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
// import patientProps from '../../../prop-types/patient';
// import huddleGroupProps from '../../../prop-types/huddle_group';
// import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewStatsRiskAssessment extends Component {
  render() {
    return (
      <div className="patient-view-stats-risk-assessment">
        <CollapsiblePanel panelTitle="Risk Assessment">
          <div>
            <RiskAssessmentSelector riskAssessmentTypes= {this.props.riskAssessmentTypes}
                                    selectedRiskAssessment={this.props.selectedRiskAssessment}
                                    selectRiskAssessment={this.props.selectRiskAssessment} />
          </div>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsRiskAssessment.displayName = 'PatientViewStatsRiskAssessment';

PatientViewStatsRiskAssessment.propTypes = {
  riskAssessmentTypes: PropTypes.arrayOf(riskAssessmentTypeProps).isRequired,
  // patient: patientProps,
  // huddles: PropTypes.arrayOf(huddleGroupProps),
  // riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired
};
