import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import PageHeader from '../components/Header/PageHeader';
import PatientView from '../components/PatientView/PatientView';

import patientProps from '../prop-types/patient';
import huddleGroupProps from '../prop-types/huddle_group';
import riskAssessmentTypeProps from '../prop-types/risk_assessment_type';
import riskAssessmentProps from '../prop-types/risk_assessment';

import { fetchPatient } from '../actions/patient';
import { fetchHuddles } from '../actions/huddle';
import { fetchRiskAssessments, selectRiskAssessment } from '../actions/risk_assessment';

import { riskAssessmentTypes } from '../reducers/risk_assessment';

import queryParamsHash from '../utils/query_params_hash';

export class Patient extends Component {
  constructor(...args) {
    super(...args);

    this.state = { loading: false };
  }

  componentWillMount() {
    if (this.props.selectedPatient == null ||
        this.props.params.patient_id !== this.props.selectedPatient.id) {
      this.setState({ loading: true });
      this.props.fetchPatient(this.props.params.patient_id);
    }

    if (this.props.selectedPatient == null) {
      let queryParams = queryParamsHash();

      this.props.fetchHuddles();
      this.props.selectRiskAssessment(riskAssessmentTypes.find((type) => type.method === queryParams.riskAssessment));
      this.props.fetchRiskAssessments(queryParams.riskAssessment, [this.props.params.patient_id]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.patient == this.props.patient) {
      this.setState({ loading: false });
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
                     riskAssessmentTypes={riskAssessmentTypes}
                     riskAssessments={this.props.riskAssessments}
                     selectedRiskAssessment={this.props.selectedRiskAssessment}
                     selectRiskAssessment={this.props.selectRiskAssessment} />
      </div>
    );
  }
}

Patient.propTypes = {
  patient: patientProps,
  selectedPatient: patientProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  fetchPatient: PropTypes.func.isRequired,
  fetchHuddles: PropTypes.func.isRequired,
  fetchRiskAssessments: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired,
  params: PropTypes.shape({ patient_id: PropTypes.string }).isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPatient,
    fetchHuddles,
    fetchRiskAssessments,
    selectRiskAssessment
  }, dispatch);
}

export function mapStateToProps(state) {
  return {
    selectedPatient: state.patient.selectedPatient,
    huddles: state.huddle.huddles,
    riskAssessments: state.riskAssessment.riskAssessments,
    selectedRiskAssessment: state.riskAssessment.selectedRiskAssessment
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
