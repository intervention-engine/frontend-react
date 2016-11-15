import React, { Component, PropTypes } from 'react';

import RiskAssessmentSelector from './RiskAssessmentSelector';
import FilterSelector from './FilterSelector/FilterSelector';
import SortBySelector from './SortBySelector';
import CollapsiblePanel from '../../../elements/CollapsiblePanel';

import populationProps from '../../../prop-types/population';
import huddleGroupProps from '../../../prop-types/huddle_group';
import huddleProps from '../../../prop-types/huddle';
import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
import sortProps from '../../../prop-types/sort';

export default class PatientListSelectors extends Component {
  render() {
    return (
      <div className="patient-list-selectors col-md-3 col-sm-4">
        <CollapsiblePanel panelTitle="Risk Assessment">
          <RiskAssessmentSelector riskAssessmentTypes={this.props.riskAssessmentTypes}
                                  selectedRiskAssessment={this.props.selectedRiskAssessment}
                                  selectRiskAssessment={this.props.selectRiskAssessment} />
        </CollapsiblePanel>

        <CollapsiblePanel panelTitle="Filters" hasNested={true}>
          <FilterSelector populations={this.props.populations}
                          selectedPopulations={this.props.selectedPopulations}
                          populationSelectorType={this.props.populationSelectorType}
                          selectedHuddleGroup={this.props.selectedHuddleGroup}
                          huddles={this.props.huddles}
                          selectedHuddle={this.props.selectedHuddle}
                          selectPopulation={this.props.selectPopulation}
                          unselectPopulation={this.props.unselectPopulation}
                          changePopulationSelectorType={this.props.changePopulationSelectorType}
                          selectHuddleGroup={this.props.selectHuddleGroup}
                          selectHuddle={this.props.selectHuddle} />
        </CollapsiblePanel>

        <CollapsiblePanel panelTitle="Sort">
          <SortBySelector sortOptions={this.props.sortOptions}
                          sortOption={this.props.sortOption}
                          sortAscending={this.props.sortAscending}
                          selectSortOption={this.props.selectSortOption}
                          setSortAscending={this.props.setSortAscending} />
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientListSelectors.displayName = 'PatientListSelectors';

PatientListSelectors.propTypes = {
  populations: PropTypes.arrayOf(populationProps),
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddleGroup: huddleGroupProps,
  selectedHuddle: huddleProps,
  riskAssessmentTypes: PropTypes.arrayOf(riskAssessmentTypeProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  sortOptions: PropTypes.arrayOf(sortProps).isRequired,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired,
  selectHuddleGroup: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectSortOption: PropTypes.func.isRequired,
  setSortAscending: PropTypes.func.isRequired
};
