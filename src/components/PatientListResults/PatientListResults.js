import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPatients } from '../../actions/PatientListResults/index';
import PatientListResultsItem from './PatientListResultsItem';

class PatientListResults extends Component {
  componentWillMount(){
    this.props.loadPatients({page:1, perPage: 8, params: {_sort: 'family'}});
  }
  render() {
    const { patientEntries } = this.props.patients;
    return (
      <div>
        {patientEntries.map((pat) =>
          <PatientListResultsItem key={pat.id} patient={pat}/>
        )}
        <div>
          {this.props.patients.meta.total}
        </div>
      </div>
    );
  }
}

PatientListResults.propTypes = {
  loadPatients: PropTypes.func,
  patients: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPatients }, dispatch);
}

function mapStateToProps(state) {
  return {
    patients: state.patientListResults
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListResults);
