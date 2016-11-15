import React, { Component, PropTypes} from 'react';

import PopulationFilterSelector from './PopulationFilterSelector';
import HuddleFilterSelector from './HuddleFilterSelector/HuddleFilterSelector';
import CollapsiblePanel from '../../../../elements/CollapsiblePanel';

import populationProps from '../../../../prop-types/population';
import huddleGroupProps from '../../../../prop-types/huddle_group';
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
          <HuddleFilterSelector huddles={this.props.huddles}
                                selectedHuddleGroup={this.props.selectedHuddleGroup}
                                selectedHuddle={this.props.selectedHuddle}
                                selectHuddleGroup={this.props.selectHuddleGroup}
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
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddleGroup: huddleGroupProps,
  selectedHuddle: huddleProps,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired,
  selectHuddleGroup: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired
};
