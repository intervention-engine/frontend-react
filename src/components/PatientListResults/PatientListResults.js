import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPatients } from '../../actions/PatientListResults/index';
import PatientListResultsItem from './PatientListResultsItem';

class PatientListResults extends Component {

  componentWillMount() {
    this.props.loadPatients(this.props.queryParams);
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
  patients: PropTypes.object,
  queryParams: PropTypes.object
};

PatientListResults.contextTypes = {
  router: PropTypes.object
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
