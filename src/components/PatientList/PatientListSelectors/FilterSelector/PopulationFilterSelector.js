import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import AndOrButtons from '../../../../elements/AndOrButtons';

import populationProps from '../../../../prop-types/population';

export default class PopulationFilterSelector extends Component {
  isSelected(population) {
    return this.props.selectedPopulations.indexOf(population) !== -1;
  }

  handleInputChange(population) {
    let found = this.props.selectedPopulations.some((pop) => {
      return pop.id === population.id;
    });

    if (found) { this.props.unselectPopulation(population); }
    else { this.props.selectPopulation(population); }
  }

  renderedPopulation(population) {
    return (
      <div key={population.id} className="population">
        <div className="control-group">
          <label htmlFor={`population-checkbox-${population.id}`} className={`control control-checkbox`}>
            <span className="population-name">{population.name}</span>

            <input type="checkbox"
              name="population"
              id={`population-checkbox-${population.id}`}
              value={population.id}
              checked={this.isSelected(population)}
              onChange={() => this.handleInputChange(population)} />

            <div className="control-indicator"></div>

            <Link to="/FilterBuilder">
              <FontAwesome name="edit" className="pull-right" />
            </Link>
          </label>
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.selectedPopulations) {
      return this.props.selectedPopulations.map((pop) => pop.name + ', ');
    }
  }

  render() {
    return (
      <div className="population-filter-selector">
        <form className="form-horizontal form-group-striped">
          <AndOrButtons unionFunction={this.props.changePopulationSelectorType}
                        intersectionFunction={this.props.changePopulationSelectorType}
                        selectorType={this.props.populationSelectorType} />

          <div className="debug">TYPE: {this.props.populationSelectorType}</div>

          {this.props.populations.map((population) => this.renderedPopulation(population))}

          <div className="add-new-filter">
            <Link to="/FilterBuilder">
              <FontAwesome name="plus-circle" /> add new
            </Link>
          </div>
        </form>

        <div className="debug">SELECTED: {this.debugSelected()}</div>
      </div>
    );
  }
}

PopulationFilterSelector.displayName = 'PopulationFilterSelector';

PopulationFilterSelector.propTypes = {
  populations: PropTypes.arrayOf(populationProps).isRequired,
  selectedPopulations: PropTypes.arrayOf(populationProps).isRequired,
  populationSelectorType: PropTypes.string.isRequired,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired,
  changePopulationSelectorType: PropTypes.func.isRequired
};
