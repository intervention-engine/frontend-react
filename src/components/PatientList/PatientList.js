import React, { Component, PropTypes } from 'react';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from './PatientListResults/PatientListResults';

import patientProps from '../../prop-types/patient';
import patientsMetaProps from '../../prop-types/patients_meta';
import populationProps from '../../prop-types/population';
import huddleGroupProps from '../../prop-types/huddle_group';
import huddleProps from '../../prop-types/huddle';
import riskAssessmentTypeProps from '../../prop-types/risk_assessment_type';
import riskAssessmentProps from '../../prop-types/risk_assessment';
import sortProps from '../../prop-types/sort';

export default class PatientList extends Component {
  render(){
    return (
      <div className="patient-list row">
        <PatientListSelectors populations={this.props.populations}
                              selectedPopulations={this.props.selectedPopulations}
                              populationSelectorType={this.props.populationSelectorType}
                              huddles={this.props.huddles}
                              selectedHuddleGroup={this.props.selectedHuddleGroup}
                              selectedHuddle={this.props.selectedHuddle}
                              riskAssessmentTypes={this.props.riskAssessmentTypes}
                              selectedRiskAssessment={this.props.selectedRiskAssessment}
                              sortOptions={this.props.sortOptions}
                              sortOption={this.props.sortOption}
                              sortAscending={this.props.sortAscending}
                              selectPopulation={this.props.selectPopulation}
                              unselectPopulation={this.props.unselectPopulation}
                              changePopulationSelectorType={this.props.changePopulationSelectorType}
                              selectRiskAssessment={this.props.selectRiskAssessment}
                              selectHuddleGroup={this.props.selectHuddleGroup}
                              selectHuddle={this.props.selectHuddle}
                              selectSortOption={this.props.selectSortOption}
                              setSortAscending={this.props.setSortAscending} />

        <PatientListResults patients={this.props.patients}
                            patientsMeta={this.props.patientsMeta}
                            patientSearch={this.props.patientSearch}
                            pageNum={this.props.pageNum}
                            currentPage={this.props.currentPage}
                            patientsPerPage={this.props.patientsPerPage}
                            huddles={this.props.huddles}
                            riskAssessments={this.props.riskAssessments}
                            setPatientSearch={this.props.setPatientSearch}
                            selectPage={this.props.selectPage} />
      </div>
    );
  }
}

PatientList.displayName = 'PatientList';

PatientList.propTypes = {
  patients: PropTypes.arrayOf(patientProps).isRequired,
  patientsMeta: patientsMetaProps.isRequired,
  patientSearch: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  patientsPerPage: PropTypes.number.isRequired,
  populations: PropTypes.arrayOf(populationProps).isRequired,
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  selectedHuddleGroup: huddleGroupProps,
  selectedHuddle: huddleProps,
  riskAssessmentTypes: PropTypes.arrayOf(riskAssessmentTypeProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  sortOptions: PropTypes.arrayOf(sortProps).isRequired,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
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
