import React, { Component, PropTypes } from 'react';

import PatientViewBannerSummary from './PatientViewBannerSummary';

import patientProps from '../../../prop-types/patient';
import riskAssessmentProps from '../../../prop-types/risk_assessment';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskServiceProps from '../../../prop-types/risk_service';

export default class PatientViewBanner extends Component {
  render() {
    return (
      <div className="patient-view-banner row">
        <div className="col-xs-12">
          <PatientViewBannerSummary patient={this.props.patient}
                                    riskAssessments={this.props.riskAssessments}
                                    huddles={this.props.huddles} />
        </div>
      </div>
    );
  }
}

PatientViewBanner.displayName = 'PatientViewBanner';

PatientViewBanner.propTypes = {
  patient: patientProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedRiskService: riskServiceProps
};
