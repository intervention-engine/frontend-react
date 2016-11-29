import React, { Component, PropTypes } from 'react';
import patientProps from '../../../prop-types/patient';
import PatientViewBannerSummary from './PatientViewBannerSummary';
import PatientViewBannerRiskChart from './PatientViewBannerRiskChart';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewBanner extends Component {
  render() {
    let filteredRiskAssessments = null;
    let patientRiskAssessments = null;
    if (this.props.riskAssessments != null) {
      filteredRiskAssessments = this.props.riskAssessments.find((riskAssessment) => {
        return riskAssessment.name == this.props.selectedRiskAssessment.name;
      });
      patientRiskAssessments = filteredRiskAssessments.patients.find((pat) => pat.id === this.props.patient.id).risks;
    }

    return (
      <div className="patient-view-banner row">
        <div className="col-xs-12">
          <PatientViewBannerSummary patient={this.props.patient}
                                    huddles={this.props.huddles}
                                    filteredRiskAssessments={filteredRiskAssessments} />
          <PatientViewBannerRiskChart riskAssessments={patientRiskAssessments}/>
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
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired
};
