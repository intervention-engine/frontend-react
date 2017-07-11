import React, { Component, PropTypes } from 'react';

import PatientViewBannerSummary from './PatientViewBannerSummary';

import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskServiceProps from '../../../prop-types/risk_service';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewBanner extends Component {
  render() {
    let filteredRiskAssessments = null;

    if (this.props.riskAssessments != null && this.props.selectedRiskService != null) {
      filteredRiskAssessments = this.props.riskAssessments.filter((riskAssessment) => {
        return riskAssessment.risk_service_id == this.props.selectedRiskService.id;
      });
    }

    return (
      <div className="patient-view-banner row">
        <div className="col-xs-12">
          <PatientViewBannerSummary patient={this.props.patient}
                                    huddles={this.props.huddles}
                                    filteredRiskAssessments={filteredRiskAssessments} />
        </div>
      </div>
    );
  }
}

PatientViewBanner.displayName = 'PatientViewBanner';

PatientViewBanner.propTypes = {
  patient: patientProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskService: riskServiceProps
};
