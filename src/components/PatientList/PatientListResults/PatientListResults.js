import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

import PatientListResultsItem from './PatientListResultsItem';

import patientProps from '../../../prop-types/patient';
import patientsMetaProps from '../../../prop-types/patients_meta';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientListResults extends Component {
  constructor(...args) {
    super(...args);

    this.state = { searchExpanded: false };
  }

  render() {
    let slidingSearchClassnames = classNames('sliding-search', { 'searchExpanded': this.state.searchExpanded === true });

    return (
      <div className="patient-list-results col-md-9 col-sm-8">
        <div className="panel patient-panel">
          <div className="panel-heading">
            <div className="collapse-panel-title">
              <span className="patient-count">Patients ({this.props.patientsMeta.total})</span>

              <div className="patient-list-results-buttons pull-right">
                <div className="sliding-search-container"
                     onChange={ () => this.setState({ searchExpanded: !this.state.searchExpanded }) }>
                  <FontAwesome name="search" />
                  <input type="search" className={slidingSearchClassnames}
                         value={this.props.patientSearch}
                         onChange={ (e) => this.props.setPatientSearch(e.target.value) } />
                </div>

                <FontAwesome name="print"
                             className="print-list-button cursor-pointer"
                             title="Print Patient List" />
              </div>
            </div>
          </div>

          <div className="panel-body">
            {this.props.patients.map((patient) =>
              <PatientListResultsItem key={patient.id}
                                      patient={patient}
                                      huddles={this.props.huddles}
                                      riskAssessments={this.props.riskAssessments} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

PatientListResults.propTypes = {
  patients: PropTypes.arrayOf(patientProps).isRequired,
  patientsMeta: patientsMetaProps.isRequired,
  patientSearch: PropTypes.string.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  setPatientSearch: PropTypes.func.isRequired
};
