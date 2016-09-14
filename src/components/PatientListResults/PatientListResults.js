import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPatients } from '../../actions/PatientListResults/index';
import PatientListResultsItem from './PatientListResultsItem';

class PatientListResults extends Component {

  componentWillMount() {
    this.props.loadPatients();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.queryParams != this.props.queryParams){
      this.props.loadPatients({groupId: nextProps.queryParams.groupIds.map((g) => g.id).join(',')});
    }
  }
  render() {
    const { patientEntries } = this.props.patients;
    return (
      <div className='patient-list-results col-md-9 col-sm-8'>
        <div className="panel patient-panel">
          <div className="panel-heading">
            <div className="collapse-panel-title">
              <span className='patient-count'>Patients ({this.props.patients.meta.total})</span>
              <div className="patient-list-results-buttons pull-right">
                <div className="sliding-search-container">
                  <i className="fa fa-search fa-fw"></i>
                  <input
                    type="search"
                    className="sliding-search expanded"/>
                </div>
                <i className="print-list-button fa fa-print cursor-pointer" title="Print Patient List"></i>
              </div>
            </div>
          </div>
        </div>
        {patientEntries.map((pat) =>
          <PatientListResultsItem key={pat.id} patient={pat}/>
        )}
      </div>
    );
  }
}

PatientListResults.propTypes = {
  loadPatients: PropTypes.func,
  patients: PropTypes.object,
  queryParams: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPatients }, dispatch);
}

export function mapStateToProps(state) {
  return {
    patients: state.patientListResults
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListResults);
