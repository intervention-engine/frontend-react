import React, { Component, PropTypes} from 'react';

import PopulationFilterSelector from './PopulationFilterSelector';
import HuddleFilterSelector from './HuddleFilterSelector/HuddleFilterSelector';
import CollapsiblePanel from '../../../../elements/CollapsiblePanel';

import populationProps from '../../../../prop-types/population';
import careTeamProps from '../../../../prop-types/care_team';
import huddleProps from '../../../../prop-types/huddle';

export default class FilterSelector extends Component {
  render() {
    return (
      <div className="filter-selector">
        <CollapsiblePanel panelTitle="Populations" isNested={true}>
          <PopulationFilterSelector populations={this.props.populations}
                                    selectedPopulations={this.props.selectedPopulations}
                                    populationSelectorType={this.props.populationSelectorType}
                                    selectPopulation={this.props.selectPopulation}
                                    unselectPopulation={this.props.unselectPopulation}
                                    changePopulationSelectorType={this.props.changePopulationSelectorType} />
        </CollapsiblePanel>

        <CollapsiblePanel panelTitle="Huddles" isNested={true}>
          <HuddleFilterSelector careTeams={this.props.careTeams}
                                selectedCareTeam={this.props.selectedCareTeam}
                                selectCareTeam={this.props.selectCareTeam}
                                huddles={this.props.huddles}
                                selectedHuddle={this.props.selectedHuddle}
                                selectHuddle={this.props.selectHuddle} />
        </CollapsiblePanel>
      </div>
    );
  }
}

FilterSelector.displayName = 'FilterSelector';

FilterSelector.propTypes = {
  populations: PropTypes.arrayOf(populationProps),
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired,
  selectCareTeam: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired
};
