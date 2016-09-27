import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import PatientListResultsItem from './PatientListResultsItem';

import patientProps from '../../../prop-types/patient';
import patientsMetaProps from '../../../prop-types/patients_meta';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientListResults extends Component {
  render() {
    return (
      <div className='patient-list-results col-md-9 col-sm-8'>
        <div className="panel patient-panel">
          <div className="panel-heading">
            <div className="collapse-panel-title">
              <span className='patient-count'>Patients ({this.props.patientsMeta.total})</span>

              <div className="patient-list-results-buttons pull-right">
                <div className="sliding-search-container">
                  <FontAwesome name="search" />
                  <input type="search" className="sliding-search expanded"/>
                </div>

                <FontAwesome name="print"
                             className="print-list-button cursor-pointer"
                             title="Print Patient List" />
              </div>
            </div>
          </div>
        </div>

        {this.props.patients.map((patient) =>
          <PatientListResultsItem key={patient.id}
                                  patient={patient}
                                  huddles={this.props.huddles}
                                  riskAssessments={this.props.riskAssessments} />
        )}
      </div>
    );
  }
}

PatientListResults.propTypes = {
  patients: PropTypes.arrayOf(patientProps).isRequired,
  patientsMeta: patientsMetaProps.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired
};
