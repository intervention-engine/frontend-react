import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeader from '../components/Header/PageHeader';
import PatientList from '../components/PatientList/PatientList';

import patientProps from '../prop-types/patient';
import patientsMetaProps from '../prop-types/patients_meta';
import populationProps from '../prop-types/population';
import careTeamProps from '../prop-types/huddle';
import huddleProps from '../prop-types/huddle';
import riskServiceProps from '../prop-types/risk_service';
import sortProps from '../prop-types/sort';

import { sortOptions } from '../reducers/sort';

import { loadPatients, filterPatientsByHuddle, filterPatientsByFirstHuddle,
         setPatientSearch, selectPage } from '../actions/patient';
import { fetchPopulations, selectPopulation, unselectPopulation,
         changePopulationSelectorType } from '../actions/population';
import { fetchRiskServicesIfNeeded, selectRiskService } from '../actions/risk_service';
import { fetchCareTeamsIfNeeded, selectCareTeam, fetchHuddlesIfNeeded } from '../actions/huddle';
import { selectSortOption, setSortAscending } from '../actions/sort';

class Patients extends Component {
  componentDidMount() {
    this.props.loadPatients();
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
                     populations={this.props.populations}
                     selectedPopulations={this.props.selectedPopulations}
                     populationSelectorType={this.props.populationSelectorType}
                     careTeams={this.props.careTeams}
                     selectedCareTeam={this.props.selectedCareTeam}
                     huddles={this.props.huddles}
                     selectedHuddle={this.props.selectedHuddle}
                     riskServices={this.props.riskServices}
                     selectedRiskService={this.props.selectedRiskService}
                     sortOptions={sortOptions}
                     sortOption={this.props.sortOption}
                     sortAscending={this.props.sortAscending}
                     setPatientSearch={this.props.setPatientSearch}
                     selectPage={this.props.selectPage}
                     selectPopulation={this.props.selectPopulation}
                     unselectPopulation={this.props.unselectPopulation}
                     changePopulationSelectorType={this.props.changePopulationSelectorType}
                     selectRiskService={this.props.selectRiskService}
                     selectCareTeam={this.props.selectCareTeam}
                     filterPatientsByHuddle={this.props.filterPatientsByHuddle}
                     filterPatientsByFirstHuddle={this.props.filterPatientsByFirstHuddle}
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
  populations: PropTypes.arrayOf(populationProps),
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps),
  selectedRiskService: riskServiceProps,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  loadPatients: PropTypes.func.isRequired,
  filterPatientsByHuddle: PropTypes.func.isRequired,
  filterPatientsByFirstHuddle: PropTypes.func.isRequired,
  fetchPopulations: PropTypes.func.isRequired,
  fetchCareTeams: PropTypes.func.isRequired,
  fetchHuddles: PropTypes.func.isRequired,
  fetchRiskServices: PropTypes.func.isRequired,
  setPatientSearch: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  selectCareTeam: PropTypes.func.isRequired,
  selectSortOption: PropTypes.func.isRequired,
  setSortAscending: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPatients,
    filterPatientsByHuddle,
    filterPatientsByFirstHuddle,
    fetchPopulations,
    fetchCareTeams: fetchCareTeamsIfNeeded,
    fetchHuddles: fetchHuddlesIfNeeded,
    fetchRiskServices: fetchRiskServicesIfNeeded,
    setPatientSearch,
    selectPage,
    selectPopulation,
    unselectPopulation,
    changePopulationSelectorType,
    selectRiskService,
    selectCareTeam,
    selectSortOption,
    setSortAscending
  }, dispatch);
}

export function mapStateToProps(state) {
  let huddles = [];
  if (state.huddle.selectedCareTeam && state.huddle.huddlesByCareTeam[state.huddle.selectedCareTeam.id]) {
    huddles = state.huddle.huddlesByCareTeam[state.huddle.selectedCareTeam.id].items;
  }

  return {
    patients: state.patient.patients.items,
    patientsMeta: state.patient.patients.meta,
    patientSearch: state.patient.patientSearch,
    pageNum: state.patient.selectedPage.pageNum,
    currentPage: state.patient.selectedPage.currentPage,
    populations: state.population.populations,
    selectedPopulations: state.population.selectedPopulations,
    populationSelectorType: state.population.populationSelectorType,
    careTeams: state.huddle.careTeams.items,
    selectedCareTeam: state.huddle.selectedCareTeam,
    huddles,
    selectedHuddle: state.huddle.selectedHuddle,
    riskServices: state.riskService.riskServices.items,
    selectedRiskService: state.riskService.selectedRiskService,
    sortOption: state.sort.selectedSortOption,
    sortAscending: state.sort.sortAscending
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
