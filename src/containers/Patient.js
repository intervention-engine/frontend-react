import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import patientProps from '../prop-types/patient';
import { fetchPatient, selectPatient} from '../actions/patient';
import PageHeader from '../components/Header/PageHeader';
import PatientView from '../components/PatientView/PatientView';


class Patient extends Component {

  componentWillMount(){

    this.props.selectPatient(this.props.params.patient_id);
    if(!(this.props.params.patient_id == this.props.selectedPatient.id)) {
			// Fire action to set the selectedPatient correctly
      this.props.fetchPatient(this.props.params.patient_id);
    }
  }

  render() {
    return (
			<div className='patient'>
				<PageHeader title="Patients"/>
				<PatientView patient={this.props.selectedPatient} />
			</div>
		);
  }
}

Patient.contextTypes = {
  router: PropTypes.object
};

Patient.propTypes = {
  selectedPatient: patientProps,
  selectPatient: PropTypes.func.isRequired,
  fetchPatient: PropTypes.func.isRequired,
  params: PropTypes.shape({patient_id: PropTypes.string}).isRequired
};

function mapStateToProps(state) {
  return {
    selectedPatient: state.patient.selectedPatient
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPatient,
    selectPatient
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
