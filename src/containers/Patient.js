import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import Promise from 'promise';

import PageHeader from '../components/Header/PageHeader';
import PatientView from '../components/PatientView/PatientView';

import patientProps from '../prop-types/patient';
import huddleGroupProps from '../prop-types/huddle_group';
import huddleProps from '../prop-types/huddle';
import riskServiceProps from '../prop-types/risk_service';
import riskAssessmentProps from '../prop-types/risk_assessment';
import riskAssessmentBreakdownProps from '../prop-types/risk_assessment_breakdown';

import { fetchPatient } from '../actions/patient';
import { fetchHuddles, selectHuddle, addPatientToHuddle } from '../actions/huddle';
import { fetchRiskServices, selectRiskService } from '../actions/risk_service';
import { fetchRiskAssessments, fetchRiskAssessmentBreakdown, selectRiskAssessment } from '../actions/risk_assessment';

export class Patient extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    if (this.props.selectedPatient == null ||
        this.props.params.patient_id !== this.props.selectedPatient.id) {
      // --patient not yet fetched--
      this.setState({ loading: true });
      // fetch patient and patient data
      let patientPromise = this.props.fetchPatient(this.props.params.patient_id);
      let riskServicePromise = this.props.fetchRiskServices();

      Promise.all([patientPromise, riskServicePromise]).then(() => {
        this.setState({ loading: false });
        this.fetchPatientData();
      });
    } else {
      // --patient already fetched--
      this.fetchPatientData();
    }
  }

  fetchPatientData() {
    this.props.fetchRiskAssessments(this.props.selectedPatient.id, this.props.selectedRiskService.id).then(() => {
      this.props.fetchRiskAssessmentBreakdown(this.props.selectedRiskAssessment.id);
    });
  }

  selectRiskAssessment(riskAssessment) {
    this.props.selectRiskAssessment(riskAssessment);
    this.props.fetchRiskAssessmentBreakdown(riskAssessment.id);
  }

  render() {
    if (this.state.loading) {
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
                     huddles={this.props.huddles}
                     selectedHuddle={this.props.selectedHuddle}
                     riskServices={this.props.riskServices}
                     selectedRiskService={this.props.selectedRiskService}
                     riskAssessments={this.props.riskAssessments}
                     selectedRiskAssessment={this.props.selectedRiskAssessment}
                     riskAssessmentBreakdown={this.props.riskAssessmentBreakdown}
                     selectHuddle={this.props.selectHuddle}
                     selectRiskService={this.props.selectRiskService}
                     addPatientToHuddle={this.props.addPatientToHuddle}
                     selectRiskAssessment={this.selectRiskAssessment.bind(this)} />
      </div>
    );
  }
}

Patient.propTypes = {
  params: PropTypes.shape({ patient_id: PropTypes.string }).isRequired,
  patient: patientProps,
  selectedPatient: patientProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps),
  selectedRiskService: riskServiceProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentProps,
  riskAssessmentBreakdown: PropTypes.arrayOf(riskAssessmentBreakdownProps),
  fetchPatient: PropTypes.func.isRequired,
  fetchHuddles: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  addPatientToHuddle: PropTypes.func.isRequired,
  fetchRiskServices: PropTypes.func.isRequired,
  fetchRiskAssessments: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired,
  fetchRiskAssessmentBreakdown: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPatient,
    fetchHuddles,
    selectHuddle,
    addPatientToHuddle,
    fetchRiskServices,
    fetchRiskAssessments,
    fetchRiskAssessmentBreakdown,
    selectRiskService,
    selectRiskAssessment
  }, dispatch);
}

export function mapStateToProps(state) {
  return {
    selectedPatient: state.patient.selectedPatient,
    careTeams: state.huddle.careTeams,
    huddles: state.huddle.huddles,
    selectedHuddle: state.huddle.selectedHuddle,
    riskServices: state.riskService.riskServices,
    selectedRiskService: state.riskService.selectedRiskService,
    riskAssessments: state.riskAssessment.riskAssessments,
    selectedRiskAssessment: state.riskAssessment.selectedRiskAssessment,
    riskAssessmentBreakdown: state.riskAssessment.riskAssessmentBreakdown
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
