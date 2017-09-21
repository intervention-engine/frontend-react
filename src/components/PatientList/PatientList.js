import React, { Component, PropTypes } from 'react';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from './PatientListResults/PatientListResults';

import patientProps from '../../prop-types/patient';
import patientsMetaProps from '../../prop-types/patients_meta';
import populationProps from '../../prop-types/population';
import careTeamProps from '../../prop-types/care_team';
import huddleProps from '../../prop-types/huddle';
import riskServiceProps from '../../prop-types/risk_service';
import sortProps from '../../prop-types/sort';

export default class PatientList extends Component {
  render() {
    return (
      <div className="patient-list row">
        <PatientListSelectors populations={this.props.populations}
                              selectedPopulations={this.props.selectedPopulations}
                              populationSelectorType={this.props.populationSelectorType}
                              careTeams={this.props.careTeams}
                              selectedCareTeam={this.props.selectedCareTeam}
                              huddles={this.props.huddles}
                              selectedHuddle={this.props.selectedHuddle}
                              riskServices={this.props.riskServices}
                              selectedRiskService={this.props.selectedRiskService}
                              sortOptions={this.props.sortOptions}
                              sortOption={this.props.sortOption}
                              sortAscending={this.props.sortAscending}
                              selectPopulation={this.props.selectPopulation}
                              unselectPopulation={this.props.unselectPopulation}
                              changePopulationSelectorType={this.props.changePopulationSelectorType}
                              selectRiskService={this.props.selectRiskService}
                              selectCareTeam={this.props.selectCareTeam}
                              selectHuddle={this.props.selectHuddle}
                              selectSortOption={this.props.selectSortOption}
                              setSortAscending={this.props.setSortAscending} />

        <PatientListResults patients={this.props.patients}
                            patientsMeta={this.props.patientsMeta}
                            patientSearch={this.props.patientSearch}
                            pageNum={this.props.pageNum}
                            currentPage={this.props.currentPage}
                            patientsPerPage={this.props.patientsPerPage}
                            selectedPopulations={this.props.selectedPopulations}
                            populationSelectorType={this.props.populationSelectorType}
                            huddles={this.props.huddles}
                            selectedHuddle={this.props.selectedHuddle}
                            selectedRiskService={this.props.selectedRiskService}
                            sortOption={this.props.sortOption}
                            sortAscending={this.props.sortAscending}
                            setPatientSearch={this.props.setPatientSearch}
                            selectPage={this.props.selectPage} />
      </div>
    );
  }
}

PatientList.displayName = 'PatientList';

PatientList.propTypes = {
  patients: PropTypes.arrayOf(patientProps),
  patientsMeta: patientsMetaProps.isRequired,
  patientSearch: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  patientsPerPage: PropTypes.number.isRequired,
  populations: PropTypes.arrayOf(populationProps),
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps).isRequired,
  selectedRiskService: riskServiceProps,
  sortOptions: PropTypes.arrayOf(sortProps).isRequired,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  setPatientSearch: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  selectCareTeam: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectSortOption: PropTypes.func.isRequired,
  setSortAscending: PropTypes.func.isRequired
};
