import React, { Component, PropTypes } from 'react';

import PatientListResultsItem from './PatientListResultsItem';

class PatientListResults extends Component {
  render() {
    const { patients } = this.props.patients;
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
        {patients.map((pat) =>
          <PatientListResultsItem key={pat.id} patient={pat}/>
        )}
      </div>
    );
  }
}

PatientListResults.propTypes = {
  patients: PropTypes.object
};


export default PatientListResults;
