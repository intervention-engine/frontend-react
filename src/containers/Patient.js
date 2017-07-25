import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import equal from 'deep-equal';

import PageHeader from '../components/Header/PageHeader';
import PatientView from '../components/PatientView/PatientView';

import patientProps from '../prop-types/patient';
import huddleGroupProps from '../prop-types/huddle_group';
import huddleProps from '../prop-types/huddle';
import riskServiceProps from '../prop-types/risk_service';
import riskAssessmentProps from '../prop-types/risk_assessment';

import { fetchPatient } from '../actions/patient';
import { fetchHuddles, selectHuddle, addPatientToHuddle } from '../actions/huddle';
import { fetchRiskServices, selectRiskService } from '../actions/risk_service';
import { fetchRiskAssessments } from '../actions/risk_assessment';

export class Patient extends Component {
  constructor(...args) {
    super(...args);

    this.state = { loading: false };
  }

  componentWillMount() {
    if (this.props.riskServices.length === 0) { this.props.fetchRiskServices(); }

    if (this.props.selectedPatient == null ||
        this.props.params.patient_id !== this.props.selectedPatient.id) {
      // --patient not yet fetched--
      this.setState({ loading: true });
      // fetch patient
      this.props.fetchPatient(this.props.params.patient_id);
    } else {
      // --patient already fetched--
      // fetch risk assessments
      this.props.fetchRiskAssessments(this.props.selectedPatient.id, this.props.selectedRiskService.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.patient == this.props.patient) {
      this.setState({ loading: false });
    }

    // fetch risk services when nextProps has changed
    if (this.props.riskServices.length === 0 || !equal(nextProps.riskServices, this.props.riskServices)) {
      this.props.fetchRiskServices();
    }

    // fetch risk assessments when nextProps has changed
    if (this.props.selectedRiskService != null &&
        this.props.riskAssessments.length === 0 ||
        !equal(nextProps.riskAssessments, this.props.riskAssessments)) {
      this.props.fetchRiskAssessments(this.props.params.patient_id, this.props.selectedRiskService.id);
    }
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
                     selectHuddle={this.props.selectHuddle}
                     selectRiskService={this.props.selectRiskService}
                     addPatientToHuddle={this.props.addPatientToHuddle} />
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
  fetchPatient: PropTypes.func.isRequired,
  fetchHuddles: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  addPatientToHuddle: PropTypes.func.isRequired,
  fetchRiskServices: PropTypes.func.isRequired,
  fetchRiskAssessments: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPatient,
    fetchHuddles,
    selectHuddle,
    addPatientToHuddle,
    fetchRiskServices,
    fetchRiskAssessments,
    selectRiskService
  }, dispatch);
}

export function mapStateToProps(state) {
  return {
    selectedPatient: state.patient.selectedPatient,
    huddles: state.huddle.huddles,
    selectedHuddle: state.huddle.selectedHuddle,
    riskServices: state.riskService.riskServices,
    selectedRiskService: state.riskService.selectedRiskService,
    riskAssessments: state.riskAssessment.riskAssessments
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
