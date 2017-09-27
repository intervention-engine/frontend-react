import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
import { param } from 'jquery';

import PatientListResultsItem from './PatientListResultsItem';

import patientProps from '../../../prop-types/patient';
import patientsMetaProps from '../../../prop-types/patients_meta';
import populationProps from '../../../prop-types/population';
import huddleProps from '../../../prop-types/huddle';
import riskServiceProps from '../../../prop-types/risk_service';
import sortProps from '../../../prop-types/sort';
import careTeamProps from '../../../prop-types/care_team';

export default class PatientListResults extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      searchExpanded: false
    };
  }

  openPatientPrintList(event) {
    event.preventDefault();

    let queryParams = {
      sortBy: this.props.sortOption.sortKey,
      sortAscending: this.props.sortAscending,
      selectedRiskService: this.props.selectedRiskService,
      _count: this.props.patientsMeta.total
    };

    let selectedHuddle = this.props.selectedHuddle;
    if (selectedHuddle != null) { queryParams.selectedHuddle = selectedHuddle.id; }

    let selectedPopulations = this.props.selectedPopulations;
    if (selectedPopulations != null) {
      queryParams.selectedPopulations = selectedPopulations.map((pop) => pop.id);
      queryParams.populationSelectorType = this.props.populationSelectorType;
    }

    let patientSearch = this.props.patientSearch;
    if (patientSearch !== '') { queryParams.name = patientSearch; }

    let url = `/PrintPatientList?${param(queryParams)}`;

    window.open(url, 'patientPrintList', 'menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes');
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

  renderedPatients() {
    if (this.props.patients != null) {
      return this.props.patients.map((patient) =>
        <PatientListResultsItem key={patient.id}
                                patient={patient}
                                huddles={this.props.huddles}
                                selectedRiskService={this.props.selectedRiskService}
                                selectedCareTeam={this.props.selectedCareTeam} />
      );
    }
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
                             onClick={this.openPatientPrintList.bind(this)}
                             className="print-list-button cursor-pointer"
                             title="Print Patient List" />
              </div>
            </div>
          </div>

          <div className="panel-body">
            {this.renderedPatients()}

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
  patients: PropTypes.arrayOf(patientProps),
  patientsMeta: patientsMetaProps.isRequired,
  patientSearch: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  selectedRiskService: riskServiceProps,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  setPatientSearch: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
  selectedCareTeam: careTeamProps
};
