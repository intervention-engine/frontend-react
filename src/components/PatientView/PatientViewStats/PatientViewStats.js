import React, { Component, PropTypes } from 'react';

import PatientViewStatsConditions from './PatientViewStatsConditions';
import PatientViewStatsHuddles from './PatientViewStatsHuddles';
import PatientViewStatsMedications from './PatientViewStatsMedications';
import PatientViewStatsRiskService from './PatientViewStatsRiskService';

import patientProps from '../../../prop-types/patient';
import careTeamProps from '../../../prop-types/care_team';
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

        <PatientViewStatsHuddles patient={this.props.patient}
                                 careTeams={this.props.careTeams}
                                 selectedCareTeam={this.props.selectedCareTeam}
                                 selectCareTeam={this.props.selectCareTeam}
                                 huddles={this.props.huddles}
                                 selectedHuddle={this.props.selectedHuddle}
                                 selectHuddle={this.props.selectHuddle}
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
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps),
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskService: riskServiceProps.isRequired,
  selectCareTeam: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  addPatientToHuddle: PropTypes.func.isRequired
};
