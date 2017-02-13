import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';
import RiskAssessmentSelector from '../../PatientList/PatientListSelectors/RiskAssessmentSelector';

import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';

export default class PatientViewStatsRiskAssessment extends Component {
  render() {
    return (
      <div className="patient-view-stats-risk-assessment">
        <CollapsiblePanel panelTitle="Risk Assessment" panelIcon="pie-chart">
          <RiskAssessmentSelector riskAssessmentTypes= {this.props.riskAssessmentTypes}
                                  selectedRiskAssessment={this.props.selectedRiskAssessment}
                                  selectRiskAssessment={this.props.selectRiskAssessment} />
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsRiskAssessment.displayName = 'PatientViewStatsRiskAssessment';

PatientViewStatsRiskAssessment.propTypes = {
  riskAssessmentTypes: PropTypes.arrayOf(riskAssessmentTypeProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired
};
