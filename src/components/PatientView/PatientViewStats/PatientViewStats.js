import React, { Component, PropTypes } from 'react';

import PatientViewStatsConditions from './PatientViewStatsConditions';
import PatientViewStatsHuddles from './PatientViewStatsHuddles';
import PatientViewStatsMedications from './PatientViewStatsMedications';
import PatientViewStatsRiskService from './PatientViewStatsRiskService';

import patientProps from '../../../prop-types/patient';
import careTeamProps from '../../../propTypes/care_team';
import huddleGroupProps from '../../../prop-types/huddle_group';
import huddleProps from '../../../prop-types/huddle';
import riskServiceProps from '../../../prop-types/risk_service';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewStats extends Component {
  render() {
    return (
      <div className="patient-view-stats">
        <PatientViewStatsRiskService riskServices={this.props.riskServices}
                                     selectedRiskService={this.props.selectedRiskService}
                                     selectRiskService={this.props.selectRiskService} />
        <PatientViewStatsHuddles careTeams={this.props.careTeams}
                                 selectedHuddle={this.props.selectedHuddle}
                                 selectHuddle={this.props.selectHuddle}
                                 huddles={this.props.huddles}
                                 patient={this.props.patient}
                                 addPatientToHuddle={this.props.addPatientToHuddle} />
        <PatientViewStatsConditions patient={this.props.patient}/>
        <PatientViewStatsMedications patient={this.props.patient}/>
      </div>
    );
  }
}

PatientViewStats.displayName = 'PatientViewStats';

PatientViewStats.propTypes = {
  patient: patientProps,
  careTeams: careTeamProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps),
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskService: riskServiceProps.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  addPatientToHuddle: PropTypes.func.isRequired
};
