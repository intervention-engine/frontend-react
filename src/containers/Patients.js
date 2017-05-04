import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import equal from 'deep-equal';

import PageHeader from '../components/Header/PageHeader';
import PatientList from '../components/PatientList/PatientList';

import patientProps from '../prop-types/patient';
import patientsMetaProps from '../prop-types/patients_meta';
import populationProps from '../prop-types/population';
import huddleGroupProps from '../prop-types/huddle_group';
import huddleProps from '../prop-types/huddle';
import riskAssessmentTypeProps from '../prop-types/risk_assessment_type';
import riskAssessmentProps from '../prop-types/risk_assessment';
import sortProps from '../prop-types/sort';

import { riskAssessmentTypes } from '../reducers/risk_assessment';
import { sortOptions } from '../reducers/sort';

import { fetchPatients, setPatientSearch, selectPage } from '../actions/patient';
import { fetchPopulations, selectPopulation, unselectPopulation,
         changePopulationSelectorType } from '../actions/population';
import { fetchRiskAssessments, selectRiskAssessment } from '../actions/risk_assessment';
import { fetchHuddles, selectHuddleGroup, selectHuddle } from '../actions/huddle';
import { selectSortOption, setSortAscending } from '../actions/sort';

class Patients extends Component {
  componentWillMount() {
    // if (this.props.populations == null) { this.props.fetchPopulations(); }
    if (this.props.huddles == null) { this.props.fetchHuddles(); }
  }

  componentWillReceiveProps(nextProps) {
    // population params
    let groupIds = nextProps.selectedPopulations.map((pop) => pop.id);
    let joinedGroupIds = [ groupIds.join(',') ];
    if (nextProps.populationSelectorType === 'union' && groupIds.length > 0) {
      groupIds = joinedGroupIds;
    }

    // huddle params -- concat to groupId
    if (nextProps.selectedHuddle != null) {
      groupIds.push(nextProps.selectedHuddle.id);
    }

    // group params (population + huddle params)
    let groupIdParams = {};
    if (groupIds.length > 0) {
      groupIdParams = { _query: 'group', groupId: groupIds };
    }

    // sort params
    let sortDir = nextProps.sortAscending ? '' : '-';
    if (nextProps.sortOption.invert) { sortDir = sortDir === '' ? '-' : ''; }
    let sortParams = { _sort: `${sortDir}${nextProps.sortOption.sortKey}` };

    // fetch patients and risks with params when nextProps has changed
    if (this.props.patients == null) {
        // !equal(nextProps.patientSearch, this.props.patientSearch) ||
        // !equal(nextProps.pageNum, this.props.pageNum) ||
        // !equal(nextProps.currentPage, this.props.currentPage) ||
        // !equal(nextProps.populations, this.props.populations) ||
        // !equal(nextProps.selectedPopulations, this.props.selectedPopulations) ||
        // !equal(nextProps.populationSelectorType, this.props.populationSelectorType) ||
        // !equal(nextProps.selectedRiskAssessment, this.props.selectedRiskAssessment) ||
        // !equal(nextProps.selectedHuddle, this.props.selectedHuddle) ||
        // !equal(nextProps.sortAscending, this.props.sortAscending) ||
        // !equal(nextProps.sortOption, this.props.sortOption)) {
       this.props.fetchPatients({
        ...groupIdParams,
        ...sortParams,
        riskAssessment: this.props.selectedRiskAssessment,
        search_term: nextProps.patientSearch,
        page: (nextProps.currentPage),
        per_page: this.props.patientsPerPage,
        _revinclude: 'RiskAssessment:subject'
      });
    }
  }

  render() {
    return (
      <div className="patients container">
        <PageHeader title="Patients"/>
        <PatientList patients={this.props.patients}
                     patientsMeta={this.props.patientsMeta}
                     patientSearch={this.props.patientSearch}
                     pageNum={this.props.pageNum}
                     currentPage={this.props.currentPage}
                     patientsPerPage={this.props.patientsPerPage}
                     populations={this.props.populations}
                     selectedPopulations={this.props.selectedPopulations}
                     populationSelectorType={this.props.populationSelectorType}
                     huddles={this.props.huddles}
                     selectedHuddleGroup={this.props.selectedHuddleGroup}
                     selectedHuddle={this.props.selectedHuddle}
                     riskAssessmentTypes={riskAssessmentTypes}
                     riskAssessments={this.props.riskAssessments}
                     selectedRiskAssessment={this.props.selectedRiskAssessment}
                     sortOptions={sortOptions}
                     sortOption={this.props.sortOption}
                     sortAscending={this.props.sortAscending}
                     setPatientSearch={this.props.setPatientSearch}
                     selectPage={this.props.selectPage}
                     selectPopulation={this.props.selectPopulation}
                     unselectPopulation={this.props.unselectPopulation}
                     changePopulationSelectorType={this.props.changePopulationSelectorType}
                     selectRiskAssessment={this.props.selectRiskAssessment}
                     selectHuddleGroup={this.props.selectHuddleGroup}
                     selectHuddle={this.props.selectHuddle}
                     selectSortOption={this.props.selectSortOption}
                     setSortAscending={this.props.setSortAscending} />
      </div>
    );
  }
}

Patients.displayName = 'Patients';

Patients.propTypes = {
  patients: PropTypes.arrayOf(patientProps),
  patientsMeta: patientsMetaProps.isRequired,
  patientSearch: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  patientsPerPage: PropTypes.number.isRequired,
  populations: PropTypes.arrayOf(populationProps),
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddleGroup: huddleGroupProps,
  selectedHuddle: huddleProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  fetchPatients: PropTypes.func.isRequired,
  fetchPopulations: PropTypes.func.isRequired,
  fetchHuddles: PropTypes.func.isRequired,
  fetchRiskAssessments: PropTypes.func.isRequired,
  setPatientSearch: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired,
  selectHuddleGroup: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectSortOption: PropTypes.func.isRequired,
  setSortAscending: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPatients,
    fetchPopulations,
    fetchHuddles,
    fetchRiskAssessments,
    setPatientSearch,
    selectPage,
    selectPopulation,
    unselectPopulation,
    changePopulationSelectorType,
    selectRiskAssessment,
    selectHuddleGroup,
    selectHuddle,
    selectSortOption,
    setSortAscending
  }, dispatch);
}

export function mapStateToProps(state) {
  return {
    patients: state.patient.patients,
    patientsMeta: state.patient.meta,
    patientSearch: state.patient.patientSearch,
    pageNum: state.patient.pageNum,
    currentPage: state.patient.currentPage,
    patientsPerPage: state.patient.patientsPerPage,
    populations: state.population.populations,
    selectedPopulations: state.population.selectedPopulations,
    populationSelectorType: state.population.populationSelectorType,
    huddles: state.huddle.huddles,
    selectedHuddleGroup: state.huddle.selectedHuddleGroup,
    selectedHuddle: state.huddle.selectedHuddle,
    riskAssessments: state.riskAssessment.riskAssessments,
    selectedRiskAssessment: state.riskAssessment.selectedRiskAssessment,
    sortOption: state.sort.sortOption,
    sortAscending: state.sort.sortAscending
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
