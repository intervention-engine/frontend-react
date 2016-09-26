import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import PatientListResultsItem from './PatientListResultsItem';
import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentProps from '../../../prop-types/risk_assessment';
import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';

class PatientListResults extends Component {
  render() {
    return (
      <div className='patient-list-results col-md-9 col-sm-8'>
        <div className="panel patient-panel">
          <div className="panel-heading">
            <div className="collapse-panel-title">
              <span className='patient-count'>Patients ({this.props.totalPatients})</span>

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
                                  selectedHuddleGroup={this.props.selectedHuddleGroup}
                                  riskAssessments={this.props.riskAssessments}
                                  selectedRiskAssessment={this.props.selectedRiskAssessment} />
        )}
      </div>
    );
  }
}

PatientListResults.propTypes = {
  patients: PropTypes.arrayOf(patientProps).isRequired,
  totalPatients: PropTypes.number,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  selectedHuddleGroup: huddleGroupProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired
};

export default PatientListResults;
