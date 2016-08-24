import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPatients } from '../../actions/PatientListResults/index';
import PatientListResultsItem from './PatientListResultsItem';

class PatientListResults extends Component {
  displayName: 'PatientListResults'
  componentWillMount(){
    this.props.loadPatients({page:1, perPage: 8});
  }
  render() {
    const { patientEntries } = this.props.patients;
    return (
      <div>
        {patientEntries.map((pat) =>
          <PatientListResultsItem key={pat.id} patient={pat}/>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPatients }, dispatch);
}

function mapStateToProps(state) {
  return {
    patients: state.patientListResults
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListResults);
