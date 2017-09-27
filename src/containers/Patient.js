import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import queryString from 'query-string';

import PageHeader from '../components/Header/PageHeader';
import PatientView from '../components/PatientView/PatientView';

import patientProps from '../prop-types/patient';
import careTeamProps from '../prop-types/care_team';
import huddleProps from '../prop-types/huddle';
import riskServiceProps from '../prop-types/risk_service';
import riskAssessmentProps from '../prop-types/risk_assessment';
import riskAssessmentBreakdownProps from '../prop-types/risk_assessment_breakdown';

import { loadPatient } from '../actions/patient';
import { selectCareTeamFetchHuddles, selectHuddle, addPatientToHuddle } from '../actions/huddle';
import { selectRiskService } from '../actions/risk_service';
import { selectRiskAssessment } from '../actions/risk_assessment';

export class Patient extends Component {
  componentDidMount() {
    let patientId = this.props.params.patient_id;
    let { riskService, careTeamId } = queryString.parse(this.props.location.search);

    this.props.loadPatient(patientId, careTeamId, riskService);
  }

  render() {
    if (this.props.selectedPatient == null || this.props.riskAssessmentBreakdownLoading == true) {
      return (
        <div className="loading text-center container">
          <FontAwesome name="spinner" size="3x" spin pulse />
        </div>
      );
    }

    return (
      <div className="patient container">
        <PageHeader title="Patients"/>

        <PatientView patient={this.props.selectedPatient}
                     careTeams={this.props.careTeams}
                     selectedCareTeam={this.props.selectedCareTeam}
                     huddles={this.props.huddles}
                     selectedHuddle={this.props.selectedHuddle}
                     riskServices={this.props.riskServices}
                     selectedRiskService={this.props.selectedRiskService}
                     riskAssessments={this.props.riskAssessments}
                     selectedRiskAssessment={this.props.selectedRiskAssessment}
                     riskAssessmentBreakdown={this.props.riskAssessmentBreakdown}
                     selectCareTeam={this.props.selectCareTeam}
                     selectHuddle={this.props.selectHuddle}
                     selectRiskService={this.props.selectRiskService}
                     addPatientToHuddle={this.props.addPatientToHuddle}
                     selectRiskAssessment={this.props.selectRiskAssessment} />
      </div>
    );
  }
}

Patient.propTypes = {
  location: PropTypes.object.isRequired,
  params: PropTypes.shape({ patient_id: PropTypes.string }).isRequired,
  patient: patientProps,
  loading: PropTypes.bool,
  selectedPatient: patientProps,
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps),
  selectedRiskService: riskServiceProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentProps,
  riskAssessmentBreakdown: PropTypes.arrayOf(riskAssessmentBreakdownProps),
  loadPatient: PropTypes.func.isRequired,
  selectCareTeam: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  addPatientToHuddle: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired,
  riskAssessmentBreakdownLoading: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPatient,
    selectCareTeam: selectCareTeamFetchHuddles,
    selectHuddle,
    addPatientToHuddle,
    selectRiskService,
    selectRiskAssessment
  }, dispatch);
}

export function mapStateToProps(state) {
  let huddles = [];
  if (state.huddle.selectedCareTeam && state.huddle.huddlesByCareTeam[state.huddle.selectedCareTeam.id]) {
    huddles = state.huddle.huddlesByCareTeam[state.huddle.selectedCareTeam.id].items;
  }

  return {
    selectedPatient: state.patient.selectedPatient.patient,
    careTeams: state.huddle.careTeams.items,
    selectedCareTeam: state.huddle.selectedCareTeam,
    huddles,
    selectedHuddle: state.huddle.selectedHuddle,
    riskServices: state.riskService.riskServices.items,
    selectedRiskService: state.riskService.selectedRiskService,
    riskAssessments: state.riskAssessment.riskAssessments.items,
    selectedRiskAssessment: state.riskAssessment.selectedRiskAssessment,
    riskAssessmentBreakdown: state.riskAssessment.riskBreakdown.items,
    riskAssessmentBreakdownLoading: state.riskAssessment.riskBreakdown.initialLoad
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
