import React, { Component, PropTypes } from 'react';

import PatientViewBannerSummary from './PatientViewBannerSummary';

import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewBanner extends Component {
  render() {
    let filteredRiskAssessments = this.props.riskAssessments.find((d) => d.name == this.props.selectedRiskAssessment.name);

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
};

PatientViewBanner.displayName = 'PatientViewBanner';

PatientViewBanner.propTypes = {
  patient: patientProps.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired
};
