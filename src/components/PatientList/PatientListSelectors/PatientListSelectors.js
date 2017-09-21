import React, { Component, PropTypes } from 'react';

import RiskServiceSelector from './RiskServiceSelector';
import FilterSelector from './FilterSelector/FilterSelector';
import SortBySelector from './SortBySelector';
import CollapsiblePanel from '../../../elements/CollapsiblePanel';

import populationProps from '../../../prop-types/population';
import careTeamProps from '../../../prop-types/care_team';
import huddleProps from '../../../prop-types/huddle';
import riskServiceProps from '../../../prop-types/risk_service';
import sortProps from '../../../prop-types/sort';

export default class PatientListSelectors extends Component {
  render() {
    return (
      <div className="patient-list-selectors col-md-3 col-sm-4">
        <CollapsiblePanel panelTitle="Risk Service">
          <RiskServiceSelector riskServices={this.props.riskServices}
                               selectedRiskService={this.props.selectedRiskService}
                               selectRiskService={this.props.selectRiskService} />
        </CollapsiblePanel>

        <CollapsiblePanel panelTitle="Filters" hasNested={true}>
          <FilterSelector populations={this.props.populations}
                          selectedPopulations={this.props.selectedPopulations}
                          populationSelectorType={this.props.populationSelectorType}
                          selectedHuddleGroup={this.props.selectedHuddleGroup}
                          careTeams={this.props.careTeams}
                          selectedCareTeam={this.props.selectedCareTeam}
                          huddles={this.props.huddles}
                          selectedHuddle={this.props.selectedHuddle}
                          selectPopulation={this.props.selectPopulation}
                          unselectPopulation={this.props.unselectPopulation}
                          changePopulationSelectorType={this.props.changePopulationSelectorType}
                          selectCareTeam={this.props.selectCareTeam}
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
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps).isRequired,
  selectedRiskService: riskServiceProps,
  sortOptions: PropTypes.arrayOf(sortProps).isRequired,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  selectCareTeam: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectSortOption: PropTypes.func.isRequired,
  setSortAscending: PropTypes.func.isRequired
};
