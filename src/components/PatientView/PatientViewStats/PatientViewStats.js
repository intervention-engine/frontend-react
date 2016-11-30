import React, { Component, PropTypes } from 'react';

import PatientViewStatsConditions from './PatientViewStatsConditions';
import PatientViewStatsHuddles from './PatientViewStatsHuddles';
import PatientViewStatsMedications from './PatientViewStatsMedications';
import PatientViewStatsRiskAssessment from './PatientViewStatsRiskAssessment';

import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';
import huddleProps from '../../../prop-types/huddle';
import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewStats extends Component {
  render() {
    return (
      <div className="patient-view-stats">
        <PatientViewStatsRiskAssessment riskAssessmentTypes={this.props.riskAssessmentTypes}
                                        selectedRiskAssessment={this.props.selectedRiskAssessment}
                                        selectRiskAssessment={this.props.selectRiskAssessment} />
        <PatientViewStatsHuddles selectedHuddle={this.props.selectedHuddle}
                                 selectHuddle={this.props.selectHuddle}
                                 huddles={this.props.huddles}
                                 patient={this.props.patient} />
        <PatientViewStatsConditions />
        <PatientViewStatsMedications />
      </div>
    );
  }
}

PatientViewStats.displayName = 'PatientViewStats';

PatientViewStats.propTypes = {
  patient: patientProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddle: huddleProps,
  riskAssessmentTypes: PropTypes.arrayOf(riskAssessmentTypeProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired
};
