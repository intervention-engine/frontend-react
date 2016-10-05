import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

import PatientListResultsItem from './PatientListResultsItem';

import patientProps from '../../../prop-types/patient';
import patientsMetaProps from '../../../prop-types/patients_meta';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientListResults extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      searchExpanded: false
    };
  }

  setPatientSearch(value) {
    this.props.setPatientSearch(value);
    this.setState({
      searchExpanded: value !== ''
    });
  }

  handlePageClick(data) {
    this.props.selectPage(data.selected + 1);
  }

  render() {
    let slidingSearchClassnames = classNames('sliding-search', { 'expanded': this.state.searchExpanded === true });

    return (
      <div className="patient-list-results col-md-9 col-sm-8">
        <div className="panel patient-panel">
          <div className="panel-heading">
            <div className="collapse-panel-title">
              <span className="patient-count">Patients ({this.props.patientsMeta.total})</span>

              <div className="patient-list-results-buttons pull-right">
                <div className="sliding-search-container">
                  <FontAwesome name="search" />
                  <input type="search" className={slidingSearchClassnames}
                         value={this.props.patientSearch}
                         onChange={(e) => this.setPatientSearch(e.target.value)} />
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

            <div className="pagination-centered">
              <ReactPaginate previousLabel={"«"}
                   nextLabel={"»"}
                   breakLabel={<span>...</span>}
                   pageNum={this.props.pageNum}
                   marginPagesDisplayed={2}
                   pageRangeDisplayed={5}
                   clickCallback={this.handlePageClick.bind(this)}
                   containerClassName={"pagination"}
                   subContainerClassName={"pages pagination"}
                   activeClassName={"active"} />
            </div>
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
  pageNum: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  patientsPerPage: PropTypes.number.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  setPatientSearch: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired
};
